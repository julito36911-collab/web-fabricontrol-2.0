import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { videosData } from '../data/videosData';

const locales = {
  es: {
    title: "Masterclass y Tutoriales Técnicos",
    sub: "Selección de los mejores recursos para optimizar tu taller.",
    close: "Cerrar"
  },
  en: {
    title: "Technical Masterclass & Tutorials",
    sub: "Selection of the best resources to optimize your shop.",
    close: "Close"
  },
  he: {
    title: "כיתת אמן ומדריכים טכניים",
    sub: "מבחר המשאבי הידע הטובים ביותר לייעול המפעל שלך.",
    close: "סגור"
  }
};

const VideoAIHub = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filtrar videos según el idioma
  const filteredVideos = videosData.filter(v => v.lang === language);

  return (
    <div className={`mt-12 ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      
      {/* Header Sección */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 animate-in slide-in-from-top-4 duration-700">
           📺 {l.title}
        </h2>
        <p className="text-xl text-cyan-400 font-medium max-w-2xl mx-auto opacity-80">
          {l.sub}
        </p>
      </div>

      {/* Grid Netflix Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {filteredVideos.map((vid) => (
          <div 
            key={vid.id} 
            onClick={() => setSelectedVideo(vid.youtubeId)}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:bg-white/10 cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
               <img 
                 src={`https://img.youtube.com/vi/${vid.youtubeId}/maxresdefault.jpg`} 
                 alt={vid.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                 onError={(e) => { e.target.src = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`; }}
               />
               
               {/* Overlay con gradiente */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>

               {/* Botón Play Flotante */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] transform scale-90 group-hover:scale-110 transition-all duration-300 ring-4 ring-white/20">
                    <svg className={`w-8 h-8 ${isRtl ? 'rotate-180 mr-1' : 'ml-1'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4l12 6-12 6z" />
                    </svg>
                  </div>
               </div>

               {/* Categoría Badge */}
               <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
                 <span className="bg-[#0b0f1a]/80 backdrop-blur-md text-cyan-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-cyan-400/30">
                   {vid.category}
                 </span>
               </div>
            </div>

            {/* Info */}
            <div className="p-8">
               <h4 className="text-xl font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                  {vid.title}
               </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Reproductor */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b0f1a]/95 backdrop-blur-lg animate-in fade-in duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="w-full max-w-5xl bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.4)] border border-cyan-400/20 relative animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className={`flex items-center p-4 bg-white/5 border-b border-white/10 ${isRtl ? 'justify-start' : 'justify-end'}`}>
               <button 
                 onClick={() => setSelectedVideo(null)}
                 className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-2 rounded-full font-black transition-all border border-red-500/30"
               >
                 {l.close} <span className="text-xl">✕</span>
               </button>
            </div>

            {/* Iframe */}
            <div className="relative aspect-video">
               <iframe 
                 width="100%" 
                 height="100%" 
                 src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`} 
                 title="Fabricontrol TV Player" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAIHub;
