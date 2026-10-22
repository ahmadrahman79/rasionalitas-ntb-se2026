import React from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { formatRupiah, formatDecimal } from '../utils/formatters';

export const ResultCard = ({ calculationResult, onExportCSV, historyLength = 0 }) => {
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
  const isAnalyzed = kategoriInfo && kategoriInfo.dianalisis;

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

  // Visual Range Meter Calculations
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
    <div className="bg-white rounded-3xl p-6 md:p-7 shadow-soft mb-6 sticky top-6 z-20 border border-slate-100">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <Calculator className="w-5 h-5 text-[#5B58DE]" />
          <span>Hasil Nilai Tambah Bruto</span>
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5B58DE]">
          Output SE2026
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
          <div className="flex items-center gap-2 min-w-0">
            <StatusIcon className={`w-4 h-4 ${currentStyle.text} shrink-0`} />
            <span className={`text-xs font-bold ${currentStyle.text} truncate`}>
              {statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-xl shadow-xs text-xs font-black text-slate-900 border border-slate-200/80 shrink-0">
            <span className="text-[10px] text-slate-400 font-semibold">Rasio:</span>
            <span className="font-mono text-sm text-[#5B58DE]">{rasioFormatted}</span>
          </div>
        </div>

        <p className={`text-xs ${currentStyle.text} leading-relaxed opacity-90`}>
          {statusDesc}
        </p>

        {/* Meteran Visual Rentang Wajar (MIN - MAX) */}
        {isAnalyzed && isCalculated && (
          <div className="mt-3.5 pt-3 border-t border-slate-200/60">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold mb-1.5">
              <span>Min: <strong className="font-mono text-slate-800">{formatDecimal(minVal)}</strong></span>
              <span className="text-[#5B58DE] text-[10px] uppercase font-bold tracking-wider">
                Rentang Wajar Kat. {kategoriInfo.kode}
              </span>
              <span>Max: <strong className="font-mono text-slate-800">{formatDecimal(maxVal)}</strong></span>
            </div>

            {/* Range Bar Indicator */}
            <div className="relative h-5 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
              {/* Red Zone (Under Min) */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-rose-200 border-r border-rose-300"
                style={{ width: `${minPos}%` }}
              />

              {/* Green Zone (Healthy Range) */}
              <div 
                className="absolute top-0 bottom-0 bg-emerald-400 border-x-2 border-emerald-600"
                style={{ 
                  left: `${minPos}%`, 
                  width: `${Math.max(2, maxPos - minPos)}%` 
                }}
              />

              {/* Yellow Zone (Over Max) */}
              <div 
                className="absolute top-0 bottom-0 bg-amber-200 border-l border-amber-300"
                style={{ 
                  left: `${maxPos}%`, 
                  right: 0 
                }}
              />

              {/* Needle Indicator for current ratio */}
              <div 
                className="absolute top-0 bottom-0 w-1.5 bg-slate-900 shadow-md z-10 transition-all duration-300 rounded-full"
                style={{ left: `calc(${currentPos}% - 3px)` }}
              >
                <div className="w-2.5 h-2.5 -top-0.5 -left-[2px] bg-slate-900 rounded-full absolute"></div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>0,00</span>
              <span className="font-bold text-slate-700 text-[10px]">
                Posisi Rasio: <span className="text-[#5B58DE]">{rasioFormatted}</span>
              </span>
              <span>≥ 1,10</span>
            </div>
          </div>
        )}
      </div>

      {/* Mini Financial Breakdown Summary */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
          <span className="truncate pr-2">27. a. Pendapatan Barang & Jasa :</span>
          <span className="font-semibold text-slate-800 shrink-0">{formatRupiah(nilaiProduksi)}</span>
        </div>

        {biayaBarangTerjual > 0 && (
          <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
            <span className="truncate pr-2">26. c. Pembelian Barang Terjual :</span>
            <span className="font-semibold text-rose-600 shrink-0">- {formatRupiah(biayaBarangTerjual)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100 bg-indigo-50/40 px-2 rounded-lg font-semibold">
          <span className="text-indigo-900">Output Bersih (27.a - 26.c) :</span>
          <span className="text-indigo-950 shrink-0">{formatRupiah(pendapatanBersihBarang)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
          <span className="truncate pr-2">26. b. Biaya Produksi :</span>
          <span className="font-semibold text-rose-600 shrink-0">- {formatRupiah(biayaProduksi)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
          <span className="truncate pr-2">26. d. Biaya Operasional :</span>
          <span className="font-semibold text-rose-600 shrink-0">- {formatRupiah(biayaOperasional)}</span>
        </div>

        <div className="flex items-center justify-between pt-1 font-bold text-slate-800">
          <span>Nilai Tambah Bruto (NTB) :</span>
          <span className={nilaiTambah < 0 ? 'text-rose-600' : 'text-[#5B58DE]'}>
            {formatRupiah(nilaiTambah)}
          </span>
        </div>
      </div>

      {/* Export CSV quick button if history exists */}
      {historyLength > 0 && onExportCSV && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onExportCSV}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-semibold border border-slate-200 hover:border-emerald-200 transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Unduh Riwayat Perhitungan ({historyLength} CSV)</span>
          </button>
        </div>
      )}
    </div>
  );
};
