import { TimelineEvent, RegulationItem, ScenarioCase, QuizModule, Badge } from '../types/induction';

export const HIMNO_SENA_LYRICS = [
  { time: 0, text: "CORO", isHeader: true },
  { time: 2, text: "Estudiantes del SENA adelante" },
  { time: 5, text: "con paso firme y decisión" },
  { time: 8, text: "que el futuro con triunfo nos espera" },
  { time: 12, text: "sin fronteras en nuestra gran nación." },

  { time: 16, text: "ESTROFA I", isHeader: true },
  { time: 18, text: "Al trabajo sabroso de la patria" },
  { time: 21, text: "vamos todos con fe y entusiasmo" },
  { time: 25, text: "construyendo la paz con esfuerzo" },
  { time: 29, text: "para ver este suelo florecer." },

  { time: 33, text: "ESTROFA II", isHeader: true },
  { time: 35, text: "Hoy la técnica nos abre caminos" },
  { time: 38, text: "de progreso, de ciencia y saber" },
  { time: 42, text: "formaremos hombres con destino" },
  { time: 46, text: "que le sirvan con honra al deber." }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1957",
    title: "Fundación del SENA",
    description: "Creado por Rodolfo Martínez Tono con el Decreto Ley 118 de 1957.",
    details: "Surgió con el objetivo de brindar formación profesional a trabajadores, jóvenes y adultos de la industria, el comercio, el campo y la minería.",
    icon: "Building2"
  },
  {
    year: "1994",
    title: "Ley 119 de 1994",
    description: "Reestructuración Institucional y Modernización.",
    details: "Se adscribe el SENA al Ministerio del Trabajo y se establece la Formación Profesional Integral enfocada en competencias laborales.",
    icon: "BookOpen"
  },
  {
    year: "2010",
    title: "Lanzamiento de SOFIA Plus",
    description: "Nace la plataforma virtual de gestión académica.",
    details: "El Sistema Optimizado para la Formación Integral y Aprendizaje Activo digitaliza convocatorias, inscripciones, evaluaciones y certificación.",
    icon: "Laptop"
  },
  {
    year: "2014",
    title: "Creación de SENNOVA",
    description: "Sistema de Investigación, Desarrollo Tecnológico e Innovación.",
    details: "Se impulsan proyectos de ciencia aplicada, robótica, biotecnología y emprendimiento en más de 117 centros de formación.",
    icon: "Lightbulb"
  },
  {
    year: "2024",
    title: "Acuerdo 09 de 2024",
    description: "Adopción del nuevo Reglamento del Aprendiz SENA.",
    details: "Se derogan los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024. Establece 5 Capítulos, 53 Artículos, 24 Derechos, 24 Deberes y 14 Prohibiciones con enfoques de inclusión, diversidad y desarrollo sostenible.",
    icon: "ScrollText"
  },
  {
    year: "2026",
    title: "Acuerdo 02 de 2026",
    description: "Actualización de Comités y Medidas Formativas.",
    details: "Modifica el Art. 48 sobre el funcionamiento del Comité de Evaluación y Seguimiento e integra herramientas tecnológicas y de IA responsable.",
    icon: "Sparkles"
  }
];

export const REGULATIONS_DATA: RegulationItem[] = [
  // DERECHOS (Art. 5 - Acuerdo 09 de 2024)
  {
    id: "der-01",
    type: "derecho",
    article: "Art. 5 Num. 1",
    title: "Inducción e Información Integral",
    summary: "Recibir inducción institucional al ingresar y conocer la ruta formativa completa.",
    details: "El aprendiz tiene derecho a ser informado sobre la organización del SENA, el diseño curricular de su programa, el Reglamento y el uso de plataformas virtuales.",
    category: "Capítulo II · Derechos"
  },
  {
    id: "der-02",
    type: "derecho",
    article: "Art. 5 Num. 3",
    title: "Formación Profesional de Calidad",
    summary: "Aprender con instructores idóneos e infraestructura tecnológica moderna.",
    details: "Derecho a recibir formación teórico-práctica con ambientes de aprendizaje adecuados, acceso a laboratorios, bibliotecas, redes Wi-Fi y herramientas SENNOVA.",
    category: "Capítulo II · Derechos"
  },
  {
    id: "der-03",
    type: "derecho",
    article: "Art. 5 Num. 7",
    title: "Servicios de Bienestar al Aprendiz",
    summary: "Acceso a apoyos de sostenimiento, salud, cultura, deporte e inclusión.",
    details: "Inclusión en programas de alimentación, apoyos de sostenimiento FIC/Regular, selecciones deportivas y acompañamiento psicopedagógico con enfoque diferencial (Art. 3).",
    category: "Capítulo II · Derechos"
  },
  {
    id: "der-04",
    type: "derecho",
    article: "Art. 5 Num. 12",
    title: "Debido Proceso y Libertad de Expresión",
    summary: "Garantía de ser escuchado, ejercer la libre expresión y apelar decisiones sancionatorias.",
    details: "Derecho al debido proceso (Art. 39), notificación formal previa, asesoría de voceros y recursos de reposición y apelación (Art. 50-51).",
    category: "Capítulo II · Derechos"
  },

  // DEBERES (Art. 8 - Acuerdo 09 de 2024)
  {
    id: "deb-01",
    type: "deber",
    article: "Art. 8 Num. 1",
    title: "Suscribir el Acta de Compromiso",
    summary: "Cumplir el acta de compromiso como aprendiz matriculado en el SENA.",
    details: "Acatar las normas institucionales, horarios de formación, reglamentos del centro de convivencia y compromisos de la ruta formativa.",
    category: "Capítulo III · Deberes"
  },
  {
    id: "deb-02",
    type: "deber",
    article: "Art. 8 Num. 4",
    title: "Porte del Carnet Institucional",
    summary: "Portar el carnet en lugar visible dentro y fuera del centro en actividades SENA.",
    details: "El carnet es personal e intransferible. Identifica al aprendiz activo y garantiza el acceso seguro a las instalaciones.",
    category: "Capítulo III · Deberes"
  },
  {
    id: "deb-03",
    type: "deber",
    article: "Art. 8 Num. 8",
    title: "Cumplimiento y Calidad en Evidencias",
    summary: "Entregar las evidencias de aprendizaje en los plazos fijados en la plataforma Zajuna/SOFIA.",
    details: "Asistir puntualmente a las sesiones presenciales y virtuales, participar activamente en el trabajo colaborativo y responder por los Resultados de Aprendizaje (RAP).",
    category: "Capítulo III · Deberes"
  },
  {
    id: "deb-04",
    type: "deber",
    article: "Art. 8 Num. 15",
    title: "Cuidado de Bienes y Desarrollo Sostenible",
    summary: "Cuidar la infraestructura, equipos y promover el reciclaje y desarrollo sostenible (Art. 3).",
    details: "Apagar máquinas y computadores al terminar, no desperdiciar insumos de laboratorio y preservar el ambiente del centro de formación.",
    category: "Capítulo III · Deberes"
  },

  // PROHIBICIONES (Art. 9 - Acuerdo 09 de 2024)
  {
    id: "pro-01",
    type: "prohibicion",
    article: "Art. 9 Num. 2",
    title: "Fraude, Plagio y Suplantación",
    summary: "Copiar evidencias, incurrir en fraude o suplantar la identidad de otra persona.",
    details: "Presentar evidencias ajenas como propias, alterar notas en Zajuna/SOFIA o usar herramientas digitales o IA de forma deshonesta sin citar autoría.",
    category: "Capítulo III · Prohibiciones"
  },
  {
    id: "pro-02",
    type: "prohibicion",
    article: "Art. 9 Num. 5",
    title: "Consumo de Sustancias Psicoactivas y Bebidas",
    summary: "Ingresar, comercializar o consumir alcohol o sustancias en el centro o entorno SENA.",
    details: "Constituye una falta disciplinaria gravísima (Art. 41-43) que puede acarrear la cancelación de matrícula (Art. 47).",
    category: "Capítulo III · Prohibiciones"
  },
  {
    id: "pro-03",
    type: "prohibicion",
    article: "Art. 9 Num. 9",
    title: "Discriminación, Bullying y Acoso",
    summary: "Cualquier acto de hostigamiento, violencia de género o discriminación.",
    details: "Vulnerar los principios orientadores de Inclusión, Enfoque Diferencial y Dignidad Humana (Art. 3) es causa directa de proceso sancionatorio.",
    category: "Capítulo III · Prohibiciones"
  },
  {
    id: "pro-04",
    type: "prohibicion",
    article: "Art. 9 Num. 12",
    title: "Porte de Armas o Elementos Peligrosos",
    summary: "Portar o ingresar armas de fuego, cortopunzantes o sustancias peligrosas no autorizadas.",
    details: "Falta gravísima contra la seguridad colectiva de la comunidad educativa SENA.",
    category: "Capítulo III · Prohibiciones"
  }
];

export const SCENARIO_CASES: ScenarioCase[] = [
  {
    id: "sc-01",
    title: "Inasistencia por Calamidad Doméstica (Acuerdo 09/2024, Art. 28-30)",
    category: "Academica",
    description: "Carlos no asistió durante 2 días a formación por una emergencia familiar severa soportada por la Cruz Roja. ¿Cuál es el procedimiento según el Capítulo IV del Acuerdo 09 de 2024?",
    options: [
      {
        text: "Radicar la justificación formal con soportes ante el instructor y coordinación dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho.",
        isCorrect: true,
        feedback: "¡Correcto! El Acuerdo 09 de 2024 contempla la justificación dentro de los 3 días hábiles posteriores para concertar un Plan de Mejoramiento Académico (Art. 46)."
      },
      {
        text: "Dejar pasar tres días consecutivos sin justificar y esperar el reporte de deserción.",
        isCorrect: false,
        feedback: "Incorrecto. Tres (3) días consecutivos de inasistencia sin justificación activan la causal de deserción de la formación (Art. 31)."
      },
      {
        text: "Pedirle a un compañero que firme la planilla de asistencia por él.",
        isCorrect: false,
        feedback: "Incorrecto. Firmar por otra persona o alterar registros es suplantación y fraude (Art. 9 Prohibición Numeral 2)."
      }
    ]
  },
  {
    id: "sc-02",
    title: "Plagio Académico en Evidencias (Acuerdo 09/2024, Art. 9 y 41)",
    category: "Disciplinaria",
    description: "Un grupo de aprendices copia textualmente un proyecto de investigación ajeno de internet y lo presenta como propio en Zajuna. ¿Qué medida corresponde?",
    options: [
      {
        text: "Remisión del caso al Comité de Evaluación y Seguimiento (Art. 48) para analizar la falta académica/disciplinaria e iniciar medida formativa o sancionatoria.",
        isCorrect: true,
        feedback: "¡Excelente! El plagio atenta contra el Numeral 2 del Artículo 9 de Prohibiciones y amerita proceso formal ante el Comité con debido proceso (Art. 39-50)."
      },
      {
        text: "Ignorar la copia porque se entregó dentro del plazo establecido.",
        isCorrect: false,
        feedback: "Incorrecto. La puntualidad no exime de la honestidad académica. El fraude es una falta grave."
      }
    ]
  },
  {
    id: "sc-03",
    title: "Instancias Decisorias en Sanciones (Acuerdo 09/2024, Art. 49)",
    category: "Derecho",
    description: "Tras un comité, el Subdirector de Centro emite resolución de Cancelación de Matrícula a una aprendiz. ¿Qué recurso procede y en qué instancia?",
    options: [
      {
        text: "Recurso de Reposición ante el Subdirector de Centro (1ª Instancia) y Recurso de Apelación ante la Dirección Regional (2ª Instancia, Art. 49).",
        isCorrect: true,
        feedback: "¡Muy bien! El Artículo 49 del Acuerdo 09 de 2024 establece la Subdirección de Centro como 1ª Instancia y la Dirección Regional como 2ª Instancia."
      },
      {
        text: "No procede ningún recurso porque las decisiones del centro son inapelables.",
        isCorrect: false,
        feedback: "Incorrecto. El Artículo 51 del Reglamento garantiza el derecho constitucional a la defensa y a interponer recursos administrativos."
      }
    ]
  }
];

export const QUIZ_MODULES: QuizModule[] = [
  {
    id: "m1-identidad",
    title: "Evaluación: Identidad e Institucionalidad SENA",
    questions: [
      {
        id: 1,
        question: "¿En qué año fue fundado el SENA y por quién?",
        options: [
          "En 1957 por Rodolfo Martínez Tono",
          "En 1991 por la Constitución Política",
          "En 2000 por el Ministerio de Educación",
          "En 1980 por Simón Bolívar"
        ],
        correctIndex: 0,
        explanation: "El SENA fue fundado el 21 de junio de 1957 bajo el Decreto Ley 118 por iniciativa de Rodolfo Martínez Tono."
      },
      {
        id: 2,
        question: "¿Qué representan los elementos del Escudo del SENA?",
        options: [
          "Las tres ramas de la economía: Caduceo (Comercio/Servicios), Piñón (Industria) y Espiga (Agropecuario)",
          "Las tres regiones geográficas de Colombia",
          "Los tres niveles de formación: Técnico, Tecnólogo y Especialización",
          "La bandera tricolor nacional"
        ],
        correctIndex: 0,
        explanation: "El escudo simboliza el Caduceo para comercio y servicios, el Piñón para la industria y la Espiga para el sector agropecuario."
      },
      {
        id: 3,
        question: "¿Cuál norma vigente rige actualmente el Reglamento del Aprendiz SENA?",
        options: [
          "Acuerdo 09 de 2024 (Modificado por el Acuerdo 02 de 2026)",
          "Acuerdo 07 de 2012 (Derogado)",
          "Acuerdo 02 de 2014 (Derogado)",
          "Ley 100 de 1993"
        ],
        correctIndex: 0,
        explanation: "El Acuerdo 09 del 5 de noviembre de 2024 es el reglamento oficial vigente, derogando los acuerdos 07/2012, 02/2014, 06/2023 y 02/2024."
      }
    ]
  },
  {
    id: "m2-reglamento",
    title: "Evaluación: Reglamento del Aprendiz SENA (Acuerdo 09 de 2024)",
    questions: [
      {
        id: 1,
        question: "¿Cuántos Derechos y Deberes contempla explícitamente el Acuerdo 09 de 2024 en sus Artículos 5 y 8?",
        options: [
          "24 Derechos (Art. 5) y 24 Deberes (Art. 8)",
          "10 Derechos y 10 Deberes",
          "5 Derechos y 50 Deberes",
          "100 numerales sin distinción"
        ],
        correctIndex: 0,
        explanation: "El nuevo Reglamento en su Capítulo II (Art. 5) estipula 24 numerales de Derechos y en el Capítulo III (Art. 8) estipula 24 numerales de Deberes."
      },
      {
        id: 2,
        question: "¿Cuáles son las medidas formativas contempladas en el Artículo 45 y 46 del Acuerdo 09 de 2024?",
        options: [
          "Llamado de atención escrito/académico y Plan de mejoramiento académico/disciplinario",
          "Multa económica directa",
          "Trabajo comunitario obligatorio en portería",
          "Expulsión inmediata sin debido proceso"
        ],
        correctIndex: 0,
        explanation: "Las medidas formativas son pedagógicas e incluyen el llamado de atención y la formulación de planes de mejoramiento antes de recurrir a sanciones."
      },
      {
        id: 3,
        question: "Según el Artículo 49, ¿cuáles son las instancias para apelar una medida sancionatoria?",
        options: [
          "1ª Instancia: Subdirección de Centro / 2ª Instancia: Dirección Regional",
          "1ª Instancia: Portería / 2ª Instancia: Alcaldía Municipal",
          "1ª Instancia: Vocero de Grupo / 2ª Instancia: Representante del SENA",
          "No existe segunda instancia"
        ],
        correctIndex: 0,
        explanation: "El Artículo 49 fija la Subdirección de Centro como 1ª instancia decisoria y la Dirección Regional como 2ª instancia de apelación."
      }
    ]
  },
  {
    id: "m3-ruta-sofia",
    title: "Evaluación: Ruta Formativa y SOFIA Plus",
    questions: [
      {
        id: 1,
        question: "¿Cuáles son las dos etapas principales que componen la Ruta de Formación en el SENA?",
        options: [
          "Etapa Lectiva y Etapa Productiva",
          "Etapa Primaria y Secundaria",
          "Etapa Teórica y Examen Final",
          "Etapa Presencial y Etapa de Vacaciones"
        ],
        correctIndex: 0,
        explanation: "La Formación Profesional Integral del SENA se compone de la Etapa Lectiva (aulas/ambientes) y la Etapa Productiva (desempeño en entorno real)."
      },
      {
        id: 2,
        question: "¿Cuál de las siguientes es una opción válida para certificar la Etapa Productiva?",
        options: [
          "Contrato de Aprendizaje, Pasantía, Proyecto Productivo, Vinculación Laboral o Monitoría",
          "Hacer cursos de conducción particulares",
          "Ver videos informativos en redes sociales",
          "Asistir como oyente a otros programas"
        ],
        correctIndex: 0,
        explanation: "El SENA ofrece 5 modalidades oficiales para validar las competencias en el sector productivo."
      },
      {
        id: 3,
        question: "¿Qué significa las siglas SOFIA en la plataforma SOFIA Plus?",
        options: [
          "Sistema Optimizado para la Formación Integral y Aprendizaje Activo",
          "Software Oficial de Formación e Innovación Abierta",
          "Servicio de Orientación Financiera e Institucional del Aprendiz",
          "Sistema Online de Fotografía e Identificación del Aprendiz"
        ],
        correctIndex: 0,
        explanation: "SOFIA Plus es la plataforma de gestión académica y administrativa del aprendizaje del SENA."
      }
    ]
  },
  {
    id: "m4-bienestar",
    title: "Evaluación: Bienestar al Aprendiz y Oportunidades",
    questions: [
      {
        id: 1,
        question: "¿Qué programa del SENA financia la creación de empresas creadas por aprendices?",
        options: [
          "Fondo Emprender",
          "Banco Central",
          "Bolsa de Valores",
          "Fondo de Pensiones"
        ],
        correctIndex: 0,
        explanation: "Fondo Emprender del SENA otorga capital semilla condonable para proyectos empresariales viables de aprendices y egresados."
      },
      {
        id: 2,
        question: "¿Qué sistema institucional del SENA promueve la investigación, innovación y desarrollo tecnológico?",
        options: [
          "SENNOVA",
          "SOFIA",
          "Zajuna",
          "SIGA"
        ],
        correctIndex: 0,
        explanation: "SENNOVA integra la investigación aplicada, semilleros de investigación y parques tecnológicos en los centros SENA."
      }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-identidad",
    title: "Orgullo SENA",
    description: "Completaste el recorrido de Misión, Símbolos y el Acuerdo 09 de 2024.",
    icon: "ShieldCheck",
    unlocked: false,
    category: "identidad"
  },
  {
    id: "badge-reglamento",
    title: "Ciudadano SENA 2024",
    description: "Dominas los 24 Derechos, 24 Deberes y 14 Prohibiciones del Acuerdo 09 de 2024.",
    icon: "ScrollText",
    unlocked: false,
    category: "reglamento"
  },
  {
    id: "badge-ruta",
    title: "Navegador SOFIA",
    description: "Entiendes la Etapa Lectiva, Productiva y el manejo de SOFIA Plus / Zajuna.",
    icon: "Compass",
    unlocked: false,
    category: "ruta"
  },
  {
    id: "badge-bienestar",
    title: "Aprendiz Innovador",
    description: "Conoces los apoyos de Bienestar, SENNOVA y el Fondo Emprender.",
    icon: "Lightbulb",
    unlocked: false,
    category: "bienestar"
  },
  {
    id: "badge-maestro",
    title: "Maestro de Inducción",
    description: "Obtuviste el 100% en todos los módulos del nuevo reglamento y generaste tu Certificado.",
    icon: "Award",
    unlocked: false,
    category: "maestro"
  }
];
