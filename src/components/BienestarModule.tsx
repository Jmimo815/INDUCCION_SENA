import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { QUIZ_MODULES } from '../data/senaData';
import { 
  Sparkles, 
  HeartHandshake, 
  Trophy, 
  Music, 
  Users, 
  Lightbulb, 
  DollarSign, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Rocket,
  Award
} from 'lucide-react';

export const BienestarModule: React.FC = () => {
  const { setModuleProgressValue, saveQuizScore, quizScores, moduleProgress } = useInduction();

  // Active dimension detail modal
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null);

  // Quiz State
  const quizData = QUIZ_MODULES[3];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizSubmittedScore, setQuizSubmittedScore] = useState<number | null>(
    quizScores[quizData.id] ?? null
  );

  const bienestarDimensions = [
    {
      icon: Activity,
      title: '1. Salud Preventiva',
      summary: 'Jornadas de vacunación, prevención en salud oral, reproductiva y primeros auxilios.',
      details: 'Atención primaria y convenios de emergencias médicas en cada centro de formación.'
    },
    {
      icon: Trophy,
      title: '2. Deporte y Recreación',
      summary: 'Torneos deportivos de fútbol, baloncesto, voleibol, ajedrez y gimnasio.',
      details: 'Convocatorias para selecciones representativas en los Juegos Nacionales SENA.'
    },
    {
      icon: Music,
      title: '3. Expresión Cultural y Artística',
      summary: 'Grupos de danza, teatro, música, pintura y festivales de talento.',
      details: 'Espacios para el desarrollo de aptitudes artísticas e integración cultural regional.'
    },
    {
      icon: Users,
      title: '4. Liderazgo y Representación',
      summary: 'Elección de Representante de Aprendices y Voceros de Ficha.',
      details: 'Participación activa en los Consejos Directivos y Comités de Evaluación.'
    },
    {
      icon: DollarSign,
      title: '5. Apoyos de Sostenimiento',
      summary: 'Subsidios económicos mensuales, bonos de alimentación y transporte.',
      details: 'Convocatorias públicas semestrales para aprendices en condición de vulnerabilidad.'
    },
    {
      icon: HeartHandshake,
      title: '6. Orientación Psicopedagógica',
      summary: 'Acompañamiento psicológico, adaptabilidad académica y prevención del desamparo.',
      details: 'Talleres de manejo del estrés, técnicas de estudio y salud mental.'
    },
    {
      icon: ShieldCheck,
      title: '7. Equidad, Diversidad e Inclusión',
      summary: 'Espacios libres de discriminación para poblaciones vulnerables y etnias.',
      details: 'Garantía de derechos para aprendices afrocolombianos, indígenas y con discapacidad.'
    },
    {
      icon: Lightbulb,
      title: '8. Emprendimiento (Fondo Emprender)',
      summary: 'Capital semilla condonable de hasta $100 millones para crear empresas.',
      details: 'Asesoría técnica en planes de negocio y validación de productos en el mercado.'
    },
    {
      icon: Rocket,
      title: '9. SENNOVA e Investigación',
      summary: 'Semilleros de investigación, robótica, IA, biotecnología y patentes.',
      details: 'Proyectos aplicados financiados para resolver problemas del sector industrial.'
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
          <Sparkles className="w-3.5 h-3.5" />
          <span>Módulo 4 de Inducción</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bienestar al Aprendiz, SENNOVA y Fondo Emprender
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Descubre los servicios de desarrollo humano, apoyos de sostenimiento, semilleros de investigación e incentivos para la creación de empresas que el SENA pone a tu disposición.
        </p>
      </div>

      {/* 9 Dimensiones de Bienestar Grid */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Las 9 Dimensiones de Bienestar al Aprendiz</h2>
          <p className="text-xs text-slate-500">Haz clic en cualquier dimensión para conocer los beneficios disponibles.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bienestarDimensions.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedDimension === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedDimension(isSelected ? null : index)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-emerald-500/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.summary}</p>

                <div className="pt-2 text-[11px] text-emerald-800 font-medium border-t border-slate-200/70">
                  {item.details}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fondo Emprender & SENNOVA Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-6 space-y-4 shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
            <Lightbulb className="w-4 h-4 text-emerald-400" />
            <span>Capital Semilla Condonable</span>
          </div>
          <h3 className="text-xl font-extrabold">Fondo Emprender SENA</h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Es el fondo público más grande de Latinoamérica para la creación de empresas. Financia proyectos viables desarrollados por aprendices con aportes no reembolsables de hasta $100 millones de pesos.
          </p>
          <ul className="text-xs text-emerald-200 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Acompañamiento por un gestor de emprendimiento.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Evaluación de viabilidad técnica y financiera.</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-emerald-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold">
            <Rocket className="w-4 h-4 text-teal-400" />
            <span>Investigación e Innovación</span>
          </div>
          <h3 className="text-xl font-extrabold">Sistema SENNOVA</h3>
          <p className="text-xs text-teal-100 leading-relaxed">
            Promueve la ciencia aplicada, el desarrollo de prototipos, la robótica, la Inteligencia Artificial y la biotecnología en los 117 centros de formación del SENA.
          </p>
          <ul className="text-xs text-teal-200 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Inclusión en Semilleros de Investigación.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Acceso a laboratorios de última generación.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Quiz Módulo 4 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Evaluación Módulo 4</span>
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
                        name={`q4-${q.id}`}
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
            Responde las preguntas para desbloquear la insignia "Aprendiz Innovador".
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
