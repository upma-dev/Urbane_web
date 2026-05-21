import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#030406] border-t border-slate-900/80 pt-16 pb-12 font-sans tracking-wide">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left pb-12">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-5">
            <div>
              <span className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-white block">
                Urban<span className="text-[#10B981]">.</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed max-w-xs">
              Redefining institutional partnerships, land development joint ventures, and brokerage agency services in India.
            </p>
            
            {/* Social Links Panel */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="#" 
                id="social-fb"
                className="h-9 w-9 rounded-full border border-slate-900 bg-slate-950/40 hover:bg-[#10B981]/5 flex items-center justify-center text-slate-400 hover:text-[#10B981] hover:border-[#10B981]/50 transition-all duration-300"
                aria-label="Facebook Link"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a 
                href="#" 
                id="social-ig"
                className="h-9 w-9 rounded-full border border-slate-900 bg-slate-950/40 hover:bg-[#10B981]/5 flex items-center justify-center text-slate-400 hover:text-[#10B981] hover:border-[#10B981]/50 transition-all duration-300"
                aria-label="Instagram Link"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a 
                href="#" 
                id="social-li"
                className="h-9 w-9 rounded-full border border-slate-900 bg-slate-950/40 hover:bg-[#10B981]/5 flex items-center justify-center text-slate-400 hover:text-[#10B981] hover:border-[#10B981]/50 transition-all duration-300"
                aria-label="LinkedIn Link"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Portal Map */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-[#10B981] uppercase relative pb-3 select-none">
              PORTAL MAP
              <span className="absolute bottom-0 left-0 w-12 h-[1px] bg-[#10B981]"></span>
            </h4>
            <ul className="space-y-3 pt-4 text-xs font-medium text-slate-400">
              <li>
                <button
                  id="foot-link-home"
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="foot-link-portfolio"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Developer Portfolio
                </button>
              </li>
              <li>
                <button
                  id="foot-link-calc"
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none font-sans"
                >
                  Yield & commission tools
                </button>
              </li>
              <li>
                <button
                  id="foot-link-audits"
                  onClick={() => onNavigate('tracker')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Construction Audits
                </button>
              </li>
              <li>
                <button
                  id="foot-link-resource"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Resource Center
                </button>
              </li>
              <li>
                <button
                  id="foot-link-contact"
                  onClick={() => onNavigate('partnerships')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Contact Partnerships
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer Portfolio */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-[#10B981] uppercase relative pb-3 select-none">
              DEVELOPER PORTFOLIO
              <span className="absolute bottom-0 left-0 w-12 h-[1px] bg-[#10B981]"></span>
            </h4>
            <ul className="space-y-3 pt-4 text-xs font-medium text-slate-400">
              <li>
                <button
                  id="foot-inv-vert"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left block focus:outline-none"
                >
                  Vert Indraprastha
                </button>
              </li>
              <li>
                <button
                  id="foot-inv-villa"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left block focus:outline-none"
                >
                  Indraprastha Villa
                </button>
              </li>
              <li>
                <button
                  id="foot-inv-elite"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left block focus:outline-none"
                >
                  Indraprastha Elite
                </button>
              </li>
              <li>
                <button
                  id="foot-inv-residence"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left block focus:outline-none"
                >
                  Indraprastha Residence
                </button>
              </li>
              <li>
                <button
                  id="foot-inv-avenue"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left block focus:outline-none"
                >
                  Indraprastha Avenue
                </button>
              </li>
              <li>
                <button
                  id="foot-inv-strike"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left block focus:outline-none"
                >
                  Indraprastha North Strike
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Broker Hotline */}
          <div className="space-y-5">
            <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-[#10B981] uppercase relative pb-3 select-none">
              BROKER HOTLINE
              <span className="absolute bottom-0 left-0 w-12 h-[1px] bg-[#10B981]"></span>
            </h4>
            
            <div className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <span className="block text-slate-500 font-bold tracking-wide uppercase text-[9px]">Hotline Broker Support:</span>
                <span className="block text-2xl font-mono font-extrabold text-[#10B981] tracking-wide select-all">
                  16831
                </span>
              </div>
              
              <div className="space-y-1.5 pt-2">
                <span className="block text-slate-500 font-bold tracking-wide uppercase text-[9px]">Partner Desk:</span>
                <span className="block text-sm font-mono font-semibold text-slate-200 tracking-wider select-all">
                  +20 110 381 1855
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="mt-10 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          <span className="select-none">© 2026 Urban Lease. Partner Portal. All rights reserved.</span>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-slate-800">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
