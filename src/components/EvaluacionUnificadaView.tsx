import React, { useState, useEffect, useRef } from 'react';
import { useInduction } from '../context/InductionContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  Flame, 
  Zap, 
  UserCheck, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  BookOpen, 
  BarChart3, 
  Send,
  Loader2,
  Medal,
  Star,
  ChevronRight
} from 'lucide-react';

export interface EvaluationQuestion {
  id: string;
  sectionTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  articleRef: string;
  positiveReinforcement: string;
  errorReinforcement: string;
}

export const UNIFIED_REGULATION_QUESTIONS: EvaluationQuestion[] = [
  // SECCIÓN 1: DERECHOS DEL APRENDIZ (Art. 5 y 6)
  {
    id: "der-01",
    sectionTitle: "Sección 1: Derechos del Aprendiz (Cap. II)",
    question: "¿Cuál es el derecho fundamental del aprendiz al ingresar a un programa de formación según el Art. 5 Numeral 1 del Reglamento?",
    options: [
      "Eximirse de evaluaciones durante el primer trimestre.",
      "Recibir inducción institucional integral y conocer la ruta formativa completa.",
      "Elegir los días y horarios en los que desea asistir al centro de formación.",
      "Solicitar la titulación inmediata si tiene experiencia laboral previa."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 5 Num. 1",
    positiveReinforcement: "¡Excelente, Aprendiz! El Art. 5 Numeral 1 garantiza que todo estudiante tiene derecho a una inducción integral sobre la institución y su diseño curricular.",
    errorReinforcement: "Atención: Recuerda que el Art. 5 Numeral 1 establece el derecho a recibir inducción institucional al inicio de tu proceso formativo."
  },
  {
    id: "der-02",
    sectionTitle: "Sección 1: Derechos del Aprendiz (Cap. II)",
    question: "Según el Art. 5 Numeral 7, ¿a qué servicios de Bienestar al Aprendiz tienes derecho como estudiante activo del SENA?",
    options: [
      "Solamente a la carnetización digital.",
      "A apoyos de sostenimiento, acompañamiento psicosocial, deporte, cultura y salud.",
      "Únicamente a créditos para transporte público municipal.",
      "A vales de alimentación ilimitados para familiares externos."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 5 Num. 7",
    positiveReinforcement: "¡Respuesta Correcta! Los servicios de Bienestar (Art. 5 Num. 7) respaldan tu desarrollo humano e integral durante toda la formación.",
    errorReinforcement: "Ojo: El Bienestar al Aprendiz incluye 9 dimensiones: apoyos de sostenimiento, acompañamiento psicosocial, salud, cultura y deporte."
  },
  {
    id: "der-03",
    sectionTitle: "Sección 1: Derechos del Aprendiz (Cap. II)",
    question: "¿Qué derecho ampara al aprendiz si requiere presentar evidencias que no entregó por incapacidad médica (Art. 5 Numeral 15)?",
    options: [
      "Perder la competencia de inmediato sin opción de reclamo.",
      "Solicitar la reprogramación de la entrega de evidencias dentro de los términos establecidos.",
      "Pagar una multa administrativa al centro de formación.",
      "Repetir todo el trimestre desde la semana uno."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 5 Num. 15",
    positiveReinforcement: "¡Muy bien! Ante una incapacidad justificada, el Art. 5 Numeral 15 te concede el derecho de reprogramar tus evidencias de aprendizaje.",
    errorReinforcement: "Revisa la norma: Presentar la justificación de incapacidad en los plazos legales te otorga el derecho a reprogramar tus evaluaciones."
  },
  {
    id: "der-04",
    sectionTitle: "Sección 1: Derechos del Aprendiz (Cap. II)",
    question: "Con respecto al reconocimiento formativo (Art. 6), ¿qué distinción puede recibir un aprendiz destacado por su rendimiento?",
    options: [
      "Exención total de la Etapa Productiva sin importar la modalidad.",
      "Menciones de honor, representación institucional y prioridad en apoyos de monitoría.",
      "Un contrato de aprendizaje garantizado por 5 años.",
      "Título universitario automático sin cursar tecnólogo."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 6",
    positiveReinforcement: "¡Excelente desempeño! El SENA premia el rendimiento académico sobresaliente con reconocimientos honoríficos y prioridad en monitorías.",
    errorReinforcement: "Atención: Los reconocimientos del Art. 6 otorgan distinciones académicas y representación, pero no eximen de la Etapa Productiva."
  },
  {
    id: "der-05",
    sectionTitle: "Sección 1: Derechos del Aprendiz (Cap. II)",
    question: "De acuerdo con el Art. 5 Numeral 18, ¿qué derecho tiene el aprendiz respecto al Comité de Evaluación y Seguimiento?",
    options: [
      "Estar acompañado por el vocero de grupo o un representante de aprendices.",
      "Asistir acompañado por un abogado penalista contratado por el SENA.",
      "Votar en la decisión final que tome el Subdirector de Centro.",
      "Cancelar la citación de manera indefinida si prefiere no asistir."
    ],
    correctIndex: 0,
    articleRef: "Acuerdo 09 de 2024 · Art. 5 Num. 18",
    positiveReinforcement: "¡Así es! Garantizando el debido proceso, el aprendiz tiene derecho a contar con el respaldo de su vocero o representante.",
    errorReinforcement: "Recuerda: El debido proceso (Art. 5 Num. 18) respalda el acompañamiento de tu vocero de ficha o representante durante el comité."
  },

  // SECCIÓN 2: DEBERES DEL APRENDIZ (Art. 8)
  {
    id: "deb-01",
    sectionTitle: "Sección 2: Deberes del Aprendiz (Cap. III)",
    question: "Según el Art. 8 Numeral 2, ¿cuál es el deber respecto al carné y la indumentaria dentro de la institución?",
    options: [
      "Portar el uniforme únicamente cuando haya visitas de la dirección general.",
      "Portar de forma visible el carné institucional y el uniforme asignado con dignidad y respeto.",
      "Prestar el carné a personas externas para que ingresen al centro de formación.",
      "Usar el carné únicamente para reclamar la alimentación en el casino."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 8 Num. 2",
    positiveReinforcement: "¡Correcto! El carné e indumentaria institucional representan tu seguridad e identidad en la comunidad SENA.",
    errorReinforcement: "Atención: El Art. 8 Num. 2 exige portar el carné en un lugar visible e indumentaria adecuada durante toda tu permanencia en el SENA."
  },
  {
    id: "deb-02",
    sectionTitle: "Sección 2: Deberes del Aprendiz (Cap. III)",
    question: "Respecto al uso de ambientes de aprendizaje y tecnologías (Art. 8 Numeral 9), ¿qué deber tiene el aprendiz?",
    options: [
      "Instalar software no autorizado en los equipos de computación.",
      "Hacer un uso adecuado, ético y responsable de las herramientas, instalaciones y plataformas.",
      "Utilizar la red Wi-Fi para descargas personales masivas de videojuegos.",
      "Modificar las configuraciones de red de los laboratorios sin permiso."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 8 Num. 9",
    positiveReinforcement: "¡Excelente! Cuidar los recursos, ambientes y redes informáticas garantiza la excelencia de la formación para todos.",
    errorReinforcement: "Incorrecto: El Art. 8 Num. 9 compromete al aprendiz a velar por el cuidado ético y mantenimiento responsable de los ambientes."
  },
  {
    id: "deb-03",
    sectionTitle: "Sección 2: Deberes del Aprendiz (Cap. III)",
    question: "¿Cuál es el deber del aprendiz SENA en cuanto a la puntualidad y asistencia (Art. 8 Numeral 4)?",
    options: [
      "Asistir únicamente cuando considere necesario si aprueba los exámenes.",
      "Cumplir puntualmente con la asistencia a las actividades presenciales o virtuales programadas.",
      "Avisar una semana después si faltó por motivos personales sin excusa.",
      "Enviar a un compañero para que firme la lista de asistencia en su nombre."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 8 Num. 4",
    positiveReinforcement: "¡Muy bien! La puntualidad y la constancia son la base de la cultura de trabajo y la disciplina profesional SENA.",
    errorReinforcement: "Recuerda: Asistir puntualmente a los horarios presenciales y virtuales es un deber expreso según el Art. 8 Numeral 4."
  },
  {
    id: "deb-04",
    sectionTitle: "Sección 2: Deberes del Aprendiz (Cap. III)",
    question: "En cuanto a la actualización de datos en el sistema SOFIA Plus / Zajuna (Art. 8 Numeral 14), el aprendiz debe:",
    options: [
      "Dejar los datos del registro inicial sin importar si cambia de residencia o teléfono.",
      "Mantener sus datos personales, de contacto y de salud vigentes y actualizados en la plataforma.",
      "Ingresar datos ficticios si prefiere mantener reserva de su información.",
      "Actualizar sus datos únicamente al momento de la graduación final."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 8 Num. 14",
    positiveReinforcement: "¡Correcto! Mantener actualizada tu información en SOFIA Plus / Zajuna garantiza el correcto seguimiento de tu historial académico.",
    errorReinforcement: "Ojo: El Art. 8 Num. 14 te obliga a verificar y mantener actualizados tus datos personales y de contacto en el sistema del SENA."
  },
  {
    id: "deb-05",
    sectionTitle: "Sección 2: Deberes del Aprendiz (Cap. III)",
    question: "Según el Art. 8 Numeral 19, ¿qué deber existe sobre la preservación del medio ambiente en las sedes?",
    options: [
      "Depositar los residuos únicamente cuando los instructores estén observando.",
      "Participar activamente en la separación en la fuente y el cuidado ecológico de los centros.",
      "Delegar la limpieza ambiental únicamente al personal de aseo.",
      "Utilizar plásticos de un solo uso en todos los proyectos de clase."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 8 Num. 19",
    positiveReinforcement: "¡Excelente compromiso ecológico! El SENA fomenta la sostenibilidad ambiental y la clasificación de residuos.",
    errorReinforcement: "Atención: El Art. 8 Num. 19 exige la participación activa en el reciclaje y cuidado del medio ambiente institucional."
  },

  // SECCIÓN 3: PROHIBICIONES Y FALTAS (Art. 9 y Cap. V)
  {
    id: "pro-01",
    sectionTitle: "Sección 3: Prohibiciones y Faltas (Cap. III & V)",
    question: "Según el Art. 9 Numeral 1 del Reglamento, ¿qué acción está rotundamente prohibida para un aprendiz SENA?",
    options: [
      "Participar en semilleros de investigación SENNOVA.",
      "Ingresar o consumir bebidas alcohólicas, sustancias psicoactivas o porte de armas en las sedes.",
      "Solicitar asesoría técnica con instructores de otros centros.",
      "Crear grupos de estudio virtuales en plataformas de formación."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 9 Num. 1",
    positiveReinforcement: "¡Muy bien! El porte o consumo de sustancias psicoactivas o armas atenta contra la vida y la convivencia institucional.",
    errorReinforcement: "Incorrecto: El ingreso o consumo de alcohol/sustancias y porte de armas es una prohibición expresa de gravedad extrema (Art. 9)."
  },
  {
    id: "pro-02",
    sectionTitle: "Sección 3: Prohibiciones y Faltas (Cap. III & V)",
    question: "¿Cómo clasifica el Reglamento del Aprendiz SENA las faltas académicas y disciplinarias (Art. 42)?",
    options: [
      "Leves, Moderadas y Críticas.",
      "Leves, Graves y Gravísimas.",
      "Ordinarias y Extraordinarias.",
      "Directas e Indirectas."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 42",
    positiveReinforcement: "¡Exacto! El Art. 42 establece la clasificación normativa formal en Leves, Graves y Gravísimas.",
    errorReinforcement: "Revisa la norma: En el Acuerdo 09 de 2024 la escala disciplinaria es Leves, Graves y Gravísimas."
  },
  {
    id: "pro-03",
    sectionTitle: "Sección 3: Prohibiciones y Faltas (Cap. III & V)",
    question: "Suplantar la identidad de otro aprendiz en evaluaciones o listas de asistencia (Art. 9 Numeral 5) constituye:",
    options: [
      "Un llamado de atención verbal sin trascendencia.",
      "Una falta de fraude y falsedad de carácter gravísimo.",
      "Una inasistencia justificada.",
      "Una falta leve solucionable mediante disculpas por escrito."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 9 Num. 5",
    positiveReinforcement: "¡Muy bien! La suplantación e ideología de fraude vulneran la ética profesional y se catalogan como falta gravísima.",
    errorReinforcement: "Atención: La suplantación o falsedad en pruebas es una falta gravísima que afecta la continuidad en la matrícula."
  },
  {
    id: "pro-04",
    sectionTitle: "Sección 3: Prohibiciones y Faltas (Cap. III & V)",
    question: "¿Qué ocurre si un aprendiz deja de asistir injustificadamente durante tres (3) días consecutivos (Art. 35)?",
    options: [
      "Se le otorga un aplazamiento automático de seis meses.",
      "Se inicia el procedimiento de reporte por Deserción del proceso de formación.",
      "Se le asigna un segundo vocero de grupo.",
      "Se le exonera de las actividades del trimestre."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 35",
    positiveReinforcement: "¡Excelente! La inasistencia injustificada por 3 días continuos constituye causal reglamentaria de Deserción.",
    errorReinforcement: "Ojo: Dejar de asistir 3 días seguidos sin excusa médica/fuerza mayor activa el trámite formal de deserción (Art. 35)."
  },
  {
    id: "pro-05",
    sectionTitle: "Sección 3: Prohibiciones y Faltas (Cap. III & V)",
    question: "Alterar, falsificar o plagiar documentos, proyectos o evidencias de aprendizaje (Art. 9 Numeral 8) es considerado:",
    options: [
      "Un derecho de autor bajo licencia abierta.",
      "Una falta grave o gravísima contra la propiedad intelectual y la honestidad.",
      "Un ajuste razonable de aprendizaje.",
      "Una falta leve solucionable mediante entrega extemporánea."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 9 Num. 8",
    positiveReinforcement: "¡Así es! La propiedad intelectual y el trabajo honesto son pilares irrenunciables en la formación SENA.",
    errorReinforcement: "Recuerda: El plagio o alteración de evidencias viola el Art. 9 Num. 8 y genera consecuencias disciplinarias severas."
  },

  // SECCIÓN 4: MEDIDAS FORMATIVAS Y COMITÉ (Cap. V)
  {
    id: "med-01",
    sectionTitle: "Sección 4: Medidas Formativas y Comité (Cap. V)",
    question: "¿Cuál es el propósito principal de las Medidas Formativas en el SENA (Art. 45)?",
    options: [
      "Sancionar económicamente al aprendiz para cubrir daños.",
      "Prevenir, corregir y reorientar el comportamiento académico o disciplinario con enfoque pedagógico.",
      "Expulsar inmediatamente al aprendiz sin escucharlo.",
      "Publicar los errores del aprendiz en carteleras públicas."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 45",
    positiveReinforcement: "¡Excelente! En el SENA el enfoque es formativo, buscando la reorientación pedagógica del aprendiz.",
    errorReinforcement: "Atención: Las medidas formativas (Llamado de atención escrito / Plan de mejoramiento) tienen fin educativo y no punitivo."
  },
  {
    id: "med-02",
    sectionTitle: "Sección 4: Medidas Formativas y Comité (Cap. V)",
    question: "¿Qué medida comprende el compromiso suscrito para superar Resultados de Aprendizaje no aprobados (Art. 46)?",
    options: [
      "Cancelación definitiva de la matrícula.",
      "Plan de Mejoramiento Académico o Disciplinario.",
      "Condicionamiento de matrícula con suspensión.",
      "Retiro voluntario sin derecho a reintegro."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 46",
    positiveReinforcement: "¡Correcto! El Plan de Mejoramiento fija tareas y plazos concertados para alcanzar los aprendizajes requeridos.",
    errorReinforcement: "Incorrecto: El compromiso formal para nivelar competencias no aprobadas se denomina Plan de Mejoramiento (Art. 46)."
  },
  {
    id: "med-03",
    sectionTitle: "Sección 4: Medidas Formativas y Comité (Cap. V)",
    question: "De acuerdo con el Art. 47, ¿cuáles son las Medidas Sancionatorias que impone el Subdirector de Centro?",
    options: [
      "Multa económica y trabajo comunitario obligatorio.",
      "Condicionamiento de la Matrícula y Cancelación de la Matrícula.",
      "Suspensión temporal por 5 años académicos.",
      "Inhabilitación laboral permanente."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 47",
    positiveReinforcement: "¡Muy bien! Las dos sanciones contempladas normativamente son el Condicionamiento y la Cancelación de la Matrícula.",
    errorReinforcement: "Revisa el Art. 47: Las sanciones formales dictadas por resolución son 1. Condicionamiento y 2. Cancelación de Matrícula."
  },
  {
    id: "med-04",
    sectionTitle: "Sección 4: Medidas Formativas y Comité (Cap. V)",
    question: "¿Qué órgano analiza las faltas, escucha los descargos y recomienda medidas al Subdirector de Centro (Art. 48)?",
    options: [
      "El Consejo Superior Universitario.",
      "El Comité de Evaluación y Seguimiento del Centro de Formación.",
      "El Ministerio del Trabajo.",
      "La Veeduría Ciudadana."
    ],
    correctIndex: 1,
    articleRef: "Acuerdo 09 de 2024 · Art. 48",
    positiveReinforcement: "¡Excelente! El Comité de Evaluación y Seguimiento es la instancia imparcial donde se ejerce el derecho a la defensa.",
    errorReinforcement: "Recuerda: El Comité de Evaluación y Seguimiento (Art. 48) evalúa los casos académicos/disciplinarios y asesora la decisión."
  },
  {
    id: "med-05",
    sectionTitle: "Sección 4: Medidas Formativas y Comité (Cap. V)",
    question: "En caso de sanción mediante acto administrativo, ¿qué recurso legal puede interponer el aprendiz (Art. 51)?",
    options: [
      "Recurso de Reposición ante el mismo Subdirector de Centro que dictó la medida.",
      "Recurso de amparo ante la ONU.",
      "Solicitud de disculpa pública en medios de comunicación.",
      "Ninguno, la medida dictada es inapelable."
    ],
    correctIndex: 0,
    articleRef: "Acuerdo 09 de 2024 · Art. 51",
    positiveReinforcement: "¡Así es! Garantizando el derecho constitucional a la defensa, el aprendiz puede interponer Recurso de Reposición (Art. 51).",
    errorReinforcement: "Atención: El Art. 51 otorga al aprendiz el derecho a interponer Recurso de Reposición dentro de los términos de ley."
  }
];

export const EvaluacionUnificadaView: React.FC = () => {
  const { profile, updateProfile, saveQuizScore } = useInduction();

  // Mode Steps: 'form' -> 'quiz' -> 'results'
  const [step, setStep] = useState<'form' | 'quiz' | 'results'>('form');

  // Apprentice Profile Form State
  const [formData, setFormData] = useState(profile);

  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; isCorrect: boolean; timeSeconds: number }[]>([]);

  // Score & Gamification Metrics
  const [scorePoints, setScorePoints] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Timer State (Stopwatch)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<any>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const handleStartEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setStep('quiz');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setScorePoints(0);
    setStreakCount(0);
    setMaxStreak(0);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  const currentQ = UNIFIED_REGULATION_QUESTIONS[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optIndex);
    setIsAnswered(true);

    const isCorrect = optIndex === currentQ.correctIndex;

    let pointsAwarded = 0;
    if (isCorrect) {
      // Base points
      pointsAwarded += 100;

      // Streak multiplier bonus
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      pointsAwarded += newStreak * 15; // Bonus per streak

      // Speed bonus (faster answer = higher points)
      pointsAwarded += 25;
    } else {
      setStreakCount(0);
    }

    setScorePoints(prev => prev + pointsAwarded);

    setUserAnswers(prev => [
      ...prev,
      { questionId: currentQ.id, isCorrect, timeSeconds: elapsedSeconds }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < UNIFIED_REGULATION_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setIsTimerRunning(false);
      setStep('results');
      submitEvaluationToBackend();
    }
  };

  const correctAnswersCount = userAnswers.filter(a => a.isCorrect).length;
  const accuracyPercent = Math.round((correctAnswersCount / UNIFIED_REGULATION_QUESTIONS.length) * 100);

  const submitEvaluationToBackend = async () => {
    setIsSubmitting(true);
    try {
      // Save score in local state
      saveQuizScore('m2-reglamento', accuracyPercent);

      // Submit to backend API for Admin Google Sheets queue
      await fetch('/api/respuestas/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          tipoDocumento: formData.tipoDocumento,
          documento: formData.documento,
          programa: formData.programa,
          ficha: formData.ficha,
          centro: formData.centro,
          regional: formData.regional,
          email: formData.email,
          progreso: accuracyPercent,
          estado: accuracyPercent >= 70 ? 'REGLAMENTO APROBADO' : 'REQUIERE REFUERZO',
          insigniasObtenidas: `Puntaje: ${scorePoints} pts | Tiempo: ${formatTime(elapsedSeconds)} | Racha: ${maxStreak} 🔥`
        })
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error enviando respuestas:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pointer-events-none pr-6">
          <Trophy className="w-64 h-64 text-emerald-400" />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Evaluación Oficial Gamificada SENA
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gran Quiz del Reglamento del Aprendiz SENA
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Demuestra tus conocimientos sobre el **Acuerdo 09 de 2024**. Responde 20 preguntas (5 por sección) para acumular puntos, mantener rachas y competir en el Ranking Oficial SENA.
          </p>
        </div>
      </div>

      {/* STEP 1: FORMULARIO DE INGRESO DE DATOS */}
      {step === 'form' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-2xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Verificación de Datos del Aprendiz
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ingresa o confirma tus datos personales para que tus resultados se registren automáticamente en la Hoja de Cálculo del Administrador.
              </p>
            </div>
          </div>

          <form onSubmit={handleStartEvaluation} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre Completo del Aprendiz</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tipo Doc.</label>
                <select
                  value={formData.tipoDocumento}
                  onChange={e => setFormData({ ...formData, tipoDocumento: e.target.value as any })}
                  className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="C.C.">C.C. (Cédula)</option>
                  <option value="T.I.">T.I. (Tarjeta)</option>
                  <option value="C.E.">C.E. (Extranjería)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Número de Documento</label>
                <input
                  type="text"
                  required
                  value={formData.documento}
                  onChange={e => setFormData({ ...formData, documento: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Programa de Formación</label>
                <input
                  type="text"
                  required
                  value={formData.programa}
                  onChange={e => setFormData({ ...formData, programa: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Número de Ficha</label>
                <input
                  type="text"
                  required
                  value={formData.ficha}
                  onChange={e => setFormData({ ...formData, ficha: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Centro de Formación</label>
                <input
                  type="text"
                  required
                  value={formData.centro}
                  onChange={e => setFormData({ ...formData, centro: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Correo MiSena</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>Comenzar Evaluación Gamificada (20 Preguntas)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* STEP 2: INTERACTIVE QUIZ WITH LIVE TIMER & STREAKS */}
      {step === 'quiz' && (
        <div className="space-y-6">
          
          {/* Top Live Dashboard Bar (Timer, Score, Streaks, Progress) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            {/* Timer */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2">
              <Timer className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Tiempo</span>
                <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-slate-100">{formatTime(elapsedSeconds)}</span>
              </div>
            </div>

            {/* Total Points */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Puntos</span>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">{scorePoints} pts</span>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2">
              <Flame className={`w-5 h-5 ${streakCount > 0 ? 'text-orange-500 animate-bounce' : 'text-slate-400'}`} />
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Racha</span>
                <span className="text-sm font-extrabold text-orange-600 dark:text-orange-400">{streakCount} 🔥</span>
              </div>
            </div>

            {/* Progress counter */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Pregunta</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{currentIndex + 1} / {UNIFIED_REGULATION_QUESTIONS.length}</span>
              </div>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / UNIFIED_REGULATION_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div 
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{currentQ.sectionTitle}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrectOpt = optIdx === currentQ.correctIndex;

                let optionStyles = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60";

                if (isAnswered) {
                  if (isCorrectOpt) {
                    optionStyles = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-500";
                  } else if (isSelected && !isCorrectOpt) {
                    optionStyles = "border-rose-400 bg-rose-50 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-400";
                  } else {
                    optionStyles = "opacity-40 border-slate-200 dark:border-slate-800";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isAnswered && isCorrectOpt && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                    )}
                    {isAnswered && isSelected && !isCorrectOpt && (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reinforcement Feedback Box */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-5 rounded-2xl border space-y-2 ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                      : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>¡Refuerzo Positivo! 🌟</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        <span>Retroalimentación Formativa 💡</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed font-medium">
                    {selectedOption === currentQ.correctIndex 
                      ? currentQ.positiveReinforcement 
                      : currentQ.errorReinforcement}
                  </p>

                  <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    Cita normativa: {currentQ.articleRef}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Question Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-6 rounded-2xl shadow-md transition-all text-xs flex items-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>{currentIndex + 1 < UNIFIED_REGULATION_QUESTIONS.length ? 'Siguiente Pregunta' : 'Finalizar y Ver Resultados'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* STEP 3: RESULTS & GAMIFIED RANKING / HALL OF FAME */}
      {step === 'results' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Results Summary Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                ¡Evaluación de Reglamento Finalizada!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Resumen de desempeño oficial de {formData.nombre}
              </p>
            </div>

            {/* Stat Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Puntaje Total</span>
                <span className="text-xl font-extrabold text-amber-500">{scorePoints} pts</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Precisión</span>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{accuracyPercent}%</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Tiempo Total</span>
                <span className="text-xl font-extrabold font-mono text-slate-800 dark:text-slate-200">{formatTime(elapsedSeconds)}</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Racha Máxima</span>
                <span className="text-xl font-extrabold text-orange-500">{maxStreak} 🔥</span>
              </div>
            </div>

            {/* Automatic Data Saving Confirmation */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                {isSubmitted 
                  ? '¡Tus respuestas se han guardado con éxito y registrado en la lista de revisión del Administrador!' 
                  : 'Guardando datos en la cola del servidor...'}
              </span>
            </div>

            {/* Restart Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setStep('form')}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nuevamente la Evaluación</span>
              </button>
            </div>
          </div>

          {/* Gamified Ranking & Hall of Fame Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Medal className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Ranking Gamificado SENA · Hall of Fame 🏆
                </h3>
              </div>
              <span className="text-xs text-slate-500">Clasificación de Aprendices</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Puesto</th>
                    <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Aprendiz</th>
                    <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Ficha</th>
                    <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Puntaje</th>
                    <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Tiempo</th>
                    <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Insignia Ganada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr className="bg-amber-50/50 dark:bg-amber-950/20 font-bold">
                    <td className="px-4 py-3 whitespace-nowrap text-amber-600 flex items-center gap-1">
                      <span>🥇 1°</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-900 dark:text-slate-100">{formData.nombre} (Tú)</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formData.ficha}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-amber-600">{scorePoints} pts</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono">{formatTime(elapsedSeconds)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-emerald-600">⚡ Maestro del Reglamento</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-bold">🥈 2°</td>
                    <td className="px-4 py-3 whitespace-nowrap">Laura Camila Rodríguez</td>
                    <td className="px-4 py-3 whitespace-nowrap">2876543</td>
                    <td className="px-4 py-3 whitespace-nowrap text-amber-600">1850 pts</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono">03:45</td>
                    <td className="px-4 py-3 whitespace-nowrap text-emerald-600">🔥 Racha Imparable</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 whitespace-nowrap text-amber-800 dark:text-amber-600 font-bold">🥉 3°</td>
                    <td className="px-4 py-3 whitespace-nowrap">Carlos Eduardo Gómez</td>
                    <td className="px-4 py-3 whitespace-nowrap">2876543</td>
                    <td className="px-4 py-3 whitespace-nowrap text-amber-600">1720 pts</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono">04:12</td>
                    <td className="px-4 py-3 whitespace-nowrap text-emerald-600">🛡️ Experto SENA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};
