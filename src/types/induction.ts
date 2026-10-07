export interface ApprenticeProfile {
  nombre: string;
  tipoDocumento: 'C.C.' | 'T.I.' | 'C.E.' | 'PEP';
  documento: string;
  programa: string;
  ficha: string;
  centro: string;
  regional: string;
  email: string;
  fechaInicio: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'identidad' | 'reglamento' | 'ruta' | 'bienestar' | 'maestro';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizModule {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface ScenarioCase {
  id: string;
  title: string;
  category: 'Academica' | 'Disciplinaria' | 'Derecho' | 'Deber';
  description: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
  icon: string;
}

export interface RegulationItem {
  id: string;
  type: 'derecho' | 'deber' | 'prohibicion';
  article: string;
  title: string;
  summary: string;
  details: string;
  category: string;
}
