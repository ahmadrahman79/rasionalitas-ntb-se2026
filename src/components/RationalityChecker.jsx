import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  Info, 
  Sparkles,
  SlidersHorizontal,
  Layers
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

  const isCalculated = nilaiProduksi > 0;
  const isAnalyzed = kategoriInfo && kategoriInfo.dianalisis;

  // Calculate percentage position on visual bar for visualization
  // Bar range from 0 to 1.10
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
                SE2026
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Pilih Kategori Lapangan Usaha untuk memeriksa apakah rasio berada di rentang wajar (MIN - MAX).
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

      {/* Lapangan Usaha Aesthetic Dropdown */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#5B58DE]" />
            Kategori Lapangan Usaha (KBLI) :
          </span>
          <span className="text-[11px] font-semibold text-slate-400">
            {isAnalyzed ? `Rentang: ${formatDecimal(minVal)} – ${formatDecimal(maxVal)}` : 'Tidak Dianalisis'}
          </span>
        </label>

        <div className="relative">
          <select
            value={kategoriKode}
            onChange={(e) => setKategoriKode(e.target.value)}
            className="w-full bg-[#FAF9FD] border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#5B58DE]/30 focus:border-[#5B58DE] transition cursor-pointer appearance-none shadow-xs"
          >
            {KATEGORI_LAPANGAN_USAHA.map((kat) => (
              <option 
                key={kat.kode} 
                value={kat.kode}
                disabled={!kat.dianalisis}
                className={!kat.dianalisis ? 'text-slate-400 bg-slate-50 italic' : 'text-slate-800 py-1 font-medium'}
              >
                {kat.nama} {kat.dianalisis ? `[MIN: ${formatDecimal(kat.min)} | MAX: ${formatDecimal(kat.max)}]` : '(Tidak Dianalisis SE2026)'}
              </option>
            ))}
          </select>

          {/* Custom Arrow */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
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
                <span className="text-xs text-slate-500">Rasio Saat Ini:</span>
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
                <span>≥ 1,00</span>
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
