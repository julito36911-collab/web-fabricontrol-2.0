import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    oeeTitle: 'Calculadora de OEE',
    oeeSub: 'Eficiencia General de los Equipos',
    shiftTime: 'Tiempo de Turno (min)',
    downTime: 'Tiempo de Parada (min)',
    totalPieces: 'Piezas Totales (cant)',
    badPieces: 'Piezas Defectuosas (cant)',
    oeeResult: 'OEE Final:',
    availability: 'Disponibilidad',
    performance: 'Rendimiento',
    quality: 'Calidad',

    scrapTitle: 'Costo de Retrabajo (Scrap)',
    scrapSub: 'Impacto económico de las piezas malas',
    matCost: 'Costo Material por Pieza ($)',
    lostTime: 'Tiempo Perdido (min)',
    opRate: 'Costo Hora Operario ($)',
    badQty: 'Cantidad de Piezas Malas',
    scrapResult: 'Pérdida Económica Total:',

    taktTitle: 'Generador de Takt Time',
    taktSub: 'Ritmo de producción necesario',
    workTime: 'Tiempo Disponible (min)',
    demand: 'Demanda del Cliente (piezas)',
    taktResult: 'Ritmo de fabricación:',
    taktDetail: 'Debes fabricar 1 pieza cada {x} minutos.',

    calculate: 'Calcular Impacto',
    moneySign: '$'
  },
  en: {
    oeeTitle: 'OEE Calculator',
    oeeSub: 'Overall Equipment Effectiveness',
    shiftTime: 'Shift Time (min)',
    downTime: 'Downtime (min)',
    totalPieces: 'Total Pieces (qty)',
    badPieces: 'Defective Pieces (qty)',
    oeeResult: 'Final OEE:',
    availability: 'Availability',
    performance: 'Performance',
    quality: 'Quality',

    scrapTitle: 'Scrap Cost Calculator',
    scrapSub: 'Economic impact of defective parts',
    matCost: 'Material Cost per Part ($)',
    lostTime: 'Lost Time (min)',
    opRate: 'Operator Hourly Rate ($)',
    badQty: 'Quantity of Bad Parts',
    scrapResult: 'Total Economic Loss:',

    taktTitle: 'Takt Time Generator',
    taktSub: 'Required production pace',
    workTime: 'Available Time (min)',
    demand: 'Customer Demand (pcs)',
    taktResult: 'Manufacturing Pace:',
    taktDetail: 'You must produce 1 part every {x} minutes.',

    calculate: 'Calculate Impact',
    moneySign: '$'
  },
  he: {
    oeeTitle: 'מחשבון OEE',
    oeeSub: 'יעילות ציוד כוללת',
    shiftTime: 'זמן משמרת (דקות)',
    downTime: 'זמן השבתה (דקות)',
    totalPieces: 'סה"כ חלקים (כמות)',
    badPieces: 'חלקים פגומים (כמות)',
    oeeResult: 'OEE סופי:',
    availability: 'זמינות',
    performance: 'ביצועים',
    quality: 'איכות',

    scrapTitle: 'מחשבון עלות פסולת (Scrap)',
    scrapSub: 'השפעה כלכלית של חלקים פגומים',
    matCost: 'עלות חומר לחלק ($)',
    lostTime: 'זמן אבוד (דקות)',
    opRate: 'עלות שעת מפעיל ($)',
    badQty: 'כמות חלקים פגומים',
    scrapResult: 'סך הפסד כלכלי:',

    taktTitle: 'מחולל Takt Time',
    taktSub: 'קצב ייצור נדרש',
    workTime: 'זמן זמין (דקות)',
    demand: 'דרישת לקוח (חלקים)',
    taktResult: 'קצב ייצור:',
    taktDetail: 'עליך לייצר חלק אחד כל {x} דקות.',

    calculate: 'חשב השפעה',
    moneySign: '$'
  }
};

const ProduccionTools = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  // OEE State
  const [oeeInputs, setOeeInputs] = useState({ shift: 480, down: 30, total: 1000, bad: 20 });
  const calcOee = () => {
    const avail = ((oeeInputs.shift - oeeInputs.down) / oeeInputs.shift) || 0;
    const quality = ((oeeInputs.total - oeeInputs.bad) / oeeInputs.total) || 0;
    const perf = 0.95; // Simplified for this tool
    const oee = avail * perf * quality * 100;
    return { 
        oee: oee.toFixed(1),
        avail: (avail * 100).toFixed(1),
        perf: (perf * 100).toFixed(1),
        qual: (quality * 100).toFixed(1)
    };
  };
  const oee = calcOee();

  // Scrap State
  const [scrapInputs, setScrapInputs] = useState({ mat: 15, time: 5, rate: 25, qty: 50 });
  const calcScrap = () => {
    const matLoss = scrapInputs.mat * scrapInputs.qty;
    const timeLoss = (scrapInputs.time / 60) * scrapInputs.rate * scrapInputs.qty;
    return (matLoss + timeLoss).toLocaleString();
  };

  // Takt State
  const [taktInputs, setTaktInputs] = useState({ time: 450, demand: 150 });
  const taktValue = (taktInputs.time / taktInputs.demand).toFixed(1);

  const cardClass = `bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 ${isRtl ? 'text-right' : 'text-left'}`;
  const inputClass = `w-full bg-slate-800/80 border-2 border-white/5 text-white rounded-xl px-4 py-3 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition-all font-bold ${isRtl ? 'text-right' : 'text-left'}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* OEE CALCULATOR */}
      <div className={cardClass}>
        <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-3">
          <span className="text-cyan-400">📊</span> {l.oeeTitle}
        </h3>
        <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-8">{l.oeeSub}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.shiftTime}</label>
              <input type="number" value={oeeInputs.shift} onChange={e => setOeeInputs({...oeeInputs, shift: Number(e.target.value)})} className={inputClass} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.downTime}</label>
              <input type="number" value={oeeInputs.down} onChange={e => setOeeInputs({...oeeInputs, down: Number(e.target.value)})} className={inputClass} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.totalPieces}</label>
              <input type="number" value={oeeInputs.total} onChange={e => setOeeInputs({...oeeInputs, total: Number(e.target.value)})} className={inputClass} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.badPieces}</label>
              <input type="number" value={oeeInputs.bad} onChange={e => setOeeInputs({...oeeInputs, bad: Number(e.target.value)})} className={inputClass} />
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 flex flex-col justify-center">
            <div className="text-center mb-6">
                <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{oee.oee}%</span>
                <p className="text-gray-500 font-bold uppercase text-[10px] mt-2">{l.oeeResult}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                    <p className="text-white font-bold text-sm">{oee.avail}%</p>
                    <p className="text-[8px] text-gray-500 uppercase">{l.availability}</p>
                </div>
                <div className="text-center">
                    <p className="text-white font-bold text-sm">{oee.perf}%</p>
                    <p className="text-[8px] text-gray-500 uppercase">{l.performance}</p>
                </div>
                <div className="text-center">
                    <p className="text-white font-bold text-sm">{oee.qual}%</p>
                    <p className="text-[8px] text-gray-500 uppercase">{l.quality}</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SCRAP COST */}
        <div className={cardClass}>
            <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-red-400">💸</span> {l.scrapTitle}
            </h3>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-8">{l.scrapSub}</p>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.matCost}</label>
                        <input type="number" value={scrapInputs.mat} onChange={e => setScrapInputs({...scrapInputs, mat: Number(e.target.value)})} className={inputClass} />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.badQty}</label>
                        <input type="number" value={scrapInputs.qty} onChange={e => setScrapInputs({...scrapInputs, qty: Number(e.target.value)})} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.lostTime}</label>
                        <input type="number" value={scrapInputs.time} onChange={e => setScrapInputs({...scrapInputs, time: Number(e.target.value)})} className={inputClass} />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.opRate}</label>
                        <input type="number" value={scrapInputs.rate} onChange={e => setScrapInputs({...scrapInputs, rate: Number(e.target.value)})} className={inputClass} />
                    </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-6">
                    <p className="text-red-400 font-black text-3xl">{l.moneySign}{calcScrap()}</p>
                    <p className="text-red-500/60 font-bold uppercase text-[10px] mt-1">{l.scrapResult}</p>
                </div>
            </div>
        </div>

        {/* TAKT TIME */}
        <div className={cardClass}>
            <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-orange-400">⏱️</span> {l.taktTitle}
            </h3>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-8">{l.taktSub}</p>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.workTime}</label>
                    <input type="number" value={taktInputs.time} onChange={e => setTaktInputs({...taktInputs, time: Number(e.target.value)})} className={inputClass} />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">{l.demand}</label>
                    <input type="number" value={taktInputs.demand} onChange={e => setTaktInputs({...taktInputs, demand: Number(e.target.value)})} className={inputClass} />
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
                    <p className="text-orange-400 font-black text-3xl">{taktValue} min/pieza</p>
                    <p className="text-orange-300/80 font-bold text-xs mt-2">
                        {l.taktDetail.replace('{x}', taktValue)}
                    </p>
                </div>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProduccionTools;
