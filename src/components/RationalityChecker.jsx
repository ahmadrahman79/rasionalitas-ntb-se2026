import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Search,
  ChevronDown,
  X,
  SlidersHorizontal,
  Layers,
  Check
} from 'lucide-react';
import { KATEGORI_LAPANGAN_USAHA, formatDecimal } from '../utils/formatters';

export const RationalityChecker = ({ 
  kategoriKode, 
  setKategoriKode, 
  calculationResult 
}) => {
  const {
    rasio,
    rasioFormatted,
    kategoriInfo,
    status,
    statusLabel,
    statusColor,
    statusDesc,
    nilaiProduksi
  } = calculationResult;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const isCalculated = nilaiProduksi > 0;
  const isAnalyzed = kategoriInfo && kategoriInfo.dianalisis;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter categories by search term (Abjad or Name)
  const filteredCategories = KATEGORI_LAPANGAN_USAHA.filter((kat) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase().trim();
    return (
      kat.kode.toLowerCase() === term ||
      kat.kode.toLowerCase().includes(term) ||
      kat.nama.toLowerCase().includes(term) ||
      kat.singkat.toLowerCase().includes(term)
    );
  });

  // Calculate percentage position on visual bar
  const minVal = kategoriInfo?.min ?? 0;
  const maxVal = kategoriInfo?.max ?? 1;
  const barMin = 0;
  const barMax = 1.1;

  const getPercentPos = (val) => {
    if (val === null || val === undefined) return 0;
    const clamped = Math.max(0, Math.min(barMax, val));
    return ((clamped - barMin) / (barMax - barMin)) * 100;
  };

  const minPos = getPercentPos(minVal);
  const maxPos = getPercentPos(maxVal);
  const currentPos = getPercentPos(rasio);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-indigo-50/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B58DE] to-[#716EED] text-white flex items-center justify-center shadow-purple-glow">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>Uji Kewajaran Rasio NTB</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-[#5B58DE]">
                Standar SE2026
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Pilih atau cari Kategori Lapangan Usaha (KBLI) untuk memeriksa rasio terhadap rentang wajar (MIN – MAX).
            </p>
          </div>
        </div>

        {/* Badge Formula Info */}
        <div className="text-left sm:text-right bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-100">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Rumus Rasio :</span>
          <span className="text-xs font-mono font-bold text-[#5B58DE]">
            NTB ÷ Output Bersih
          </span>
        </div>
      </div>

      {/* Custom Searchable Select Dropdown (Combobox) */}
      <div className="mb-6 relative" ref={dropdownRef}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#5B58DE]" />
            <span>Kategori Lapangan Usaha (KBLI) :</span>
          </label>
          <span className="text-[11px] font-semibold text-slate-500">
            {isAnalyzed ? (
              <>Rentang Wajar: <strong className="text-[#5B58DE] font-mono">{formatDecimal(minVal)} – {formatDecimal(maxVal)}</strong></>
            ) : (
              <span className="text-slate-400 italic">Tidak Dianalisis</span>
            )}
          </span>
        </div>

        {/* Dropdown Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-[#FAF9FD] hover:bg-[#F4F2FC] border text-left rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3 transition-all ${
            isOpen 
              ? 'border-[#5B58DE] ring-2 ring-[#5B58DE]/20 shadow-md' 
              : 'border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Category Code Pill */}
            <span className="w-8 h-8 rounded-xl bg-[#5B58DE] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              {kategoriInfo?.kode}
            </span>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate">
                {kategoriInfo?.nama}
              </span>
              <span className="text-[11px] text-slate-500 block truncate">
                {isAnalyzed ? `Rentang Standar: MIN ${formatDecimal(minVal)} | MAX ${formatDecimal(maxVal)}` : 'Dikecualikan dalam SE2026'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-slate-400">
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#5B58DE]' : ''}`} />
          </div>
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
            {/* Search Input Box */}
            <div className="p-3 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ketik abjad kategori (A, C, G...) atau nama usaha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/30 focus:border-[#5B58DE] text-slate-800 placeholder-slate-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Alphabet Pills for Fast Filtering */}
              <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-1 scrollbar-none text-[11px]">
                <span className="text-[10px] text-slate-400 font-semibold uppercase shrink-0 mr-1">Abjad:</span>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'T'].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSearchTerm(letter)}
                    className={`px-2 py-0.5 rounded-md font-bold transition shrink-0 ${
                      searchTerm.toUpperCase() === letter
                        ? 'bg-[#5B58DE] text-white'
                        : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-[#5B58DE] border border-slate-200'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Categories */}
            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 p-1">
              {filteredCategories.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Tidak ditemukan kategori dengan kata kunci "{searchTerm}"
                </div>
              ) : (
                filteredCategories.map((kat) => {
                  const isSelected = kat.kode === kategoriKode;
                  const canAnalyze = kat.dianalisis;

                  return (
                    <button
                      key={kat.kode}
                      type="button"
                      disabled={!canAnalyze}
                      onClick={() => {
                        if (canAnalyze) {
                          setKategoriKode(kat.kode);
                          setIsOpen(false);
                          setSearchTerm('');
                        }
                      }}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                        !canAnalyze 
                          ? 'opacity-40 cursor-not-allowed bg-slate-50' 
                          : isSelected 
                          ? 'bg-indigo-50/80 text-indigo-950 font-semibold' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Letter Badge */}
                        <div className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          !canAnalyze 
                            ? 'bg-slate-200 text-slate-500'
                            : isSelected 
                            ? 'bg-[#5B58DE] text-white shadow-xs' 
                            : 'bg-indigo-100/70 text-[#5B58DE]'
                        }`}>
                          {kat.kode}
                        </div>

                        {/* Title Info */}
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold truncate">
                            {kat.nama}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {canAnalyze ? kat.singkat : 'Dikecualikan dalam Sensus Ekonomi 2026'}
                          </p>
                        </div>
                      </div>

                      {/* Right: Min - Max Badges */}
                      <div className="flex items-center gap-2 shrink-0">
                        {canAnalyze ? (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                              MIN {formatDecimal(kat.min)}
                            </span>
                            <span className="text-slate-300">-</span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                              MAX {formatDecimal(kat.max)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-500">
                            Tidak Dianalisis
                          </span>
                        )}

                        {isSelected && (
                          <Check className="w-4 h-4 text-[#5B58DE] stroke-[3]" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Evaluation Box & Visual Range Indicator */}
      {isAnalyzed ? (
        <div className="space-y-4">
          {/* Status Result Card */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            statusColor === 'green' 
              ? 'bg-emerald-50/80 border-emerald-200' 
              : statusColor === 'red'
              ? 'bg-rose-50/80 border-rose-200'
              : statusColor === 'yellow'
              ? 'bg-amber-50/80 border-amber-200'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {statusColor === 'green' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {statusColor === 'red' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                {statusColor === 'yellow' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
                {statusColor === 'gray' && <Info className="w-5 h-5 text-slate-500 shrink-0" />}
                
                <h4 className={`text-sm sm:text-base font-bold ${
                  statusColor === 'green' ? 'text-emerald-900' :
                  statusColor === 'red' ? 'text-rose-900' :
                  statusColor === 'yellow' ? 'text-amber-900' : 'text-slate-800'
                }`}>
                  {statusLabel}
                </h4>
              </div>

              {/* Rasio Value Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-500">Rasio Dihitung:</span>
                <span className="font-mono text-base font-black px-3 py-0.5 rounded-xl bg-white shadow-xs text-slate-900 border border-slate-200/80">
                  {rasioFormatted}
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${
              statusColor === 'green' ? 'text-emerald-800' :
              statusColor === 'red' ? 'text-rose-800' :
              statusColor === 'yellow' ? 'text-amber-800' : 'text-slate-600'
            }`}>
              {statusDesc}
            </p>
          </div>

          {/* Visual Range Indicator Bar */}
          {isCalculated && (
            <div className="bg-[#FAF9FD] p-4 sm:p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-2">
                <span>Batas Min: <strong className="text-slate-900 font-mono">{formatDecimal(minVal)}</strong></span>
                <span className="text-[#5B58DE]">Rentang Wajar Kategori {kategoriInfo.kode}</span>
                <span>Batas Max: <strong className="text-slate-900 font-mono">{formatDecimal(maxVal)}</strong></span>
              </div>

              {/* Range Bar */}
              <div className="relative h-7 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
                {/* Under MIN zone (Red/Pink) */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-rose-100 border-r border-rose-300"
                  style={{ width: `${minPos}%` }}
                  title="Di Bawah Batas Minimum"
                />

                {/* Healthy Range zone (Green) */}
                <div 
                  className="absolute top-0 bottom-0 bg-emerald-400/80 border-x-2 border-emerald-600"
                  style={{ 
                    left: `${minPos}%`, 
                    width: `${Math.max(2, maxPos - minPos)}%` 
                  }}
                  title={`Rentang Wajar: ${formatDecimal(minVal)} - ${formatDecimal(maxVal)}`}
                />

                {/* Over MAX zone (Yellow/Orange) */}
                <div 
                  className="absolute top-0 bottom-0 bg-amber-100 border-l border-amber-300"
                  style={{ 
                    left: `${maxPos}%`, 
                    right: 0 
                  }}
                  title="Di Atas Batas Maksimum"
                />

                {/* Needle Indicator for current ratio */}
                <div 
                  className="absolute top-0 bottom-0 w-1.5 bg-slate-900 shadow-lg z-10 transition-all duration-500 rounded-full"
                  style={{ left: `calc(${currentPos}% - 3px)` }}
                >
                  <div className="w-3 h-3 -top-1 -left-[3px] bg-slate-900 rounded-full absolute shadow-md"></div>
                </div>
              </div>

              {/* Labels under the bar */}
              <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
                <span>0,00</span>
                <span className="text-center font-bold text-slate-700">
                  Posisi Rasio Anda: <strong className="text-[#5B58DE]">{rasioFormatted}</strong>
                </span>
                <span>≥ 1,10</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong>Kategori {kategoriInfo?.kode}</strong> ({kategoriInfo?.singkat}) dikecualikan / tidak dianalisis rasionalitas nilainya dalam Sensus Ekonomi 2026.
          </span>
        </div>
      )}
    </div>
  );
};
