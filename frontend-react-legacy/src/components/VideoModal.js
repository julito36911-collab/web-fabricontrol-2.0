import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const VideoModal = ({ isOpen, onClose }) => {
  const { language, isRtl } = useLanguage();

  // ES/EN uses one link, HE uses another
  const videoId = (language === 'he') ? 'IsTVmbo9_G8' : 'h_esweDlOck';
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => { e.key === 'Escape' && onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
      style={{ backgroundColor: 'rgba(10, 15, 26, 0.95)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.3)] border border-cyan-500/30 transition-all duration-500 scale-in-center`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Top Left for HE, Top Right for ES/EN */}
        <button 
          onClick={onClose}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/80 text-white backdrop-blur-md border border-white/20 transition-all duration-300 group`}
        >
          <span className="text-2xl group-hover:rotate-90 transition-transform">✕</span>
        </button>

        {/* Video Iframe */}
        <iframe
          src={videoUrl}
          title="FabriControl Video"
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Click outside hint */}
      <div className="absolute bottom-6 text-gray-400 text-sm font-medium opacity-60 pointer-events-none">
        {isRtl ? 'לחץ מחוץ לסרטון כדי לסגור' : 'Click anywhere outside to close'}
      </div>
    </div>
  );
};

export default VideoModal;
