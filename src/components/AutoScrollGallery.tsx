import { GALLERY_IMAGES_LEFT, GALLERY_IMAGES_RIGHT } from '../data/mockData';

export default function AutoScrollGallery() {
  return (
    <section id="gallery-scroller-section" className="py-24 bg-[#08090C] overflow-hidden relative">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-900/40 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-900/40 pointer-events-none"></div>

      {/* Styled inline keyframes for maximum rendering reliability across browsers */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .marquee-group:hover .animate-marquee-left,
        .marquee-group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <span className="font-mono text-xs tracking-[0.25em] text-[#10B981] uppercase font-bold">
          DIGITAL ARCHIVE EXHIBITION
        </span>
        <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white mt-3 select-none">
          Automated Architectural Galleries
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-4 font-sans leading-relaxed">
          Stroll through simulated, computer-generated interior blueprints, parametric skywards developments, and real land-bank coordinates in continuous smooth motion.
        </p>
      </div>

      <div id="gallery-marquee-containers" className="space-y-8 relative z-10 marquee-group">
        {/* Track 1: Left-to-Right Move (Moving images leftwards automatically) */}
        <div id="scroller-track-left" className="relative w-full overflow-hidden py-2 select-none">
          {/* Subtle side-blur gradient overlays to frame the seamless scroll */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#08090C] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#08090C] to-transparent z-20 pointer-events-none"></div>

          <div className="animate-marquee-left flex gap-6">
            {/* Duplicating the array to make the loop physically infinite and seamless */}
            {[...GALLERY_IMAGES_LEFT, ...GALLERY_IMAGES_LEFT].map((item, index) => (
              <div
                key={`left-${index}`}
                id={`scroller-item-left-${index}`}
                className="relative group w-[280px] md:w-[380px] aspect-[16/10] overflow-hidden rounded-md border border-slate-900 shadow-xl flex-shrink-0 cursor-pointer"
              >
                {/* Overlay with details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
                
                {/* Zoomable Image */}
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Caption Label */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="font-mono text-[9px] tracking-widest text-[#10B981] font-semibold block uppercase">
                    PLOT VISUALIZATION
                  </span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white tracking-wide mt-1 block">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right-to-Left Move (Moving images rightwards automatically) */}
        <div id="scroller-track-right" className="relative w-full overflow-hidden py-2 select-none">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#08090C] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#08090C] to-transparent z-20 pointer-events-none"></div>

          <div className="animate-marquee-right flex gap-6">
            {/* Duplicating the array to make the loop physically infinite and seamless */}
            {[...GALLERY_IMAGES_RIGHT, ...GALLERY_IMAGES_RIGHT].map((item, index) => (
              <div
                key={`right-${index}`}
                id={`scroller-item-right-${index}`}
                className="relative group w-[280px] md:w-[380px] aspect-[16/10] overflow-hidden rounded-md border border-slate-900 shadow-xl flex-shrink-0 cursor-pointer"
              >
                {/* Overlay with details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
                
                {/* Zoomable Image */}
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Caption Label */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="font-mono text-[9px] tracking-widest text-[#10B981] font-semibold block uppercase">
                    ATMOSPHERIC INDEX
                  </span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white tracking-wide mt-1 block">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aesthetic feature description below ticker */}
      <div id="gallery-performance-label" className="flex justify-center items-center mt-12 text-slate-500 font-mono text-[10px] tracking-[0.2em] uppercase max-w-md mx-auto text-center px-4">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping mr-3"></span>
        Hover over galleries to pause exploration loop
      </div>
    </section>
  );
}
