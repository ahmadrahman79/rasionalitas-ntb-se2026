import React from 'react';
import { 
  Calculator, 
  History, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Settings,
  Sparkles,
  X
} from 'lucide-react';
import { FlowerVaseIllustration } from './AestheticIllustrations';

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  historyCount = 0,
  isMobileOpen,
  setIsMobileOpen,
  onOpenFormula
}) => {
  const menuItems = [
    {
      id: 'calculator',
      label: 'Kalkulator NTB',
      frenchSub: 'Mon profil',
      icon: Calculator,
      badge: null,
      isActive: activeTab === 'calculator',
      action: () => setActiveTab('calculator')
    },
    {
      id: 'history',
      label: 'Riwayat Perhitungan',
      frenchSub: 'Mes formations',
      icon: History,
      badge: historyCount > 0 ? historyCount : null,
      isActive: activeTab === 'history',
      action: () => setActiveTab('history')
    },
    {
      id: 'formula',
      label: 'Panduan & Rumus',
      frenchSub: 'Sessions suivies',
      icon: BookOpen,
      badge: 'SE26',
      isActive: activeTab === 'formula',
      action: () => {
        setActiveTab('calculator');
        onOpenFormula();
      }
    },
    {
      id: 'simulations',
      label: 'Simulasi Sektor',
      frenchSub: 'Projets',
      icon: Layers,
      badge: 4,
      isActive: activeTab === 'simulations',
      action: () => setActiveTab('simulations')
    },
    {
      id: 'validations',
      label: 'Kaidah SE2026',
      frenchSub: 'Certifications',
      icon: ShieldCheck,
      badge: 2,
      isActive: activeTab === 'validations',
      action: () => setActiveTab('validations')
    },
    {
      id: 'calendar',
      label: 'Jadwal Sensus',
      frenchSub: 'Calendrier',
      icon: Calendar,
      badge: null,
      isActive: false,
      action: () => {}
    },
    {
      id: 'notes',
      label: 'Catatan & Validasi',
      frenchSub: 'Messages',
      icon: MessageSquare,
      badge: 0,
      isActive: false,
      action: () => {}
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      frenchSub: 'Paramètres',
      icon: Settings,
      badge: null,
      isActive: false,
      action: () => {}
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#5B58DE] text-white flex flex-col justify-between overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="p-6 pb-2">
          {/* Header Dashboard */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider block">Dashboard</span>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 mt-0.5">
                Rasionalitas NTB
                <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
              </h1>
              <p className="text-xs text-white/80 font-normal">Sensus Ekonomi 2026 (SE2026)</p>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 text-left ${
                    item.isActive
                      ? 'bg-white text-[#5B58DE] shadow-md font-semibold translate-x-1'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.isActive ? 'text-[#5B58DE]' : 'text-white/90'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        item.isActive
                          ? 'bg-[#5B58DE]/15 text-[#5B58DE]'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Aesthetic Plant / Flower Vase Illustration (Matching the exact design) */}
        <div className="relative pt-4 flex flex-col items-center justify-end pointer-events-none select-none">
          <FlowerVaseIllustration className="w-44 -mb-2 drop-shadow-lg" />
          <div className="w-full text-center py-2 bg-[#4D4AC7]/40 text-[11px] text-white/70">
            SE2026 • BPS NTB Standard
          </div>
        </div>
      </aside>
    </>
  );
};
