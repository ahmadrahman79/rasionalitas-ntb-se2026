import React from 'react';
import { Search, Bell, HelpCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  onOpenFormula, 
  isSidebarOpen = true,
  onToggleSidebar 
}) => {
  return (
    <header className="bg-white rounded-3xl p-4 md:px-7 md:py-4 shadow-soft flex items-center justify-between gap-4 mb-6">
      {/* Left Title & Sidebar Toggle Button */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-[#5B58DE] hover:bg-indigo-50 border border-slate-200/80 transition-all shadow-xs flex items-center justify-center shrink-0"
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5 text-slate-700 hover:text-[#5B58DE]" />
          ) : (
            <PanelLeftOpen className="w-5 h-5 text-[#5B58DE]" />
          )}
        </button>

        <div className="min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 tracking-tight leading-snug truncate sm:overflow-visible">
            Modul Simulasi Perhitungan Nilai Tambah Bruto
          </h2>
          <p className="text-xs text-slate-400 hidden sm:block truncate">
            Uji Rasionalitas Nilai Tambah Bruto • BPS Kabupaten Mempawah • SE2026
          </p>
        </div>
      </div>

      {/* Right Search Bar & Actions */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cari riwayat atau KBLI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-40 sm:w-60 md:w-72 bg-slate-50 border border-slate-200/80 rounded-full py-2 pl-4 pr-10 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/30 focus:border-[#5B58DE] transition-all"
          />
          <button 
            className="absolute right-1.5 w-7 h-7 bg-[#5B58DE] hover:bg-[#4C49CC] text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
            title="Cari"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Help Button */}
        <button
          onClick={onOpenFormula}
          className="p-2.5 rounded-full text-slate-500 hover:text-[#5B58DE] hover:bg-brand-50 transition border border-slate-100 hidden sm:flex items-center gap-1.5 text-xs font-semibold"
          title="Panduan Rumus NTB"
        >
          <HelpCircle className="w-4 h-4 text-[#5B58DE]" />
          <span>Rumus</span>
        </button>

        {/* Notification Bell with red dot */}
        <div className="relative">
          <button 
            className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition relative"
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
