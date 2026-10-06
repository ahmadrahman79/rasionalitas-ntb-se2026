import React from 'react';
import { 
  History, 
  Trash2, 
  FileSpreadsheet, 
  ChevronRight, 
  RotateCcw, 
  Clock, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { DeskLampIllustration } from './AestheticIllustrations';
import { formatRupiah } from '../utils/formatters';

export const HistoryList = ({ 
  history, 
  searchQuery = '', 
  onLoadHistoryItem, 
  onDeleteHistoryItem, 
  onClearAllHistory,
  onExportCSV 
}) => {
  // Filter history based on search query
  const filteredHistory = history.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.namaUsaha && item.namaUsaha.toLowerCase().includes(q)) ||
      (item.sektor && item.sektor.toLowerCase().includes(q)) ||
      (item.statusLabel && item.statusLabel.toLowerCase().includes(q)) ||
      (item.timestampFormatted && item.timestampFormatted.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              Riwayat Perhitungan
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {history.length} data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar kalkulasi Nilai Tambah Bruto yang tersimpan secara lokal.
          </p>
        </div>

        {/* Action Buttons */}
        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200 flex items-center gap-1.5"
              title="Unduh CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClearAllHistory}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition border border-rose-200 flex items-center gap-1.5"
              title="Hapus Semua Riwayat"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hapus Semua</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout with List on Left, Aesthetic Desk Lamp on Right */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
        {/* List of items */}
        <div className="flex-1 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200">
              <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">Belum ada riwayat perhitungan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Isi form kalkulator di atas lalu klik "Hitung & Simpan Riwayat" untuk menyimpan analisis.
              </p>
            </div>
          ) : (
            filteredHistory.map((item, index) => {
              const isNegative = item.nilaiTambah < 0;
              return (
                <div
                  key={item.id || index}
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#FAF9FD] hover:bg-[#F3F1FD] border border-slate-100 hover:border-indigo-100 transition-all duration-200"
                >
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B58DE] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {isNegative ? (
                        <TrendingDown className="w-5 h-5 text-rose-500" />
                      ) : (
                        <Coins className="w-5 h-5 text-[#5B58DE]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                          {item.namaUsaha || `Perhitungan #${history.length - index}`}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isNegative 
                            ? 'bg-rose-100 text-rose-700' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          Rasio {item.rasio}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-800">
                          NTB: {formatRupiah(item.nilaiTambah)}
                        </span>
                        <span>•</span>
                        <span className="text-[11px] text-slate-400">
                          {item.timestampFormatted || 'Hari ini'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      onClick={() => onLoadHistoryItem(item)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#5B58DE] hover:bg-white rounded-lg transition shadow-xs hidden sm:flex items-center gap-1 border border-indigo-100"
                      title="Muat kembali data ini ke form"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Muat</span>
                    </button>

                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus riwayat ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onLoadHistoryItem(item)}
                      className="p-1 text-slate-400 group-hover:text-[#5B58DE] transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right side desk lamp illustration (Persis di card bawah desain acuan) */}
        <div className="hidden lg:flex flex-col items-center justify-end p-2 shrink-0 border-l border-slate-100 pl-6 select-none pointer-events-none">
          <DeskLampIllustration className="w-44 h-auto drop-shadow-sm" />
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            Riwayat Tersimpan Otomatis
          </div>
        </div>
      </div>
    </div>
  );
};
