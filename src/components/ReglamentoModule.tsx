import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { REGULATIONS_DATA, SCENARIO_CASES, QUIZ_MODULES } from '../data/senaData';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  FileText,
  ChevronRight,
  Scale
} from 'lucide-react';

export const ReglamentoModule: React.FC = () => {
  const { setModuleProgressValue, saveQuizScore, quizScores, moduleProgress, setActiveTab } = useInduction();

  // Filter regulation state
  const [filterType, setFilterType] = useState<'all' | 'derecho' | 'deber' | 'prohibicion'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Scenario Simulator state
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Custom AI Scenario Evaluator state
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customAction, setCustomAction] = useState('');
  const [aiEvaluation, setAiEvaluation] = useState<any>(null);
  const [isEvaluatingAi, setIsEvaluatingAi] = useState(false);

  // Quiz state
  const quizData = QUIZ_MODULES[1];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizSubmittedScore, setQuizSubmittedScore] = useState<number | null>(
    quizScores[quizData.id] ?? null
  );

  // Filtered items
  const filteredRegulations = REGULATIONS_DATA.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.article.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const handleEvaluateCustomCaseWithAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDescription || !customAction) return;

    setIsEvaluatingAi(true);
    setAiEvaluation(null);

    try {
      const res = await fetch('/api/gemini/evaluate-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle: customTitle || 'Situación de Convivencia o Aprendizaje',
          scenarioDescription: customDescription,
          apprenticeAction: customAction
        })
      });
      const data = await res.json();
      setAiEvaluation(data);
      // Boost progress
      if ((moduleProgress['m2-reglamento'] || 0) < 60) {
        setModuleProgressValue('m2-reglamento', 60);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluatingAi(false);
    }
  };

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
          <BookOpen className="w-3.5 h-3.5" />
          <span>Módulo 2 de Inducción · Acuerdo 09 de 2024</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Reglamento del Aprendiz SENA (Acuerdo 09 de 2024)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          El marco normativo oficial adoptado por el Consejo Directivo Nacional mediante el Acuerdo 09 de 2024 (modificado por el Acuerdo 02 de 2026), estructurado en 5 capítulos y 53 artículos que consagran 24 Derechos, 24 Deberes y 14 Prohibiciones con enfoques de inclusión, diversidad y debido proceso.
        </p>

        {/* CTA Banner to Unified Gamified Evaluation */}
        <div className="pt-2">
          <button
            onClick={() => setActiveTab('evaluacion')}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold p-4 rounded-xl shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 bg-white/20 rounded-lg shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wide">¿Listo para poner a prueba tus conocimientos?</p>
                <p className="text-xs text-emerald-100 font-normal">Presenta la Evaluación Unificada Gamificada de 20 Preguntas con reloj en vivo, rachas y ranking SENA.</p>
              </div>
            </div>
            <div className="bg-white text-emerald-800 font-extrabold text-xs px-4 py-2 rounded-lg shrink-0 flex items-center gap-1 shadow-sm">
              <span>Ir a la Evaluación 🏆</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Derechos, Deberes y Prohibiciones Desk */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Derechos (Art. 5), Deberes (Art. 8) y Prohibiciones (Art. 9)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Normativa vigente del Reglamento del Aprendiz SENA (Acuerdo 09 de 2024).</p>
          </div>

          {/* Controls: Search + Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar artículo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden dark:text-white"
              />
            </div>

            {/* Filter segmented buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType('derecho')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filterType === 'derecho' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Derechos
              </button>
              <button
                onClick={() => setFilterType('deber')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filterType === 'deber' ? 'bg-teal-700 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Deberes
              </button>
              <button
                onClick={() => setFilterType('prohibicion')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filterType === 'prohibicion' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Prohibiciones
              </button>
            </div>
          </div>
        </div>

        {/* List of Regulation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRegulations.map((item) => {
            const isDerecho = item.type === 'derecho';
            const isDeber = item.type === 'deber';
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-500/80 shadow-2xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span className="font-mono text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-md">
                      {item.article}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      isDerecho ? 'text-emerald-800 bg-emerald-100' : isDeber ? 'text-teal-800 bg-teal-100' : 'text-amber-800 bg-amber-100'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-500">
                  <strong className="text-slate-700 font-semibold">Detalle: </strong>
                  {item.details}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Simulador de Casos Reales del Reglamento */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Práctica Interactiva</span>
            <h2 className="text-lg font-bold text-slate-900">Simulador de Casos de Convivencia y Reglamento</h2>
          </div>
          <span className="text-xs text-slate-500">Caso {activeScenarioIndex + 1} de {SCENARIO_CASES.length}</span>
        </div>

        {/* Current Scenario Card */}
        {(() => {
          const scenario = SCENARIO_CASES[activeScenarioIndex];
          return (
            <div className="space-y-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  Categoría: {scenario.category}
                </span>
                <div className="flex items-center gap-2">
                  {SCENARIO_CASES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveScenarioIndex(idx);
                        setSelectedOption(null);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === activeScenarioIndex ? 'bg-emerald-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{scenario.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{scenario.description}</p>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-emerald-300">¿Cuál es la acción reglamentaria adecuada?</p>
                {scenario.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedOption === optIdx
                        ? opt.isCorrect
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-red-950 border-red-500 text-red-200'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {selectedOption !== null && (
                <div className={`p-4 rounded-xl text-xs space-y-1 ${
                  scenario.options[selectedOption].isCorrect
                    ? 'bg-emerald-900/80 border border-emerald-500/50 text-emerald-100'
                    : 'bg-red-900/80 border border-red-500/50 text-red-100'
                }`}>
                  <strong className="font-bold flex items-center gap-1.5">
                    {scenario.options[selectedOption].isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>¡Acción Correcta!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Acción Inadecuada</span>
                      </>
                    )}
                  </strong>
                  <p className="mt-1 leading-relaxed">{scenario.options[selectedOption].feedback}</p>
                </div>
              )}
            </div>
          );
        })()}

        {/* Custom AI Case Evaluator Form */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Evaluador de Situaciones Personalizadas con Tutor Sofía IA</h3>
          </div>
          <p className="text-xs text-slate-600">
            Escribe una situación real o duda sobre una falta/permiso y consulta cómo aplica el Reglamento del Aprendiz.
          </p>

          <form onSubmit={handleEvaluateCustomCaseWithAi} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Descripción de la Situación</label>
              <textarea
                rows={2}
                required
                placeholder="Ejemplo: Tuve que faltar a la jornada presencial por un compromiso laboral inesperado..."
                value={customDescription}
                onChange={e => setCustomDescription(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Acción que tomaste o piensas tomar</label>
              <input
                type="text"
                required
                placeholder="Ejemplo: Le envié un mensaje de WhatsApp a mi compañero para que le avisara al instructor."
                value={customAction}
                onChange={e => setCustomAction(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isEvaluatingAi}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluatingAi ? 'Analizando Reglamento...' : 'Evaluar Caso con IA'}</span>
            </button>
          </form>

          {/* AI Response Display */}
          {aiEvaluation && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Dictamen de Sofía IA:</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  aiEvaluation.esCorrecto ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {aiEvaluation.calificacion || (aiEvaluation.esCorrecto ? 'Correcto' : 'Revisar')}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">{aiEvaluation.explicacion}</p>
              {aiEvaluation.recomendacion && (
                <div className="pt-2 border-t border-slate-100 text-emerald-800 font-medium">
                  <strong>Recomendación: </strong>{aiEvaluation.recomendacion}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Tipos de Faltas y Medidas Formativas Flow Diagram */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Medidas Formativas y Proceso Disciplinario</h2>
          <p className="text-xs text-slate-500">Ruta gradual de atención pedagógica y debido proceso en el SENA.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { step: '1', title: 'Llamado de Atención Verbal', desc: 'Orientación pedagógica individual con el instructor.' },
            { step: '2', title: 'Llamado de Atención Escrito', desc: 'Notificación escrita y compromiso en la historia del aprendiz.' },
            { step: '3', title: 'Plan de Mejoramiento', desc: 'Actividades académicas o actitudinales con fechas límites.' },
            { step: '4', title: 'Condicionamiento Matrícula', desc: 'Sanción emitida por el Subdirector tras sesión de Comité.' },
            { step: '5', title: 'Cancelación de Matrícula', desc: 'Perdida de la calidad de aprendiz por falta gravísima o deserción.' }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                {item.step}
              </div>
              <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
              <p className="text-[11px] text-slate-600 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Módulo 2 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Evaluación Módulo 2</span>
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
                        name={`q2-${q.id}`}
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
            Completa la evaluación para obtener la insignia "Ciudadano SENA".
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
