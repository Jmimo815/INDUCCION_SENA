import React from 'react';
import { InductionProvider, useInduction } from './context/InductionContext';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { IdentidadModule } from './components/IdentidadModule';
import { ReglamentoModule } from './components/ReglamentoModule';
import { RutaSofiaModule } from './components/RutaSofiaModule';
import { BienestarModule } from './components/BienestarModule';
import { SofiaAssistantView } from './components/SofiaAssistantView';
import { CertificadoView } from './components/CertificadoView';
import { DriveSyncView } from './components/DriveSyncView';
import { EvaluacionUnificadaView } from './components/EvaluacionUnificadaView';

function AppContent() {
  const { activeTab, isBlurring } = useInduction();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 dark:text-slate-100 selection:bg-emerald-200 selection:text-emerald-900 transition-colors duration-300 relative">
      
      {/* Mode Change Blur Effect Overlay */}
      {isBlurring && (
        <div className="fixed inset-0 z-50 pointer-events-none backdrop-blur-2xl bg-emerald-950/20 dark:bg-slate-900/40 transition-all duration-300 animate-fade-in flex items-center justify-center">
          <div className="px-6 py-3 bg-slate-900/90 text-white rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-md flex items-center gap-3 text-xs font-bold animate-bounce">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Cambiando ambiente visual SENA...</span>
          </div>
        </div>
      )}

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'identidad' && <IdentidadModule />}
        {activeTab === 'reglamento' && <ReglamentoModule />}
        {activeTab === 'evaluacion' && <EvaluacionUnificadaView />}
        {activeTab === 'ruta' && <RutaSofiaModule />}
        {activeTab === 'bienestar' && <BienestarModule />}
        {activeTab === 'asistente' && <SofiaAssistantView />}
        {activeTab === 'certificado' && <CertificadoView />}
        {(activeTab === 'admin' || activeTab === 'drive') && <DriveSyncView />}
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-auto text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Servicio Nacional de Aprendizaje — SENA</span>
            <span>·</span>
            <span>Plataforma de Inducción Interactiva del Aprendiz</span>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Formación Profesional Integral de Calidad · Colombia 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <InductionProvider>
      <AppContent />
    </InductionProvider>
  );
}
