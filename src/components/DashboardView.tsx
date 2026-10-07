import React from 'react';
import { useInduction } from '../context/InductionContext';
import { CommandCenterAnalytics } from './CommandCenterAnalytics';
import { 
  Building2, 
  BookOpen, 
  Compass, 
  Sparkles, 
  Bot, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ScrollText,
  Lightbulb,
  FileCheck2,
  Calendar
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { profile, moduleProgress, badges, setActiveTab, overallProgress } = useInduction();

  const modules = [
    {
      id: 'm1-identidad',
      tab: 'identidad',
      title: '1. Identidad e Institucionalidad SENA',
      subtitle: 'Misión, Visión, Escudo, Bandera, Himno y Reseña Histórica desde 1957.',
      icon: Building2,
      color: 'from-emerald-600 to-teal-700',
      progress: moduleProgress['m1-identidad'] || 0
    },
    {
      id: 'm2-reglamento',
      tab: 'reglamento',
      title: '2. Reglamento del Aprendiz SENA',
      subtitle: 'Derechos, Deberes, Prohibiciones y Simulador de Casos Reales con IA.',
      icon: BookOpen,
      color: 'from-emerald-700 to-emerald-900',
      progress: moduleProgress['m2-reglamento'] || 0
    },
    {
      id: 'm3-ruta-sofia',
      tab: 'ruta',
      title: '3. Ruta Formativa y SOFIA Plus',
      subtitle: 'Etapa Lectiva vs Productiva, Calculadora de Fechas y Guía SOFIA / Zajuna.',
      icon: Compass,
      color: 'from-teal-600 to-cyan-800',
      progress: moduleProgress['m3-ruta-sofia'] || 0
    },
    {
      id: 'm4-bienestar',
      tab: 'bienestar',
      title: '4. Bienestar al Aprendiz y SENNOVA',
      subtitle: 'Las 9 dimensiones de bienestar, Fondo Emprender e Innovación.',
      icon: Sparkles,
      color: 'from-emerald-500 to-green-700',
      progress: moduleProgress['m4-bienestar'] || 0
    }
  ];

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'ScrollText': return <ScrollText className="w-6 h-6 text-emerald-600" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-600" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-emerald-600" />;
      default: return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Building2 className="w-80 h-80" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-white/20">
            <span>Servicio Nacional de Aprendizaje SENA</span>
            <span>·</span>
            <span>Bienvenido Aprendiz</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-balance leading-tight drop-shadow-xs">
            ¡Hola, <span className="bg-gradient-to-r from-emerald-200 via-white to-teal-200 bg-clip-text text-transparent underline decoration-emerald-400/50 decoration-wavy underline-offset-4">{profile.nombre}</span>! 👋
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            Te damos la bienvenida al proceso de <strong className="text-white font-semibold">Inducción Institucional SENA</strong>.
            Esta plataforma interactiva está diseñada para acompañarte a comprender el valor institucional, tus derechos, la ruta formativa y las oportunidades que transformarán tu proyecto de vida.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-200">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <FileCheck2 className="w-4 h-4 text-emerald-300" />
              <span>Ficha: <strong className="text-white">{profile.ficha}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Building2 className="w-4 h-4 text-emerald-300" />
              <span>Programa: <strong className="text-white truncate max-w-[200px] sm:max-w-xs">{profile.programa}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Centro: <strong className="text-white truncate max-w-[180px]">{profile.centro}</strong></span>
            </div>
          </div>
        </div>

        {/* Global Progress Gauge */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-auto">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-semibold text-emerald-100">Progreso Total de Inducción</span>
              <span className="font-bold text-white text-sm">{overallProgress}%</span>
            </div>
            <div className="w-full sm:w-80 h-3 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setActiveTab('asistente')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-900 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-all shadow-md shrink-0"
          >
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>Consultar con Tutor Sofía IA</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Futuristic Command Center Analytics Panel (Inspired by Analytics Image) */}
      <CommandCenterAnalytics userProgress={overallProgress} />

      {/* Grid of Induction Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">Módulos de Inducción Interactiva</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Completa cada módulo interactivo y sus evaluaciones para desbloquear tu Certificado Oficial.</p>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">4 Módulos Obligatorios</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isCompleted = mod.progress >= 100;
            return (
              <div 
                key={mod.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          Completado
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                          {mod.progress}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                {/* Module Progress Bar */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>

                  <button
                    onClick={() => setActiveTab(mod.tab)}
                    className="w-full py-2 px-3 bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>{mod.progress > 0 ? 'Continuar Módulo' : 'Iniciar Módulo'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges / Insignias Virtuales Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Insignias Virtuales del Aprendiz</h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Desbloqueadas: {badges.filter(b => b.unlocked).length} de {badges.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-xl border text-center flex flex-col items-center space-y-2 transition-all ${
                badge.unlocked
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                badge.unlocked ? 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-emerald-600 shadow-2xs' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}>
                {getBadgeIcon(badge.icon)}
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">{badge.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{badge.description}</p>
              </div>
              {badge.unlocked && (
                <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/80 px-2 py-0.5 rounded-full">
                  Obtenida {badge.unlockedAt || ''}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SENA Institutional Value Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Formación Profesional Integral SENA</span>
          </div>
          <h3 className="text-lg font-bold">¿Listo para obtener tu Certificado Oficial de Inducción?</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Al finalizar la lectura interactiva y responder los quizzes de evaluación, podrás generar tu diploma oficial de Inducción Institucional con código de verificación QR.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('certificado')}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors shrink-0 whitespace-nowrap shadow-md"
        >
          Ver Mi Certificado & Resultados
        </button>
      </div>

    </div>
  );
};
