import { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, TrendingUp, Info } from 'lucide-react';

export default function YieldCalculator() {
  // Calculator initial states
  const [acquisition, setAcquisition] = useState<number>(15400000); // SZ-E-101 defaults
  const [development, setDevelopment] = useState<number>(8200000);
  const [targetYield, setTargetYield] = useState<number>(8.4);
  const [leaseTerm, setLeaseTerm] = useState<number>(15);
  const [growth, setGrowth] = useState<number>(3.5);

  const calculations = useMemo(() => {
    const totalOutlay = acquisition + development;
    const initialRent = (totalOutlay * targetYield) / 100;
    
    // Project year by year revenues
    let cumulativeRevenue = 0;
    let yearByYear: { year: number; rental: number; cumulative: number }[] = [];
    let currentRent = initialRent;

    for (let i = 1; i <= leaseTerm; i++) {
      cumulativeRevenue += currentRent;
      yearByYear.push({
        year: i,
        rental: Math.round(currentRent),
        cumulative: Math.round(cumulativeRevenue)
      });
      currentRent = currentRent * (1 + growth / 100);
    }

    const roi = (cumulativeRevenue / totalOutlay) * 100;
    const irrEstimate = targetYield + (growth * 0.75); // Professional approximation for land hold + lease ramp

    return {
      totalOutlay,
      initialRent,
      cumulativeRevenue,
      roi,
      irrEstimate,
      yearByYear
    };
  }, [acquisition, development, targetYield, leaseTerm, growth]);

  // Format currency helpers
  const fmt = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  // Generate SVG chart path coordinates based on compound data points
  const chartCoordinates = useMemo(() => {
    const data = calculations.yearByYear;
    if (data.length === 0) return '';
    const maxVal = Math.max(...data.map(d => d.cumulative), 1);
    
    const width = 500;
    const height = 150;
    const padding = 10;
    
    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - (d.cumulative / maxVal) * (height - padding * 2);
      return `${x},${y}`;
    });

    return {
      linePath: `M ${points.join(' L ')}`,
      areaPath: `M ${padding},${height - padding} L ${points.join(' L ')} L ${width - padding},${height - padding} Z`,
      points
    };
  }, [calculations.yearByYear]);

  return (
    <section id="calculator-section" className="py-24 bg-[#0B0D10] border-t border-slate-900 relative">
      {/* Visual background textures */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#10B981]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header elements */}
        <div id="calculator-header" className="max-w-3xl mb-16">
          <span className="font-mono text-xs tracking-[0.25em] bg-gradient-to-r from-[#10B981] to-[#FAC638] bg-clip-text text-transparent uppercase font-bold flex items-center">
            <Calculator className="h-4 w-4 mr-2 text-[#FAC638]" />
            PARTNER FINANCIAL ENGINE
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white mt-3">
            Land Yield Optimizer
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Run detailed predictive yield analyses on pre-development acquisitions. Slide parameters to optimize initial lease structures and target compound internal rates.
          </p>
        </div>

        {/* Master layout panel */}
        <div id="calculator-master-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls - Left side - 5 cols */}
          <div id="calculator-controls" className="lg:col-span-5 space-y-8 bg-slate-950/60 p-8 rounded-sm border border-slate-900/60 backdrop-blur-sm">
            <h3 className="font-sans text-lg font-semibold text-white tracking-wide border-b border-slate-900 pb-3">
              Investment Parameters
            </h3>

            {/* Slider 1: Acquisition Costs */}
            <div id="slider-group-acquisition" className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-medium tracking-wide">
                <span className="text-slate-400">ACQUISITION COST (USD)</span>
                <span className="text-[#10B981]">{fmt(acquisition)}</span>
              </div>
              <input
                id="range-input-acquisition"
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={acquisition}
                onChange={(e) => setAcquisition(Number(e.target.value))}
                className="w-full accent-[#10B981] bg-slate-900 h-1.5 rounded-sm appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>$1.0M</span>
                <span>$50.0M</span>
              </div>
            </div>

            {/* Slider 2: Dev Costs */}
            <div id="slider-group-development" className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-medium tracking-wide">
                <span className="text-slate-400">DEV / CIVIL CONSTRUCTION</span>
                <span className="text-[#10B981]">{fmt(development)}</span>
              </div>
              <input
                id="range-input-development"
                type="range"
                min="500000"
                max="30000000"
                step="250000"
                value={development}
                onChange={(e) => setDevelopment(Number(e.target.value))}
                className="w-full accent-[#10B981] bg-slate-900 h-1.5 rounded-sm appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>$0.5M</span>
                <span>$30.0M</span>
              </div>
            </div>

            {/* Slider 3: Target Yield */}
            <div id="slider-group-yield" className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-medium tracking-wide">
                <span className="text-slate-400">TARGET INITIAL YIELD (%)</span>
                <span className="text-[#10B981]">{targetYield.toFixed(1)}%</span>
              </div>
              <input
                id="range-input-yield"
                type="range"
                min="3.0"
                max="15.0"
                step="0.1"
                value={targetYield}
                onChange={(e) => setTargetYield(Number(e.target.value))}
                className="w-full accent-[#10B981] bg-slate-900 h-1.5 rounded-sm appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>3.0%</span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Slider 4: Lease Term */}
            <div id="slider-group-lease" className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-medium tracking-wide">
                <span className="text-slate-400">LONG-TERM LEASE DURATION</span>
                <span className="text-[#10B981]">{leaseTerm} Years</span>
              </div>
              <input
                id="range-input-lease"
                type="range"
                min="1"
                max="30"
                step="1"
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(Number(e.target.value))}
                className="w-full accent-[#10B981] bg-slate-900 h-1.5 rounded-sm appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Slider 5: Growth Rate */}
            <div id="slider-group-growth" className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-medium tracking-wide">
                <span className="text-slate-400">ANNUAL RENTAL INDEXING</span>
                <span className="text-[#10B981]">{growth.toFixed(1)}% / Year</span>
              </div>
              <input
                id="range-input-growth"
                type="range"
                min="0.0"
                max="8.0"
                step="0.5"
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                className="w-full accent-[#10B981] bg-slate-900 h-1.5 rounded-sm appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>0.0% (Flat)</span>
                <span>8.0% (Staggered)</span>
              </div>
            </div>
          </div>

          {/* Outputs - Right side - 7 cols */}
          <div id="calculator-outputs" className="lg:col-span-7 space-y-8 bg-slate-950/60 p-8 rounded-sm border border-slate-900/60 backdrop-blur-sm self-stretch flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-lg font-semibold text-white tracking-wide border-b border-slate-900 pb-3">
                Financial Outcomes
              </h3>

              {/* Metrics Grid */}
              <div id="calculator-metrics" className="grid grid-cols-2 gap-6 mt-6">
                <div id="metric-total-capital" className="bg-slate-900/40 p-4 border border-slate-900/60 rounded">
                  <span className="block font-mono text-[9px] text-slate-500 tracking-wider">TOTAL CAPITAL OUTLAY</span>
                  <span className="block text-xl md:text-2xl font-bold font-sans text-white mt-1">
                    {fmt(calculations.totalOutlay)}
                  </span>
                </div>

                <div id="metric-initial-rent" className="bg-slate-900/40 p-4 border border-slate-900/60 rounded">
                  <span className="block font-mono text-[9px] text-slate-500 tracking-wider">EXPECTED FIRST-YEAR RENT</span>
                  <span className="block text-xl md:text-2xl font-bold font-sans text-[#10B981] mt-1">
                    {fmt(calculations.initialRent)}
                  </span>
                </div>

                <div id="metric-cumulative-revenue" className="bg-slate-900/40 p-4 border border-slate-900/60 rounded">
                  <span className="block font-mono text-[9px] text-slate-500 tracking-wider">CUMULATIVE RETURN (LIFETIME)</span>
                  <span className="block text-xl md:text-2xl font-bold font-sans text-white mt-1">
                    {fmt(calculations.cumulativeRevenue)}
                  </span>
                </div>

                <div id="metric-estimated-irr" className="bg-slate-900/40 p-4 border border-slate-900/60 rounded">
                  <span className="block font-mono text-[9px] text-slate-500 tracking-wider">EST. PROJECTED IRR</span>
                  <span className="block text-xl md:text-2xl font-bold font-sans text-emerald-400 mt-1">
                    {calculations.irrEstimate.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Compound Chart Area */}
              <div id="calculator-compound-chart" className="mt-8">
                <span className="block font-mono text-[10px] text-slate-400 tracking-wider uppercase mb-3 flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 text-[#10B981] mr-1.5" />
                  Compounding Lease Growth Curve
                </span>

                <div className="relative bg-slate-950/80 p-4 rounded-md border border-slate-900/80 h-44 flex items-center justify-center">
                  {/* Grid Lines mockup inside SVG */}
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* SVG guidelines for premium architecture look */}
                    <line x1="10" y1="40" x2="490" y2="40" stroke="#1E293B" strokeDasharray="3,3" strokeWidth="1" />
                    <line x1="10" y1="80" x2="490" y2="80" stroke="#1E293B" strokeDasharray="3,3" strokeWidth="1" />
                    <line x1="10" y1="120" x2="490" y2="120" stroke="#1E293B" strokeDasharray="3,3" strokeWidth="1" />

                    {/* Area path */}
                    <path d={chartCoordinates.areaPath} fill="url(#chartGrad)" />

                    {/* Line path */}
                    <path d={chartCoordinates.linePath} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />

                    {/* Active endpoints dots */}
                    {chartCoordinates.points && chartCoordinates.points.length > 0 && (
                      <>
                        {/* Start point */}
                        <circle cx={chartCoordinates.points[0].split(',')[0]} cy={chartCoordinates.points[0].split(',')[1]} r="4" fill="#0B0D10" stroke="#10B981" strokeWidth="2" />
                        {/* End point */}
                        <circle cx={chartCoordinates.points[chartCoordinates.points.length - 1].split(',')[0]} cy={chartCoordinates.points[chartCoordinates.points.length - 1].split(',')[1]} r="4" fill="#0B0D10" stroke="#10B981" strokeWidth="2" />
                      </>
                    )}
                  </svg>

                  {/* Absolute Labels */}
                  <div className="absolute top-2 left-4 text-[9px] font-mono text-slate-500">
                    START: {fmt((acquisition + development) * targetYield / 100)} / YEAR
                  </div>
                  <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-500">
                    MAX TERM CUMULATIVE: {fmt(calculations.cumulativeRevenue)}
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400">
                    Projected Return Rate: {calculations.roi.toFixed(1)}% ROI
                  </div>
                </div>
              </div>
            </div>

            {/* Operational notice */}
            <div id="calculator-compliance-note" className="mt-6 flex items-start gap-3 bg-indigo-950/20 border border-slate-900 p-4 rounded text-xs select-none">
              <Info className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 font-sans leading-relaxed">
                <strong className="text-white font-semibold">Demo Notice:</strong> Yield forecasts assume ideal local weather margins, structural safety approvals, and continuous high-occupancy corporate leases on the Indraprastha Financial Axis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
