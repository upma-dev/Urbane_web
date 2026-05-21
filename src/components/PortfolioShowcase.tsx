import { useState } from 'react';
import { PORTFOLIO_PLOTS } from '../data/mockData';
import { PropertyPlot } from '../types';
import { Layers, MapPin, Eye, ArrowUpRight, Maximize2, ShieldAlert, X } from 'lucide-react';
import ThreeDTiltContainer from './ThreeDTiltContainer';

interface PortfolioShowcaseProps {
  onSelectPlotForProposal: (plotId: string) => void;
}

export default function PortfolioShowcase({ onSelectPlotForProposal }: PortfolioShowcaseProps) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedPlot, setSelectedPlot] = useState<PropertyPlot | null>(null);

  const filteredPlots = PORTFOLIO_PLOTS.filter((plot) => {
    if (filter === 'All') return true;
    return plot.zoning === filter;
  });

  const getStatusColor = (status: PropertyPlot['status']) => {
    switch (status) {
      case 'Leasing Open': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Under Construction': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Architectural Phase': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'Zoning Approved': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'Site Prep': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <section id="portfolio-section" className="py-24 bg-[#08090C] border-t border-slate-900/40 relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div id="portfolio-section-header" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] bg-gradient-to-r from-[#10B981] to-[#FAC638] bg-clip-text text-transparent uppercase font-bold flex items-center">
              <Layers className="h-4 w-4 mr-2 text-[#FAC638]" />
              EXCLUSIVE LAND BANK PORTFOLIO
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white mt-3">
              Land-Bank Enclaves
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
              Browse pre-screened coordinates with strategic heights approvals, complete water utilities, and direct proximity to major transport vectors.
            </p>
          </div>

          {/* Filter Bar */}
          <div id="portfolio-filters" className="flex flex-wrap gap-2">
            {['All', 'Residential', 'Commercial', 'Mixed-Use'].map((category) => (
              <button
                id={`filter-btn-${category}`}
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-xs font-mono tracking-widest transition-all duration-300 rounded-sm border ${
                  filter === category
                    ? 'bg-gradient-to-r from-[#10B981] to-[#FAC638] text-slate-950 border-0 font-bold shadow-lg shadow-amber-500/15 scale-[1.03]'
                    : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {filteredPlots.map((plot) => (
            <ThreeDTiltContainer
              id={`portfolio-card-${plot.id}`}
              key={plot.id}
              intensity={8}
              glow={true}
              className="group bg-slate-950/70 border border-slate-900/85 rounded-sm overflow-hidden flex flex-col justify-between card-3d animate-card-slide-up relative cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-500/50"
            >
              <div onClick={() => setSelectedPlot(plot)} className="w-full h-full flex flex-col justify-between">
                {/* Card Image Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 preserve-3d">
                  <img
                    src={plot.image}
                    alt={plot.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-108 translate-z-10"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                  
                  {/* Zoning Tag */}
                  <span className="absolute top-4 left-4 bg-slate-900/95 text-[10px] font-mono tracking-wider text-slate-200 border border-slate-800 py-1 px-2.5 rounded-sm translate-z-10">
                    {plot.zoning}
                  </span>

                  {/* Plot Code badge */}
                  <span className="absolute bottom-4 left-4 font-mono text-xs text-[#10B981] font-bold translate-z-15">
                    {plot.plotId}
                  </span>

                  {/* Inspect Button overlay */}
                  <button
                    id={`inspect-trigger-${plot.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlot(plot);
                    }}
                    className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full cursor-pointer transition-colors text-white translate-z-15"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Card Content body */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between preserve-3d">
                  <div className="translate-z-10">
                    <span className="block font-mono text-[9px] text-[#10B981] tracking-wide font-semibold uppercase">
                      {plot.category}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-white tracking-wide mt-1 group-hover:text-emerald-400 transition-colors">
                      {plot.title}
                    </h3>
                    
                    {/* Location label */}
                    <div className="flex items-center text-slate-300 text-xs mt-2">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-[#10B981]" />
                      <span className="truncate">{plot.location}</span>
                    </div>
                  </div>

                  {/* Grid stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900/80 text-xs translate-z-10">
                    <div>
                      <span className="block text-slate-500 font-mono text-[9px] tracking-wider uppercase">BUILDABLE AREA</span>
                      <span className="text-sm font-semibold text-slate-200">{plot.areaSqm.toLocaleString()} sqm</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 font-mono text-[9px] tracking-wider uppercase">TARGET YIELD</span>
                      <span className="text-sm font-semibold text-emerald-400 font-mono">+{plot.expectedYield}% / yr</span>
                    </div>
                  </div>

                  {/* Status Indicator Bar */}
                  <div className="pt-3 flex items-center justify-between translate-z-10">
                    <span className={`text-[9px] font-mono tracking-wider font-semibold uppercase py-1 px-2.5 rounded-sm ${getStatusColor(plot.status)}`}>
                      {plot.status}
                    </span>
                    <button
                      id={`view-details-${plot.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlot(plot);
                      }}
                      className="text-xs text-[#10B981] hover:text-emerald-300 font-mono flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      DETAILS
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </ThreeDTiltContainer>
          ))}
        </div>
      </div>

      {/* Plot Full-screen Inspect Modal */}
      {selectedPlot && (
        <div
          id="plot-detail-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            id="modal-window"
            className="relative bg-[#0B0D10] border border-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl p-6 md:p-8 animate-fade-in"
          >
            {/* Close trigger */}
            <button
              id="modal-close-trigger"
              onClick={() => setSelectedPlot(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900/80 p-2 border border-slate-800 rounded-sm cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal header section */}
            <div id="modal-grid-top" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-6">
              {/* Modal Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded border border-slate-900 bg-slate-950">
                <img
                  src={selectedPlot.image}
                  alt={selectedPlot.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 font-mono text-sm text-[#10B981] font-extrabold bg-slate-950/80 border border-slate-900 px-3 py-1 rounded">
                  PLOT {selectedPlot.plotId}
                </span>
              </div>

              {/* Essential information metadata */}
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#10B981] tracking-widest font-bold uppercase block">
                  {selectedPlot.category}
                </span>
                <h3 className="font-sans text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                  {selectedPlot.title}
                </h3>
                
                {/* Location pin */}
                <div className="flex items-center text-slate-400 text-sm">
                  <MapPin className="h-4 w-4 mr-1.5 text-[#10B981]" />
                  <span>{selectedPlot.location}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-sans pt-2">
                  {selectedPlot.description}
                </p>

                {/* Large visual metrics block */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-900">
                  <div className="bg-slate-950 p-3 border border-slate-900 rounded">
                    <span className="block font-mono text-[8px] text-slate-500 tracking-wider">TOTAL CAPITAL</span>
                    <span className="text-xs md:text-sm font-semibold text-slate-300 mt-1 block">
                      ${((selectedPlot.acquisitionCost + selectedPlot.developmentCost)/1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 border border-slate-900 rounded">
                    <span className="block font-mono text-[8px] text-slate-500 tracking-wider">TARGET YIELD</span>
                    <span className="text-xs md:text-sm font-semibold text-emerald-400 mt-1 block">
                      {selectedPlot.expectedYield}% / yr
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 border border-slate-900 rounded">
                    <span className="block font-mono text-[8px] text-slate-500 tracking-wider">ANNUAL RENT EST.</span>
                    <span className="text-xs md:text-sm font-semibold text-white mt-1 block">
                      ${(selectedPlot.rentalEstimation/1000).toFixed(0)}k/yr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth descriptions & highlights */}
            <div id="modal-grid-bottom" className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 pt-10 border-t border-slate-900">
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-sans text-base font-semibold text-white tracking-wide">
                  Strategic Land Infrastructure
                </h4>
                <div className="space-y-3">
                  {selectedPlot.highlights.map((hlt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0"></span>
                      <p className="font-sans leading-relaxed">{hlt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions columns */}
              <div className="md:col-span-5 bg-slate-950/80 p-6 border border-slate-900 rounded flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                    PARTNER SEEDING GATEWAY
                  </h4>
                  <p className="text-slate-400 text-xs mt-2 font-sans leading-relaxed">
                    Instantly load this plot code (<strong className="text-white font-mono">{selectedPlot.plotId}</strong>) directly into the joint venture bidding interface below.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    id="submit-jv-from-modal"
                    onClick={() => {
                      onSelectPlotForProposal(selectedPlot.plotId);
                      setSelectedPlot(null);
                    }}
                    className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-slate-950 font-mono font-bold text-xs py-3 tracking-widest uppercase rounded-sm transition-all duration-300 block text-center cursor-pointer"
                  >
                    APPLY FOR JOINT VENTURE
                  </button>
                  <button
                    id="modal-stay-browsing"
                    onClick={() => setSelectedPlot(null)}
                    className="w-full border border-slate-800 hover:border-slate-700 bg-slate-950 hover:text-white text-slate-400 font-mono font-medium text-xs py-3 tracking-widest uppercase rounded-sm transition-all duration-300 block text-center"
                  >
                    STAY ON GALLERIES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
