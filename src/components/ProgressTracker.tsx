import { useState, useMemo } from 'react';
import { MILESTONES, PORTFOLIO_PLOTS } from '../data/mockData';
import { CheckCircle2, Clock, CalendarDays, BarChart4 } from 'lucide-react';

export default function ProgressTracker() {
  const [selectedPlotId, setSelectedPlotId] = useState<string>('SZ-E-101'); // SZ-E-101 default

  const associatedPlot = useMemo(() => {
    return PORTFOLIO_PLOTS.find(p => p.plotId === selectedPlotId) || PORTFOLIO_PLOTS[0];
  }, [selectedPlotId]);

  // Retrieve milestones for target plot id
  const plotMilestones = useMemo(() => {
    // For demo purposes, we will customize the generic milestone list values dynamically to fit the selected plot specifically!
    return MILESTONES.map((m) => {
      // Retain general titles but customize details
      return {
        ...m,
        plotId: selectedPlotId
      };
    });
  }, [selectedPlotId]);

  // Overall progress percentage based on milestone statuses
  const overallProgress = useMemo(() => {
    switch (associatedPlot.status) {
      case 'Acquisition': return 10;
      case 'Zoning Approved': return 35;
      case 'Architectural Phase': return 50;
      case 'Site Prep': return 65;
      case 'Under Construction': return 80;
      case 'Leasing Open': return 100;
      default: return 0;
    }
  }, [associatedPlot]);

  return (
    <section id="timeline-section" className="py-24 bg-[#0B0D10] border-t border-slate-900 absolute-positioning-wrapper relative">
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-emerald-950/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div id="tracker-section-header" className="max-w-3xl mb-16">
          <span className="font-mono text-xs tracking-[0.25em] bg-gradient-to-r from-[#10B981] to-[#FAC638] bg-clip-text text-transparent uppercase font-bold flex items-center">
            <BarChart4 className="h-4 w-4 mr-2 text-[#FAC638]" />
            LAND DEVELOPMENT PHASES
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white mt-3">
            Civil Milestone Tracker
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Monitor real-time land progress from acquisition to building foundations and site clearing. Select a coordinates code below to query its latest infrastructure timeline.
          </p>
        </div>

        {/* Dynamic Selector Panel */}
        <div id="tracker-selector-panel" className="bg-slate-950/50 border border-slate-900 rounded-sm p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="plot-select-dropdown" className="font-mono text-xs tracking-wider text-slate-400 uppercase font-semibold">
              Select Coordinates:
            </label>
            <select
              id="plot-select-dropdown"
              value={selectedPlotId}
              onChange={(e) => setSelectedPlotId(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 py-2 px-4 rounded font-mono text-sm focus:outline-none focus:border-[#10B981]/80 cursor-pointer"
            >
              {PORTFOLIO_PLOTS.map((plot) => (
                <option key={plot.id} value={plot.plotId}>
                  {plot.plotId} — {plot.title} (Zoned: {plot.zoning})
                </option>
              ))}
            </select>
          </div>

          {/* Core progress status bar */}
          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">PROJECT COMPLETION INDEX</span>
              <span className="text-[#FAC638] font-bold">{overallProgress}%</span>
            </div>
            {/* Range Progress meter */}
            <div className="w-full h-2 bg-slate-900/80 rounded-sm overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-[#10B981] to-[#FAC638] transition-all duration-700 ease-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Horizontal & Vertical Timeline view */}
        <div id="tracker-timeline-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Details - Left 5 cols */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900/60 p-8 rounded-sm">
            <span className="font-mono text-[9px] tracking-wider bg-gradient-to-r from-[#10B981] to-[#FAC638] bg-clip-text text-transparent font-bold block uppercase">
              ACTIVE PLOT IN FOCUS
            </span>
            <h3 className="font-sans text-xl font-semibold text-white tracking-wide mt-2">
              {associatedPlot.title}
            </h3>

            {/* Dynamic Site Progress / Geological Render Image */}
            <div className="relative my-4 rounded overflow-hidden aspect-video border border-slate-900 bg-slate-950/50 group select-none">
              <img 
                src={associatedPlot.image} 
                alt={`${associatedPlot.title} active site construction preview`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/95 via-transparent to-transparent"></div>
              {/* GIS overlays */}
              <div className="absolute top-2 left-2 bg-[#0B0D10]/80 backdrop-blur-sm border border-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-[#10B981] tracking-wider">
                LIVE STATUS FEED
              </div>
              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-500">
                LAT 30.0125"N | LNG 30.9850"E
              </div>
            </div>

            <span className="inline-block text-xs text-slate-400 bg-slate-900 py-1 px-2 rounded font-mono">
              Plot Ref: {associatedPlot.plotId}
            </span>

            <p className="text-slate-400 text-xs leading-relaxed font-sans mt-4">
              Currently in <strong className="text-slate-200 font-medium">{associatedPlot.status}</strong> stance. High-capacity excavation machinery, optical-fiber channels, and concrete laying are planned inside these coordinates.
            </p>

            <div className="pt-6 border-t border-slate-900 mt-6 space-y-4">
              <div>
                <span className="block text-slate-500 font-mono text-[9px] tracking-wider uppercase">BUILD SPEED TARGET</span>
                <span className="text-sm font-semibold font-sans text-slate-300">Phase 2 Clearing (Completed)</span>
              </div>
              <div>
                <span className="block text-slate-500 font-mono text-[9px] tracking-wider uppercase">LOCAL UTILITIES INDEXED</span>
                <span className="text-sm font-semibold font-sans text-emerald-400">100% Water & High-Voltage Grid Linked</span>
              </div>
            </div>
          </div>

          {/* Timeline steps - Right 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-sans text-lg font-semibold text-white tracking-wide mb-4">
              Structural Milestones Pipeline
            </h3>
            
            <div id="milestones-vertical-timeline" className="relative pl-6 md:pl-10 space-y-10">
              {/* Vertical lineage guideline wire */}
              <div className="absolute top-2 bottom-2 left-[13px] md:left-[21px] w-[2px] bg-slate-900 pointer-events-none"></div>

              {plotMilestones.map((m, index) => {
                const isCompleted = m.status === 'Completed';
                const isInProgress = m.status === 'In Progress';

                return (
                  <div
                    key={m.id}
                    id={`milestone-step-${m.id}`}
                    className="relative flex flex-col md:flex-row md:items-start gap-4"
                  >
                    {/* Status badge circle in center axis */}
                    <div className="absolute -left-[19px] md:-left-[27px] z-10">
                      {isCompleted ? (
                        <div className="bg-slate-950 p-1 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        </div>
                      ) : isInProgress ? (
                        <div className="bg-slate-950 p-1 rounded-full border border-[#10B981] flex items-center justify-center text-[#10B981] animate-pulse">
                          <Clock className="h-4.5 w-4.5" />
                        </div>
                      ) : (
                        <div className="bg-slate-950 p-1 rounded-full border border-slate-800 flex items-center justify-center text-slate-600">
                          <div className="h-4.5 w-4.5 rounded-full bg-slate-900 border border-slate-800"></div>
                        </div>
                      )}
                    </div>

                    {/* Milestone Box Display */}
                    <div className="bg-slate-950/60 p-6 rounded-sm border border-slate-900/60 flex-grow hover:border-emerald-500/30 hover:shadow-lg hover:shadow-[#10B981]/5 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-sm md:text-base font-semibold text-white tracking-wide">
                            {m.title}
                          </span>
                          <span className={`text-[9px] font-mono tracking-wider uppercase font-semibold py-0.5 px-2.5 rounded-sm ${
                            isCompleted ? 'bg-emerald-500/10 text-emerald-400' : isInProgress ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-900 text-slate-500'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-slate-500 font-mono text-[10px] md:text-xs">
                          <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                          <span>{m.date}</span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs md:text-sm mt-3 font-sans leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
