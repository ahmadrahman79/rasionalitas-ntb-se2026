import React from 'react';
import { 
  Calculator, 
  Table, 
  Layers, 
  BookOpen, 
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
      label: 'Kalkulator & Uji NTB',
      desc: 'All-in-One Dashboard',
      icon: Calculator,
      badge: historyCount > 0 ? `${historyCount}` : null,
      isActive: activeTab === 'calculator',
      action: () => setActiveTab('calculator')
    },
    {
      id: 'table',
      label: 'Tabel Standar SE2026',
      desc: 'Rentang Wajar Kategori A–U',
      icon: Table,
      badge: '19 Kategori',
      isActive: activeTab === 'table',
      action: () => setActiveTab('table')
    },
    {
      id: 'simulations',
      label: 'Simulasi Sektor',
      desc: 'Preset Contoh Usaha',
      icon: Layers,
      badge: 4,
      isActive: activeTab === 'simulations',
      action: () => setActiveTab('simulations')
    },
    {
      id: 'formula',
      label: 'Panduan & Rumus',
      desc: 'Kaidah Konsep NTB',
      icon: BookOpen,
      badge: null,
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#5B58DE] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto overflow-x-hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="p-5 sm:p-6 pb-2">
          {/* Header Dashboard */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider block">Dashboard</span>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 mt-0.5">
                Rasionalitas NTB
                <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
              </h1>
              <p className="text-xs text-white/80 font-medium">Sensus Ekonomi 2026</p>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition"
              aria-label="Tutup Menu"
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
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 text-left ${
                    item.isActive
                      ? 'bg-white text-[#5B58DE] shadow-lg font-bold translate-x-1'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl shrink-0 ${item.isActive ? 'bg-indigo-50 text-[#5B58DE]' : 'bg-white/10 text-white'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block leading-tight truncate">{item.label}</span>
                      <span className={`text-[10px] block mt-0.5 truncate font-normal ${item.isActive ? 'text-indigo-400 font-medium' : 'text-white/60'}`}>
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
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
        <div className="relative pt-2 flex flex-col items-center justify-end select-none mt-auto">
          <FlowerVaseIllustration className="w-40 h-auto -mb-2 drop-shadow-md opacity-90" />
          <div className="w-full text-center py-2 bg-[#4D4AC7]/60 text-[10px] font-medium text-white/75 tracking-wider uppercase border-t border-white/10">
            SE2026 • BPS NTB Standard
          </div>
        </div>
      </aside>
    </>
  );
};
