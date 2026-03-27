import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { coursesData } from '../data/coursesData';

/* ─────────────────────────────────────────
   LOCALES
───────────────────────────────────────── */
const locales = {
  es: {
    heroTitle: '🎓 FabriControl Academy',
    heroSub: 'Cursos 100% gratuitos diseñados para dueños de talleres y operadores CNC.',
    startBtn: 'Iniciar Curso Gratis',
    modules: 'Módulos',
    duration: 'Duración',
    level: 'Nivel',
    closeHint: 'Haz clic fuera para cerrar',
    leadTitle: '¿Quieres descargar el certificado y el material de apoyo?',
    leadSub: 'Déjanos tu email y te lo enviamos gratis 📩',
    leadPlaceholder: 'tu@email.com',
    leadBtn: 'Enviar y descargar',
    leadSuccess: '✅ ¡Perfecto! Te enviaremos los materiales pronto.',
    badge: 'GRATIS',
    watchingNow: 'Viendo ahora:',
  },
  en: {
    heroTitle: '🎓 FabriControl Academy',
    heroSub: '100% free courses designed for workshop owners and CNC operators.',
    startBtn: 'Start Free Course',
    modules: 'Modules',
    duration: 'Duration',
    level: 'Level',
    closeHint: 'Click outside to close',
    leadTitle: 'Want to download the certificate and support materials?',
    leadSub: 'Leave your email and we\'ll send them for free 📩',
    leadPlaceholder: 'your@email.com',
    leadBtn: 'Send & Download',
    leadSuccess: '✅ Perfect! We will send you the materials soon.',
    badge: 'FREE',
    watchingNow: 'Now watching:',
  },
  he: {
    heroTitle: '🎓 FabriControl Academy',
    heroSub: 'קורסים חינמיים ב-100% המיועדים לבעלי מפעלים ומפעילי CNC.',
    startBtn: 'התחל קורס בחינם',
    modules: 'מודולים',
    duration: 'משך',
    level: 'רמה',
    closeHint: 'לחץ מחוץ לסרטון כדי לסגור',
    leadTitle: 'רוצה להוריד את התעודה וחומרי העזר?',
    leadSub: 'השאר את האימייל שלך ונשלח לך בחינם 📩',
    leadPlaceholder: 'האימייל@שלך.com',
    leadBtn: 'שלח והורד',
    leadSuccess: '✅ מעולה! נשלח לך את החומרים בקרוב.',
    badge: 'חינם',
    watchingNow: 'צופה עכשיו:',
  },
};

/* ─────────────────────────────────────────
   COURSE MODAL
───────────────────────────────────────── */
const CourseModal = ({ course, onClose, isRtl, l }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close on ESC
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
    if (!email || !email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const videoUrl = `https://www.youtube.com/embed/${course.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(8, 12, 26, 0.97)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.25)] border border-white/10 bg-[#0f172a] animate-in zoom-in-95 duration-300`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Top colorbar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-10" />

        {/* Close btn */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-[210] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/80 text-white backdrop-blur-md border border-white/20 transition-all duration-300 group`}
        >
          <span className="text-xl group-hover:rotate-90 transition-transform duration-300">✕</span>
        </button>

        {/* Video section */}
        <div className="w-full aspect-video bg-black">
          <iframe
            src={videoUrl}
            title={course.title}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Course info */}
        <div className="p-6 md:p-8">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2">{l.watchingNow}</p>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{course.title}</h3>
          <p className="text-gray-400 text-base mb-6 leading-relaxed">{course.description}</p>

          <div className={`flex flex-wrap gap-4 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <span className="text-cyan-400">⏱</span>
              <span className="text-white text-sm font-semibold">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <span>📚</span>
              <span className="text-white text-sm font-semibold">{course.modules} {l.modules}</span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm"
              style={{ color: course.levelColor, borderColor: `${course.levelColor}40`, background: `${course.levelColor}15` }}
            >
              <span>🏅</span>
              {course.level}
            </div>
          </div>

          {/* ── LEAD MAGNET BAR ── */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
            <div className={`flex items-start gap-3 mb-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <span className="text-3xl mt-0.5">🎓</span>
              <div>
                <p className="text-white font-black text-base md:text-lg leading-snug">{l.leadTitle}</p>
                <p className="text-gray-400 text-sm mt-1">{l.leadSub}</p>
              </div>
            </div>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className={`flex flex-col sm:flex-row gap-3 ${isRtl ? 'sm:flex-row-reverse' : ''}`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={l.leadPlaceholder}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-xl text-sm transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-70 whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      ...
                    </span>
                  ) : l.leadBtn}
                </button>
              </form>
            ) : (
              <p className="text-green-400 font-bold text-center py-2 animate-in fade-in duration-500">{l.leadSuccess}</p>
            )}
          </div>
        </div>
      </div>

      {/* Click-outside hint */}
      <div className="absolute bottom-4 text-gray-500 text-xs font-medium pointer-events-none select-none">{l.closeHint}</div>
    </div>
  );
};

/* ─────────────────────────────────────────
   COURSE CARD
───────────────────────────────────────── */
const CourseCard = ({ course, onSelect, l, isRtl }) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-cyan-500/40 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-500 flex flex-col"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
        {!imgErr ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
            <span className="text-6xl">{course.emoji}</span>
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-cyan-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-cyan-500/40 scale-90 group-hover:scale-100 transition-transform duration-300">
            <span className="text-white text-2xl ml-1">▶</span>
          </div>
        </div>
        {/* Free badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-cyan-500 text-white text-xs font-black rounded-full shadow-lg shadow-cyan-500/40 uppercase tracking-wider">
          {l.badge}
        </div>
        {/* Level chip */}
        <div
          className="absolute top-3 right-3 px-3 py-1 text-xs font-black rounded-full uppercase tracking-wider"
          style={{ color: course.levelColor, background: `${course.levelColor}25`, border: `1px solid ${course.levelColor}50` }}
        >
          {course.level}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-cyan-400/70 text-xs font-bold uppercase tracking-widest mb-2">{course.category}</p>
        <h3 className="text-white font-black text-xl leading-snug mb-3 group-hover:text-cyan-300 transition-colors duration-300">{course.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{course.description}</p>

        {/* Meta */}
        <div className={`flex items-center gap-4 text-xs text-gray-500 mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="flex items-center gap-1"><span className="text-cyan-500">⏱</span> {course.duration}</span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1"><span className="text-purple-400">📚</span> {course.modules} {l.modules}</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onSelect(course)}
          className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95 text-sm uppercase tracking-wider"
        >
          🎓 {l.startBtn}
        </button>
      </div>

      {/* Glow corner */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-cyan-500/10 transition-all duration-700 pointer-events-none" />
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN ACADEMIA COMPONENT
───────────────────────────────────────── */
const Academia = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;
  const courses = coursesData[language] || coursesData.es;
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* SECTION HERO */}
      <div className={`text-center mb-14 ${isRtl ? 'text-right sm:text-center' : ''}`}>
        <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          {language === 'he' ? 'חינמי לחלוטין' : language === 'en' ? '100% Free Access' : 'Acceso 100% Gratuito'}
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">{l.heroTitle}</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{l.heroSub}</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={setSelectedCourse}
            l={l}
            isRtl={isRtl}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          isRtl={isRtl}
          l={l}
        />
      )}
    </div>
  );
};

export default Academia;
