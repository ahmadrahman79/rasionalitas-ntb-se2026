import React from 'react';
import { X, BookOpen, Table } from 'lucide-react';
import { KATEGORI_LAPANGAN_USAHA, formatDecimal } from '../utils/formatters';

export const FormulaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 relative">
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
              Kaidah Rumus Nilai Tambah Bruto (SE2026)
            </h3>
            <p className="text-xs text-slate-500">
              Kuesioner Rincian 26 & 27 • Sensus Ekonomi 2026
            </p>
          </div>
        </div>

        {/* Formula Box Highlight */}
        <div className="bg-gradient-to-br from-[#2B2966] to-[#403AA8] text-white p-5 rounded-2xl shadow-md mb-6 space-y-3">
          <div>
            <span className="text-xs font-semibold text-pink-300 uppercase tracking-wider block mb-1">
              1. Rumus Nilai Tambah Bruto (NTB):
            </span>
            <div className="font-mono text-xs md:text-sm font-bold bg-black/20 p-2.5 rounded-xl border border-white/10 text-indigo-100">
              NTB = (27.a - 26.c) - 26.b - 26.d
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-pink-300 uppercase tracking-wider block mb-1">
              2. Rumus Rasio Kewajaran (Bentuk Desimal):
            </span>
            <div className="font-mono text-xs md:text-sm font-bold bg-black/20 p-2.5 rounded-xl border border-white/10 text-emerald-300">
              Rasio NTB = NTB ÷ (27.a - 26.c)
            </div>
          </div>
        </div>

        {/* Breakdown of each component */}
        <div className="space-y-3 mb-6 text-xs md:text-sm text-slate-700">
          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-pink-100">
            <h5 className="font-bold text-slate-800 mb-0.5">
              26. b. Biaya produksi (Wajib)
            </h5>
            <p className="text-slate-600 text-xs">
              Biaya bahan mentah, bahan pembantu, kemasan, energi listrik/bahan bakar mesin produksi.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-purple-100">
            <h5 className="font-bold text-slate-800 mb-0.5">
              26. c. Biaya pembelian barang yang terjual (Opsional)
            </h5>
            <p className="text-slate-600 text-xs">
              Khusus barang dagangan yang dibeli untuk langsung dijual kembali tanpa diolah (perdagangan).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-blue-100">
            <h5 className="font-bold text-slate-800 mb-0.5">
              26. d. Biaya operasional (air, listrik, gas, internet, pulsa, pemeliharaan, biaya angkutan, dll.) (Wajib)
            </h5>
            <p className="text-slate-600 text-xs">
              Seluruh pengeluaran rutin operasional untuk mendukung kelangsungan usaha.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-indigo-100">
            <h5 className="font-bold text-slate-800 mb-0.5">
              27. a. Nilai pendapatan barang dan jasa (Wajib)
            </h5>
            <p className="text-slate-600 text-xs">
              Total penerimaan omzet kotor penjualan produk barang dan jasa usaha.
            </p>
          </div>
        </div>

        {/* Table of Reasonable Ranges */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Table className="w-4 h-4 text-[#5B58DE]" />
              Tabel Rentang Wajar Rasio NTB per Lapangan Usaha (SE2026)
            </h4>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#B45309] text-white font-bold">
                <tr>
                  <th className="px-4 py-2.5">Kategori Lapangan Usaha</th>
                  <th className="px-4 py-2.5 text-center">MIN</th>
                  <th className="px-4 py-2.5 text-center">MAX</th>
                  <th className="px-4 py-2.5 text-center">Status SE2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {KATEGORI_LAPANGAN_USAHA.map((item, idx) => (
                  <tr 
                    key={item.kode} 
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="px-4 py-2 font-medium text-slate-800">
                      <strong className="text-[#5B58DE]">Kategori {item.kode}</strong> - {item.singkat}
                    </td>
                    <td className="px-4 py-2 text-center font-mono font-bold text-slate-700">
                      {item.dianalisis ? formatDecimal(item.min) : '—'}
                    </td>
                    <td className="px-4 py-2 text-center font-mono font-bold text-slate-700">
                      {item.dianalisis ? formatDecimal(item.max) : '—'}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.dianalisis ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          Dianalisis
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                          Tidak Dianalisis
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Action */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-[#5B58DE] text-white text-xs font-bold hover:bg-[#4C49CC] transition"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
