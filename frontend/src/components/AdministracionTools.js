import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    roiTitle: 'Calculadora de Ahorro',
    roiSub: 'Calcula tu Retorno de Inversión Tecnológico',
    orders: 'Órdenes al mes',
    hours: 'Horas cotizando por orden',
    cost: 'Costo por hora ($USD)',
    savings: 'Con Fabricontrol ahorras',
    year: ' al año y liberas ',
    days: ' días de trabajo',
    pdfTitle: 'Orden de Fabricación PDF',
    pdfSub: 'Plantilla de Piso para Manufactura',
    downloadBtn: 'Generar y Descargar PDF'
  },
  en: {
    roiTitle: 'Savings Calculator',
    roiSub: 'Calculate your Technological ROI',
    orders: 'Orders per month',
    hours: 'Quoting hours per order',
    cost: 'Hourly rate ($USD)',
    savings: 'With Fabricontrol you save',
    year: ' per year & free up ',
    days: ' work days',
    pdfTitle: 'Manufacturing Order PDF',
    pdfSub: 'Shop Floor Blank Template',
    downloadBtn: 'Generate & Download PDF'
  },
  he: {
    roiTitle: 'מחשבון חיסכון',
    roiSub: 'חשב את החזר ההשקעה הטכנולוגי שלך',
    orders: 'הזמנות בחודש',
    hours: 'שעות תמחור להזמנה',
    cost: 'עלות שעתית ($USD)',
    savings: 'עם Fabricontrol אתה חוסך',
    year: ' בשנה ומפנה ',
    days: ' ימי עבודה',
    pdfTitle: 'טופס פקודת עבודה PDF',
    pdfSub: 'תבנית ריקה לרצפת הייצור',
    downloadBtn: 'הורד מסמך PDF עכשיו'
  }
};

export const CalculadoraROI = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  const [orders, setOrders] = useState(50);
  const [hours, setHours] = useState(3);
  const [cost, setCost] = useState(35);

  // Fabricontrol automates quoting saving approx 85% of standard manual time execution
  const currentMonthlyHours = orders * hours;
  const currentMonthlyCost = currentMonthlyHours * cost;
  
  const savedHoursMonthly = currentMonthlyHours * 0.85; 
  const savedCostMonthly = savedHoursMonthly * cost;

  const yearlySavings = savedCostMonthly * 12;
  const yearlyDaysFreed = (savedHoursMonthly * 12) / 8;

  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 ${isRtl ? 'dir-rtl text-right font-hebrew' : 'dir-ltr text-left font-sans'}`}>
        <h3 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <span className="text-emerald-400">📈</span> {l.roiTitle}
        </h3>
        <p className="text-gray-400 font-bold mb-8 tracking-widest text-xs uppercase">{l.roiSub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                <label className="block text-emerald-300 font-bold mb-3">{l.orders}</label>
                <input type="number" value={orders} onChange={(e) => setOrders(Number(e.target.value))} className="w-full bg-slate-800 border-2 border-slate-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-400 transition-all font-black text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                <label className="block text-emerald-300 font-bold mb-3">{l.hours}</label>
                <input type="number" step="0.5" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full bg-slate-800 border-2 border-slate-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-400 transition-all font-black text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                <label className="block text-emerald-300 font-bold mb-3">{l.cost}</label>
                <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} className="w-full bg-slate-800 border-2 border-slate-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-400 transition-all font-black text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
            </div>
        </div>

        <div className={`w-full bg-gradient-to-r from-teal-900/90 to-emerald-900/90 border border-emerald-400 p-8 rounded-2xl flex flex-col items-center justify-center gap-3 text-center shadow-[0_0_50px_rgba(52,211,153,0.3)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}>
            <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-2xl md:text-3xl font-black text-white relative z-10 tracking-tight leading-loose w-full max-w-4xl mx-auto">
                {l.savings} <span className="text-emerald-400 px-2 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">${yearlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> {l.year} 
                <span className="text-emerald-400 px-2 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]"> {yearlyDaysFreed.toFixed(0)}</span> {l.days}
            </div>
        </div>
    </div>
  );
};

export const OrdenFabricacionPDF = () => {
    const { language, isRtl } = useLanguage();
    const l = locales[language] || locales.es;

    const generatePDF = () => {
        try {
            const buildPDF = (doc) => {
                // Header
                doc.setFillColor(26, 32, 44); // bg-[#1a202c]
                doc.rect(0, 0, 210, 40, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(24);
                doc.setFont("helvetica", "bold");
                doc.text("FABRICONTROL", 14, 25);
                
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.text("Manufacturing Order / Orden de Fabricacion", 125, 25);
                
                // Client Section
                doc.setTextColor(40, 40, 40);
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("Client Information", 14, 55);
                
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.text("Company: _________________________", 14, 65);
                doc.text("Date: _________________________", 125, 65);
                doc.text("Project: __________________________", 14, 75);
                doc.text("Deadline: ______________________", 125, 75);
                
                doc.setLineWidth(0.5);
                doc.setDrawColor(200, 200, 200);
                doc.line(14, 85, 196, 85);
                
                // Tech Specs
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("Technical Specifications", 14, 100);
                
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.text("Material Type: _______________________", 14, 110);
                doc.text("Thickness: ____________________", 125, 110);
                doc.text("Cutting Tech: [ ] Laser   [ ] Plasma   [ ] Waterjet", 14, 120);
                doc.text("Bending: [ ] Yes   [ ] No", 125, 120);
                
                // Notes Box
                doc.setDrawColor(100, 100, 100);
                doc.rect(14, 135, 182, 80);
                doc.setFont("helvetica", "bold");
                doc.text("Blueprint / Notes:", 18, 142);
                
                // Signatures
                doc.setFontSize(12);
                doc.text("Operator Signature: ___________________", 14, 250);
                doc.text("QC Approval: ___________________", 125, 250);
                
                doc.save("Fabricontrol_WorkOrder.pdf");
            };

            if (window.jspdf && window.jspdf.jsPDF) {
                const doc = new window.jspdf.jsPDF();
                buildPDF(doc);
            } else {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                script.onload = () => {
                    const doc = new window.jspdf.jsPDF();
                    buildPDF(doc);
                };
                document.body.appendChild(script);
            }
        } catch (error) {
            console.error("PDF generation error.", error);
            alert("Error: Hubo un problema al generar el PDF desde el navegador.");
        }
    };

    return (
        <div className={`bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 ${isRtl ? 'dir-rtl md:text-right font-hebrew flex-row-reverse' : 'dir-ltr font-sans'}`}>
            <div className={`flex flex-col md:flex-row items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-24 h-24 bg-cyan-900/40 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] border border-cyan-500/30 flex-shrink-0 relative overflow-hidden group">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📄</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black text-white mb-2">{l.pdfTitle}</h3>
                    <p className="text-cyan-300/80 font-bold uppercase tracking-wider text-sm">{l.pdfSub}</p>
                </div>
            </div>
            
            <button 
                onClick={generatePDF}
                className="py-5 px-10 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transform hover:-translate-y-1 text-lg flex items-center gap-3 w-full md:w-auto justify-center"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> 
                {l.downloadBtn}
            </button>
        </div>
    );
};
