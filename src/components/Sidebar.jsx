import React from 'react';
import { 
  Calculator, 
  Table, 
  Layers, 
  BookOpen, 
  Sparkles,
  X,
  History
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
      label: 'Kalkulator & Uji NTB',
      desc: 'All-in-One Dashboard',
      icon: Calculator,
      badge: historyCount > 0 ? `${historyCount} Riwayat` : null,
      isActive: activeTab === 'calculator',
      action: () => setActiveTab('calculator')
    },
    {
      id: 'table',
      label: 'Tabel Standar SE2026',
      desc: 'Rentang Wajar Kategori A-U',
      icon: Table,
      badge: '19 Kategori',
      isActive: activeTab === 'table',
      action: () => setActiveTab('table')
    },
    {
      id: 'simulations',
      label: 'Simulasi Sektor',
      desc: 'Contoh Data Kasus',
      icon: Layers,
      badge: 4,
      isActive: activeTab === 'simulations',
      action: () => setActiveTab('simulations')
    },
    {
      id: 'formula',
      label: 'Panduan & Rumus',
      desc: 'Kaidah Lengkap NTB',
      icon: BookOpen,
      badge: 'BPS SE26',
      isActive: false,
      action: () => {
        onOpenFormula();
      }
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
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 text-left ${
                    item.isActive
                      ? 'bg-white text-[#5B58DE] shadow-md font-semibold translate-x-1'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-xl ${item.isActive ? 'bg-indigo-50 text-[#5B58DE]' : 'bg-white/10 text-white'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block leading-tight">{item.label}</span>
                      <span className={`text-[10px] block mt-0.5 ${item.isActive ? 'text-indigo-400' : 'text-white/60'}`}>
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
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

        {/* Bottom Aesthetic Plant / Flower Vase Illustration */}
        <div className="relative pt-4 flex flex-col items-center justify-end pointer-events-none select-none">
          <FlowerVaseIllustration className="w-44 -mb-2 drop-shadow-lg" />
          <div className="w-full text-center py-2.5 bg-[#4D4AC7]/40 text-[11px] text-white/70">
            SE2026 • BPS NTB Standard
          </div>
        </div>
      </aside>
    </>
  );
};
