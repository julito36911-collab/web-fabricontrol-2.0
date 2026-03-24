import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { videosData } from '../data/videosData';

const locales = {
  es: {
    title: "Fabricontrol TV - Videoteca",
    sub: "Aprende las mejores estrategias productivas.",
    close: "Cerrar"
  },
  en: {
    title: "Fabricontrol TV - Video Hub",
    sub: "Learn the best production strategies.",
    close: "Close"
  },
  he: {
    title: "Fabricontrol TV - ספריית וידאו",
    sub: "למד את אסטרטגיות הייצור הטובות ביותר.",
    close: "סגור"
  }
};

const VideoAIHub = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;
  const [selectedVideo, setSelectedVideo] = useState(null);

  // FIltrar la lista de videos importada según el idioma global activo de la app
  const filteredVideos = videosData.filter(v => v.lang === language);

  return (
    <div className={`mt-8 ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">📺 {l.title}</h2>
        <p className="text-xl text-cyan-300 font-medium">{l.sub}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredVideos.map((vid) => (
          <div 
            key={vid.id} 
            onClick={() => setSelectedVideo(vid.youtubeId)}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-video bg-slate-800 border-b border-white/10 overflow-hidden flex items-center justify-center">
              {/* Imagen en miniatura generada dinámicamente usando el ID de YouTube */}
              <img 
                src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`} 
                alt={vid.title} 
                className="absolute top-0 left-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="z-10 bg-cyan-500/90 rounded-full w-16 h-16 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-110 group-hover:bg-cyan-400 group-hover:shadow-[0_0_35px_rgba(6,182,212,1)] transition-all duration-300">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col bg-gradient-to-t from-slate-900/50 to-transparent">
              <span className="inline-block w-max px-3 py-1 rounded-full text-xs font-bold text-cyan-300 mb-4 bg-cyan-900/40 border border-cyan-500/30">
                {vid.category}
              </span>
              <h3 className="text-xl font-bold text-white leading-tight">
                {vid.title}
              </h3>
            </div>
          </div>
        ))}
        {/* Si no hay videos para el idioma (no debería pasar), mostramos un fallback */}
        {filteredVideos.length === 0 && (
          <p className="text-center text-gray-400 col-span-2 py-8">No videos available for this language.</p>
        )}
      </div>

      {/* MODAL REPRODUCTOR YOUTUBE FLOTANTE (STYLE OSCURO Y BORDES CYAN) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md transition-all duration-300" onClick={() => setSelectedVideo(null)}>
          <div 
            className="bg-[#1a202c] border-2 border-cyan-400 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.4)] w-full max-w-5xl overflow-hidden relative transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex p-3 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-900/50 ${isRtl ? 'justify-start' : 'justify-end'}`}>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white hover:bg-red-500/80 rounded-lg px-4 py-2 font-bold transition-all border border-transparent hover:border-red-400 flex items-center gap-2"
              >
                {l.close} <span className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              {/* Autoplay activado para que el video inicie cuando se abra el modal */}
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`} 
                title="Reproductor de Video IA" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAIHub;
