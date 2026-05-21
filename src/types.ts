export interface PropertyPlot {
  id: string;
  plotId: string;
  title: string;
  category: string;
  location: string;
  areaSqm: number;
  zoning: 'Residential' | 'Commercial' | 'Mixed-Use';
  expectedYield: number;
  rentalEstimation: number;
  acquisitionCost: number;
  developmentCost: number;
  status: 'Acquisition' | 'Zoning Approved' | 'Architectural Phase' | 'Site Prep' | 'Under Construction' | 'Leasing Open';
  image: string;
  description: string;
  highlights: string[];
}

export interface ProgressMilestone {
  id: string;
  title: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
  plotId: string;
}

export interface JvProposal {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  investmentVolume: string;
  plotId: string;
  message: string;
  developerLicense: boolean;
}

export interface CalculatorState {
  acquisitionCost: number;
  developmentCost: number;
  leaseTermYears: number;
  targetYield: number;
  expectedAnnualGrowth: number;
}
