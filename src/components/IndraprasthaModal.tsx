import { X, Play, Volume2, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { HERO_VIDEO_MOCK } from '../data/mockData';

interface IndraprasthaModalProps {
  onClose: () => void;
}

export default function IndraprasthaModal({ onClose }: IndraprasthaModalProps) {
  return (
    <div
      id="cinematic-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        id="cinematic-container"
        className="relative bg-slate-950 border border-slate-900 w-full max-w-5xl rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in"
      >
        {/* Close Button top-right */}
        <button
          id="cinematic-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white p-2 rounded-sm cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Side - Left 7 cols */}
        <div id="cinematic-video-frame" className="relative flex-grow bg-black md:w-3/5 aspect-video md:aspect-auto md:h-[500px]">
          {/* We will load a gorgeous drone style loop representing high-end architecture */}
          <video
            src={HERO_VIDEO_MOCK}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover"
          />
          
          {/* Subtle real-time camera metadata indicator to simulate drone path feeds */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-950/80 backdrop-blur-sm border border-slate-900 rounded p-3 hidden sm:block font-mono text-[9px] text-slate-400 space-y-1">
            <div className="flex items-center text-[#10B981] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-2"></span>
              DRONE ORBIT PATH ACTIVE
            </div>
            <div>COORDINATES: 29.9877° N, 30.9547° E</div>
            <div>ELEVATION RANGE: 145m ASL</div>
          </div>
        </div>

        {/* Spec Information Side - Right 2/5 */}
        <div id="cinematic-sidebar" className="p-8 md:w-2/5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-900 self-stretch space-y-6">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-[#10B981] tracking-[0.2em] font-extrabold uppercase flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              SOVEREIGN EXPANSION STRATEGY
            </span>
            <h3 className="font-sans text-xl md:text-2xl font-semibold text-white tracking-tight">
              Indraprastha 2026 Expansion Plan
            </h3>
            
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
              The Indraprastha Western and Eastern corridors represent the single largest private land consolidation program in the state. Built upon zero-carbon frameworks.
            </p>

            <ul className="space-y-2.5 pt-4 border-t border-slate-900">
              <li className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-[#10B981]">▪</span>
                <span className="font-sans">Over $24B state infrastructure budget pool allocation</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-[#10B981]">▪</span>
                <span className="font-sans">Fast-track high-density commercial permit frameworks</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-[#10B981]">▪</span>
                <span className="font-sans">Pre-connected to Indraprastha high-speed maglev lines</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col gap-2">
            <button
              id="cinematic-cta-close"
              onClick={onClose}
              className="w-full bg-[#10B981] hover:bg-[#10B981]/95 text-slate-950 font-mono text-xs font-bold py-3 tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer"
            >
              CLOSE SIMULATION SCREEN
            </button>
            <span className="block font-mono text-[9px] text-slate-500 text-center tracking-[0.2em] uppercase mt-2">
              RECURRING COUPLING ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
