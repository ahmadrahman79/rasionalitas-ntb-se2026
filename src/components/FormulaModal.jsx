import React from 'react';
import { X, BookOpen, Calculator, CheckCircle2, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';

export const FormulaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B58DE] flex items-center justify-center shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Panduan Rumus Nilai Tambah Bruto
            </h3>
            <p className="text-xs text-slate-500">
              Kaidah Perhitungan & Uji Rasionalitas Sensus Ekonomi 2026 (SE2026)
            </p>
          </div>
        </div>

        {/* Formula Box Highlight */}
        <div className="bg-gradient-to-br from-[#2B2966] to-[#403AA8] text-white p-5 rounded-2xl shadow-md mb-6">
          <span className="text-xs font-semibold text-pink-300 uppercase tracking-wider block mb-2">
            Rumus Standar Nilai Tambah (NTB):
          </span>
          <div className="font-mono text-sm md:text-base font-bold bg-black/20 p-3 rounded-xl border border-white/10 leading-relaxed text-indigo-100">
            Nilai Tambah = (Nilai Produksi - Biaya Pembelian Barang Terjual) - Biaya Produksi - Biaya Operasional
          </div>
        </div>

        {/* Breakdown of each component */}
        <div className="space-y-4 mb-6 text-xs md:text-sm text-slate-700">
          <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-indigo-100">
            <h5 className="font-bold text-indigo-900 flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">1</span>
              Nilai Produksi / Penjualan / Pendapatan (Wajib)
            </h5>
            <p className="text-slate-600 text-xs">
              Nilai total seluruh barang yang diproduksi atau jasa yang dihasilkan dalam periode pencatatan, termasuk omzet penjualan produk utama, produk sampingan, dan pendapatan jasa lain.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-purple-100">
            <h5 className="font-bold text-purple-900 flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center">2</span>
              Biaya Pembelian Barang yang Terjual (Opsional)
            </h5>
            <p className="text-slate-600 text-xs">
              Hanya berlaku untuk kegiatan <strong>perdagangan / jual-beli</strong> (barang dagangan yang dibeli lalu dijual kembali dalam bentuk yang sama tanpa diolah). Kosongkan atau isi 0 untuk usaha murni manufaktur/jasa.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-pink-100">
            <h5 className="font-bold text-pink-900 flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center">3</span>
              Biaya Produksi / Input Antara (Wajib)
            </h5>
            <p className="text-slate-600 text-xs">
              Pengeluaran untuk bahan baku utama, bahan penolong/pembantu, kemasan/packaging, bahan bakar/energi untuk proses produksi, serta jasa industri pihak ketiga.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-blue-100">
            <h5 className="font-bold text-blue-900 flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">4</span>
              Biaya Operasional & Beban Usaha (Wajib)
            </h5>
            <p className="text-slate-600 text-xs">
              Biaya tenaga kerja operasional (upah/gaji), biaya sewa gedung/alat, listrik operasional, air, telepon, internet, transportasi usaha, pemeliharaan, serta beban administrasi umum.
            </p>
          </div>
        </div>

        {/* Interpretation Rules */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 mb-6">
          <div className="flex items-center gap-2 font-bold text-xs md:text-sm mb-1">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Kaidah Uji Rasionalitas SE2026:</span>
          </div>
          <ul className="list-disc list-inside text-xs space-y-1 text-amber-800">
            <li><strong>Nilai Tambah Tidak Boleh Negatif (&lt; 0)</strong>: Jika negatif, data terindikasi anomali/salah catat biaya.</li>
            <li><strong>Rasio Wajar</strong>: Sektor pengolahan rata-rata 25% - 60%, sektor perdagangan eceran 15% - 40%, sektor jasa bisa mencapai &gt; 70%.</li>
          </ul>
        </div>

        {/* Modal Action */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-[#5B58DE] text-white text-xs font-bold hover:bg-[#4C49CC] transition"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
