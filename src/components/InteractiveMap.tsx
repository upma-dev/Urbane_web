import { useState } from 'react';
import { PORTFOLIO_PLOTS } from '../data/mockData';
import { Map, Layers, TrendingUp, Maximize2, Shield, Compass, HelpCircle, ArrowRight } from 'lucide-react';
import { PropertyPlot } from '../types';

interface InteractiveMapProps {
  onSelectPlot: (plotId: string) => void;
}

export default function InteractiveMap({ onSelectPlot }: InteractiveMapProps) {
  const [selectedPlotId, setSelectedPlotId] = useState<string>('SZ-E-101');
  const [hoveredPlotId, setHoveredPlotId] = useState<string | null>(null);

  // Find the currently selected plot from mockData
  const activePlot = PORTFOLIO_PLOTS.find(p => p.plotId === selectedPlotId) || PORTFOLIO_PLOTS[0];

  // Map sectors with their shapes for Indraprastha Land Area Master Plan
  const sectors = [
    {
      id: 'east',
      name: 'Indraprastha East Royal District',
      grid: 'A1 - B3',
      color: 'from-emerald-500/20 to-teal-500/10',
      description: 'Ultra-exclusive residential state zones and palatial retreats.',
      path: 'M 10 10 L 290 10 L 290 180 L 150 280 L 10 180 Z',
    },
    {
      id: 'central',
      name: 'Central Financial Axis',
      grid: 'C1 - C5',
      color: 'from-blue-500/20 to-sky-500/10',
      description: 'High-rise corporate headquarters and banking corridors.',
      path: 'M 300 10 L 520 10 L 460 380 L 300 380 Z',
    },
    {
      id: 'west',
      name: 'Indraprastha West Boulevard',
      grid: 'D1 - E4',
      color: 'from-amber-500/20 to-orange-500/10',
      description: 'Retail conduits, luxury lofts and flagship pedestrian avenues.',
      path: 'M 530 10 L 790 10 L 790 220 L 650 380 L 470 380 Z',
    },
    {
      id: 'south',
      name: 'South Oasis Green Enclave',
      grid: 'F1 - G2',
      color: 'from-emerald-500/15 to-green-600/5',
      description: 'Biophilic sanctuaries, health preserves and eco-conscious private clusters.',
      path: 'M 10 190 L 140 290 L 290 190 L 295 380 L 10 380 Z',
    },
  ];

  // Specific plots map coordinates layout
  const mapPlots = [
    { plotId: 'SZ-E-101', cx: 120, cy: 110, label: 'SZ-E-101', name: 'Royal Pavilion', sectorId: 'east' },
    { plotId: 'SZ-W-204', cx: 620, cy: 140, label: 'SZ-W-204', name: 'Octagon Lofts', sectorId: 'west' },
    { plotId: 'SZ-C-088', cx: 390, cy: 190, label: 'SZ-C-088', name: 'Centennial Citadel', sectorId: 'central' },
    { plotId: 'SZ-E-412', cx: 190, cy: 50, label: 'SZ-E-412', name: 'Elite Heights', sectorId: 'east' },
    { plotId: 'SZ-W-340', cx: 180, cy: 300, label: 'SZ-W-340', name: 'Oasis Wellness', sectorId: 'south' },
  ];

  return (
    <section id="interactive-gis-map" className="py-24 bg-[#08090C] border-t border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-[0.3em] bg-gradient-to-r from-[#10B981] to-[#FAC638] bg-clip-text text-transparent font-bold uppercase flex items-center gap-2">
              <Compass className="h-4 w-4 animate-spin-slow text-[#FAC638]" />
              Sovereign B2B Geolocation
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Indraprastha Land Bank Master Plan
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans leading-relaxed">
              Analyze dynamic topographic sector grids and physical plot borders. Select active coordinates on our real-time tactical overview grid for priority JV bidding or joint allocations.
            </p>
          </div>
          
          <div className="flex items-center gap-4 border border-slate-900 bg-slate-950/40 p-4 rounded-sm font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              <span>RESIDENTIAL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <span>COMMERCIAL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
              <span>MIXED-USE</span>
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* GIS Tactical SVG Map Canvas Panel - 7 Cols */}
          <div className="lg:col-span-7 bg-[#0b0d10] border border-slate-900 p-4 rounded-sm relative flex flex-col justify-between overflow-hidden">
            
            {/* HUD Status Header */}
            <div className="flex items-center justify-between border-b border-slate-900/60 pb-3 mb-4 font-mono text-[9px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="font-bold uppercase tracking-widest text-[#10B981]">INDRAPRASTHA GRID: IN-MAIN-2026</span>
              </div>
              <span>RESOLUTION: GEOLOGICAL-VECTORS (1:5000)</span>
            </div>

            {/* Tactical Interactive SVG representation */}
            <div className="relative w-full aspect-[8/4] bg-[#07080a] border border-slate-950 rounded-sm overflow-hidden flex items-center justify-center p-2 group">
              
              {/* Technical Blueprint Grid Sublay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              
              {/* Vector SVG Master Layout */}
              <svg 
                viewBox="0 0 800 400" 
                className="w-full h-full relative z-10 filter brightness-90 contrast-105 select-none"
              >
                {/* 1. Sector Grids - background highlights */}
                <g id="master-plan-sectors">
                  {sectors.map((sec) => (
                    <path
                      key={sec.id}
                      d={sec.path}
                      className="fill-slate-950/40 hover:fill-slate-900/40 stroke-slate-900/80 hover:stroke-[#10B981]/30 transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        // Select first plot corresponding to this sector if clicked
                        const associated = mapPlots.find(p => p.sectorId === sec.id);
                        if (associated) {
                          setSelectedPlotId(associated.plotId);
                        }
                      }}
                    />
                  ))}
                </g>

                {/* 2. Visual Sector Labels */}
                <g id="sector-hud-labels" className="pointer-events-none font-mono text-[9px] fill-slate-500 font-bold tracking-widest uppercase">
                  <text x="75" y="160">Indraprastha East District</text>
                  <text x="340" y="320">CENTRAL AXIS</text>
                  <text x="580" y="260">INDRAPRASTHA West boulevard</text>
                  <text x="60" y="350">SOUTH OASIS</text>
                </g>

                {/* 3. Interactive Active Land Parcels Pins/Nodes */}
                <g id="land-parcels-nodes">
                  {mapPlots.map((plot) => {
                    const isActive = plot.plotId === selectedPlotId;
                    const isHovered = plot.plotId === hoveredPlotId;
                    
                    // Style attributes depending on status
                    let nodeColor = 'fill-[#10B981]'; // default residential
                    let pulseColor = 'stroke-[#10B981]';
                    if (plot.plotId === 'SZ-W-204') {
                      nodeColor = 'fill-amber-400';
                      pulseColor = 'stroke-amber-400';
                    } else if (plot.plotId === 'SZ-C-088') {
                      nodeColor = 'fill-blue-400';
                      pulseColor = 'stroke-blue-400';
                    } else if (plot.plotId === 'SZ-W-340') {
                      nodeColor = 'fill-emerald-500';
                      pulseColor = 'stroke-emerald-400';
                    }

                    return (
                      <g 
                        key={plot.plotId}
                        className="cursor-pointer group"
                        onClick={() => setSelectedPlotId(plot.plotId)}
                        onMouseEnter={() => setHoveredPlotId(plot.plotId)}
                        onMouseLeave={() => setHoveredPlotId(null)}
                      >
                        {/* Interactive Area expansion ring */}
                        <circle 
                          cx={plot.cx} 
                          cy={plot.cy} 
                          r={isActive ? 32 : isHovered ? 24 : 16}
                          className="fill-white/0 stroke-white/0 group-hover:fill-white/[0.02] transition-all duration-300" 
                        />

                        {/* Outer Glow ring element */}
                        {(isActive || isHovered) && (
                          <circle 
                            cx={plot.cx} 
                            cy={plot.cy} 
                            r={isActive ? 18 : 12} 
                            className={`fill-none stroke-2 ${pulseColor} opacity-50 animate-ping`}
                            style={{ animationDuration: '3s' }}
                          />
                        )}

                        <circle 
                          cx={plot.cx} 
                          cy={plot.cy} 
                          r={isActive ? 10 : isHovered ? 8 : 6} 
                          className={`${nodeColor} stroke-[#08090C] stroke-2 shadow-2xl transition-all duration-300`}
                        />

                        {/* Text labels floating */}
                        <g transform={`translate(${plot.cx + 12}, ${plot.cy + 4})`}>
                          <rect 
                            x="-4" 
                            y="-11" 
                            width="68" 
                            height="16" 
                            rx="1" 
                            className={`${isActive ? 'fill-[#10B981] text-slate-950' : 'fill-slate-950/90'} stroke-slate-900 stroke-[0.5px] transition-colors`} 
                          />
                          <text 
                            x="2" 
                            y="1" 
                            className={`font-mono text-[8px] font-extrabold tracking-wider ${isActive ? 'fill-slate-950 font-black' : 'fill-slate-300'}`}
                          >
                            {plot.plotId}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Dynamic HUD Coordinate Grid Underlay Overlay */}
              <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[8px] text-slate-600 flex flex-col gap-0.5">
                <span>SECTOR LAYER STATUS: COM_RES_ACTIVE_LEDGER</span>
                <span>SYSTEM STABILITY: TRC_SATELLITE_LINK_98%</span>
              </div>
            </div>

            {/* Tactical Grid Footnotes */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-2 border-t border-slate-900/40 text-[9px] font-mono text-slate-500 gap-2">
              <span className="flex items-center gap-1">
                <Maximize2 className="h-3 w-3 text-emerald-400" />
                Click individual parcel coordinates (e.g. SZ-E-101) to synchronize tactical side spectrum.
              </span>
              <span>GRID MERCATOR: EPSG-3857</span>
            </div>
          </div>

          {/* Detailed Spectrograph HUD Side panel - 5 Cols */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-900 p-6 rounded-sm flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#10B981]/5 blur-[70px] pointer-events-none rounded-full"></div>
            
            <div className="space-y-6 relative z-10">
              
              {/* Header Title with animated LED Pill indicator */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="space-y-1">
                  <span className="block font-mono text-[9px] tracking-widest text-[#10B981] font-bold">ACTIVE PARCEL SPECTROGRAPH</span>
                  <h3 className="font-sans text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    {activePlot.plotId} ID PIN
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">CADASTRAL RECOM</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{activePlot.status}</span>
                  </div>
                </div>
              </div>

              {/* Main Visual Image Wrapper + GIS Badge */}
              <div className="relative rounded overflow-hidden aspect-video border border-slate-900 bg-slate-950/80">
                <img 
                  src={activePlot.image} 
                  alt={activePlot.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-[#08090C]/90 backdrop-blur border border-slate-900 px-2 py-1 rounded font-mono text-[9px] text-[#10B981] font-bold">
                  GIS MULTI-BAND RENDERING
                </div>
              </div>

              {/* Informative description */}
              <div className="space-y-1">
                <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase font-black">PLOT TITLE & DESCRIPTION</span>
                <h4 className="font-sans text-sm font-semibold text-white tracking-wide">{activePlot.title}</h4>
                <p className="text-slate-400 text-xs font-sans leading-relaxed pt-1 line-clamp-3">
                  {activePlot.description}
                </p>
              </div>

              {/* Cadastral Specifications specs panel */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/30 border border-slate-900 rounded-sm font-mono text-[10px] text-slate-400">
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">PHYSICAL AREA</span>
                  <span className="text-white font-bold text-xs">{activePlot.areaSqm.toLocaleString()} SQM</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">REGULATORY ZONING</span>
                  <span className="text-[#10B981] font-bold text-xs">{activePlot.zoning}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">EXPECTED YIELD</span>
                  <span className="text-white font-bold text-xs flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-400" />
                    {activePlot.expectedYield}% API
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[9px] font-bold uppercase">EST. RENTAL ESTIMATION</span>
                  <span className="text-[#10B981] font-bold text-xs">${(activePlot.rentalEstimation / 1000).toFixed(0)}K / YEAR</span>
                </div>
              </div>
            </div>

            {/* Direct land reserve CTA buttons */}
            <div className="pt-6 mt-6 border-t border-slate-900 flex flex-col sm:flex-row gap-3">
              <button
                id="interactive-map-reserve-btn"
                onClick={() => onSelectPlot(activePlot.plotId)}
                className="flex-1 bg-[#10B981] hover:bg-emerald-400 text-slate-950 font-mono text-[10px] font-black tracking-widest py-3 rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                SUBMIT JV PROPOSAL
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                id="interactive-map-timeline-btn"
                onClick={() => {
                  const timelineSection = document.getElementById('timeline-section');
                  if (timelineSection) {
                    timelineSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Navigate to timeline tab directly
                    onSelectPlot(activePlot.plotId);
                    const tabBtn = document.getElementById('nav-tab-timeline');
                    if (tabBtn) tabBtn.click();
                  }
                }}
                className="border border-slate-800 hover:border-slate-700 hover:text-white bg-slate-950 text-slate-400 font-mono text-[9px] font-bold tracking-widest px-4 py-3 rounded-sm cursor-pointer transition-colors"
              >
                TRACK TIMELINE
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
