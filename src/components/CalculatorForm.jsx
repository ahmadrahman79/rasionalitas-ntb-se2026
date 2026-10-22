import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2,
  Factory, 
  ShoppingCart, 
  Briefcase, 
  DollarSign, 
  ArrowRight, 
  RotateCcw, 
  Save, 
  Check, 
  AlertCircle,
  FileText,
  Layers,
  Search,
  ChevronDown,
  X
} from 'lucide-react';
import { formatInputCurrency, parseRupiah, KATEGORI_LAPANGAN_USAHA, formatDecimal } from '../utils/formatters';

export const CalculatorForm = ({ 
  formData, 
  setFormData, 
  onCalculateAndSave, 
  onReset 
}) => {
  const [errors, setErrors] = useState({});
  const [isKbliOpen, setIsKbliOpen] = useState(false);
  const [kbliSearch, setKbliSearch] = useState('');
  const kbliDropdownRef = useRef(null);
  const kbliInputRef = useRef(null);

  // Close KBLI dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (kbliDropdownRef.current && !kbliDropdownRef.current.contains(event.target)) {
        setIsKbliOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when KBLI dropdown opens
  useEffect(() => {
    if (isKbliOpen && kbliInputRef.current) {
      kbliInputRef.current.focus();
    }
  }, [isKbliOpen]);

  const handleInputChange = (field, rawValue) => {
    const formatted = formatInputCurrency(rawValue);
    setFormData(prev => ({
      ...prev,
      [field]: formatted
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const selectedKategori = KATEGORI_LAPANGAN_USAHA.find(k => k.kode === (formData.kategoriKode || 'C')) || KATEGORI_LAPANGAN_USAHA[2];

  // Alphabet list for quick 1-click KBLI selection
  const alphabetList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'T'];

  // Handle immediate selection when clicking alphabet button
  const handleDirectSelectKbli = (letterCode) => {
    const target = KATEGORI_LAPANGAN_USAHA.find(k => k.kode === letterCode);
    if (target && target.dianalisis) {
      setFormData(prev => ({ ...prev, kategoriKode: letterCode }));
      setIsKbliOpen(false);
      setKbliSearch('');
    }
  };

  // Filter KBLI list in dropdown search
  const filteredKbli = KATEGORI_LAPANGAN_USAHA.filter((kat) => {
    if (!kbliSearch) return true;
    const clean = kbliSearch.toLowerCase().trim();
    if (clean.length === 1) {
      return kat.kode.toLowerCase() === clean;
    }
    return (
      kat.kode.toLowerCase() === clean ||
      kat.nama.toLowerCase().includes(clean) ||
      kat.singkat.toLowerCase().includes(clean)
    );
  });

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const prodVal = parseRupiah(formData.nilaiProduksi);

    if (!formData.biayaProduksi && formData.biayaProduksi !== '0') {
      newErrors.biayaProduksi = '26. b. Biaya produksi wajib diisi.';
    }
    if (!formData.biayaOperasional && formData.biayaOperasional !== '0') {
      newErrors.biayaOperasional = '26. d. Biaya operasional wajib diisi.';
    }
    if (!formData.nilaiProduksi || prodVal <= 0) {
      newErrors.nilaiProduksi = '27. a. Nilai pendapatan barang dan jasa wajib diisi lebih dari 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCalculateAndSave();
  };

  // Rincian 26 & 27
  const rincian26 = [
    {
      id: 'biayaProduksi',
      code: '26. b.',
      title: '26. b. Biaya produksi',
      field: 'biayaProduksi',
      icon: Factory,
      iconBg: 'bg-pink-50 text-pink-600',
      badge: 'Wajib',
      badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      placeholder: '0',
      isRequired: true,
    },
    {
      id: 'biayaBarangTerjual',
      code: '26. c.',
      title: '26. c. Biaya pembelian barang yang terjual',
      field: 'biayaBarangTerjual',
      icon: ShoppingCart,
      iconBg: 'bg-purple-50 text-purple-600',
      badge: 'Opsional',
      badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
      placeholder: '0',
      isRequired: false,
    },
    {
      id: 'biayaOperasional',
      code: '26. d.',
      title: '26. d. Biaya operasional (air, listrik, gas, internet, pulsa, pemeliharaan, biaya angkutan, dll.)',
      field: 'biayaOperasional',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-blue-600',
      badge: 'Wajib',
      badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      placeholder: '0',
      isRequired: true,
    },
  ];

  const rincian27 = [
    {
      id: 'nilaiProduksi',
      code: '27. a.',
      title: '27. a. Nilai pendapatan barang dan jasa',
      field: 'nilaiProduksi',
      icon: DollarSign,
      iconBg: 'bg-indigo-50 text-indigo-600',
      badge: 'Wajib',
      badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      placeholder: '0',
      isRequired: true,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft">
      {/* Title & Section Header */}
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#5B58DE]" />
          <span>Komponen Nilai Tambah Bruto</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Isi nama usaha, pilih Kategori KBLI, lalu masukkan data pengeluaran dan pendapatan dalam satuan Rupiah (Rp).
        </p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-6">
        {/* BAGIAN 1: IDENTITAS USAHA (OPSIONAL) */}
        <div className="bg-[#FAF9FE] p-4 sm:p-5 rounded-2xl border border-indigo-100/70">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#5B58DE]" />
              <span>Nama Usaha / Responden</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400 normal-case">(Opsional)</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama usaha terlebih dahulu (Contoh: Rumah Makan Rasa Mempawah, Toko Berkah, dll.)"
            value={formData.namaUsaha || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, namaUsaha: e.target.value }))}
            className="w-full px-4 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/20 focus:border-[#5B58DE] text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* BAGIAN 2: KATEGORI LAPANGAN USAHA (KBLI) - SEBELUM RINCIAN 26 & 27 */}
        <div className="bg-[#FAF9FE] p-4 sm:p-5 rounded-2xl border border-indigo-100/70" ref={kbliDropdownRef}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#5B58DE]" />
              <span>Kategori Lapangan Usaha (KBLI)</span>
            </label>
            <span className="text-[11px] font-semibold text-slate-500">
              Rentang Wajar SE2026: <strong className="text-[#5B58DE] font-mono">{formatDecimal(selectedKategori.min)} – {formatDecimal(selectedKategori.max)}</strong>
            </span>
          </div>

          {/* Quick Click Alphabet Row (Kode yang Berjajar - Sekali klik langsung memilih!) */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-500">
                Pilih Cepat Abjad Kategori:
              </span>
              <span className="text-[10px] text-slate-400 italic">
                (Klik abjad untuk langsung memilih KBLI)
              </span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
              {alphabetList.map((letter) => {
                const isCurrent = (formData.kategoriKode || 'C') === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleDirectSelectKbli(letter)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all shrink-0 flex items-center justify-center ${
                      isCurrent
                        ? 'bg-[#5B58DE] text-white shadow-md ring-2 ring-[#5B58DE]/30 scale-105'
                        : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-[#5B58DE] border border-slate-200'
                    }`}
                    title={`Pilih Kategori ${letter}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Searchable Combobox Trigger Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsKbliOpen(!isKbliOpen)}
              className={`w-full bg-white hover:bg-slate-50 border text-left rounded-2xl px-4 py-3 flex items-center justify-between gap-3 transition-all ${
                isKbliOpen
                  ? 'border-[#5B58DE] ring-2 ring-[#5B58DE]/20 shadow-sm'
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-[#5B58DE] text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {selectedKategori.kode}
                </span>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate">
                    {selectedKategori.nama}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    Batas Standar: MIN {formatDecimal(selectedKategori.min)} | MAX {formatDecimal(selectedKategori.max)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-slate-400">
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isKbliOpen ? 'rotate-180 text-[#5B58DE]' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu Popover */}
            {isKbliOpen && (
              <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Search Input Box */}
                <div className="p-3 border-b border-slate-100 bg-slate-50/90">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      ref={kbliInputRef}
                      type="text"
                      placeholder="Cari abjad atau nama usaha..."
                      value={kbliSearch}
                      onChange={(e) => setKbliSearch(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/30 focus:border-[#5B58DE] text-slate-800 placeholder-slate-400 font-medium"
                    />
                    {kbliSearch && (
                      <button
                        type="button"
                        onClick={() => setKbliSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* List of Categories in Dropdown */}
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 p-1.5">
                  {filteredKbli.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      Tidak ada kategori yang cocok dengan "{kbliSearch}"
                    </div>
                  ) : (
                    filteredKbli.map((kat) => {
                      const isSelected = kat.kode === (formData.kategoriKode || 'C');
                      const canAnalyze = kat.dianalisis;

                      return (
                        <button
                          key={kat.kode}
                          type="button"
                          disabled={!canAnalyze}
                          onClick={() => {
                            if (canAnalyze) {
                              setFormData(prev => ({ ...prev, kategoriKode: kat.kode }));
                              setIsKbliOpen(false);
                              setKbliSearch('');
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                            !canAnalyze 
                              ? 'opacity-40 cursor-not-allowed bg-slate-50' 
                              : isSelected 
                              ? 'bg-indigo-50 text-indigo-950 font-semibold' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              !canAnalyze 
                                ? 'bg-slate-200 text-slate-500'
                                : isSelected 
                                ? 'bg-[#5B58DE] text-white shadow-xs' 
                                : 'bg-indigo-100 text-[#5B58DE]'
                            }`}>
                              {kat.kode}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-semibold truncate">
                                {kat.nama}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {canAnalyze ? kat.singkat : 'Dikecualikan dalam Sensus Ekonomi 2026'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {canAnalyze ? (
                              <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  MIN {formatDecimal(kat.min)}
                                </span>
                                <span className="text-slate-300">-</span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  MAX {formatDecimal(kat.max)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-500 font-semibold">
                                Dikecualikan
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
        </div>

        {/* BAGIAN 3: 26. RINCIAN PENGELUARAN */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B58DE]"></span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
              26. Rincian Pengeluaran
            </h4>
          </div>

          <div className="space-y-3">
            {rincian26.map((step) => {
              const Icon = step.icon;
              const hasError = errors[step.field];
              const isFilled = formData[step.field] && formData[step.field].length > 0;

              return (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    hasError 
                      ? 'border-rose-300 bg-rose-50/40 ring-2 ring-rose-100' 
                      : isFilled 
                      ? 'border-indigo-100 bg-[#FAF9FF] shadow-xs' 
                      : 'border-slate-100 bg-[#F9FAFD] hover:border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl ${step.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {step.title}
                        </span>
                        {step.isRequired ? (
                          <span className="text-rose-500 font-bold">*</span>
                        ) : (
                          <span className="text-xs text-slate-400 font-normal">(opsional)</span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 self-start sm:self-center ml-10 sm:ml-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${step.badgeClass}`}>
                        {step.badge}
                      </span>
                    </div>
                  </div>

                  {/* Rupiah Input Field */}
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="text-xs font-bold text-slate-400">Rp</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder={step.placeholder}
                      value={formData[step.field] || ''}
                      onChange={(e) => handleInputChange(step.field, e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 text-sm font-semibold rounded-xl bg-white border transition-all focus:outline-none focus:ring-2 ${
                        hasError
                          ? 'border-rose-400 text-rose-900 focus:ring-rose-200'
                          : 'border-slate-200 text-slate-800 focus:border-[#5B58DE] focus:ring-[#5B58DE]/20'
                      }`}
                    />
                  </div>

                  {hasError && (
                    <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {hasError}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BAGIAN 4: 27. RINCIAN NILAI PENDAPATAN */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
              27. Rincian Nilai Pendapatan
            </h4>
          </div>

          <div className="space-y-3">
            {rincian27.map((step) => {
              const Icon = step.icon;
              const hasError = errors[step.field];
              const isFilled = formData[step.field] && formData[step.field].length > 0;

              return (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    hasError 
                      ? 'border-rose-300 bg-rose-50/40 ring-2 ring-rose-100' 
                      : isFilled 
                      ? 'border-emerald-100 bg-[#F5FCF8] shadow-xs' 
                      : 'border-slate-100 bg-[#F9FAFD] hover:border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl ${step.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {step.title}
                        </span>
                        <span className="text-rose-500 font-bold">*</span>
                      </div>
                    </div>

                    <div className="shrink-0 self-start sm:self-center ml-10 sm:ml-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${step.badgeClass}`}>
                        {step.badge}
                      </span>
                    </div>
                  </div>

                  {/* Rupiah Input Field */}
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="text-xs font-bold text-slate-400">Rp</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder={step.placeholder}
                      value={formData[step.field] || ''}
                      onChange={(e) => handleInputChange(step.field, e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 text-sm font-semibold rounded-xl bg-white border transition-all focus:outline-none focus:ring-2 ${
                        hasError
                          ? 'border-rose-400 text-rose-900 focus:ring-rose-200'
                          : 'border-slate-200 text-slate-800 focus:border-[#5B58DE] focus:ring-[#5B58DE]/20'
                      }`}
                    />
                  </div>

                  {hasError && (
                    <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {hasError}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition flex items-center justify-center gap-2 border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Isian</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#5B58DE] to-[#716EED] hover:from-[#4C49CC] hover:to-[#5B58DE] shadow-purple-glow transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Hitung & Simpan Riwayat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
