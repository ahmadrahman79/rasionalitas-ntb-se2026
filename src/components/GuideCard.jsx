import React from 'react';
import { Check, Sparkles, FileDown, BookOpen } from 'lucide-react';

export const GuideCard = ({ onOpenFormula, onExportCSV, historyLength = 0 }) => {
  const points = [
    'Standar Rasionalitas SE2026',
    'Pemisahan Input Antara & Final',
    'Validasi Nilai Tambah Non-Defisit',
    'Konsistensi Satuan Penuh (Rp)',
  ];

  return (
    <div className="bg-[#2B2966] text-white rounded-3xl p-6 shadow-soft relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B58DE]/20 rounded-full blur-2xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
          <span>Kaidah SE2026</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </h4>
        <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white/90 px-2 py-0.5 rounded-md">
          Standar
        </span>
      </div>

      {/* Feature Checklist (Styled matching Abonnement Premium checklist) */}
      <ul className="space-y-2.5 text-xs text-white/80 mb-6">
        {points.map((pt, idx) => (
          <li key={idx} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-pink-300 stroke-[3]" />
            </div>
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onOpenFormula}
          className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#F472B6] to-[#E879F9] hover:from-[#EC4899] hover:to-[#D946EF] text-white text-xs font-bold shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Panduan Lengkap NTB</span>
        </button>

        {historyLength > 0 && (
          <button
            onClick={onExportCSV}
            className="w-full py-2 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium transition flex items-center justify-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Unduh Riwayat CSV ({historyLength})</span>
          </button>
        )}
      </div>
    </div>
  );
};
