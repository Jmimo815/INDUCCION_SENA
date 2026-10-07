import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApprenticeProfile, Badge } from '../types/induction';
import { INITIAL_BADGES } from '../data/senaData';

interface InductionContextType {
  profile: ApprenticeProfile;
  updateProfile: (newProfile: Partial<ApprenticeProfile>) => void;
  moduleProgress: Record<string, number>;
  setModuleProgressValue: (moduleId: string, percent: number) => void;
  badges: Badge[];
  unlockBadge: (badgeId: string) => void;
  quizScores: Record<string, number>;
  saveQuizScore: (quizId: string, score: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  overallProgress: number;
  resetAllProgress: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isBlurring: boolean;
}

const DEFAULT_PROFILE: ApprenticeProfile = {
  nombre: 'Jonathan Mina',
  tipoDocumento: 'C.C.',
  documento: '1098765432',
  programa: 'Análisis y Desarrollo de Software (ADSO)',
  ficha: '2876543',
  centro: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  regional: 'Distrito Capital',
  email: 'jonathan.mina@misena.edu.co',
  fechaInicio: '2026-03-01'
};

const InductionContext = createContext<InductionContextType | undefined>(undefined);

export const InductionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    const saved = localStorage.getItem('sena_apprentice_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('sena_module_progress');
    return saved ? JSON.parse(saved) : {
      'm1-identidad': 20,
      'm2-reglamento': 0,
      'm3-ruta-sofia': 0,
      'm4-bienestar': 0
    };
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('sena_badges');
    return saved ? JSON.parse(saved) : INITIAL_BADGES;
  });

  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('sena_quiz_scores');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_theme_mode');
    return saved ? saved === 'dark' : false;
  });

  const [isBlurring, setIsBlurring] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sena_theme_mode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setIsBlurring(true);
    setTimeout(() => {
      setDarkMode(prev => !prev);
    }, 150);

    setTimeout(() => {
      setIsBlurring(false);
    }, 600);
  };

  useEffect(() => {
    localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sena_module_progress', JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  useEffect(() => {
    localStorage.setItem('sena_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('sena_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  const updateProfile = (newProfile: Partial<ApprenticeProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const setModuleProgressValue = (moduleId: string, percent: number) => {
    setModuleProgress(prev => {
      const updated = { ...prev, [moduleId]: Math.min(100, Math.max(0, percent)) };
      
      // Auto unlock badges if module hits 100%
      if (percent >= 100) {
        if (moduleId === 'm1-identidad') unlockBadge('badge-identidad');
        if (moduleId === 'm2-reglamento') unlockBadge('badge-reglamento');
        if (moduleId === 'm3-ruta-sofia') unlockBadge('badge-ruta');
        if (moduleId === 'm4-bienestar') unlockBadge('badge-bienestar');
      }

      // Check overall progress
      const values = Object.values(updated);
      const avg = Math.round(values.reduce((a, b) => a + b, 0) / 4);
      if (avg >= 100) {
        unlockBadge('badge-maestro');
      }

      return updated;
    });
  };

  const unlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b =>
        b.id === badgeId && !b.unlocked
          ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('es-CO') }
          : b
      )
    );
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setQuizScores(prev => ({ ...prev, [quizId]: score }));
    if (score >= 70) {
      setModuleProgressValue(quizId, 100);
    } else {
      setModuleProgressValue(quizId, Math.max(50, score));
    }
  };

  const resetAllProgress = () => {
    setModuleProgress({
      'm1-identidad': 0,
      'm2-reglamento': 0,
      'm3-ruta-sofia': 0,
      'm4-bienestar': 0
    });
    setBadges(INITIAL_BADGES);
    setQuizScores({});
  };

  const progressValues = Object.values(moduleProgress);
  const overallProgress = Math.round(
    progressValues.length ? progressValues.reduce((a, b) => a + b, 0) / 4 : 0
  );

  return (
    <InductionContext.Provider
      value={{
        profile,
        updateProfile,
        moduleProgress,
        setModuleProgressValue,
        badges,
        unlockBadge,
        quizScores,
        saveQuizScore,
        activeTab,
        setActiveTab,
        overallProgress,
        resetAllProgress,
        darkMode,
        toggleDarkMode,
        isBlurring
      }}
    >
      {children}
    </InductionContext.Provider>
  );
};

export const useInduction = () => {
  const context = useContext(InductionContext);
  if (!context) {
    throw new Error('useInduction debe ser usado dentro de InductionProvider');
  }
  return context;
};
