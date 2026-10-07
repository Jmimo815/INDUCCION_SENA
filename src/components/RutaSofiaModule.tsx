import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { QUIZ_MODULES } from '../data/senaData';
import { 
  Compass, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Laptop, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const RutaSofiaModule: React.FC = () => {
  const { profile, setModuleProgressValue, saveQuizScore, quizScores, moduleProgress } = useInduction();

  // Calculator State
  const [startDate, setStartDate] = useState(profile.fechaInicio || '2026-03-01');
  const [lectivaMonths, setLectivaMonths] = useState(18); // Default Tecnólogo: 18 lectiva + 6 productiva
  const [productivaMonths, setProductivaMonths] = useState(6);

  // Active Tutorial Step in SOFIA Simulator
  const [activeTutorialStep, setActiveTutorialStep] = useState(0);

  // Quiz State
  const quizData = QUIZ_MODULES[2];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizSubmittedScore, setQuizSubmittedScore] = useState<number | null>(
    quizScores[quizData.id] ?? null
  );

  // Calculate Dates
  const computeDates = () => {
    const start = new Date(startDate);
    
    const endLectiva = new Date(start);
    endLectiva.setMonth(endLectiva.getMonth() + Number(lectivaMonths));

    const endProductiva = new Date(endLectiva);
    endProductiva.setMonth(endProductiva.getMonth() + Number(productivaMonths));

    return {
      lectivaEnd: endLectiva.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      productivaEnd: endProductiva.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  const dates = computeDates();

  const productivaOptions = [
    {
      title: '1. Contrato de Aprendizaje',
      desc: 'Patrocinio por parte de una empresa obligada por la Ley 789 de 2002.',
      details: 'Recibes apoyo de sostenimiento (75% a 100% SMLMV) + EPS y ARL activas.'
    },
    {
      title: '2. Vinculación Laboral',
      desc: 'Desempeño en una empresa mediante contrato formal de trabajo.',
      details: 'Las funciones contratadas deben guardar relación directa con el programa de formación.'
    },
    {
      title: '3. Proyecto Productivo',
      desc: 'Desarrollo de una idea de negocio o innovación tecnológica.',
      details: 'Articulado con SENNOVA o el Fondo Emprender para capital semilla.'
    },
    {
      title: '4. Pasantía',
      desc: 'Concertación con una entidad pública, ONG o PyME.',
      details: 'Práctica académica supervisada por el centro de formación.'
    },
    {
      title: '5. Monitoría',
      desc: 'Apoyo técnico o administrativo en el centro SENA.',
      details: 'Selección por convocatoria pública interna con estímulo de sostenimiento.'
    }
  ];

  const tutorialSteps = [
    {
      title: 'Paso 1: Ingreso a SOFIA Plus',
      desc: 'Ingresa a www.senasofiaplus.edu.co con tu tipo y número de documento.',
      action: 'Haz clic en "Ingresar" y selecciona el rol "Aprendiz".'
    },
    {
      title: 'Paso 2: Consultar Resultados de Aprendizaje (RAP)',
      desc: 'En el menú lateral navega a: Ejecución de la Formación > Reportes > Juicios de Evaluación.',
      action: 'Verifica tus notas en estado "Aprobado" (A).'
    },
    {
      title: 'Paso 3: Subir Evidencias a Zajuna LMS',
      desc: 'Accede a la plataforma Zajuna desde SOFIA Plus o directamente.',
      action: 'Ingresa a la ficha de tu programa, busca la actividad y carga el archivo PDF/Zip.'
    },
    {
      title: 'Paso 4: Certificado de Estudio',
      desc: 'Ve a Certificación > Consultar Certificados.',
      action: 'Descarga tu constancia de estudio en PDF con código QR institucional.'
    }
  ];

  const handleSubmitQuiz = () => {
    let correct = 0;
    quizData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correct++;
    });
    const score = Math.round((correct / quizData.questions.length) * 100);
    setQuizSubmittedScore(score);
    setShowQuizResults(true);
    saveQuizScore(quizData.id, score);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 w-fit px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Módulo 3 de Inducción</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ruta de Formación & Plataformas Digitales
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Comprende las fases de tu formación profesional, las 5 modalidades para certificar tu Etapa Productiva y domina las herramientas virtuales SOFIA Plus y Zajuna.
        </p>
      </div>

      {/* Etapa Lectiva vs Productiva */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700">Fase Inicial</span>
              <h3 className="text-base font-bold text-slate-900">Etapa Lectiva</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Es el periodo en el cual el aprendiz desarrolla sus competencias laborales en el centro de formación a través de proyectos, prácticas en laboratorios y actividades en aulas virtuales Zajuna.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Aprobación de Resultados de Aprendizaje (RAP).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Participación en proyectos integradores.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700">Fase Final</span>
              <h3 className="text-base font-bold text-slate-900">Etapa Productiva</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Es la fase en la cual el aprendiz aplica y complementa sus conocimientos en el entorno laboral real de las empresas o proyectos productivos respaldados por el SENA.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Seguimiento de bitácoras por instructor asignado.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Emisión del Paz y Salvo para Certificación.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 5 Modalidades de Etapa Productiva */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Las 5 Modalidades para Tu Etapa Productiva</h2>
          <p className="text-xs text-slate-500">Puedes elegir la alternativa que mejor se adapte a tus metas profesionales.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productivaOptions.map((opt, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:bg-emerald-50/40 transition-colors">
              <h4 className="font-bold text-xs text-slate-900">{opt.title}</h4>
              <p className="text-xs text-slate-600">{opt.desc}</p>
              <div className="pt-2 text-[11px] text-emerald-800 font-medium border-t border-slate-200/60">
                {opt.details}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculadora de Fechas de la Ruta Formativa */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Calculadora y Planificador de la Ruta Formativa</h2>
            <p className="text-xs text-slate-300">Proyecta tus fechas estimadas de finalización lectiva y certificación.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Fecha de Inicio de Inducción</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Duración Etapa Lectiva (Meses)</label>
            <input
              type="number"
              min={3}
              max={24}
              value={lectivaMonths}
              onChange={e => setLectivaMonths(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Duración Etapa Productiva (Meses)</label>
            <input
              type="number"
              min={3}
              max={12}
              value={productivaMonths}
              onChange={e => setProductivaMonths(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Output Projected Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Fin Estimado Etapa Lectiva</span>
            <div className="text-base font-extrabold text-white">{dates.lectivaEnd}</div>
            <p className="text-[11px] text-slate-400">Paz y salvo académico con el 100% de los RAP aprobados.</p>
          </div>

          <div className="p-4 bg-emerald-950/80 rounded-xl border border-emerald-500/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-300">Fecha Estimada de Graduación</span>
            <div className="text-base font-extrabold text-emerald-200">{dates.productivaEnd}</div>
            <p className="text-[11px] text-emerald-300">Cumplimiento de bitácoras y certificación del título SENA.</p>
          </div>
        </div>
      </div>

      {/* Simulador Interactivo de SOFIA Plus & Zajuna */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Guía Interactiva de SOFIA Plus & Zajuna LMS</h2>
          <p className="text-xs text-slate-500">Sigue los pasos esenciales para navegar las plataformas oficiales.</p>
        </div>

        {/* Steps Tab Controller */}
        <div className="flex flex-wrap items-center gap-2">
          {tutorialSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTutorialStep(idx)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTutorialStep === idx
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 text-center text-[10px] font-extrabold flex items-center justify-center">
                {idx + 1}
              </span>
              <span>Paso {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        {(() => {
          const step = tutorialSteps[activeTutorialStep];
          return (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-700 leading-relaxed">{step.desc}</p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Acción recomendada: {step.action}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Quiz Módulo 3 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Evaluación Módulo 3</span>
            <h2 className="text-lg font-bold text-slate-900">{quizData.title}</h2>
          </div>
          {quizSubmittedScore !== null && (
            <div className="text-right">
              <span className="text-xs text-slate-500">Última calificación</span>
              <div className="text-base font-extrabold text-emerald-700">{quizSubmittedScore}%</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quizData.questions.map((q, qIndex) => (
            <div key={q.id} className="space-y-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-700 shrink-0">{qIndex + 1}.</span>
                <span>{q.question}</span>
              </h3>

              <div className="space-y-2 pl-4">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[q.id] === optIndex;
                  return (
                    <label
                      key={optIndex}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q3-${q.id}`}
                        checked={isSelected}
                        onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIndex })}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>

              {showQuizResults && (
                <div className={`mt-2 p-3 rounded-lg text-xs leading-relaxed ${
                  selectedAnswers[q.id] === q.correctIndex
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}>
                  <strong className="font-bold">Explicación: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Responde las preguntas para desbloquear la insignia "Navegador SOFIA".
          </span>

          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            {showQuizResults ? 'Reevaluar Respuestas' : 'Enviar Evaluación'}
          </button>
        </div>
      </div>

    </div>
  );
};
