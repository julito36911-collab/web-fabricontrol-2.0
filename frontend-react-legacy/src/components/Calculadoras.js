import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    tonTitle: "Calculadora de Tonelaje Profesional",
    tonEspesor: "Espesor (mm)",
    tonLong: "Longitud (mm)",
    tonDado: "Apertura de Dado V (mm)",
    tonResult: "Fuerza Requerida:",
    tonUnit: " Toneladas",
    matTitle: "Calculadora de Peso Teórico",
    matMaterial: "Material",
    matAcero: "Acero Carbono",
    matInox: "Acero Inoxidable",
    matAlum: "Aluminio",
    matAncho: "Ancho (mm)",
    matResult: "Peso Total:",
    matUnit: " kg",
    convTitle: "Tabla de Calibres (Gauge a mm)",
    convGauge: "Calibre (Ga)",
    convMm: "Espesor (mm)"
  },
  en: {
    tonTitle: "Professional Tonnage Calculator",
    tonEspesor: "Thickness (mm)",
    tonLong: "Length (mm)",
    tonDado: "V-Die Opening (mm)",
    tonResult: "Required Force:",
    tonUnit: " Tons",
    matTitle: "Theoretical Weight Calculator",
    matMaterial: "Material",
    matAcero: "Carbon Steel",
    matInox: "Stainless Steel",
    matAlum: "Aluminum",
    matAncho: "Width (mm)",
    matResult: "Total Weight:",
    matUnit: " kg",
    convTitle: "Gauge to mm Converter",
    convGauge: "Gauge (Ga)",
    convMm: "Thickness (mm)"
  },
  he: {
    tonTitle: "מחשבון טונאז' מקצועי",
    tonEspesor: "עובי (מ\"מ)",
    tonLong: "אורך (מ\"מ)",
    tonDado: "פתיחת תבנית V (מ\"מ)",
    tonResult: "כוח נדרש:",
    tonUnit: " טון",
    matTitle: "מחשבון משקל תיאורטי",
    matMaterial: "חומר",
    matAcero: "פלדת פחמן",
    matInox: "נירוסטה",
    matAlum: "אלומיניום",
    matAncho: "רוחב (מ\"מ)",
    matResult: "משקל כולל:",
    matUnit: " ק\"ג",
    convTitle: "ממיר יחידות (Gauge למ\"מ)",
    convGauge: "מידה (Ga)",
    convMm: "עובי (מ\"מ)"
  }
};

export const CalculadoraPlegado = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  const [espesor, setEspesor] = useState(2);
  const [longitud, setLongitud] = useState(1000);
  const [dado, setDado] = useState(16);

  // Formula base aproximada (Resistencia Acero Dulce)
  const tonelaje = dado > 0 ? ((espesor * espesor * 1.4 * longitud) / dado) / 100 : 0;

  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 ${isRtl ? 'text-right' : 'text-left'}`}>
      <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span>📐</span> {l.tonTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-gray-300 font-medium mb-2">{l.tonEspesor}</label>
          <input type="number" value={espesor} onChange={(e) => setEspesor(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-semibold" />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">{l.tonLong}</label>
          <input type="number" value={longitud} onChange={(e) => setLongitud(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-semibold" />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">{l.tonDado}</label>
          <input type="number" value={dado} onChange={(e) => setDado(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-semibold" />
        </div>
      </div>
      <div className={`bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 p-6 rounded-xl flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span className="text-xl text-gray-300 font-medium">{l.tonResult}</span>
        <span className="text-4xl font-extrabold text-white">{tonelaje.toFixed(1)} <span className="text-cyan-400 text-lg">{l.tonUnit}</span></span>
      </div>
    </div>
  );
};

export const CalculadoraMateriales = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  const [espesor, setEspesor] = useState(2);
  const [longitud, setLongitud] = useState(2440);
  const [ancho, setAncho] = useState(1220);
  const [densidad, setDensidad] = useState(7.85); // 7.85 acero, 7.93 inox, 2.7 alum

  const peso = ((longitud / 1000) * (ancho / 1000) * espesor * densidad);

  const gauges = [
    { ga: "10 Ga", mm: "3.416" },
    { ga: "11 Ga", mm: "3.038" },
    { ga: "12 Ga", mm: "2.656" },
    { ga: "14 Ga", mm: "1.897" },
    { ga: "16 Ga", mm: "1.518" },
    { ga: "18 Ga", mm: "1.214" },
    { ga: "20 Ga", mm: "0.911" },
  ];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <span>⚖️</span> {l.matTitle}
        </h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="col-span-2">
            <label className="block text-gray-300 font-medium mb-2">{l.matMaterial}</label>
            <select value={densidad} onChange={(e) => setDensidad(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-semibold appearance-none">
              <option value={7.85}>{l.matAcero} (7.85 g/cm³)</option>
              <option value={7.93}>{l.matInox} (7.93 g/cm³)</option>
              <option value={2.70}>{l.matAlum} (2.70 g/cm³)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">{l.tonEspesor}</label>
            <input type="number" value={espesor} onChange={(e) => setEspesor(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">{l.tonLong}</label>
            <input type="number" value={longitud} onChange={(e) => setLongitud(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400" />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-300 font-medium mb-2">{l.matAncho}</label>
            <input type="number" value={ancho} onChange={(e) => setAncho(Number(e.target.value))} className="w-full bg-slate-800/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400" />
          </div>
        </div>
        <div className={`bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 p-6 rounded-xl flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="text-xl text-gray-300 font-medium">{l.matResult}</span>
          <span className="text-4xl font-extrabold text-white">{peso.toFixed(2)} <span className="text-cyan-400 text-lg">{l.matUnit}</span></span>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <span>📏</span> {l.convTitle}
        </h3>
        <div className="flex-grow overflow-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-white border-collapse">
            <thead className="bg-white/10">
              <tr>
                <th className={`p-4 font-bold border-b border-white/10 ${isRtl ? 'text-right' : 'text-left'}`}>{l.convGauge}</th>
                <th className={`p-4 font-bold border-b border-white/10 ${isRtl ? 'text-right' : 'text-left'}`}>{l.convMm}</th>
              </tr>
            </thead>
            <tbody>
              {gauges.map((g, i) => (
                <tr key={i} className="hover:bg-white/5 border-b border-white/5 transition-colors">
                  <td className="p-4 font-semibold text-cyan-300">{g.ga}</td>
                  <td className="p-4 text-gray-300">{g.mm} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
