import React from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Layers,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { formatRupiah, formatDecimal } from '../utils/formatters';

export const ResultCard = ({ calculationResult }) => {
  const {
    nilaiProduksi,
    biayaBarangTerjual,
    biayaProduksi,
    biayaOperasional,
    pendapatanBersihBarang,
    totalBiaya,
    nilaiTambah,
    rasio,
    rasioFormatted,
    kategoriKode,
    kategoriInfo,
    status,
    statusLabel,
    statusColor,
    statusDesc,
  } = calculationResult;

  const isCalculated = nilaiProduksi > 0;

  // Status visual configurations
  const statusStyles = {
    green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: CheckCircle2,
      badge: 'bg-emerald-500 text-white',
    },
    yellow: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: AlertTriangle,
      badge: 'bg-amber-500 text-white',
    },
    red: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: TrendingDown,
      badge: 'bg-rose-500 text-white',
    },
    gray: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      border: 'border-slate-200',
      icon: Info,
      badge: 'bg-slate-400 text-white',
    }
  };

  const currentStyle = statusStyles[statusColor] || statusStyles.gray;
  const StatusIcon = currentStyle.icon;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-7 shadow-soft mb-6">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">
          Hasil Nilai Tambah Bruto
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5B58DE]">
          Live Output
        </span>
      </div>

      {/* Main Result Display Box */}
      <div className="bg-[#F8F9FD] rounded-2xl p-4 border border-slate-100 mb-4">
        <span className="text-xs font-medium text-slate-400 block mb-1">
          Estimasi Nilai Tambah Bruto (NTB)
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            nilaiTambah < 0 ? 'text-rose-600' : 'text-slate-900'
          }`}>
            {formatRupiah(nilaiTambah)}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            IDR
          </span>
        </div>
      </div>

      {/* Rasio (Desimal Murni) & Status Kewajaran */}
      <div className={`p-4 rounded-2xl border ${currentStyle.bg} ${currentStyle.border} mb-4 transition-all`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${currentStyle.text}`} />
            <span className={`text-xs font-bold ${currentStyle.text}`}>
              {statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-xl shadow-xs text-xs font-black text-slate-900 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-semibold">Rasio:</span>
            <span className="font-mono text-sm text-[#5B58DE]">{rasioFormatted}</span>
          </div>
        </div>

        <p className={`text-xs ${currentStyle.text} leading-relaxed opacity-90`}>
          {statusDesc}
        </p>
      </div>

      {/* Mini Financial Breakdown Summary */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
          <span>Nilai Produksi / Penjualan :</span>
          <span className="font-semibold text-slate-800">{formatRupiah(nilaiProduksi)}</span>
        </div>

        {biayaBarangTerjual > 0 && (
          <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
            <span>Biaya Beli Barang Terjual :</span>
            <span className="font-semibold text-rose-600">- {formatRupiah(biayaBarangTerjual)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100 bg-indigo-50/40 px-2 rounded-lg font-semibold">
          <span className="text-indigo-900">Output Bersih (Pembagi Rasio) :</span>
          <span className="text-indigo-950">{formatRupiah(pendapatanBersihBarang)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
          <span>Biaya Produksi (Bahan Baku) :</span>
          <span className="font-semibold text-rose-600">- {formatRupiah(biayaProduksi)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
          <span>Biaya Operasional Usaha :</span>
          <span className="font-semibold text-rose-600">- {formatRupiah(biayaOperasional)}</span>
        </div>

        <div className="flex items-center justify-between pt-1 font-bold text-slate-800">
          <span>Nilai Tambah Bruto (NTB) :</span>
          <span className={nilaiTambah < 0 ? 'text-rose-600' : 'text-[#5B58DE]'}>
            {formatRupiah(nilaiTambah)}
          </span>
        </div>
      </div>
    </div>
  );
};
