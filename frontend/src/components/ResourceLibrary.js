import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { resourcesData } from '../data/resourcesData';

/* ─────────────────────────────────────────
   LOCALES
───────────────────────────────────────── */
const locales = {
  es: {
    heroTitle: '📥 Centro de Recursos',
    heroSub: 'Descarga manuales, tablas y plantillas para tu taller.',
    heroBadge: 'Recursos Gratuitos',
    downloadBtn: '📥 Descargar Gratis',
    typeLabel: 'Tipo',
    sizeLabel: 'Tamaño',
    pagesLabel: 'Páginas',
    modalTitle: 'Recibe tu archivo en segundos',
    modalSub: 'Ingresa tu correo y te enviamos el archivo de alta resolución',
    placeholder: 'tu@email.com',
    sendBtn: 'Enviar y Descargar',
    success: '¡Éxito! Tu descarga ha comenzado. 🎉',
    successSub: 'Revisa tu bandeja de entrada en los próximos minutos.',
    sending: 'Enviando...',
    closeHint: 'Presiona ESC o haz clic fuera para cerrar',
    downloading: 'Preparando tu archivo...',
    freeTag: 'GRATIS',
    resourceCount: 'recursos disponibles',
  },
  en: {
    heroTitle: '📥 Resource Center',
    heroSub: 'Download manuals, charts, and templates for your shop.',
    heroBadge: 'Free Resources',
    downloadBtn: '📥 Download Free',
    typeLabel: 'Type',
    sizeLabel: 'Size',
    pagesLabel: 'Pages',
    modalTitle: 'Get your file in seconds',
    modalSub: 'Enter your email and we\'ll send you the high-resolution file',
    placeholder: 'your@email.com',
    sendBtn: 'Send & Download',
    success: 'Success! Your download has started. 🎉',
    successSub: 'Check your inbox in the next few minutes.',
    sending: 'Sending...',
    closeHint: 'Press ESC or click outside to close',
    downloading: 'Preparing your file...',
    freeTag: 'FREE',
    resourceCount: 'resources available',
  },
  he: {
    heroTitle: '📥 מרכז משאבים',
    heroSub: 'הורד מדריכים, טבלאות ותבניות לסדנה שלך.',
    heroBadge: 'משאבים חינמיים',
    downloadBtn: '📥 הורדה חינמית',
    typeLabel: 'סוג',
    sizeLabel: 'גודל',
    pagesLabel: "עמ'",
    modalTitle: 'קבל את הקובץ תוך שניות',
    modalSub: 'הזן את האימייל שלך ונשלח לך את הקובץ ברזולוציה גבוהה',
    placeholder: 'האימייל@שלך.com',
    sendBtn: 'שלח והורד',
    success: '!הצלחה! ההורדה שלך החלה 🎉',
    successSub: 'בדוק את תיבת הדואר הנכנס שלך בדקות הקרובות.',
    sending: '...שולח',
    closeHint: 'לחץ ESC או לחץ מחוץ לחלון לסגירה',
    downloading: '...מכין את הקובץ שלך',
    freeTag: 'חינם',
    resourceCount: 'משאבים זמינים',
  },
};

/* ─────────────────────────────────────────
   TYPE BADGE CONFIG
───────────────────────────────────────── */
const typeConfig = {
  PDF:  { label: 'PDF',   bg: '#ef444420', border: '#ef444450', text: '#ef4444' },
  XLS:  { label: 'Excel', bg: '#22c55e20', border: '#22c55e50', text: '#22c55e' },
  PPT:  { label: 'PPT',   bg: '#f9731620', border: '#f9731650', text: '#f97316' },
};

/* ─────────────────────────────────────────
   DOWNLOAD MODAL
───────────────────────────────────────── */
const DownloadModal = ({ resource, onClose, isRtl, l }) => {
  const [email, setEmail]       = useState('');
  const [phase, setPhase]       = useState('form'); // 'form' | 'loading' | 'success'
  const [error, setError]       = useState('');

  // ESC + body lock
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(isRtl ? 'נא להזין כתובת אימייל תקינה' : 'Please enter a valid email address');
      return;
    }
    setError('');
    setPhase('loading');

    // Simulate sending delay then trigger download
    setTimeout(() => {
      setPhase('success');
      // Trigger simulated download
      try {
        const link = document.createElement('a');
        link.href = resource.downloadUrl;
        link.download = `${resource.title.replace(/\s+/g, '_')}.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (_) { /* silent fail for demo */ }
    }, 1500);
  };

  const tc = typeConfig[resource.type] || typeConfig.PDF;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(8,12,26,0.96)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.2)] border border-white/10 bg-[#0f172a] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Top rainbow bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/80 text-white border border-white/20 transition-all duration-300 group`}
        >
          <span className="text-lg group-hover:rotate-90 transition-transform duration-300">✕</span>
        </button>

        <div className="p-8">
          {/* Resource preview row */}
          <div className={`flex items-start gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border"
              style={{ background: resource.colorBg, borderColor: resource.colorBorder }}
            >
              {resource.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`flex items-center gap-2 mb-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ color: tc.text, background: tc.bg, border: `1px solid ${tc.border}` }}
                >
                  {tc.label}
                </span>
                <span className="text-gray-500 text-xs">{resource.size}</span>
              </div>
              <h4 className="text-white font-black text-lg leading-tight line-clamp-2">{resource.title}</h4>
            </div>
          </div>

          {phase === 'form' && (
            <>
              <h3 className="text-2xl font-black text-white mb-2">{l.modalTitle}</h3>
              <p className="text-gray-400 text-sm mb-6">{l.modalSub}</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder={l.placeholder}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  required
                />
                {error && (
                  <p className="text-red-400 text-xs font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-xl text-sm transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95 uppercase tracking-wider"
                >
                  {l.sendBtn}
                </button>
              </form>
            </>
          )}

          {phase === 'loading' && (
            <div className="flex flex-col items-center py-8 gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin" />
              <p className="text-gray-300 font-semibold text-sm">{l.sending}</p>
              <p className="text-gray-500 text-xs">{l.downloading}</p>
            </div>
          )}

          {phase === 'success' && (
            <div className="flex flex-col items-center py-6 gap-3 text-center animate-in fade-in duration-500">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-4xl mb-2">
                ✅
              </div>
              <h3 className="text-white font-black text-xl">{l.success}</h3>
              <p className="text-gray-400 text-sm max-w-xs">{l.successSub}</p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl font-bold text-sm transition-all"
              >
                {isRtl ? 'סגור' : 'Close'}
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs pb-4 px-8">{l.closeHint}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   RESOURCE CARD
───────────────────────────────────────── */
const ResourceCard = ({ resource, onDownload, l, isRtl }) => {
  const tc = typeConfig[resource.type] || typeConfig.PDF;

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-white/20 hover:-translate-y-3 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ '--hover-shadow': resource.colorBg }}
    >
      {/* Glow blob */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{ background: resource.color }}
      />

      {/* Document preview area */}
      <div
        className="relative flex items-center justify-center h-36 border-b border-white/5 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${resource.colorBg}, transparent)` }}
      >
        {/* Large icon */}
        <span className="text-7xl select-none group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
          {resource.icon}
        </span>

        {/* Badges */}
        <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} flex flex-col gap-2`}>
          {resource.badge && (
            <span
              className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg"
              style={{ background: resource.badgeColor, color: '#fff' }}
            >
              {resource.badge}
            </span>
          )}
        </div>

        {/* Type chip */}
        <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'}`}>
          <span
            className="text-[11px] font-black px-3 py-1 rounded-full border"
            style={{ color: tc.text, background: tc.bg, borderColor: tc.border }}
          >
            {tc.label}
          </span>
        </div>

        {/* Free tag */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className="text-[10px] bg-white/10 text-white/60 border border-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {l.freeTag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-black text-lg leading-snug mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {resource.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{resource.description}</p>

        {/* Meta row */}
        <div className={`flex items-center gap-4 text-xs text-gray-500 mb-5 flex-wrap ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="flex items-center gap-1">
            <span style={{ color: resource.color }}>⚖️</span> {resource.size}
          </span>
          <span className="text-white/15">•</span>
          <span className="flex items-center gap-1">
            <span className="text-blue-400">📋</span> {resource.pages} {l.pagesLabel}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onDownload(resource)}
          className="w-full py-4 font-black rounded-xl text-sm transition-all duration-300 shadow-lg active:scale-95 uppercase tracking-wider border"
          style={{
            background: `linear-gradient(135deg, ${resource.color}22, ${resource.color}11)`,
            borderColor: resource.colorBorder,
            color: resource.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = resource.color;
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = `0 8px 32px ${resource.color}50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${resource.color}22, ${resource.color}11)`;
            e.currentTarget.style.color = resource.color;
            e.currentTarget.style.boxShadow = '';
          }}
        >
          {l.downloadBtn}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   STATS BAR
───────────────────────────────────────── */
const StatsBar = ({ resources, l, isRtl }) => {
  const pdfCount = resources.filter(r => r.type === 'PDF').length;
  const xlsCount = resources.filter(r => r.type === 'XLS').length;
  const pptCount = resources.filter(r => r.type === 'PPT').length;

  const chips = [
    { count: pdfCount, label: 'PDF',   color: '#ef4444', visible: pdfCount > 0 },
    { count: xlsCount, label: 'Excel', color: '#22c55e', visible: xlsCount > 0 },
    { count: pptCount, label: 'PPT',   color: '#f97316', visible: pptCount > 0 },
  ].filter(c => c.visible);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl">
        <span className="text-cyan-400 font-black text-lg">{resources.length}</span>
        <span className="text-gray-400 text-sm">{l.resourceCount}</span>
      </div>
      {chips.map(chip => (
        <div
          key={chip.label}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-bold"
          style={{ color: chip.color, background: `${chip.color}15`, borderColor: `${chip.color}35` }}
        >
          <span className="font-black">{chip.count}</span> {chip.label}
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const ResourceLibrary = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;
  const resources = resourcesData[language] || resourcesData.es;
  const [activeResource, setActiveResource] = useState(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* SECTION HERO */}
      <div className={`text-center mb-12 ${isRtl ? 'sm:text-center' : ''}`}>
        <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          {l.heroBadge}
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{l.heroTitle}</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{l.heroSub}</p>
      </div>

      {/* STATS */}
      <StatsBar resources={resources} l={l} isRtl={isRtl} />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onDownload={setActiveResource}
            l={l}
            isRtl={isRtl}
          />
        ))}
      </div>

      {/* MODAL */}
      {activeResource && (
        <DownloadModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
          isRtl={isRtl}
          l={l}
        />
      )}
    </div>
  );
};

export default ResourceLibrary;
