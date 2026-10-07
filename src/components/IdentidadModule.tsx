import React, { useState, useEffect, useRef } from 'react';
import { useInduction } from '../context/InductionContext';
import { HIMNO_SENA_LYRICS, TIMELINE_EVENTS, QUIZ_MODULES } from '../data/senaData';
import { 
  Building2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles,
  ChevronRight,
  Shield,
  Flag,
  FileText,
  RotateCcw
} from 'lucide-react';

export const IdentidadModule: React.FC = () => {
  const { setModuleProgressValue, saveQuizScore, quizScores, moduleProgress } = useInduction();

  // TTS Speech State
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Anthem Player State
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const anthemTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Synth Ref for Himno background tune
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Active Symbol Tab
  const [activeSymbol, setActiveSymbol] = useState<'escudo' | 'bandera' | 'logo' | 'himno'>('escudo');

  // Quiz State
  const quizData = QUIZ_MODULES[0];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizSubmittedScore, setQuizSubmittedScore] = useState<number | null>(
    quizScores[quizData.id] ?? null
  );

  // Handle TTS
  const speakText = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta lectura por voz.');
      return;
    }

    if (speakingText === id) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-CO';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    setSpeakingText(id);
    window.speechSynthesis.speak(utterance);
  };

  // Anthem Audio Melody Playback
  const startAudioSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.log('Audio synth error', e);
    }
  };

  const playBeep = (freq: number) => {
    if (!audioCtxRef.current) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.6);
    } catch (e) {}
  };

  const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C4 to B4

  useEffect(() => {
    if (isPlayingAnthem) {
      startAudioSynth();
      anthemTimerRef.current = setInterval(() => {
        setCurrentLineIndex((prev) => {
          const next = (prev + 1) % HIMNO_SENA_LYRICS.length;
          // Play a gentle note corresponding to line
          const note = notes[next % notes.length];
          playBeep(note);
          return next;
        });
      }, 3500);
    } else {
      if (anthemTimerRef.current) clearInterval(anthemTimerRef.current);
    }
    return () => {
      if (anthemTimerRef.current) clearInterval(anthemTimerRef.current);
    };
  }, [isPlayingAnthem]);

  // Quiz submission
  const handleSubmitQuiz = () => {
    let correct = 0;
    quizData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const score = Math.round((correct / quizData.questions.length) * 100);
    setQuizSubmittedScore(score);
    setShowResults(true);
    saveQuizScore(quizData.id, score);
  };

  // Mark module reading as complete
  useEffect(() => {
    if ((moduleProgress['m1-identidad'] || 0) < 50) {
      setModuleProgressValue('m1-identidad', 50);
    }
  }, []);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Module Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 w-fit px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          <Building2 className="w-3.5 h-3.5" />
          <span>Módulo 1 de Inducción</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Identidad e Institucionalidad SENA
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Conoce el propósito, la visión transformadora, los símbolos institucionales y la valiosa historia del Servicio Nacional de Aprendizaje (SENA) desde su fundación en 1957.
        </p>
      </div>

      {/* Misión y Visión Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Misión */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/80 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
                Misión Institucional SENA
              </span>
              <button
                onClick={() => speakText("Misión del SENA: El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.", "mision")}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {speakingText === "mision" ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                <span>{speakingText === "mision" ? "Detener" : "Escuchar"}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              El SENA está encargado de cumplir la función que le corresponde al Estado de <strong className="font-semibold text-slate-900 dark:text-white">invertir en el desarrollo social y técnico de los trabajadores colombianos</strong>, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Ley 119 de 1994</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">Formación Profesional Integral</span>
          </div>
        </div>

        {/* Card Visión */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/80 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950 px-2.5 py-1 rounded-lg">
                Visión Institucional
              </span>
              <button
                onClick={() => speakText("Visión del SENA: En el año 2026, el SENA será una entidad pedagógicamente moderna, incluyente, líder en la formación profesional integral de calidad, articulada con el sector productivo y comprometida con la innovación, la equidad social y la sostenibilidad.", "vision")}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/50 text-slate-700 dark:text-slate-200 hover:text-teal-800 dark:hover:text-teal-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {speakingText === "vision" ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                <span>{speakingText === "vision" ? "Detener" : "Escuchar"}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              El SENA se consolida como una entidad pedagógicamente moderna, incluyente, líder en la <strong className="font-semibold text-slate-900 dark:text-white">formación profesional integral de alta calidad</strong>, altamente articulada con las demandas del sector productivo y comprometida con la investigación aplicada, la innovación, la equidad social y la sostenibilidad regional de Colombia.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Horizonte de Impacto</span>
            <span className="font-semibold text-teal-700 dark:text-teal-400">Innovación + Inclusión Social</span>
          </div>
        </div>

      </div>

      {/* Símbolos SENA Interactive Explorer */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Símbolos Institucionales del SENA</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Explora la simbología oficial que identifica la mística de la formación profesional.</p>
          </div>

          {/* Segmented Control Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveSymbol('escudo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSymbol === 'escudo' ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-2xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Escudo</span>
            </button>
            <button
              onClick={() => setActiveSymbol('bandera')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSymbol === 'bandera' ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-2xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Bandera</span>
            </button>
            <button
              onClick={() => setActiveSymbol('logo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSymbol === 'logo' ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-2xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Logo-símbolo</span>
            </button>
            <button
              onClick={() => setActiveSymbol('himno')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSymbol === 'himno' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Himno SENA</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeSymbol === 'escudo' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center pt-2">
            
            {/* Visual Graphic Representation */}
            <div className="p-6 bg-gradient-to-br from-slate-900 to-emerald-950 rounded-2xl text-white flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-emerald-400/40 flex items-center justify-center shadow-inner relative">
                <div className="w-24 h-24 rounded-full border border-white/20 flex flex-col items-center justify-center space-y-1">
                  <span className="text-2xl font-black text-emerald-400">⚙️</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span>🌾</span>
                    <span>🐍</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-base">Escudo Institucional</h3>
                <p className="text-xs text-emerald-200 mt-1">Refleja las tres ramas de la economía nacional.</p>
              </div>
            </div>

            {/* Detailed Nodes Breakdown */}
            <div className="lg:col-span-2 space-y-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 transition-colors">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  Caduceo (Comercio y Servicios)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Simboliza la rama del comercio, la administración y los servicios profesionales indispensables para el flujo económico.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 transition-colors">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  Piñón Industrial (Sector Técnico y Manufactura)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Representa la industria, la mecánica, las construcciones, la tecnología de software y el trabajo transformador.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 transition-colors">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  Espiga (Sector Agropecuario y Pecuario)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Encarna el campo colombiano, la producción agroalimentaria, la sostenibilidad y la riqueza natural de la patria.
                </p>
              </div>
            </div>

          </div>
        )}

        {activeSymbol === 'bandera' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-2">
            <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center space-y-4">
              <div className="w-full max-w-xs h-40 bg-white border-2 border-slate-300 rounded-xl shadow-md flex items-center justify-center p-4 relative">
                <div className="w-20 h-20 rounded-full bg-emerald-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-md">
                  S
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                  Lienzo Blanco · Logo Verde
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600">Bandera Oficial del SENA</span>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <h3 className="font-bold text-base text-slate-900">Significado de la Bandera</h3>
              <p>
                La bandera del SENA se destaca por un <strong className="font-semibold text-slate-900">fondo blanco totalmente limpio</strong>, que representa la paz, la transparencia, la tranquilidad y la concordia que genera la educación para el trabajo en Colombia.
              </p>
              <p>
                En el centro de la bandera resalta el <strong className="font-semibold text-emerald-700">logo-símbolo institucional en tono verde SENA (#39A900)</strong>, el cual proyecta esperanza, desarrollo, crecimiento personal y la vitalidad del futuro del trabajador colombiano.
              </p>
            </div>
          </div>
        )}

        {activeSymbol === 'logo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-2">
            <div className="p-6 bg-emerald-900 text-white rounded-2xl flex flex-col items-center space-y-4 text-center">
              <div className="w-28 h-28 rounded-2xl bg-white text-emerald-800 font-extrabold text-5xl flex items-center justify-center shadow-lg transform rotate-2">
                🚶
              </div>
              <div>
                <h3 className="font-bold text-base">El Logo-Símbolo</h3>
                <p className="text-xs text-emerald-200 mt-1">El aprendiz caminando sobre un camino inclinado.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <h3 className="font-bold text-base text-slate-900">Composición Estilizada</h3>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="font-bold text-slate-900 block mb-1">1. La Figura Humana (El Aprendiz):</strong>
                Representa a cada estudiante que ingresa al SENA con sueños y deseos de superación personal.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="font-bold text-slate-900 block mb-1">2. El Camino Ascendente:</strong>
                Simboliza el trayecto formativo, la disciplina y el paso constante hacia la consecución de metas profesionales.
              </div>
            </div>
          </div>
        )}

        {activeSymbol === 'himno' && (
          <div className="space-y-6 pt-2">
            {/* Anthem Player Top Bar */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Himno Oficial Institucional SENA</span>
                </div>
                <h3 className="text-lg font-extrabold">Letra: Luis Alfredo Sarmiento · Música: Daniel Marlez</h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAnthem(!isPlayingAnthem)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
                >
                  {isPlayingAnthem ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAnthem ? 'Pausar Himno' : 'Reproducir Himno'}</span>
                </button>

                <button
                  onClick={() => setCurrentLineIndex(0)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                  title="Reiniciar Himno"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lyrics Karaoke View */}
            <div className="p-6 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 space-y-3 font-medium text-sm text-center">
              {HIMNO_SENA_LYRICS.map((line, idx) => {
                const isActive = idx === currentLineIndex;
                if (line.isHeader) {
                  return (
                    <div key={idx} className="pt-4 pb-1 text-xs font-bold text-emerald-400 tracking-widest uppercase">
                      —— {line.text} ——
                    </div>
                  );
                }
                return (
                  <p
                    key={idx}
                    onClick={() => setCurrentLineIndex(idx)}
                    className={`cursor-pointer transition-all duration-300 py-1 rounded-lg ${
                      isActive
                        ? 'text-emerald-300 font-extrabold text-base sm:text-lg bg-emerald-950/80 scale-102 border border-emerald-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Interactive Timeline 1957 to Present */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Línea de Tiempo Histórica SENA</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Los momentos fundamentales que moldearon la institución técnica más querida de Colombia.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIMELINE_EVENTS.map((evt, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/80 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white bg-slate-900 dark:bg-emerald-700 px-2.5 py-1 rounded-lg">
                    {evt.year}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                    Hito #{index + 1}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{evt.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{evt.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700/80 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {evt.details}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Módulo 1 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Evaluación Módulo 1</span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{quizData.title}</h2>
          </div>
          {quizSubmittedScore !== null && (
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400">Última calificación</span>
              <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">{quizSubmittedScore}%</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quizData.questions.map((q, qIndex) => (
            <div key={q.id} className="space-y-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-emerald-700 dark:text-emerald-400 shrink-0">{qIndex + 1}.</span>
                <span>{q.question}</span>
              </h3>

              <div className="space-y-2 pl-4">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[q.id] === optIndex;
                  const isCorrect = optIndex === q.correctIndex;
                  return (
                    <label
                      key={optIndex}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 font-semibold text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={isSelected}
                        onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIndex })}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>

              {showResults && (
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
            Responde las {quizData.questions.length} preguntas para obtener tu insignia "Orgullo SENA".
          </span>

          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            {showResults ? 'Reevaluar Respuestas' : 'Enviar Evaluación'}
          </button>
        </div>
      </div>

    </div>
  );
};
