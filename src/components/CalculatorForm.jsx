import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Factory, 
  Briefcase, 
  ArrowRight, 
  RotateCcw, 
  Save, 
  Check, 
  AlertCircle
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

  // Urutan Pertanyaan Sensus Ekonomi 2026:
  // 1. 26. b. Biaya produksi
  // 2. 26. c. Biaya pembelian barang yang terjual
  // 3. 26. d. Biaya operasional (air, listrik, gas, internet, pulsa, pemeliharaan, biaya angkutan, dll.)
  // 4. 27. a. Nilai pendapatan barang dan jasa
  const formSteps = [
    {
      id: 'biayaProduksi',
      stepNumber: '1',
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
      stepNumber: '2',
      code: '26. c.',
      title: '26. c. Biaya pembelian barang yang terjual',
      field: 'biayaBarangTerjual',
      icon: ShoppingCart,
      iconBg: 'bg-purple-50 text-purple-600',
      badge: 'Opsional',
      badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
      placeholder: '0 (Kosongkan jika bukan pedagang)',
      isRequired: false,
    },
    {
      id: 'biayaOperasional',
      stepNumber: '3',
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
    {
      id: 'nilaiProduksi',
      stepNumber: '4',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            Komponen Nilai Tambah Bruto
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Satuan input dalam Rupiah (Rp). Wajib diisi kecuali 26.c.
          </p>
        </div>

        {/* Form Meta: Nama Usaha */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nama Usaha / Catatan (Opsional)"
            value={formData.namaUsaha || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, namaUsaha: e.target.value }))}
            className="text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/20 focus:border-[#5B58DE] w-full sm:w-60"
          />
        </div>
      </div>

      {/* Main Timeline Form */}
      <form onSubmit={validateAndSubmit}>
        <div className="relative pl-6 sm:pl-8 space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[11px] sm:left-[15px] top-5 bottom-8 w-[2px] bg-indigo-100"></div>

          {formSteps.map((step) => {
            const Icon = step.icon;
            const hasError = errors[step.field];
            const isFilled = formData[step.field] && formData[step.field].length > 0;

            return (
              <div key={step.id} className="relative group">
                {/* Timeline Dot Indicator */}
                <div 
                  className={`absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10 ${
                    hasError
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : isFilled
                      ? 'border-[#5B58DE] bg-[#5B58DE] text-white shadow-sm'
                      : 'border-indigo-200 bg-white text-indigo-400'
                  }`}
                >
                  {isFilled && !hasError ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-bold">{step.stepNumber}</span>
                  )}
                </div>

                {/* Card Container for Input */}
                <div className={`p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 ${
                  hasError 
                    ? 'border-rose-300 bg-rose-50/40 ring-2 ring-rose-100' 
                    : isFilled 
                    ? 'border-indigo-100 bg-[#FAF9FF] shadow-xs' 
                    : 'border-slate-100 bg-[#F9FAFD] hover:border-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    {/* Icon & Title Info (No description under title) */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${step.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                          {step.title}
                        </h4>
                        {step.isRequired && <span className="text-rose-500 font-bold">*</span>}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 self-start sm:self-center ml-12 sm:ml-0">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${step.badgeClass}`}>
                        {step.badge}
                      </span>
                    </div>
                  </div>

                  {/* Rupiah Input Field */}
                  <div>
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

                    {/* Error Message */}
                    {hasError && (
                      <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {hasError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-7 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
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
