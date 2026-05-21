import { PropertyPlot, ProgressMilestone } from '../types';
import heroVillaImg from '../assets/images/hero_luxury_villa_1779386123553.png';
import premiumLoungeImg from '../assets/images/premium_lounge_1779386142703.png';

export const HERO_VIDEO_MOCK = "https://assets.mixkit.co/videos/preview/mixkit-modern-architectural-home-with-pool-at-sunset-41618-large.mp4";

// High-end image sources compiled by Vite
export const GENERATED_IMAGES = {
  heroVilla: heroVillaImg,
  premiumLounge: premiumLoungeImg,
};

export const PORTFOLIO_PLOTS: PropertyPlot[] = [
  {
    id: "plot-z101",
    plotId: "SZ-E-101",
    title: "The Grand Pavilion Block",
    category: "HIGH-END RESIDENTIAL PORTFOLIOS",
    location: "Indraprastha East District, Indraprastha City",
    areaSqm: 14500,
    zoning: "Residential",
    expectedYield: 8.4,
    rentalEstimation: 1120000,
    acquisitionCost: 15400000,
    developmentCost: 8200000,
    status: "Leasing Open",
    image: GENERATED_IMAGES.heroVilla,
    description: "An ultra-premium residential land enclave optimized for bespoke low-density private palaces or a luxury villa compound. Boasts majestic landscape frontage and immediate access to the elite Indraprastha country club belt.",
    highlights: ["145m road frontage", "Adjacent to Royal Gardens", "Pre-approved and cleared for immediate building startup", "Fully integrated optical fiber connection", "Unrestricted height clearance up to G+3"]
  },
  {
    id: "plot-z102",
    plotId: "SZ-W-204",
    title: "Octagon Retail & Luxury Lofts",
    category: "PREMIUM COMMERCIAL PORTFOLIOS",
    location: "Indraprastha West Promenade, Indraprastha City",
    areaSqm: 8900,
    zoning: "Mixed-Use",
    expectedYield: 9.2,
    rentalEstimation: 1850000,
    acquisitionCost: 21000000,
    developmentCost: 14500000,
    status: "Under Construction",
    image: GENERATED_IMAGES.premiumLounge,
    description: "Multi-layered lifestyle hub combining high-end luxury boutique storefronts on ground levels with sophisticated executive duplex penthouses on premium floors. Ideal for visionary partners seeking recurring commercial leaseholds.",
    highlights: ["Sits directly on West Promenade walk", "Dual exit layout with private underground garage", "Vite-optimized climate architecture integration", "Slab load capacity designed for deep garden installations"]
  },
  {
    id: "plot-z103",
    plotId: "SZ-C-088",
    title: "Centennial Corporate Citadel",
    category: "PRESTIGE OFFICE HEADQUARTERS",
    location: "Indraprastha Financial Axis",
    areaSqm: 11200,
    zoning: "Commercial",
    expectedYield: 8.9,
    rentalEstimation: 2400000,
    acquisitionCost: 28500000,
    developmentCost: 19800000,
    status: "Architectural Phase",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
    description: "A state-of-the-art office pavilion styled with parametric facades, solar glass walls, and lush sky-decks. Pre-zoned for high-occupancy corporate leases and international banking clients.",
    highlights: ["Platinum LEED sustainability target", "Connected directly to future Indraprastha Rapid Grid station", "180-slot hyper-dense parking system setup", "Overlooks the central Indraprastha green link"]
  },
  {
    id: "plot-z104",
    plotId: "SZ-E-412",
    title: "Elite Horizon Heights",
    category: "HIGH-END RESIDENTIAL PORTFOLIOS",
    location: "Indraprastha Crest Heights, Indraprastha",
    areaSqm: 18800,
    zoning: "Residential",
    expectedYield: 7.8,
    rentalEstimation: 1450000,
    acquisitionCost: 19000000,
    developmentCost: 11000000,
    status: "Zoning Approved",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    description: "Scenic high-elevation residential cluster perfect for multi-tier luxury terrace apartments. Sits perfectly on a natural plateau affording panoramic sunset views of the wider district skyline.",
    highlights: ["Perpetual natural lighting guarantee", "Private direct highway buffer road", "Integrated rainwater recovery architecture", "24/7 security perimeter pre-clearance"]
  },
  {
    id: "plot-z105",
    plotId: "SZ-W-340",
    title: "The Oasis Wellness Enclave",
    category: "WELLNESS RESIDENTIAL VILLAS",
    location: "Indraprastha South Oasis Precinct",
    areaSqm: 12400,
    zoning: "Mixed-Use",
    expectedYield: 8.6,
    rentalEstimation: 980000,
    acquisitionCost: 14800000,
    developmentCost: 7900000,
    status: "Site Prep",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    description: "A sanctuary compound combining bio-centric villas with premium community wellness spaces. Built around natural water ponds and native Ghaf forest patches.",
    highlights: ["Enclosed community master plan", "Up to 45% local native plant canopy coverage", "Pre-allocated area for club facilities", "100% off-grid solar microgrid ready"]
  }
];

export const GALLERY_IMAGES_LEFT = [
  { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", caption: "Bespoke Lounge Frontage" },
  { url: GENERATED_IMAGES.heroVilla, caption: "Indraprastha Grand Pavilion" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", caption: "Sunset Leisure Deck" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", caption: "Geometric Glass Facade" },
  { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800", caption: "Reflective Water Features" }
];

export const GALLERY_IMAGES_RIGHT = [
  { url: GENERATED_IMAGES.premiumLounge, caption: "Parametric Penthouse Views" },
  { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800", caption: "State-of-the-Art Spa Wing" },
  { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", caption: "Natural Lighting Atrium" },
  { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800", caption: "Corporate Tower Base" },
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", caption: "Sleek Anodized Aluminum Fins" }
];

export const MILESTONES: ProgressMilestone[] = [
  {
    id: "m1",
    title: "Zoning & Municipal Clearing",
    date: "Q1 2026",
    status: "Completed",
    description: "Sovereign land banking permissions finalized and plot titles safely assigned to early partner portfolios.",
    plotId: "SZ-E-101"
  },
  {
    id: "m2",
    title: "Site Preparation & Roadworks",
    date: "Q2 2026",
    status: "Completed",
    description: "Grading complete, dual access roads constructed, and high-capacity electrical conduits terminated.",
    plotId: "SZ-E-101"
  },
  {
    id: "m3",
    title: "Structural Shell & Framing",
    date: "Q4 2026",
    status: "In Progress",
    description: "Concrete foundation poured, premium steel columns hoisted, and custom double-glazed glass fittings delivered.",
    plotId: "SZ-E-101"
  },
  {
    id: "m4",
    title: "Interior Bespoke Fit-outs",
    date: "Q2 2027",
    status: "Upcoming",
    description: "Premium Italian stone cladding inside lobby spaces, acoustic paneling, and smart smart-building operations test.",
    plotId: "SZ-E-101"
  }
];

export const INVESTMENT_STATS = [
  { id: "stat-1", label: "TOTAL AREA DEVELOPED", value: "245,000 sqm+" },
  { id: "stat-2", label: "AVERAGE RENTAL YIELD", value: "8.72%" },
  { id: "stat-3", label: "PARTNER REVENUE PAID OUT", value: "$18.4M" },
  { id: "stat-4", label: "ACTIVE JOINT VENTURES", value: "32 Plots" }
];
