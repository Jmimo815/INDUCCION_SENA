import React, { useRef, useState, useEffect } from 'react';
import { useInduction } from '../context/InductionContext';
import { SenaLogo } from './SenaLogo';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  Building2, 
  FileCheck2, 
  Calendar, 
  QrCode,
  ShieldCheck,
  Sparkles,
  Lock,
  Send,
  Loader2,
  PartyPopper
} from 'lucide-react';

export const CertificadoView: React.FC = () => {
  const { profile, overallProgress, moduleProgress, badges, setActiveTab } = useInduction();

  const printRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confettiActive, setConfettiActive] = useState(true);

  const isEligibleForCert = overallProgress >= 70; // 70% or more to issue certificate

  // Continuous Confetti Effect Over Certificate
  useEffect(() => {
    if (!isEligibleForCert || !confettiActive) return;

    let myConfetti: confetti.CreateTypes | null = null;
    if (confettiCanvasRef.current) {
      myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true
      });
    }

    let animationFrameId: number;
    let lastTime = Date.now();

    const frame = () => {
      const now = Date.now();
      // Fire festive confetti bursts continuously every 400ms
      if (now - lastTime > 400) {
        lastTime = now;
        const senaColors = ['#059669', '#10b981', '#f59e0b', '#3b82f6', '#f97316', '#10b981', '#ffffff'];

        if (myConfetti) {
          myConfetti({
            particleCount: 6,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.1 },
            colors: senaColors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.1
          });
          myConfetti({
            particleCount: 6,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.1 },
            colors: senaColors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.1
          });
        } else {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 60,
            origin: { x: 0.1, y: 0.2 },
            colors: senaColors,
            ticks: 200,
            gravity: 0.8
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 60,
            origin: { x: 0.9, y: 0.2 },
            colors: senaColors,
            ticks: 200,
            gravity: 0.8
          });
        }
      }
      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (myConfetti) myConfetti.reset();
    };
  }, [isEligibleForCert, confettiActive]);

  const handleApprenticeSubmit = async () => {
    setSubmitting(true);
    try {
      const unlockedBadges = badges.filter(b => b.unlocked);
      const badgesSummary = `${unlockedBadges.length}/${badges.length} (${unlockedBadges.map(b => b.title).join(', ') || 'Ninguna'})`;

      await fetch('/api/respuestas/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: profile.nombre,
          tipoDocumento: profile.tipoDocumento,
          documento: profile.documento,
          programa: profile.programa,
          ficha: profile.ficha,
          centro: profile.centro,
          regional: profile.regional,
          email: profile.email,
          progreso: overallProgress,
          estado: overallProgress >= 100 ? 'INDUCCIÓN COMPLETADA' : 'EN PROCESO',
          insigniasObtenidas: badgesSummary
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const verificationCode = `SENA-IND-${profile.ficha}-${profile.documento.slice(-4)}-2026`;
  const currentDateFormatted = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3 print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-200">
          <Award className="w-3.5 h-3.5" />
          <span>Acreditación Institucional</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Certificado Oficial de Inducción SENA
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Consulta tu rendimiento general y genera tu diploma oficial respaldado por el Servicio Nacional de Aprendizaje SENA.
        </p>
      </div>

      {/* Progress Requirements Overview */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Estado de Avance de Inducción</h2>
            <p className="text-xs text-slate-500">Se requiere un mínimo del 70% de progreso acumulado para habilitar la descarga del certificado.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-medium">Avance Total</span>
              <div className="text-xl font-extrabold text-emerald-700">{overallProgress}%</div>
            </div>

            {isEligibleForCert ? (
              <div className="flex flex-wrap items-center gap-2">
                {!submitted ? (
                  <button
                    onClick={handleApprenticeSubmit}
                    disabled={submitting}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando Registro...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Registrar Mi Inducción</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Registro Enviado al Instructor!</span>
                  </div>
                )}
                
                <button
                  onClick={() => setConfettiActive(!confettiActive)}
                  className={`px-4 py-2.5 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ${
                    confettiActive 
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold animate-pulse' 
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                  title={confettiActive ? "Pausar Confeti Continuo" : "Activar Confeti Continuo"}
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>{confettiActive ? '🎉 Confeti Activo' : '🎉 Activar Confeti'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Descargar Certificado</span>
                </button>
              </div>
            ) : (
              <div className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Completa al menos el 70% para certificar</span>
              </div>
            )}
          </div>
        </div>

        {/* Modules completion checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          {[
            { name: '1. Identidad SENA', score: moduleProgress['m1-identidad'] || 0 },
            { name: '2. Reglamento', score: moduleProgress['m2-reglamento'] || 0 },
            { name: '3. Ruta & SOFIA', score: moduleProgress['m3-ruta-sofia'] || 0 },
            { name: '4. Bienestar SENA', score: moduleProgress['m4-bienestar'] || 0 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="truncate">{item.name}</span>
                {item.score >= 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="text-slate-500 text-[10px]">{item.score}%</span>
                )}
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Certificate Layout (Printable) */}
      {isEligibleForCert ? (
        <div 
          ref={printRef} 
          className="bg-white rounded-3xl p-8 sm:p-12 border-8 border-emerald-900 shadow-2xl space-y-8 max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Continuous Confetti Overlay Canvas */}
          <canvas
            ref={confettiCanvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full z-20 print:hidden"
          />

          {/* Decorative Corner Ornaments */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-emerald-600 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-8 border-r-8 border-emerald-600 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-8 border-l-8 border-emerald-600 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-emerald-600 pointer-events-none" />

          {/* Certificate Header */}
          <div className="text-center space-y-3 border-b-2 border-emerald-800/20 pb-6">
            <SenaLogo className="w-20 h-20 mx-auto drop-shadow-xs" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-emerald-800 tracking-widest uppercase">República de Colombia</p>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                Servicio Nacional de Aprendizaje — SENA
              </h2>
              <p className="text-xs text-slate-600 font-semibold">
                Dirección de Formación Profesional Integral
              </p>
            </div>
          </div>

          {/* Body Statement */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Hace constar oficialmente que:
            </p>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-emerald-950 uppercase tracking-tight">
                {profile.nombre}
              </h1>
              <p className="text-xs text-slate-600 font-semibold">
                Identificado con {profile.tipoDocumento} No. <strong className="text-slate-900">{profile.documento}</strong>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Ha cursado, participado activamente y aprobado satisfactoriamente la jornada de:
            </p>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <h3 className="text-lg font-extrabold text-emerald-900 uppercase">
                INDUCCIÓN INSTITUCIONAL DEL APRENDIZ SENA
              </h3>
              <p className="text-xs text-emerald-800 font-medium">
                Programa: <strong>{profile.programa}</strong> · Ficha No. <strong>{profile.ficha}</strong>
              </p>
              <p className="text-[11px] text-emerald-700">
                {profile.centro} — {profile.regional}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Demostrando dominio de los valores institucionales, el Reglamento del Aprendiz SENA, la Ruta de Formación Profesional Integral y los servicios de Bienestar.
            </p>
          </div>

          {/* Certificate Footer / Signatures & QR */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center">
            
            {/* Verification Code */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Código de Verificación</span>
              <div className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md w-fit">
                {verificationCode}
              </div>
              <span className="text-[10px] text-slate-500 block">Expedido el {currentDateFormatted}</span>
            </div>

            {/* Official Signature Placeholder */}
            <div className="space-y-1">
              <div className="w-36 h-12 border-b-2 border-slate-900 mx-auto flex items-end justify-center pb-1 font-serif text-xs italic text-slate-800">
                Subdirección de Centro
              </div>
              <p className="text-[11px] font-bold text-slate-900">Subdirector de Centro de Formación</p>
              <p className="text-[10px] text-slate-500">SENA — Servicio Nacional de Aprendizaje</p>
            </div>

            {/* Verification QR Badge */}
            <div className="flex flex-col items-center sm:items-end justify-center space-y-1">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-xl p-2 flex items-center justify-center shadow-xs">
                <QrCode className="w-12 h-12 text-emerald-400" />
              </div>
              <span className="text-[9px] text-slate-400 font-mono">Verificación Digital QR</span>
            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Certificado Aún No Disponible</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Para generar tu Certificado de Inducción SENA, debes completar las lecturas y realizar los quizzes de evaluación en cada uno de los 4 módulos de la plataforma.
          </p>
        </div>
      )}

    </div>
  );
};
