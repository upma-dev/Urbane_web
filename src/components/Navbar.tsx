import { useState, useEffect } from 'react';
import { Menu, X, Landmark, FileText, Sparkles, Building } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'HOME', action: 'hero' },
    { label: 'PORTFOLIO', action: 'portfolio' },
    { label: 'YIELD CALCULATOR', action: 'calculator' },
    { label: 'RENTAL HUB', action: 'rental-hub' },
    { label: 'PROGRESS TRACKER', action: 'timeline' },
    { label: 'PARTNERSHIPS', action: 'partnerships' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0D10]/95 backdrop-blur-md border-b border-slate-900/60 py-4 shadow-xl'
          : 'bg-gradient-to-b from-[#0B0D10]/90 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Partner Identity */}
        <div
          id="nav-logo-group"
          className="flex items-baseline space-x-2 cursor-pointer group"
          onClick={() => handleClick('hero')}
        >
          <span className="font-sans text-xl md:text-2xl font-black tracking-tight text-white/95">
            Urban<span className="text-[#FAC638]">.</span>
          </span>
          <span className="hidden sm:inline text-xs font-mono tracking-widest text-slate-400 font-medium uppercase border-l border-slate-800 pl-2">
            PARTNER PORTAL
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div id="desktop-menu" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              id={`nav-item-${item.action}`}
              key={item.label}
              onClick={() => handleClick(item.action)}
              className={`font-sans text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer hover:text-[#10B981]/90 ${
                activeSection === item.action
                  ? 'text-[#10B981]'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center space-x-4">
          <button
            id="register-agency-btn"
            onClick={() => handleClick('agency-register')}
            className="bg-[#FAC638] hover:bg-[#EAC043] text-slate-950 px-5 py-2.5 text-[10px] md:text-xs font-mono font-bold tracking-widest transition-all duration-300 rounded-sm shadow-lg shadow-amber-500/10 hover:shadow-emerald-500/20 hover:scale-[1.03] select-none cursor-pointer"
          >
            REGISTER AGENCY
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="lg:hidden flex items-center">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none p-1"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden absolute top-full left-0 w-full bg-[#0B0D10] border-b border-slate-900 shadow-2xl py-6 px-6 flex flex-col space-y-4 animate-fade-in"
        >
          {navItems.map((item) => (
            <button
              id={`mobile-nav-item-${item.action}`}
              key={item.label}
              onClick={() => handleClick(item.action)}
              className={`font-sans text-sm font-semibold tracking-wide text-left py-2 transition-colors border-b border-slate-900 pb-2 ${
                activeSection === item.action
                  ? 'text-[#10B981]'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            id="mobile-register-agency-btn"
            onClick={() => handleClick('agency-register')}
            className="w-full text-center bg-[#FAC638] hover:bg-[#EAC043] text-slate-950 py-3.5 text-xs font-mono font-bold tracking-widest transition-all duration-300 rounded-sm mt-2 shadow-lg select-none cursor-pointer"
          >
            REGISTER AGENCY
          </button>
        </div>
      )}
    </nav>
  );
}
