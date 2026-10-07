import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { SenaLogo } from './SenaLogo';
import { 
  Building2, 
  BookOpen, 
  Compass, 
  Sparkles, 
  Bot, 
  Award, 
  User, 
  Menu, 
  X,
  GraduationCap,
  Moon,
  Sun,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
  KeyRound,
  FileCheck2
} from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, overallProgress, profile, updateProfile, darkMode, toggleDarkMode } = useInduction();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Admin Auth Modal State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminError, setAdminError] = useState('');

  const [editForm, setEditForm] = useState(profile);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setShowProfileModal(false);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'SENA2026' || adminPin === 'admin' || adminPin === '1234') {
      localStorage.setItem('sena_admin_authenticated', 'true');
      setShowAdminModal(false);
      setAdminPin('');
      setAdminError('');
      setActiveTab('admin');
    } else {
      setAdminError('Clave incorrecta. Intenta con SENA2026');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: GraduationCap },
    { id: 'identidad', label: 'Identidad SENA', icon: Building2 },
    { id: 'reglamento', label: 'Reglamento', icon: BookOpen },
    { id: 'evaluacion', label: 'Evaluación Quiz', icon: FileCheck2 },
    { id: 'ruta', label: 'Ruta & SOFIA', icon: Compass },
    { id: 'bienestar', label: 'Bienestar', icon: Sparkles },
    { id: 'asistente', label: 'Tutor Sofía (IA)', icon: Bot },
    { id: 'certificado', label: 'Certificado', icon: Award },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 overflow-x-hidden">
          
          {/* Grupo 1: Identidad e Inicio (Brand Button) */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2 sm:gap-2.5 text-left shrink-0 group focus:outline-hidden hover:opacity-90 transition-opacity cursor-pointer"
            title="Ir al Inicio de Inducción SENA"
          >
            <SenaLogo className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                Inducción SENA
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase truncate">
                Portal del Aprendiz
              </span>
            </div>
          </button>

          {/* Grupo 2: Navegación por Afinidad (Formación, Apoyo, Logros) */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {/* Clúster 1: Formación Básica */}
            <div className="flex items-center gap-0.5 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              {[
                { id: 'dashboard', label: 'Inicio', icon: GraduationCap },
                { id: 'identidad', label: 'Identidad', icon: Building2 },
                { id: 'reglamento', label: 'Reglamento', icon: BookOpen },
                { id: 'evaluacion', label: 'Evaluación Quiz', icon: FileCheck2 },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                    title={`Módulo de Formación: ${item.label}`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Separador */}
            <span className="text-slate-300 dark:text-slate-700 text-xs px-0.5">•</span>

            {/* Clúster 2: Apoyo & Herramientas */}
            <div className="flex items-center gap-0.5 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              {[
                { id: 'ruta', label: 'Ruta & SOFIA', icon: Compass },
                { id: 'bienestar', label: 'Bienestar', icon: Sparkles },
                { id: 'asistente', label: 'Tutor IA', icon: Bot },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                    title={`Módulo de Apoyo: ${item.label}`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Separador */}
            <span className="text-slate-300 dark:text-slate-700 text-xs px-0.5">•</span>

            {/* Clúster 3: Certificación */}
            <button
              onClick={() => setActiveTab('certificado')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-2xl border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'certificado'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100'
              }`}
              title="Obtener Certificado de Inducción"
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>Certificado</span>
            </button>
          </nav>

          {/* Grupo 3: Acciones e Interacción del Usuario (Afinidad: Perfil del Aprendiz + Controles del Sistema) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Subgrupo 3A: Perfil y Progreso Unificado del Aprendiz */}
            <button
              onClick={() => {
                setEditForm(profile);
                setShowProfileModal(true);
              }}
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl shadow-2xs transition-all whitespace-nowrap cursor-pointer"
              title="Ver Perfil del Aprendiz y Progreso"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                {profile.nombre.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="truncate max-w-[100px] text-slate-900 dark:text-slate-100 font-bold">{profile.nombre.split(' ')[0]}</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold">{overallProgress}% Progreso</span>
              </div>
              <span className="md:hidden text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{overallProgress}%</span>
            </button>

            {/* Subgrupo 3B: Ajustes de Sistema (Modo Oscuro + Administrador) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                  darkMode
                    ? 'bg-slate-700 text-amber-300 shadow-2xs'
                    : 'bg-white text-slate-700 shadow-2xs hover:text-emerald-700'
                }`}
                title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                aria-label="Alternar modo oscuro"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              {/* Admin Access Button */}
              <button
                onClick={() => {
                  if (localStorage.getItem('sena_admin_authenticated') === 'true') {
                    setActiveTab('admin');
                  } else {
                    setShowAdminModal(true);
                  }
                }}
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg transition-all whitespace-nowrap cursor-pointer"
                title="Panel de Administración e Instructores SENA"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline text-[11px]">Admin 🔐</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  S
                </div>
                <h3 className="text-base font-bold text-slate-900">Perfil del Aprendiz SENA</h3>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={editForm.nombre}
                  onChange={e => setEditForm({ ...editForm, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo Doc.</label>
                  <select
                    value={editForm.tipoDocumento}
                    onChange={e => setEditForm({ ...editForm, tipoDocumento: e.target.value as any })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="C.C.">C.C.</option>
                    <option value="T.I.">T.I.</option>
                    <option value="C.E.">C.E.</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">No. Documento</label>
                  <input
                    type="text"
                    required
                    value={editForm.documento}
                    onChange={e => setEditForm({ ...editForm, documento: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Programa de Formación</label>
                <input
                  type="text"
                  required
                  value={editForm.programa}
                  onChange={e => setEditForm({ ...editForm, programa: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Número de Ficha</label>
                  <input
                    type="text"
                    required
                    value={editForm.ficha}
                    onChange={e => setEditForm({ ...editForm, ficha: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correo MiSena</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Centro de Formación</label>
                <input
                  type="text"
                  required
                  value={editForm.centro}
                  onChange={e => setEditForm({ ...editForm, centro: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-sm"
                >
                  Guardar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Admin Login PIN Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span>Acceso Administrador SENA</span>
              </div>
              <button 
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminError('');
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ingresa la clave de administrador para consultar las respuestas de los aprendices y gestionar la hoja de cálculo.
            </p>

            <form onSubmit={handleAdminLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clave de Instructor / Admin
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    placeholder="SENA2026"
                    value={adminPin}
                    onChange={e => setAdminPin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    autoFocus
                  />
                </div>
                {adminError && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">
                    {adminError}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  Clave por defecto: <strong className="text-emerald-600 dark:text-emerald-400">SENA2026</strong>
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-3 py-2 text-xs rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-sm cursor-pointer"
                >
                  Ingresar al Panel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
