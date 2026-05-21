import { useState, FormEvent, useEffect } from 'react';
import { PORTFOLIO_PLOTS } from '../data/mockData';
import { Sparkles, Send, CheckCircle2, ShieldCheck, HelpCircle, Building2, UserCheck } from 'lucide-react';

interface ProposalFormProps {
  preselectedPlotId: string;
  activeType?: 'jv' | 'agency';
  onTypeChange?: (type: 'jv' | 'agency') => void;
}

export default function ProposalForm({ preselectedPlotId, activeType, onTypeChange }: ProposalFormProps) {
  // Toggle form types of either 'jv' or 'agency'
  const [internalFormType, setInternalFormType] = useState<'jv' | 'agency'>('jv');

  const formType = activeType || internalFormType;
  const setFormType = (type: 'jv' | 'agency') => {
    if (onTypeChange) {
      onTypeChange(type);
    } else {
      setInternalFormType(type);
    }
  };

  // Shared form fields
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>('');

  // 1. Joint Venture specific fields
  const [plotId, setPlotId] = useState<string>(preselectedPlotId || 'SZ-E-101');
  const [investment, setInvestment] = useState<string>('$5M — $10M');
  const [developerLicense, setDeveloperLicense] = useState<boolean>(false);

  // 2. Agency specific fields
  const [agencyLicense, setAgencyLicense] = useState<string>('');
  const [agentCount, setAgentCount] = useState<string>('5 — 15 Agents');
  const [focusTerritory, setFocusTerritory] = useState<string>('All Indraprastha City');
  const [commissionModel, setCommissionModel] = useState<string>('Standard 2.5% split');
  const [agencyAgreement, setAgencyAgreement] = useState<boolean>(false);

  // Auto-sync coordinates when parent triggers preselected coordinate changes
  useEffect(() => {
    if (preselectedPlotId) {
      setPlotId(preselectedPlotId);
    }
  }, [preselectedPlotId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !companyName) {
      alert("Please populate the primary fields.");
      return;
    }

    // Generate B2B tracking ID
    const randomSeed = Math.floor(100000 + Math.random() * 900000);
    const trackingRef = formType === 'jv'
      ? `Ref-JV-${plotId}-${randomSeed}`
      : `Ref-AGN-REG-${randomSeed}`;

    setTrackingId(trackingRef);
    setSubmitSuccess(true);
  };

  const handleReset = () => {
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setDeveloperLicense(false);
    setAgencyLicense('');
    setAgencyAgreement(false);
    setSubmitSuccess(false);
  };

  return (
    <section id="partnerships-section" className="py-24 bg-[#08090C] border-t border-slate-900 relative">
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-950/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Side - Left 4 cols (Adapts dynamically by formType!) */}
          <div id="proposal-text-side" className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="font-mono text-xs tracking-[0.25em] text-[#10B981] uppercase font-bold flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                {formType === 'jv' ? 'JOINT VENTURE ALLIANCES' : 'AGENCY ECOSYSTEM'}
              </span>
              
              <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                {formType === 'jv' ? 'Seeding Gateway' : 'B2B Broker Program'}
              </h2>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {formType === 'jv' 
                  ? 'Register developer credentials or request direct joint venture placement on chosen land-bank parcels in Indraprastha. All proposals route directly to our asset advisory panel.'
                  : 'Register your state-accredited brokerage agency to unlock priority inventory allocations, premium commission tiers, and direct tenant matching feeds inside Indraprastha.'
                }
              </p>

              <div className="pt-8 space-y-4 border-t border-slate-950">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-white tracking-wide block">
                      {formType === 'jv' ? 'Priority Land Allocations' : 'Direct Inventory Portals'}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {formType === 'jv'
                        ? 'Accredited developers receive rapid soil clearance, civil framework linkages, and custom local regulatory zoning reports.'
                        : 'Access a live master ledger system with premium pre-designed renders, real-time yield estimates, and digital PDF tenant kits.'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block">Need custom models?</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {formType === 'jv'
                        ? 'Contact partnership managers directly through priority partner hotlines on the principal axis.'
                        : 'Learn about our 2.5% split models, volume accelerator bonuses, and marketing assistance.'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro aesthetic card showing active status */}
            <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-sm font-mono text-[9px] text-slate-500 flex items-center justify-between">
              <span>SECURE COMPLIANT PROTOCOLS</span>
              <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">AES-256</span>
            </div>
          </div>

          {/* Form Side - Right 8 cols */}
          <div id="proposal-form-side" className="lg:col-span-8 bg-slate-950/60 border border-slate-900/60 p-8 rounded-sm backdrop-blur-sm flex flex-col justify-between">
            
            {/* Header Tabs to separate the two structures */}
            <div className="flex border-b border-slate-900/80 pb-5 gap-6 mb-6">
              <button
                type="button"
                id="tab-jv-selector"
                onClick={() => setFormType('jv')}
                className={`pb-2.5 text-xs font-mono font-bold tracking-widest transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
                  formType === 'jv' 
                    ? 'border-[#10B981] text-[#10B981]' 
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Building2 className="h-4 w-4" />
                JOINT VENTURE ALLIANCE
              </button>
              <button
                type="button"
                id="tab-agency-selector"
                onClick={() => setFormType('agency')}
                className={`pb-2.5 text-xs font-mono font-bold tracking-widest transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
                  formType === 'agency' 
                    ? 'border-[#10B981] text-[#10B981]' 
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <UserCheck className="h-4 w-4" />
                ACCREDITED AGENCY REGISTRATION
              </button>
            </div>

            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-sans text-lg font-semibold text-white tracking-wide">
                    {formType === 'jv' ? 'Land Development JV Inquiry' : 'Brokerage Agency Accreditations'}
                  </h3>
                  <p className="text-slate-500 text-xs font-sans mt-1">
                    {formType === 'jv'
                      ? 'Please complete all required fields so our land acquisition directors can retrieve specific geological coordinates.'
                      : 'Provide agency licensing and active credentials to finalize reseller commissions and ledger permissions.'
                    }
                  </p>
                </div>

                {/* Primary Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                      Authorized Signatory *
                    </label>
                    <input
                      id="input-full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eng. Alexander Vance"
                      className="w-full bg-[#0B0D10] border border-slate-900 hover:border-slate-800 focus:border-[#10B981]/80 px-4 py-3 rounded text-sm text-slate-200 outline-none transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                      {formType === 'jv' ? 'Sovereign Developer Entity *' : 'Real Estate Agency Name *'}
                    </label>
                    <input
                      id="input-company-name"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={formType === 'jv' ? "e.g. Zenith Land Development Group" : "e.g. Apex Strategic Realty"}
                      className="w-full bg-[#0B0D10] border border-slate-900 hover:border-slate-800 focus:border-[#10B981]/80 px-4 py-3 rounded text-sm text-slate-200 outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                      Professional Business Email *
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="partnership@corp-domain.com"
                      className="w-full bg-[#0B0D10] border border-slate-900 hover:border-slate-800 focus:border-[#10B981]/80 px-4 py-3 rounded text-sm text-slate-200 outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                      Sovereign Telephone / Hotline
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+20 100 000 0000"
                      className="w-full bg-[#0B0D10] border border-slate-900 hover:border-slate-800 focus:border-[#10B981]/80 px-4 py-3 rounded text-sm text-slate-200 outline-none transition-colors"
                    />
                  </div>

                  {/* DIVERGENT FIELDS FOR JOINT VENTURE */}
                  {formType === 'jv' && (
                    <>
                      {/* Targeted Plot selection */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                          Target Land Coordinates
                        </label>
                        <select
                          id="form-plot-id"
                          value={plotId}
                          onChange={(e) => setPlotId(e.target.value)}
                          className="w-full bg-[#0B0D10] border border-slate-900 px-4 py-3 rounded text-sm text-slate-200 focus:outline-none focus:border-[#10B981]/80 cursor-pointer text-slate-300"
                        >
                          {PORTFOLIO_PLOTS.map((plot) => (
                            <option key={plot.id} value={plot.plotId}>
                              {plot.plotId} — {plot.title} (Zoning: {plot.zoning})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Investment Volume Range */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">
                          Primary Allocation Liquid Capital
                        </label>
                        <select
                          id="form-investment-scale"
                          value={investment}
                          onChange={(e) => setInvestment(e.target.value)}
                          className="w-full bg-[#0B0D10] border border-[#10B981]/40 px-4 py-3 rounded text-sm text-[#10B981] font-semibold focus:outline-none focus:border-[#10B981] cursor-pointer"
                        >
                          <option>$1M — $5M</option>
                          <option>$5M — $10M</option>
                          <option>$10M — $25M</option>
                          <option>$25M — $50M</option>
                          <option>$50M+</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* DIVERGENT FIELDS FOR AGENCY REGISTRATION */}
                  {formType === 'agency' && (
                    <>
                      {/* Agency Licensing ID */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                          Regulatory Reseller Licence ID *
                        </label>
                        <input
                          id="input-agency-license"
                          type="text"
                          required
                          value={agencyLicense}
                          onChange={(e) => setAgencyLicense(e.target.value)}
                          placeholder="e.g. FRA-EG-2026-904"
                          className="w-full bg-[#0B0D10] border border-slate-900 hover:border-slate-800 focus:border-[#10B981]/80 px-4 py-3 rounded text-sm text-slate-200 outline-none transition-colors"
                        />
                      </div>

                      {/* Team Size */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                          Active Full-Time Brokers
                        </label>
                        <select
                          id="form-agent-count"
                          value={agentCount}
                          onChange={(e) => setAgentCount(e.target.value)}
                          className="w-full bg-[#0B0D10] border border-slate-900 px-4 py-3 rounded text-sm text-slate-200 focus:outline-none focus:border-[#10B981]/80 cursor-pointer text-slate-300"
                        >
                          <option>1 — 5 Agents</option>
                          <option>5 — 15 Agents</option>
                          <option>15 — 50 Agents</option>
                          <option>50+ Agents</option>
                        </select>
                      </div>

                      {/* Primary Focus Territory */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                          Target Indraprastha Focus Territory
                        </label>
                        <select
                          id="form-focus-territory"
                          value={focusTerritory}
                          onChange={(e) => setFocusTerritory(e.target.value)}
                          className="w-full bg-[#0B0D10] border border-slate-900 px-4 py-3 rounded text-sm text-slate-200 focus:outline-none focus:border-[#10B981]/80 cursor-pointer text-slate-300"
                        >
                          <option>Indraprastha East District</option>
                          <option>Indraprastha West Promenade</option>
                          <option>Crest Heights Plateau</option>
                          <option>All Indraprastha City</option>
                        </select>
                      </div>

                      {/* Desired Commission program */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">
                          Preferred Reseller Agreement
                        </label>
                        <select
                          id="form-commission-model"
                          value={commissionModel}
                          onChange={(e) => setCommissionModel(e.target.value)}
                          className="w-full bg-[#0B0D10] border border-[#10B981]/40 px-4 py-3 rounded text-sm text-[#10B981] font-semibold focus:outline-none focus:border-[#10B981] cursor-pointer"
                        >
                          <option>Standard 2.5% split</option>
                          <option>High-volume accelerator</option>
                          <option>Exclusivity listing rights</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* Statement - custom title by type */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                    {formType === 'jv' ? 'Alignment of Alliance Goals' : 'Brokerage Track Record Overview'}
                  </label>
                  <textarea
                    id="input-alliance-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={formType === 'jv'
                      ? "Describe spatial requirements, planned building scale, or financial timelines..."
                      : "Describe primary client profiles, recent premium transaction volumes, or preferred promotional support..."
                    }
                    className="w-full bg-[#0B0D10] border border-slate-900 hover:border-slate-800 focus:border-[#10B981]/80 px-4 py-3 rounded text-sm text-slate-200 outline-none transition-colors resize-none text-slate-300"
                  ></textarea>
                </div>

                {/* Agreements depending on type */}
                {formType === 'jv' ? (
                  <div id="compliance-checkbox-group" className="flex items-start gap-3">
                    <input
                      id="checkbox-developer-license"
                      type="checkbox"
                      required
                      checked={developerLicense}
                      onChange={(e) => setDeveloperLicense(e.target.checked)}
                      className="h-4 w-4 bg-[#0B0D10] border border-slate-900 rounded accent-[#10B981] text-[#10B981] cursor-pointer mt-0.5"
                    />
                    <label htmlFor="checkbox-developer-license" className="text-xs text-slate-400 font-sans leading-relaxed select-none">
                      I confirm that our developer group holds valid structural accrediting licences and is legally pre-cleared for land acquisition. *
                    </label>
                  </div>
                ) : (
                  <div id="compliance-checkbox-group-agency" className="flex items-start gap-3">
                    <input
                      id="checkbox-agency-license"
                      type="checkbox"
                      required
                      checked={agencyAgreement}
                      onChange={(e) => setAgencyAgreement(e.target.checked)}
                      className="h-4 w-4 bg-[#0B0D10] border border-slate-900 rounded accent-[#10B981] text-[#10B981] cursor-pointer mt-0.5"
                    />
                    <label htmlFor="checkbox-agency-license" className="text-xs text-slate-400 font-sans leading-relaxed select-none">
                      I confirm that our firm holds valid active brokerage credentials and complies with Egyptian land authorities (FRA) guidelines. *
                    </label>
                  </div>
                )}

                {/* Action button */}
                <div className="pt-4 flex justify-end">
                  <button
                    id="submit-proposal-btn"
                    type="submit"
                    className="flex items-center bg-[#10B981] hover:bg-[#10B981]/95 text-slate-950 font-mono font-bold tracking-widest text-xs py-3.5 px-8 rounded-sm uppercase transition-all duration-300 cursor-pointer"
                  >
                    {formType === 'jv' ? 'SEND JV INQUIRY' : 'REGISTER AS RESELLER'}
                    <Send className="h-3.5 w-3.5 ml-2" />
                  </button>
                </div>
              </form>
            ) : (
              <div id="proposal-success-box" className="py-12 text-center space-y-6 my-auto">
                <div className="flex justify-center">
                  <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-400 rounded-full animate-bounce">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans text-2xl font-semibold text-white tracking-tight">
                    {formType === 'jv' ? 'Inquiry Safely Engaged' : 'Agency Credentials Registered'}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl mx-auto font-sans">
                    Thank you <strong className="text-slate-200">{fullName}</strong>. Your {formType === 'jv' ? 'Joint Venture Inquiry' : 'Accredited Agency Listing'} for <strong className="text-white">{companyName}</strong> has been logged in our secure ledger.
                  </p>
                </div>

                {/* Reference tracking ID display */}
                <div className="bg-[#0B0D10] border border-slate-900 max-w-md mx-auto p-4 rounded-sm font-mono text-xs text-slate-300">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">LEDGER TRANSACTION ID</span>
                  <span className="text-[#10B981] block mt-1 font-bold tracking-widest">{trackingId}</span>
                </div>

                <p className="text-[11px] text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
                  Our regional portfolio directors will check your credentials to authorize account activation, generating full API keys and private plot downloads under NDA.
                </p>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    id="reset-form-btn"
                    onClick={handleReset}
                    className="border border-[#10B981] bg-[#10B981]/15 text-[#10B981] hover:text-slate-950 hover:bg-[#10B981] font-mono font-bold text-xs px-6 py-2.5 rounded-sm tracking-widest transition-all duration-350 cursor-pointer"
                  >
                    RESET & REGISTER ANOTHER
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
