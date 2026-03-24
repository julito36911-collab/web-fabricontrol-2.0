import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    costTitle: "Calculadora de Costo por Minuto",
    fixed: "Gasto Mensual Fijo (Alquiler, Luz, etc.) $",
    salary: "Salario Operario (Mensual) $",
    hours: "Horas de Trabajo (Mensuales)",
    margin: "Margen de Utilidad Deseado (%)",
    opCost: "Costo de operación:",
    chargeAmt: "Debes cobrar al menos:",
    perMin: " / minuto",
    
    timeTitle: "Estimador de Tiempo de Producción",
    pieces: "Cantidad de Piezas",
    timePerPiece: "Tiempo Estimado por Pieza (min)",
    efficiency: "Eficiencia del Taller (%)",
    totalTimeMsg: "Tiempo Total Estimado:",
    hrs: "horas y",
    mins: "minutos",

    close: "Cerrar Panel"
  },
  en: {
    costTitle: "Cost Per Minute Calculator",
    fixed: "Fixed Monthly Cost (Rent, Power) $",
    salary: "Operator Salary (Monthly) $",
    hours: "Working Hours (Monthly)",
    margin: "Desired Profit Margin (%)",
    opCost: "Operational cost:",
    chargeAmt: "You should charge at least:",
    perMin: " / minute",
    
    timeTitle: "Production Time Estimator",
    pieces: "Amount of Pieces",
    timePerPiece: "Estimated Time per Piece (min)",
    efficiency: "Workshop Efficiency (%)",
    totalTimeMsg: "Total Estimated Time:",
    hrs: "hours and",
    mins: "minutes",

    close: "Close Panel"
  },
  he: {
    costTitle: "מחשבון עלות לדקה",
    fixed: "הוצאה חודשית קבועה (שכירות, חשמל) $",
    salary: "שכר עובד (חודשי) $",
    hours: "שעות עבודה (חודשיות)",
    margin: "שולי רווח רצויים (%)",
    opCost: "עלות התפעול שלך היא:",
    chargeAmt: "עליך לגבות לפחות:",
    perMin: " / דקה",

    timeTitle: "מחשבון זמן ייצור",
    pieces: "כמות חלקים",
    timePerPiece: "זמן משוער לחלק (דקות)",
    efficiency: "יעילות המפעל (%)",
    totalTimeMsg: "זמן כולל משוער:",
    hrs: "שעות ו-",
    mins: "דקות",

    close: "סגור חלונית"
  }
};

export const CotizacionTools = ({ labels }) => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'cost' | 'time' | null

  // Cost State
  const [fixed, setFixed] = useState(2500);
  const [salary, setSalary] = useState(1500);
  const [workHours, setWorkHours] = useState(160);
  const [margin, setMargin] = useState(30);

  // Time State
  const [pieces, setPieces] = useState(100);
  const [timePP, setTimePP] = useState(5);
  const [efficiency, setEfficiency] = useState(85);

  // Calculations
  const costPerMin = workHours > 0 ? (fixed + salary) / (workHours * 60) : 0;
  const chargePerMin = costPerMin * (1 + (margin / 100));

  const totalRealMinutes = efficiency > 0 ? (pieces * timePP) / (efficiency / 100) : 0;
  const estHours = Math.floor(totalRealMinutes / 60);
  const estMins = Math.round(totalRealMinutes % 60);

  return (
    <>
      {/* TARJETAS PRINCIPALES DEL MENÚ */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
        {/* Cost Card */}
        <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/10 hover:-translate-y-2 hover:bg-slate-800/80 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 group">
          <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
            <span className="text-3xl">🕒</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{labels.c4i1_t}</h3>
          <p className="text-gray-400 font-medium mb-8 leading-relaxed h-16">{labels.c4i1_d}</p>
          <button 
            onClick={() => setActiveModal('cost')}
            className="w-full py-4 bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-600 hover:to-cyan-600 border border-cyan-500/50 text-white rounded-xl font-bold shadow-lg transform hover:scale-[1.02] transition-all text-lg"
          >
            🖥️ {labels.useTool}
          </button>
        </div>

        {/* Time Card */}
        <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/10 hover:-translate-y-2 hover:bg-slate-800/80 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-300 group">
          <div className="w-16 h-16 bg-orange-900/50 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
            <span className="text-3xl">⏱️</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{labels.c4i2_t}</h3>
          <p className="text-gray-400 font-medium mb-8 leading-relaxed h-16">{labels.c4i2_d}</p>
          <button 
            onClick={() => setActiveModal('time')}
            className="w-full py-4 bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-600 hover:to-amber-500 border border-orange-500/50 text-white rounded-xl font-bold shadow-lg transform hover:scale-[1.02] transition-all text-lg"
          >
            🖥️ {labels.useTool}
          </button>
        </div>
      </div>

      {/* MODAL CALCULADORA COSTO PER MINUTO */}
      {activeModal === 'cost' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm transition-all" onClick={() => setActiveModal(null)}>
          <div 
            className={`bg-[#0f172a] border border-cyan-500/50 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.2)] w-full max-w-2xl overflow-hidden relative transform transition-all ${isRtl ? 'dir-rtl text-right font-hebrew' : 'dir-ltr text-left font-sans'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-slate-800/50 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-3">
                <span>🕒</span> {l.costTitle}
              </h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/80 p-2 rounded-lg transition-all border border-transparent hover:border-red-400">
                ✕
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.fixed}</label>
                  <input type="number" value={fixed} onChange={(e) => setFixed(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 font-bold" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.salary}</label>
                  <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 font-bold" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.hours}</label>
                  <input type="number" value={workHours} onChange={(e) => setWorkHours(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 font-bold" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.margin}</label>
                  <input type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 font-bold" />
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-slate-900 to-blue-900/50 border border-cyan-500/30 rounded-2xl p-6 flex flex-col gap-4 text-center">
                 <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-gray-400 font-medium mb-1">{l.opCost}</span>
                    <p className="text-2xl font-bold text-slate-300">
                      ${costPerMin.toFixed(2)} <span className="text-sm font-normal text-cyan-400">{l.perMin}</span>
                    </p>
                 </div>
                 <div className="flex flex-col items-center justify-center p-4 bg-cyan-900/40 rounded-xl border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <span className="text-cyan-200 font-bold text-sm uppercase tracking-wider mb-1">{l.chargeAmt}</span>
                    <p className="text-4xl font-black text-white drop-shadow-md">
                      ${chargePerMin.toFixed(2)} <span className="text-xl font-bold text-cyan-400">{l.perMin}</span>
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ESTIMADOR DE PRODUCCIÓN */}
      {activeModal === 'time' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm transition-all" onClick={() => setActiveModal(null)}>
          <div 
            className={`bg-[#0f172a] border border-orange-500/50 rounded-3xl shadow-[0_0_60px_rgba(249,115,22,0.2)] w-full max-w-2xl overflow-hidden relative transform transition-all ${isRtl ? 'dir-rtl text-right font-hebrew' : 'dir-ltr text-left font-sans'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-slate-800/50 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-2xl font-black text-orange-400 flex items-center gap-3">
                <span>⏱️</span> {l.timeTitle}
              </h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/80 p-2 rounded-lg transition-all border border-transparent hover:border-red-400">
                ✕
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.pieces}</label>
                  <input type="number" value={pieces} onChange={(e) => setPieces(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 font-bold" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.timePerPiece}</label>
                  <input type="number" step="0.5" value={timePP} onChange={(e) => setTimePP(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 font-bold" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-3">{l.efficiency}</label>
                  <select value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 font-bold appearance-none">
                    <option value={100}>100%</option>
                    <option value={90}>90%</option>
                    <option value={85}>85%</option>
                    <option value={80}>80%</option>
                    <option value={75}>75%</option>
                    <option value={70}>70%</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-slate-900 to-orange-900/30 border border-orange-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner relative group">
                 <div className="absolute inset-0 bg-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="text-orange-200 font-bold uppercase tracking-widest text-sm mb-3 relative z-10">{l.totalTimeMsg}</span>
                 <p className="text-4xl md:text-5xl font-black text-white drop-shadow-md relative z-10">
                    <span className="text-orange-400">{estHours}</span> <span className="text-2xl font-bold">{l.hrs}</span> <span className="text-orange-400">{estMins}</span> <span className="text-2xl font-bold">{l.mins}</span>
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
