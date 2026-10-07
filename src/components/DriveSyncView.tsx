import React, { useState, useEffect } from 'react';
import { useInduction } from '../context/InductionContext';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken, 
  getCurrentGoogleUser 
} from '../services/googleAuthService';
import { 
  findOrCreateInductionSpreadsheet, 
  appendApprenticeRecord, 
  getSpreadsheetRecords,
  ApprenticeRecordData
} from '../services/googleSheetsService';
import { User } from 'firebase/auth';
import { 
  FileSpreadsheet, 
  HardDrive, 
  CheckCircle2, 
  LogOut, 
  ExternalLink, 
  RefreshCw, 
  ShieldAlert, 
  Database,
  Sparkles,
  Send,
  UserCheck,
  AlertCircle,
  Lock,
  KeyRound,
  Users,
  ShieldCheck,
  CloudUpload,
  Download
} from 'lucide-react';

interface StoredApprenticeResponse {
  id: string;
  fecha: string;
  nombre: string;
  tipoDocumento: string;
  documento: string;
  programa: string;
  ficha: string;
  centro: string;
  regional: string;
  email: string;
  progreso: number;
  estado: string;
  insigniasObtenidas: string;
}

export const DriveSyncView: React.FC = () => {
  const { profile, overallProgress, badges } = useInduction();

  // Admin authentication state
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => {
    return localStorage.getItem('sena_admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Google OAuth State
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Spreadsheet state
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [sheetRecords, setSheetRecords] = useState<string[][]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  // Apprentice Server Submissions queue
  const [serverResponses, setServerResponses] = useState<StoredApprenticeResponse[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [syncingAll, setSyncingAll] = useState(false);

  // Confirmation Modal state for mutating operation
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (!isAdminAuth) return;

    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setNeedsAuth(false);
        loadSpreadsheetAndData(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
        setSpreadsheetId(null);
        setSheetRecords([]);
      }
    );

    fetchServerSubmissions();

    return () => unsubscribe();
  }, [isAdminAuth]);

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'SENA2026' || pinInput === 'admin' || pinInput === '1234') {
      localStorage.setItem('sena_admin_authenticated', 'true');
      setIsAdminAuth(true);
      setPinError('');
    } else {
      setPinError('Clave incorrecta. La clave de administración por defecto es SENA2026.');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('sena_admin_authenticated');
    setIsAdminAuth(false);
  };

  const fetchServerSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch('/api/respuestas/admin', {
        headers: { 'x-admin-key': 'SENA2026' }
      });
      if (res.ok) {
        const data = await res.json();
        setServerResponses(data.responses || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        setNeedsAuth(false);
        setStatusMessage({ type: 'success', text: '¡Sesión de Administrador iniciada en Google!' });
        await loadSpreadsheetAndData(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: `Error al iniciar sesión: ${err.message || 'Error desconocido'}` });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutGoogle = async () => {
    await logoutGoogle();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
    setSpreadsheetId(null);
    setSheetRecords([]);
    setStatusMessage({ type: 'info', text: 'Sesión de Google cerrada.' });
  };

  const loadSpreadsheetAndData = async (token: string) => {
    setLoadingRecords(true);
    try {
      const id = await findOrCreateInductionSpreadsheet(token);
      setSpreadsheetId(id);
      const records = await getSpreadsheetRecords(token, id);
      setSheetRecords(records);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ 
        type: 'error', 
        text: `Error conectando a Google Drive: ${err.message || 'Verifica permisos de Google Drive.'}` 
      });
    } finally {
      setLoadingRecords(false);
    }
  };

  const handleSyncAllToGoogleDrive = async () => {
    if (!accessToken) {
      setStatusMessage({ type: 'error', text: 'Debes iniciar sesión con tu cuenta de Google de Administrador.' });
      return;
    }

    setSyncingAll(true);
    setStatusMessage(null);

    try {
      let targetId = spreadsheetId;
      if (!targetId) {
        targetId = await findOrCreateInductionSpreadsheet(accessToken);
        setSpreadsheetId(targetId);
      }

      for (const resp of serverResponses) {
        const recordToSave: ApprenticeRecordData = {
          nombre: resp.nombre,
          tipoDocumento: resp.tipoDocumento,
          documento: resp.documento,
          programa: resp.programa,
          ficha: resp.ficha,
          centro: resp.centro,
          regional: resp.regional,
          email: resp.email,
          progreso: resp.progreso,
          estado: resp.estado,
          insigniasObtenidas: resp.insigniasObtenidas,
          fechaRegistro: resp.fecha
        };
        await appendApprenticeRecord(accessToken, targetId, recordToSave);
      }

      setShowConfirmModal(false);
      setStatusMessage({ 
        type: 'success', 
        text: `¡Se han sincronizado ${serverResponses.length} respuestas de aprendices en la Hoja de Cálculo en Google Drive!` 
      });

      const updatedRecords = await getSpreadsheetRecords(accessToken, targetId);
      setSheetRecords(updatedRecords);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: `Error en la sincronización: ${err.message}` });
    } finally {
      setSyncingAll(false);
    }
  };

  // Lock Screen if not authenticated as Admin
  if (!isAdminAuth) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Panel de Administración SENA 🔐
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Área restringida únicamente para instructores y administradores. Los aprendices realizan sus pruebas desde los módulos de inducción.
          </p>
        </div>

        <form onSubmit={handleAdminAuthSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Ingresa la Clave de Administrador
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="SENA2026"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            {pinError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">
                {pinError}
              </p>
            )}
            <p className="text-[10px] text-slate-400 mt-1">
              Clave de demostración: <strong className="text-emerald-600">SENA2026</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ingresar al Panel de Control</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pointer-events-none pr-8">
          <ShieldCheck className="w-64 h-64 text-emerald-400" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Panel de Administración SENA (Exclusivo Instructor)
            </div>

            <button
              onClick={handleAdminLogout}
              className="text-xs text-slate-300 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir del Modo Admin
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Gestión y Control de Inducción 📊
          </h1>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Esta sección es **privada y segura**. Los aprendices realizan sus pruebas en la plataforma sin ver la hoja de cálculo. Desde este panel puedes consultar sus respuestas y sincronizarlas con tu **Google Drive**.
          </p>
        </div>
      </div>

      {/* Status Alert Message */}
      {statusMessage && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : statusMessage.type === 'error'
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
        }`}>
          {statusMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
          {statusMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />}
          {statusMessage.type === 'info' && <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />}
          <div className="text-sm font-medium">{statusMessage.text}</div>
        </div>
      )}

      {/* Admin Google Drive Connection Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Google Admin Auth Status */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Conexión Google Drive Admin
            </span>
            {user && (
              <button
                onClick={handleLogoutGoogle}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                Desconectar
              </button>
            )}
          </div>

          {needsAuth ? (
            <div className="space-y-3 pt-1">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Inicia sesión con tu cuenta de Google de instructor para vincular la Hoja de Cálculo Maestra en tu Drive.
              </p>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 px-4 py-2.5 rounded-xl font-medium text-xs shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{loading ? 'Conectando...' : 'Conectar Google Drive'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Admin" className="w-10 h-10 rounded-full border-2 border-emerald-500" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                    A
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">
                    {user?.displayName || 'Instructor SENA'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Google Drive Conectado
              </p>
            </div>
          )}
        </div>

        {/* Sync Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sincronización a Google Sheets
          </span>

          <div className="space-y-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Respuestas recibidas en cola: <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{serverResponses.length} aprendices</strong>
            </p>
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={needsAuth || serverResponses.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CloudUpload className="w-4 h-4" />
              Sincronizar Todas las Respuestas en Drive
            </button>
          </div>
        </div>

        {/* Master Sheet File Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Hoja de Cálculo Privada
          </span>

          {spreadsheetId ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  Registro_Induccion_SENA_2026
                </p>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  ID: {spreadsheetId}
                </p>
              </div>

              <a
                href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs py-2.5 px-3 rounded-xl transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                Abrir Hoja de Cálculo en Google Sheets ↗
              </a>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Conecta tu cuenta de Google arriba para acceder o generar la hoja maestra.
            </p>
          )}
        </div>
      </div>

      {/* Queue of Apprentice Submissions Received */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Respuestas Recibidas de Aprendices
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Registros enviados por los aprendices al completar su inducción (privados para el administrador)
            </p>
          </div>

          <button
            onClick={fetchServerSubmissions}
            disabled={loadingSubmissions}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingSubmissions ? 'animate-spin' : ''}`} />
            Refrescar Respuestas
          </button>
        </div>

        {serverResponses.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Fecha</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Aprendiz</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Documento</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Ficha / Programa</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Progreso</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Estado</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Insignias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {serverResponses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-[11px] font-mono text-slate-500">{item.fecha}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-slate-900 dark:text-slate-100">{item.nombre}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-400">{item.tipoDocumento} {item.documento}</td>
                    <td className="px-4 py-3 whitespace-nowrap max-w-xs truncate">{item.ficha} - {item.programa}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-emerald-600 dark:text-emerald-400">{item.progreso}%</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-md font-semibold text-[10px]">
                        {item.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-[11px]">{item.insigniasObtenidas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center text-slate-500 text-xs italic bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            No hay respuestas pendientes en la cola. Los aprendices enviarán su registro desde la plataforma al finalizar su inducción.
          </div>
        )}
      </div>

      {/* Confirmation Modal for Admin Sync */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl">
                <CloudUpload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  Sincronizar con Google Drive
                </h4>
                <p className="text-xs text-slate-500">
                  Google Sheets Administrator Integration
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                ¿Confirmas la exportación/sincronización de {serverResponses.length} registros hacia tu Hoja de Cálculo en Google Drive?
              </p>
              <p className="text-slate-500">
                Esta acción agregará las respuestas recopiladas a la hoja privada <strong>Registro_Induccion_SENA_2026</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={syncingAll}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSyncAllToGoogleDrive}
                disabled={syncingAll}
                className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {syncingAll ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirmar Sincronización
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
