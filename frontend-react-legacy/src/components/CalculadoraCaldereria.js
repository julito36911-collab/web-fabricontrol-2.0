import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    title: 'Generador de Conos y Cilindros',
    sub: 'Desarrollo plano profesional para chapa',
    dimD: 'Diámetro Mayor (D) mm',
    dimd: 'Diámetro Menor (d) mm',
    dimH: 'Altura (H) mm',
    thick: 'Espesor (t) mm',
    kFactor: 'Factor K',
    diaType: 'Tipo de Diámetro',
    od: 'Exterior (OD)',
    id: 'Interior (ID)',
    preview: 'Vista Previa del Desarrollo',
    download: 'Descargar DXF para Corte',
    results: 'Resultados (Diámetro Neutro):',
    radLarge: 'Radio Mayor (G):',
    radSmall: 'Radio Menor (g):',
    angle: 'Ángulo (α):',
    cylinderMsg: 'Nota: Generando cilindro (rectángulo).',
    errorMsg: 'La altura y los diámetros deben ser superiores a cero.'
  },
  en: {
    title: 'Cone & Cylinder Developer',
    sub: 'Professional sheet metal developments',
    dimD: 'Large Diameter (D) mm',
    dimd: 'Small Diameter (d) mm',
    dimH: 'Height (H) mm',
    thick: 'Thickness (t) mm',
    kFactor: 'K-Factor',
    diaType: 'Diameter Type',
    od: 'Outside (OD)',
    id: 'Inside (ID)',
    preview: 'Pattern Preview',
    download: 'Download DXF File',
    results: 'Results (Neutral Diameter):',
    radLarge: 'Large Radius (G):',
    radSmall: 'Small Radius (g):',
    angle: 'Angle (α):',
    cylinderMsg: 'Note: Generating cylinder (rectangle).',
    errorMsg: 'Height and diameters must be greater than zero.'
  },
  he: {
    title: 'מחולל פריסות קונוס וצילינדר',
    sub: 'פיתוח פריסות מקצועי לפחחות',
    dimD: 'קוטר גדול (D) מ"מ',
    dimd: 'קוטר קטן (d) מ"מ',
    dimH: 'גובה (H) מ"מ',
    thick: 'עובי (t) מ"מ',
    kFactor: 'פקטור K',
    diaType: 'סוג קוטר',
    od: 'חיצוני (OD)',
    id: 'פנימי (ID)',
    preview: 'תצוגה מקדימה של הפריסה',
    download: 'הורד קובץ DXF',
    results: 'תוצאות (קוטר נייטרלי):',
    radLarge: 'רדיוס גדול (G):',
    radSmall: 'רדיוס קטן (g):',
    angle: 'זווית (α):',
    cylinderMsg: 'הערה: יוצר צילינדר (מלבן).',
    errorMsg: 'הגובה והקטרים חייבים להיות גדולים מאפס.'
  }
};

const CalculadoraCaldereria = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  // Inputs
  const [D, setD] = useState(200);
  const [d, setSmallD] = useState(100);
  const [H, setH] = useState(150);
  const [thickness, setThickness] = useState(3);
  const [kFactor, setKFactor] = useState(0.5);
  const [diaType, setDiaType] = useState('OD');

  // Logic: First calculate Neutral Diameters
  const solveNeutral = (val) => {
    if (diaType === 'OD') {
      return val - (2 * thickness * (1 - kFactor));
    } else {
      return val + (2 * thickness * kFactor);
    }
  };

  const Dn = solveNeutral(D);
  const dn = solveNeutral(d);
  const isCylinder = Dn === dn;

  // Geometric development based on Neutral Diameters
  let G = 0, g = 0, alpha = 0;
  if (Dn > 0 && dn > 0 && H > 0) {
    if (!isCylinder) {
      const L = Math.sqrt(Math.pow(H, 2) + Math.pow(Math.abs(Dn - dn) / 2, 2));
      const diff = Math.abs(Dn - dn);
      G = (Math.max(Dn, dn) * L) / diff;
      g = (Math.min(Dn, dn) * L) / diff;
      alpha = (180 * Math.max(Dn, dn)) / G; 
    }
  }

  const downloadDXF = () => {
    let dxfContent = `0\nSECTION\n2\nENTITIES\n`;

    if (isCylinder) {
      const w = Math.PI * Dn;
      const h = H;
      const points = [[0,0], [w,0], [w,h], [0,h], [0,0]];
      for(let i=0; i<4; i++) {
        dxfContent += `0\nLINE\n8\n0\n10\n${points[i][0]}\n20\n${points[i][1]}\n11\n${points[i+1][0]}\n21\n${points[i+1][1]}\n`;
      }
    } else {
      const sa = 90 - alpha / 2;
      const ea = 90 + alpha / 2;
      dxfContent += `0\nARC\n8\n0\n10\n0.0\n20\n0.0\n40\n${G}\n50\n${sa}\n51\n${ea}\n`;
      dxfContent += `0\nARC\n8\n0\n10\n0.0\n20\n0.0\n40\n${g}\n50\n${sa}\n51\n${ea}\n`;
      
      const radSa = sa * Math.PI / 180;
      const radEa = ea * Math.PI / 180;
      dxfContent += `0\nLINE\n8\n0\n10\n${G * Math.cos(radSa)}\n20\n${G * Math.sin(radSa)}\n11\n${g * Math.cos(radSa)}\n21\n${g * Math.sin(radSa)}\n`;
      dxfContent += `0\nLINE\n8\n0\n10\n${G * Math.cos(radEa)}\n20\n${G * Math.sin(radEa)}\n11\n${g * Math.cos(radEa)}\n21\n${g * Math.sin(radEa)}\n`;
    }

    dxfContent += `0\nENDSEC\n0\nEOF`;
    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `desarrollo-chapa-fabricontrol.dxf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSvgPath = () => {
    if (Dn <= 0 || H <= 0) return "";
    if (isCylinder) {
      const w = 80, h = 50;
      return `M ${60 - w / 2} ${60 - h / 2} h ${w} v ${h} h -${w} Z`;
    }

    const halfAlphaRad = (alpha / 2) * Math.PI / 180;
    const xMax = G * Math.sin(halfAlphaRad);
    const xMin = -xMax;
    const yTop = G;
    let yBottom = g * Math.cos(halfAlphaRad);
    if (alpha > 180) yBottom = -G;

    const width = xMax - xMin;
    const height = yTop - yBottom;
    const scale = Math.min(100 / (width || 1), 100 / (height || 1));
    const sa = (90 - alpha / 2) * Math.PI / 180;
    const ea = (90 + alpha / 2) * Math.PI / 180;

    const dx = (r, th) => 60 + r * scale * Math.cos(th);
    const dy = (r, th) => 60 - (r * scale * Math.sin(th) - ((yTop + yBottom) / 2) * scale);
    
    const p1L = { x: dx(G, sa), y: dy(G, sa) };
    const p2L = { x: dx(G, ea), y: dy(G, ea) };
    const p1s = { x: dx(g, sa), y: dy(g, sa) };
    const p2s = { x: dx(g, ea), y: dy(g, ea) };
    const arcL = alpha > 180 ? 1 : 0;

    return `M ${p1L.x} ${p1L.y} A ${G * scale} ${G * scale} 0 ${arcL} 0 ${p2L.x} ${p2L.y} L ${p2s.x} ${p2s.y} A ${g * scale} ${g * scale} 0 ${arcL} 1 ${p1s.x} ${p1s.y} Z`;
  };

  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden mb-12 transform hover:shadow-cyan-500/10 transition-all duration-500 ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-[100px] -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] -mr-40 -mb-40"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 relative z-10">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4">
            <span className="bg-gradient-to-br from-cyan-400 to-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-cyan-500/10">🔥</span> 
            {l.title}
          </h3>
          <p className="text-cyan-400/70 font-bold uppercase tracking-widest text-xs mt-2">{l.sub}</p>
        </div>
        <div className="bg-slate-800/50 p-1.5 rounded-2xl border border-white/5 flex gap-1">
          <button onClick={() => setDiaType('OD')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${diaType === 'OD' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}>{l.od}</button>
          <button onClick={() => setDiaType('ID')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${diaType === 'ID' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}>{l.id}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
        {/* Left: Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
           <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-400 font-bold text-xs uppercase tracking-tighter mb-2">{l.dimD}</label>
                  <input type="number" value={D} onChange={(e) => setD(Number(e.target.value))} className={`w-full bg-slate-800/80 border-2 border-white/5 text-white rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all font-bold ${isRtl ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold text-xs uppercase tracking-tighter mb-2">{l.dimd}</label>
                  <input type="number" value={d} onChange={(e) => setSmallD(Number(e.target.value))} className={`w-full bg-slate-800/80 border-2 border-white/5 text-white rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all font-bold ${isRtl ? 'text-right' : ''}`} />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold text-xs uppercase tracking-tighter mb-2">{l.dimH}</label>
                  <input type="number" value={H} onChange={(e) => setH(Number(e.target.value))} className={`w-full bg-slate-800/80 border-2 border-white/5 text-white rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all font-bold ${isRtl ? 'text-right' : ''}`} />
                </div>
           </div>

           <div>
              <label className="block text-cyan-400/80 font-bold text-xs uppercase tracking-tighter mb-2">{l.thick}</label>
              <input type="number" step="0.5" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} className={`w-full bg-slate-800/80 border-2 border-cyan-500/20 text-white rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all font-bold ${isRtl ? 'text-right' : ''}`} />
           </div>
           <div>
              <label className="block text-cyan-400/80 font-bold text-xs uppercase tracking-tighter mb-2">{l.kFactor}</label>
              <input type="number" step="0.01" value={kFactor} onChange={(e) => setKFactor(Number(e.target.value))} className={`w-full bg-slate-800/80 border-2 border-cyan-500/20 text-white rounded-2xl px-5 py-4 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all font-bold ${isRtl ? 'text-right' : ''}`} />
           </div>

           <button onClick={downloadDXF} disabled={D <= 0 || H <= 0} className="sm:col-span-2 py-6 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-cyan-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all text-xl flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale">
             📥 {l.download}
           </button>
        </div>

        {/* Right: Preview & Board */}
        <div className="space-y-8">
           <div className="bg-slate-950/50 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 aspect-video flex flex-col items-center justify-center shadow-inner group relative overflow-hidden">
              <span className="absolute top-6 left-6 text-gray-600 font-bold text-[10px] uppercase tracking-widest">{l.preview}</span>
              <svg width="100%" height="100%" viewBox="0 0 120 120" className="drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                 <path d={getSvgPath()} fill="none" stroke="url(#cyanGrad)" strokeWidth="2.5" strokeLinejoin="round" />
                 <defs>
                   <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#22d3ee" />
                     <stop offset="100%" stopColor="#3b82f6" />
                   </linearGradient>
                 </defs>
              </svg>
           </div>

           {!isCylinder && Dn > 0 && H > 0 ? (
             <div className="bg-slate-800/30 rounded-[2rem] p-8 border border-white/5">
                <h4 className="text-gray-500 font-black uppercase text-[10px] tracking-widest mb-6">{l.results}</h4>
                <div className="grid grid-cols-3 gap-6">
                   <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-black text-white tracking-tight">{G.toFixed(1)}</p>
                      <p className="text-[10px] text-cyan-400 uppercase font-bold">{l.radLarge}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-black text-white tracking-tight">{g.toFixed(1)}</p>
                      <p className="text-[10px] text-cyan-400 uppercase font-bold">{l.radSmall}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-black text-orange-400 tracking-tight">{alpha.toFixed(1)}°</p>
                      <p className="text-[10px] text-orange-500/80 uppercase font-bold">{l.angle}</p>
                   </div>
                </div>
             </div>
           ) : isCylinder && Dn > 0 && H > 0 && (
             <div className="bg-cyan-900/10 rounded-[2rem] p-6 border border-cyan-500/20 text-center">
                <p className="text-cyan-400 font-bold text-sm tracking-wide">✨ {l.cylinderMsg}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraCaldereria;
