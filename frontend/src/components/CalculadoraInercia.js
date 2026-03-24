import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const profileLibrary = {
  IPE: [
    { name: 'IPE 80', h: 80, b: 46, tw: 3.8, tf: 5.2, Ix: 80.1 },
    { name: 'IPE 100', h: 100, b: 55, tw: 4.1, tf: 5.7, Ix: 171.0 },
    { name: 'IPE 120', h: 120, b: 64, tw: 4.4, tf: 6.3, Ix: 318.0 },
    { name: 'IPE 140', h: 140, b: 73, tw: 4.7, tf: 6.9, Ix: 541.0 },
    { name: 'IPE 160', h: 160, b: 82, tw: 5.0, tf: 7.4, Ix: 869.0 }
  ],
  UPN: [
    { name: 'UPN 80', h: 80, b: 45, tw: 6.0, tf: 8.0, Ix: 106.0 },
    { name: 'UPN 100', h: 100, b: 50, tw: 6.0, tf: 8.5, Ix: 206.0 },
    { name: 'UPN 120', h: 120, b: 55, tw: 7.0, tf: 9.0, Ix: 364.0 },
    { name: 'UPN 140', h: 140, b: 60, tw: 7.0, tf: 10.0, Ix: 605.0 }
  ],
  WBeam: [
    { name: 'W6x15', h: 152.1, b: 152.1, tw: 5.8, tf: 6.6, Ix: 1210.0 },
    { name: 'W8x21', h: 210.3, b: 133.9, tw: 6.4, tf: 10.2, Ix: 3130.0 },
    { name: 'W10x30', h: 266.2, b: 147.8, tw: 7.6, tf: 13.0, Ix: 7080.0 }
  ],
  CChannel: [
    { name: 'C6x8.2', h: 152.4, b: 48.8, tw: 5.1, tf: 8.7, Ix: 545.0 },
    { name: 'C8x11.5', h: 203.2, b: 57.4, tw: 5.6, tf: 9.9, Ix: 1360.0 }
  ]
};

const locales = {
  es: {
    title: 'Calculadora de Momento de Inercia',
    sub: 'Propiedades de la sección transversal',
    shape: 'Familia de Perfiles',
    model: 'Modelo Específico',
    grpCustom: 'Formas Básicas (Custom)',
    grpEuro: 'Euro-Profiles (DIN/EN)',
    grpUS: 'US-Profiles (AISC)',
    rect: 'Rectángulo',
    circle: 'Círculo',
    hollow: 'Perfil Hueco',
    ipe: 'Vigas I (IPE)',
    upn: 'Canales U (UPN)',
    wbeam: 'Vigas W (Wide Flange)',
    cchan: 'Canales C (Standard)',
    b: 'Base (b) mm',
    h: 'Altura (h) mm',
    d: 'Diámetro (mm)',
    B: 'Base Ext. (mm)',
    H: 'Altura Ext. (mm)',
    t: 'Espesor (mm)',
    tw: 'Espesor Alma (tw) mm',
    tf: 'Espesor Ala (tf) mm',
    result: 'Momento de Inercia (Ix):',
    unit: ' cm⁴',
    readOnly: '(Valor Estándar de Catálogo)'
  },
  en: {
    title: 'Moment of Inertia Calculator',
    sub: 'Engineering section properties',
    shape: 'Profile Family',
    model: 'Specific Model',
    grpCustom: 'Custom Shapes',
    grpEuro: 'Euro-Profiles (DIN/EN)',
    grpUS: 'US-Profiles (AISC)',
    rect: 'Rectangle',
    circle: 'Circle',
    hollow: 'Hollow Profile',
    ipe: 'I-Beams (IPE)',
    upn: 'U-Channels (UPN)',
    wbeam: 'W-Beams (Wide Flange)',
    cchan: 'C-Channels (Standard)',
    b: 'Base (b) mm',
    h: 'Height (h) mm',
    d: 'Diameter (mm)',
    B: 'Ext. Base (mm)',
    H: 'Ext. Height (mm)',
    t: 'Thickness (mm)',
    tw: 'Web Thickness (tw) mm',
    tf: 'Flange Thickness (tf) mm',
    result: 'Moment of Inertia (Ix):',
    unit: ' cm⁴',
    readOnly: '(Standard Catalog Value)'
  },
  he: {
    title: 'מחשבון מומנט התמד',
    sub: 'תכונות חתך הנדסיות',
    shape: 'משפחת פרופילים',
    model: 'מודל ספציפי',
    grpCustom: 'צורות בסיסיות (Custom)',
    grpEuro: 'פרופילים אירופיים (DIN/EN)',
    grpUS: 'פרופילים אמריקאיים (AISC)',
    rect: 'מלבן',
    circle: 'עיגול',
    hollow: 'פרופיל חלול',
    ipe: 'קורת I (IPE)',
    upn: 'תעלת U (UPN)',
    wbeam: 'קורת W (AISC)',
    cchan: 'תעלת C (AISC)',
    b: 'בסיס (b) מ"מ',
    h: 'גובה (h) מ"מ',
    d: 'קוטר (מ"מ)',
    B: 'בסיס חיצ. (מ"מ)',
    H: 'גובה חיצ. (מ"מ)',
    t: 'עובי (מ"מ)',
    tw: 'עובי דופן פנימית (tw) מ"מ',
    tf: 'עובי אוגן (tf) מ"מ',
    result: 'מומנט ההתמד (Ix):',
    unit: ' cm⁴',
    readOnly: '(ערך קטלוג סטנדרטי)'
  }
};

const CalculadoraInercia = () => {
    const { language, isRtl } = useLanguage();
    const l = locales[language] || locales.es;

    const [family, setFamily] = useState('rect');
    const [modelIndex, setModelIndex] = useState(0);

    // Custom shape dimensions
    const [b, setB] = useState(50);
    const [h, setH] = useState(100);
    const [d, setD] = useState(50);
    const [t, setT] = useState(3);

    // Auto-update standard profiles
    useEffect(() => {
        if (['IPE', 'UPN', 'WBeam', 'CChannel'].includes(family)) {
            setModelIndex(0); // reset to first model in list when family changes
        }
    }, [family]);

    const isStandard = ['IPE', 'UPN', 'WBeam', 'CChannel'].includes(family);
    const activeModel = isStandard ? profileLibrary[family][modelIndex] : null;

    let I = 0;
    
    if (isStandard && activeModel) {
        I = activeModel.Ix;
    } else if (family === 'rect') {
        I = ((b * Math.pow(h, 3)) / 12) / 10000;
    } else if (family === 'circle') {
        I = ((Math.PI * Math.pow(d, 4)) / 64) / 10000;
    } else if (family === 'hollow') {
        const bInner = b - 2 * t;
        const hInner = h - 2 * t;
        const iOuter = (b * Math.pow(h, 3)) / 12;
        const iInner = (bInner > 0 && hInner > 0) ? (bInner * Math.pow(hInner, 3)) / 12 : 0;
        I = (iOuter - iInner) / 10000;
    }

    // Determine SVG Type
    let svgType = family;
    if (['IPE', 'WBeam'].includes(family)) svgType = 'IBeam';
    if (['UPN', 'CChannel'].includes(family)) svgType = 'UChannel';

    return (
        <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 ${isRtl ? 'dir-rtl text-right font-hebrew' : 'dir-ltr text-left font-sans'}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 flex items-center gap-3">
                <span>📐</span> {l.title}
            </h3>
            <p className="text-gray-400 font-medium mb-8 uppercase tracking-wider text-sm">{l.sub}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Inputs y Selectores */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-cyan-300 font-bold mb-2">{l.shape}</label>
                        <select 
                            value={family} 
                            onChange={(e) => setFamily(e.target.value)} 
                            className="w-full bg-slate-800 border-2 border-slate-700 hover:border-cyan-500/50 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-bold shadow-lg appearance-none cursor-pointer"
                            style={{ 
                                backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2322d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: isRtl ? 'left 1rem center' : 'right 1rem center',
                                backgroundSize: '1.2em'
                            }}
                        >
                            <optgroup label={l.grpEuro}>
                                <option value="IPE">{l.ipe}</option>
                                <option value="UPN">{l.upn}</option>
                            </optgroup>
                            <optgroup label={l.grpUS}>
                                <option value="WBeam">{l.wbeam}</option>
                                <option value="CChannel">{l.cchan}</option>
                            </optgroup>
                            <optgroup label={l.grpCustom}>
                                <option value="rect">{l.rect}</option>
                                <option value="circle">{l.circle}</option>
                                <option value="hollow">{l.hollow}</option>
                            </optgroup>
                        </select>
                    </div>

                    {/* Selector de Modelos Estándar */}
                    {isStandard && (
                        <div className="animate-fade-in-up">
                            <label className="block text-cyan-300 font-bold mb-2">{l.model}</label>
                            <select 
                                value={modelIndex} 
                                onChange={(e) => setModelIndex(Number(e.target.value))} 
                                className="w-full bg-cyan-900/30 border-2 border-cyan-500/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 transition-all font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)] appearance-none cursor-pointer"
                                style={{ 
                                    backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2322d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: isRtl ? 'left 1rem center' : 'right 1rem center',
                                    backgroundSize: '1.2em'
                                }}
                            >
                                {profileLibrary[family].map((mod, idx) => (
                                    <option key={idx} value={idx}>{mod.name}</option>
                                ))}
                            </select>
                            <p className="mt-3 text-sm text-cyan-400 flex items-center gap-1 opacity-80">
                                ℹ️ <span className="italic">{l.readOnly}</span>
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        {isStandard && activeModel ? (
                            <>
                                <div>
                                    <label className="block text-gray-400 font-medium mb-2 text-sm">{l.h}</label>
                                    <input type="text" readOnly value={activeModel.h} className="w-full bg-slate-800 border fill-gray-500 border-white/5 text-gray-400 rounded-lg px-4 py-3 font-semibold select-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 font-medium mb-2 text-sm">{l.b}</label>
                                    <input type="text" readOnly value={activeModel.b} className="w-full bg-slate-800 border fill-gray-500 border-white/5 text-gray-400 rounded-lg px-4 py-3 font-semibold select-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 font-medium mb-2 text-sm">{l.tw}</label>
                                    <input type="text" readOnly value={activeModel.tw} className="w-full bg-slate-800 border fill-gray-500 border-white/5 text-gray-400 rounded-lg px-4 py-3 font-semibold select-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 font-medium mb-2 text-sm">{l.tf}</label>
                                    <input type="text" readOnly value={activeModel.tf} className="w-full bg-slate-800 border fill-gray-500 border-white/5 text-gray-400 rounded-lg px-4 py-3 font-semibold select-none" />
                                </div>
                            </>
                        ) : (
                            <>
                                {family === 'rect' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-2 text-sm">{l.b}</label>
                                            <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-2 text-sm">{l.h}</label>
                                            <input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                                        </div>
                                    </>
                                )}
                                {family === 'circle' && (
                                    <div className="col-span-2">
                                        <label className="block text-gray-300 font-medium mb-2 text-sm">{l.d}</label>
                                        <input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                                    </div>
                                )}
                                {family === 'hollow' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-2 text-sm">{l.B}</label>
                                            <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-2 text-sm">{l.H}</label>
                                            <input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-gray-300 font-medium mb-2 text-sm">{l.t}</label>
                                            <input type="number" value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* SVG Visual and Result Board */}
                <div className="flex flex-col items-center justify-between p-8 bg-slate-900/60 rounded-3xl border border-white/5 h-full shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                    
                    <div className="flex-1 w-full flex items-center justify-center p-4">
                        {/* SVGs */}
                        {svgType === 'rect' && (
                            <svg className="w-40 h-40 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                                <rect x="25" y="10" width="50" height="80" rx="2" />
                            </svg>
                        )}
                        {svgType === 'circle' && (
                            <svg className="w-40 h-40 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                        )}
                        {svgType === 'hollow' && (
                            <svg className="w-40 h-40 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 15h70v70H15V15zm15 15v40h40V30H30z" />
                            </svg>
                        )}
                        {svgType === 'IBeam' && (
                            <svg className="w-40 h-40 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" viewBox="0 0 100 100" fill="currentColor">
                                {/* I Beam Shape */}
                                <path d="M20,10 H80 V25 H60 V75 H80 V90 H20 V75 H40 V25 H20 Z" />
                            </svg>
                        )}
                        {svgType === 'UChannel' && (
                            <svg className="w-40 h-40 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" viewBox="0 0 100 100" fill="currentColor">
                                {/* U Channel Shape */}
                                <path d="M20,10 H70 V25 H40 V75 H70 V90 H20 Z" />
                            </svg>
                        )}
                    </div>

                    <div className="w-full mt-6 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 border-t-2 border-cyan-400 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 text-center shadow-[0_-10px_30px_rgba(6,182,212,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="text-cyan-200 font-bold tracking-wide uppercase text-sm relative z-10">{l.result}</span>
                        <div className="text-5xl font-black text-white relative z-10 tracking-tight drop-shadow-md">
                            {I > 0 ? I.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'} 
                            <span className="text-cyan-400 text-2xl font-bold ml-2">{l.unit}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CalculadoraInercia;
