import React, { useState } from 'react';
import { 
  Factory, 
  ShoppingCart, 
  Briefcase, 
  DollarSign, 
  ArrowRight, 
  RotateCcw, 
  Save, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { formatInputCurrency, parseRupiah } from '../utils/formatters';

export const CalculatorForm = ({ 
  formData, 
  setFormData, 
  onCalculateAndSave, 
  onReset 
}) => {
  const [errors, setErrors] = useState({});

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

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const prodVal = parseRupiah(formData.nilaiProduksi);
    const prodCostVal = parseRupiah(formData.biayaProduksi);
    const operCostVal = parseRupiah(formData.biayaOperasional);

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

  // 4 Variabel Kuesioner Asli SE2026 yang Diperlukan untuk Rumus NTB
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#5B58DE]" />
            <span>Kuesioner Rasionalitas NTB SE2026</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Format input disesuaikan dengan Kuesioner Sensus Ekonomi 2026 (Rincian 26 & 27).
          </p>
        </div>

        {/* Form Meta: Nama Usaha */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nama Usaha / Responden (Opsional)"
            value={formData.namaUsaha || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, namaUsaha: e.target.value }))}
            className="text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/20 focus:border-[#5B58DE] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={validateAndSubmit} className="space-y-6">
        {/* BAGIAN 1: Rincian 26. Pengeluaran Usaha */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#5B58DE]"></span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
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

        {/* BAGIAN 2: Rincian 27. Nilai Pendapatan */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
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
