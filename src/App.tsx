import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AutoScrollGallery from './components/AutoScrollGallery';
import PortfolioShowcase from './components/PortfolioShowcase';
import YieldCalculator from './components/YieldCalculator';
import ProgressTracker from './components/ProgressTracker';
import ProposalForm from './components/ProposalForm';
import IndraprasthaModal from './components/IndraprasthaModal';
import InteractiveMap from './components/InteractiveMap';
import ThreeDTiltContainer from './components/ThreeDTiltContainer';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { INVESTMENT_STATS, GENERATED_IMAGES } from './data/mockData';
import { 
  Download, 
  Play, 
  FileCheck, 
  ArrowUp
} from 'lucide-react';

const DYNAMIC_FEEDS = [
  {
    id: "feed-1",
    name: "Royal Pavilion (SZ-E-101)",
    url: GENERATED_IMAGES.heroVilla,
    directionName: "Bottom to Up Scan",
    className: "slide-bottom-up",
    category: "HIGH-END RESIDENTIAL PORTFOLIOS",
    headline: "Exclusive Land Bank Opportunities in Indraprastha",
    description: "Capitalize on accredited high-volume residential clusters and premium mixed-use coordinates inside our most active sovereign growth corridors with clear sovereign title ownership.",
    specs: { area: "14,500 sqm", zoning: "Residential", height: "G+3 Clearance", access: "145m Frontage" }
  },
  {
    id: "feed-2",
    name: "Octagon Luxury Lofts (SZ-W-204)",
    url: GENERATED_IMAGES.premiumLounge,
    directionName: "Left to Right Pan",
    className: "slide-left-right",
    category: "PREMIUM COMMERCIAL PORTFOLIOS",
    headline: "Bespoke Lifestyle & Dynamic Mixed-Use Horizons",
    description: "Explore coveted commercial frontage sitting directly on Indraprastha's principal promenade. Integrates sophisticated boutique retail zones and multi-tiered layouts optimized for high traffic.",
    specs: { area: "8,900 sqm", zoning: "Mixed-Use", height: "G+4 Commercial", access: "98m Frontage" }
  },
  {
    id: "feed-3",
    name: "Citadel Commercial Axis (SZ-C-088)",
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    directionName: "Up to Bottom Scan",
    className: "slide-up-bottom",
    category: "PRESTIGE OFFICE HEADQUARTERS",
    headline: "Flagship Corporate Hubs in Central Financial Axis",
    description: "Pre-approved commercial zones optimized for high-occupancy international banking clients. Finished with structural parametric facades, solar glass insulation, and skyline sky-decks.",
    specs: { area: "11,200 sqm", zoning: "Commercial", height: "G+5 Corporate", access: "110m Frontage" }
  },
  {
    id: "feed-4",
    name: "Elite Horizon Heights (SZ-E-412)",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    directionName: "Right to Left Pan",
    className: "slide-right-left",
    category: "HIGH-END RESIDENTIAL PORTFOLIOS",
    headline: "Sovereign Residential Plateaus with Panoramic Views",
    description: "Spacious scenic elevations affording pristine panoramic sunset views of the wider district skyline. Engineered for multi-tier luxury villas featuring private direct buffer highways.",
    specs: { area: "18,800 sqm", zoning: "Residential", height: "G+3 Heights", access: "160m Frontage" }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [proposalPlotId, setProposalPlotId] = useState<string>('SZ-E-101');
  const [showIndraprasthaPlan, setShowIndraprasthaPlan] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [partnershipType, setPartnershipType] = useState<'jv' | 'agency'>('jv');

  // States for interactive background slideshow controls
  const [currentFeedIndex, setCurrentFeedIndex] = useState<number>(0);
  const [keyTrigger, setKeyTrigger] = useState<number>(0);
  const [autoPlay] = useState<boolean>(true);

  // Monitor scroll for scrollTop utility visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play interval for background slideshow
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentFeedIndex((prev) => (prev + 1) % DYNAMIC_FEEDS.length);
      setKeyTrigger((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  // Standard tab/page navigation handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'rental-hub') {
      setActiveTab('rental-hub');
    } else if (sectionId === 'timeline') {
      setActiveTab('timeline');
    } else if (sectionId === 'agency-register') {
      setActiveTab('partnerships');
      setPartnershipType('agency');
    } else if (sectionId === 'partnerships') {
      setActiveTab('partnerships');
      setPartnershipType('jv');
    } else {
      setActiveTab(sectionId);
    }
    // Instantly scroll viewport to top when switching sections for clean page entries
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Pre-load a coordinate selection when triggered from showcase card detail modals
  const handleSelectPlotForForm = (plotId: string) => {
    setProposalPlotId(plotId);
    setActiveTab('partnerships');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <div className="animate-fade-in">
            {/* 1. HERO HOME AREA with slow-panning majestic background */}
            <div
              id="hero-section"
              className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-slate-950 select-none"
            >
              {/* Drone Panning Dynamic Background with smooth crossfading slides (No DOM unmounting/flicker) */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                {DYNAMIC_FEEDS.map((feed, index) => {
                  const isActive = index === currentFeedIndex;
                  return (
                    <div
                      key={feed.id}
                      className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                        isActive 
                          ? 'opacity-40 scale-100 visiblity:visible' 
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    >
                      <img
                        src={feed.url}
                        alt={feed.name}
                        className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.05] animate-pan-bg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  );
                })}
                {/* Vignette bottom-up aesthetic dark screen fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-black/75 z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/90 via-transparent to-[#08090C]/85 z-10 pointer-events-none"></div>
              </div>

              {/* Global summary stats ticker row inside header margins */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-12">
                <div id="stat-indicators-row" className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-slate-900/40">
                  {INVESTMENT_STATS.map((st) => (
                    <div key={st.id} id={`stats-panel-${st.id}`} className="space-y-1">
                      <span className="block font-mono text-[9px] tracking-[0.15em] text-slate-500 font-bold uppercase">
                        {st.label}
                      </span>
                      <span className="block text-sm md:text-base font-semibold text-white tracking-wide">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Centerpiece typography area */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto flex flex-col justify-center">
                
                {/* Keyed subtitle and headings container to trigger smooth entry animations combined with the image change */}
                <ThreeDTiltContainer intensity={5} glow={false}>
                  <div key={currentFeedIndex} className="animate-fade-in max-w-4xl space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="block font-mono text-xs md:text-sm tracking-[0.3em] bg-gradient-to-r from-[#10B981] to-[#FAC638] bg-clip-text text-transparent font-extrabold uppercase animate-pulse">
                        {DYNAMIC_FEEDS[currentFeedIndex].category}
                      </span>
                      {/* Micro aesthetic circle bullet from reference */}
                      <span className="hidden sm:inline-block w-4 h-4 rounded-full border border-[#FAC638]/45 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FAC638]"></span>
                      </span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                      {DYNAMIC_FEEDS[currentFeedIndex].headline}
                    </h1>
                    
                    <p className="text-slate-100 text-sm md:text-base max-w-3xl font-sans leading-relaxed pt-2 font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                      {DYNAMIC_FEEDS[currentFeedIndex].description}
                    </p>

                    {/* Dynamic B2B Parcel Quick Specifications */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-950/90 backdrop-blur-md border border-slate-900 rounded-sm max-w-3xl mt-4 font-mono text-[10px] text-slate-400 shadow-2xl">
                      <div>
                        <span className="text-slate-500 uppercase block font-bold text-[9px] tracking-wider">PARCEL AREA</span>
                        <span className="text-white font-semibold text-xs mt-0.5 block">{DYNAMIC_FEEDS[currentFeedIndex].specs.area}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase block font-bold text-[9px] tracking-wider">ZONING CODE</span>
                        <span className="text-[#10B981] font-semibold text-xs mt-0.5 block">{DYNAMIC_FEEDS[currentFeedIndex].specs.zoning}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase block font-bold text-[9px] tracking-wider">CIVIL HEIGHT</span>
                        <span className="text-white font-semibold text-xs mt-0.5 block">{DYNAMIC_FEEDS[currentFeedIndex].specs.height}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase block font-bold text-[9px] tracking-wider">ROAD ACCESS</span>
                        <span className="text-white font-semibold text-xs mt-0.5 block">{DYNAMIC_FEEDS[currentFeedIndex].specs.access}</span>
                      </div>
                    </div>

                    {/* Interactive buttons with emerald detailing */}
                    <div id="hero-actions" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                      <button
                        id="hero-submit-jv-btn"
                        onClick={() => handleNavigate('partnerships')}
                        className="bg-gradient-to-r from-[#10B981] to-[#FAC638] hover:from-[#11C98C] hover:to-[#FED44B] text-slate-950 font-mono text-[11px] font-bold tracking-[0.15em] py-4 px-8 rounded-sm transition-all duration-300 shadow-xl shadow-amber-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] uppercase cursor-pointer"
                      >
                        SUBMIT JV PROPOSAL
                      </button>

                      <button
                        id="hero-play-indraprastha-plan"
                        onClick={() => setShowIndraprasthaPlan(true)}
                        className="group flex items-center justify-center gap-3 bg-[#08090C]/80 hover:bg-[#08090C] border border-[#10B981]/30 text-slate-200 px-8 py-4 text-xs font-mono font-medium tracking-[0.15em] transition-all duration-300 rounded-sm cursor-pointer"
                      >
                        <div className="border border-[#10B981] text-[#10B981] p-1.5 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center">
                          <Play className="h-3 w-3 fill-[#10B981] stroke-none" />
                        </div>
                        <span className="text-slate-300 group-hover:text-white transition-colors font-semibold">
                          INDRAPRASTHA EXPANSION PLAN
                        </span>
                      </button>

                      {/* Manual indicators dot selectors */}
                      <div className="flex items-center gap-2 pl-0 sm:pl-6 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-900/60">
                        {DYNAMIC_FEEDS.map((feed, idx) => (
                          <button
                            key={feed.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentFeedIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                              idx === currentFeedIndex 
                                ? 'w-7 bg-[#10B981]' 
                                : 'w-2.5 bg-slate-800 hover:bg-slate-600'
                            }`}
                            title={`Navigate to ${feed.name}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </ThreeDTiltContainer>
              </div>

              {/* Automatic Background Live Feed Caption Indicator Overlay */}
              <div 
                id="live-feed-caption-bar"
                className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 bg-slate-950/80 backdrop-blur-md border border-slate-900 px-4 py-2.5 rounded-sm font-mono text-[10px] text-slate-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                <span className="text-slate-500 uppercase font-extrabold text-[9px] tracking-widest">ACTIVE PARCEL RENDERING:</span>
                <span className="text-white font-semibold tracking-wide">{DYNAMIC_FEEDS[currentFeedIndex].name}</span>
                <span className="text-slate-700 font-bold">|</span>
                <span className="text-[#10B981] uppercase font-bold text-[9px] tracking-[0.12em]">{DYNAMIC_FEEDS[currentFeedIndex].directionName}</span>
              </div>

              {/* Dynamic down-scroll mouse layout pointing strictly to next tab */}
              <div className="relative z-10 w-full flex flex-col items-center select-none pt-4">
                <button
                  id="hero-gravity-scroll-btn"
                  onClick={() => handleNavigate('portfolio')}
                  className="flex flex-col items-center space-y-3 cursor-pointer group"
                >
                  <div className="w-5 h-9 rounded-full border-2 border-slate-700 p-1 flex justify-center group-hover:border-[#10B981] transition-colors">
                    <span className="w-1.5 h-2.5 bg-[#10B981] rounded-full block animate-bounce"></span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-slate-500 uppercase font-semibold group-hover:text-slate-300 transition-colors">
                    EXPLORE LAND-BANKS
                  </span>
                </button>
              </div>
            </div>

            {/* 2. AUTOMATIC SCROLL MARQUEE GORGEOUS GALLERY */}
            <AutoScrollGallery />

            {/* 3. DYNAMIC GIS GEOLOCATION INTERACTIVE SVG MAP */}
            <InteractiveMap onSelectPlot={handleSelectPlotForForm} />
          </div>
        );

      case 'portfolio':
        return (
          <div className="pt-24 min-h-[85vh] animate-fade-in">
            <PortfolioShowcase onSelectPlotForProposal={handleSelectPlotForForm} />
          </div>
        );

      case 'rental-hub':
        return (
          <div className="pt-24 min-h-[85vh] animate-fade-in space-y-8">
            <div className="max-w-7xl mx-auto px-6 pt-16 text-center">
              <span className="font-mono text-xs tracking-[0.25em] text-[#10B981] uppercase font-bold block">
                COMMERCIAL LEASING INTERACTION
              </span>
              <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white mt-3">
                Indraprastha Active Tenant Hub
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-4 font-sans leading-relaxed">
                Review sovereign parcels equipped with high-yield rental estimates and long lease options. Instantly launch applications for Joint Tenant coordination.
              </p>
            </div>
            <PortfolioShowcase onSelectPlotForProposal={handleSelectPlotForForm} />
          </div>
        );

      case 'calculator':
        return (
          <div className="pt-24 min-h-[85vh] animate-fade-in">
            <YieldCalculator />
          </div>
        );

      case 'timeline':
        return (
          <div className="pt-24 min-h-[85vh] animate-fade-in">
            <ProgressTracker />
          </div>
        );

      case 'partnerships':
        return (
          <div className="pt-24 min-h-[85vh] animate-fade-in space-y-6">
            {/* Core inquiry placement form */}
            <ProposalForm 
              preselectedPlotId={proposalPlotId} 
              activeType={partnershipType}
              onTypeChange={setPartnershipType}
            />

            {/* Topographic GIS acquisitions download desk */}
            <section id="media-kits-section" className="py-24 bg-[#0B0D10] border-t border-slate-900/60">
              <div className="max-w-7xl mx-auto px-6">
                <div id="media-kits-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-mono text-xs tracking-[0.25em] text-[#10B981] font-semibold block uppercase">
                      ACQUISITIONS ASSISTANCE
                    </span>
                    <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white">
                      Download Topographic Media Packs
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed font-sans mt-2">
                      Review legal land titles, local state development codes, soil filtration studies, and vector topography charts compiled securely under regional authority parameters.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        id="download-map"
                        className="flex items-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-300 hover:text-white px-5 py-3 text-xs font-mono tracking-wider rounded transition-colors cursor-pointer"
                        onClick={() => alert("Simulating PDF map download package. In production, this hosts the GIS parcel overlays.")}
                      >
                        <Download className="h-4 w-4 text-[#10B981]" />
                        GIS PLOT MAPS (.PDF)
                      </button>
                      <button
                        id="download-brochure"
                        className="flex items-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-300 hover:text-white px-5 py-3 text-xs font-mono tracking-wider rounded transition-colors cursor-pointer"
                        onClick={() => alert("Simulating Investment Kit download. Kit contains architectural renders in high fidelity resolution.")}
                      >
                        <Download className="h-4 w-4 text-[#10B981]" />
                        ZAYED EXPANSION KIT (.ZIP)
                      </button>
                    </div>
                  </div>

                  {/* Asset specification badge */}
                  <div className="lg:col-span-6">
                    <div className="relative border border-slate-900 rounded-sm bg-slate-950/40 p-8 space-y-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none"></div>
                      
                      <div className="flex items-center gap-4">
                        <div className="border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400 rounded">
                          <FileCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="block font-sans text-base font-semibold text-white tracking-wide">Pre-Approved Zoning Certificates</span>
                          <span className="block font-mono text-[10px] text-slate-500 tracking-wider">REGIONAL LAND OFFICE AUTHORITY</span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs md:text-sm font-sans leading-relaxed">
                        Every parcel in our Land-Bank possesses fully processed municipal zoning, registered plot boundaries, and clear, sovereign non-dispute titles. Ready for immediate lease registrations or joint development contracts.
                      </p>

                      <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-900 font-mono">
                        <span>LAST AUDITED: Q1 2026</span>
                        <span className="text-emerald-400">STATUS: VALID & CLEAR</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="portal-root" className="min-h-screen bg-[#08090C] text-slate-100 selection:bg-[#10B981] selection:text-slate-900 font-sans antialiased relative">
      
      {/* Exquisite Custom Trail & Mouse Hover Effect */}
      <CustomCursor />

      {/* Exquisite Top Navigation Layer */}
      <Navbar onNavigate={handleNavigate} activeSection={activeTab} />

      {/* Conditional Active Page Area - Ensures only the selected page content is visible */}
      <main id="portal-main-content">
        {renderActiveContent()}
      </main>

      {/* FOOTER AREA */}
      <Footer onNavigate={handleNavigate} />

      {/* FLOATING ACTION: Indraprastha Cinematic Video Overlay Popup */}
      {showIndraprasthaPlan && <IndraprasthaModal onClose={() => setShowIndraprasthaPlan(false)} />}

      {/* FLOATING ACTION: Scroll-to-Top trigger */}
      {showScrollTop && (
        <button
          id="scroll-to-top-floating"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-slate-950 hover:bg-[#10B981] border border-slate-800 hover:border-[#10B981] text-[#10B981] hover:text-slate-950 p-3 rounded-full cursor-pointer transition-all duration-300 shadow-2xl overflow-hidden"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

    </div>
  );
}
