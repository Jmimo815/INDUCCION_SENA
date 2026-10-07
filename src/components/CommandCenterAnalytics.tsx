import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar as CalendarIcon, 
  Globe2, 
  Activity, 
  CheckCircle2, 
  Zap, 
  Layers,
  Sparkles
} from 'lucide-react';

interface RegionalNode {
  id: string;
  name: string;
  centroCount: number;
  aprendicesActive: string;
  status: string;
  topProgram: string;
  xPercent: number; // For map positioning
  yPercent: number;
}

const REGIONALES_DATA: RegionalNode[] = [
  { id: 'dc', name: 'Regional Distrito Capital', centroCount: 15, aprendicesActive: '142.500', status: 'Operativo 100%', topProgram: 'ADSO & Ciberseguridad', xPercent: 48, yPercent: 52 },
  { id: 'ant', name: 'Regional Antioquia', centroCount: 16, aprendicesActive: '118.200', status: 'Operativo 100%', topProgram: 'Mecatrónica e Innovación', xPercent: 38, yPercent: 38 },
  { id: 'val', name: 'Regional Valle del Cauca', centroCount: 10, aprendicesActive: '85.400', status: 'Operativo 100%', topProgram: 'Logística & Agroindustria', xPercent: 30, yPercent: 62 },
  { id: 'atl', name: 'Regional Atlántico', centroCount: 4, aprendicesActive: '52.100', status: 'Operativo 100%', topProgram: 'Energías Renovables', xPercent: 42, yPercent: 18 },
  { id: 'san', name: 'Regional Santander', centroCount: 8, aprendicesActive: '46.800', status: 'Operativo 100%', topProgram: 'Biotecnología & Gas', xPercent: 56, yPercent: 36 }
];

export const CommandCenterAnalytics: React.FC<{ userProgress: number }> = ({ userProgress }) => {
  const [selectedRegional, setSelectedRegional] = useState<RegionalNode>(REGIONALES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'rendimiento' | 'cronograma' | 'cobertura'>('rendimiento');

  // Days matrix for current month
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const activeEventDays = [4, 9, 14, 18, 23, 28];

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] space-y-6 relative overflow-hidden transition-all">
      
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Centro de Comando y Analítica SENA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Monitor de Formación Profesional e Impacto Nacional
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('rendimiento')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'rendimiento'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Curva de Avance</span>
          </button>

          <button
            onClick={() => setActiveTab('cronograma')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'cronograma'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Cronograma</span>
          </button>

          <button
            onClick={() => setActiveTab('cobertura')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'cobertura'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Red Nacional</span>
          </button>
        </div>
      </div>

      {/* Main Content Panels */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left / Center 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Luminous Wave Area Chart Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Tasa de Asimilación de RAP</span>
                <h3 className="text-base font-extrabold text-white">Trayectoria de Aprendizaje del Aprendiz</h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">Puntaje Global</span>
                <span className="text-lg font-black text-cyan-400 font-mono tracking-tight">{userProgress}%</span>
              </div>
            </div>

            {/* Glowing Wave SVG */}
            <div className="h-44 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="emeraldWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Wave Area Fill */}
                <path
                  d="M 0,110 C 60,90 100,30 160,50 C 220,70 280,20 340,35 C 400,50 440,10 500,20 L 500,120 L 0,120 Z"
                  fill="url(#emeraldWaveGrad)"
                />

                {/* Wave Main Path */}
                <path
                  d="M 0,110 C 60,90 100,30 160,50 C 220,70 280,20 340,35 C 400,50 440,10 500,20"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Pulsating Glowing Data Nodes */}
                <circle cx="160" cy="50" r="5" fill="#10b981" className="animate-pulse" />
                <circle cx="280" cy="20" r="5" fill="#06b6d4" className="animate-pulse" />
                <circle cx="500" cy="20" r="6" fill="#38bdf8" className="animate-ping" />
                <circle cx="500" cy="20" r="6" fill="#38bdf8" />
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span>Semana 1</span>
                <span>Semana 2</span>
                <span>Semana 3</span>
                <span>Semana 4</span>
                <span>Semana 5</span>
                <span className="text-cyan-400 font-bold">Semana 6 (Actual)</span>
              </div>
            </div>
          </div>

          {/* Equalizer Bar Gauges ("Resultado por Módulos SENA") */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>M1. Identidad SENA</span>
                <span className="text-emerald-400 font-mono font-bold">100%</span>
              </div>
              <div className="flex items-end gap-1 h-12 pt-2">
                {[40, 60, 85, 100, 100, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-800 rounded-t-sm overflow-hidden h-full flex items-end">
                    <div className="w-full bg-emerald-500 shadow-[0_0_8px_#10b981]" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>M2. Reglamento</span>
                <span className="text-cyan-400 font-mono font-bold">85%</span>
              </div>
              <div className="flex items-end gap-1 h-12 pt-2">
                {[30, 50, 70, 85, 80, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-800 rounded-t-sm overflow-hidden h-full flex items-end">
                    <div className="w-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>M3. Ruta & SOFIA</span>
                <span className="text-teal-400 font-mono font-bold">90%</span>
              </div>
              <div className="flex items-end gap-1 h-12 pt-2">
                {[20, 45, 65, 90, 88, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-800 rounded-t-sm overflow-hidden h-full flex items-end">
                    <div className="w-full bg-teal-400 shadow-[0_0_8px_#14b8a6]" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calendar & Regional Map */}
        <div className="space-y-6">
          
          {/* Calendar Activity Grid */}
          {activeTab === 'cronograma' || activeTab === 'rendimiento' ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-emerald-400" />
                  <span>Calendario de Inducción</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                  Marzo 2026
                </span>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono font-bold text-slate-500 border-b border-slate-800 pb-1">
                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>

              {/* Days Matrix */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono">
                {calendarDays.map((day) => {
                  const isActive = activeEventDays.includes(day);
                  return (
                    <div
                      key={day}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isActive
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60 font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Hitos obligatorios
                </span>
                <span className="text-emerald-400 font-semibold">6 Fechas clave</span>
              </div>
            </div>
          ) : null}

          {/* Regional Colombia Coverage Map */}
          {activeTab === 'cobertura' || activeTab === 'rendimiento' ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>Red de Regionales SENA</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Colombia</span>
              </div>

              {/* Stylized Interactive Map Container */}
              <div className="relative w-full h-44 bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
                {/* Background Map Graphic SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
                  <path d="M 60,20 Q 90,10 120,30 Q 140,80 110,130 Q 80,180 50,150 Q 30,100 60,20 Z" fill="#0284c7" />
                </svg>

                {/* Pulsating Regional Nodes */}
                {REGIONALES_DATA.map((reg) => {
                  const isSelected = selectedRegional.id === reg.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => setSelectedRegional(reg)}
                      style={{ left: `${reg.xPercent}%`, top: `${reg.yPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-1 rounded-full transition-all group focus:outline-hidden`}
                      title={reg.name}
                    >
                      <span className={`block w-3.5 h-3.5 rounded-full border ${
                        isSelected 
                          ? 'bg-cyan-400 border-white shadow-[0_0_12px_#06b6d4] scale-125' 
                          : 'bg-emerald-500 border-slate-900 group-hover:scale-110'
                      }`} />
                    </button>
                  );
                })}

                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded-md border border-slate-800">
                  Nodo Activo: <strong className="text-cyan-400">{selectedRegional.name}</strong>
                </div>
              </div>

              {/* Selected Regional Info Details */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{selectedRegional.name}</span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    {selectedRegional.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Aprendices Activos: <strong className="text-white font-mono">{selectedRegional.aprendicesActive}</strong></span>
                  <span>Centros: <strong className="text-white font-mono">{selectedRegional.centroCount}</strong></span>
                </div>
              </div>
            </div>
          ) : null}

        </div>

      </div>

    </div>
  );
};
