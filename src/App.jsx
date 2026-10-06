import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroProfile } from './components/HeroProfile';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultCard } from './components/ResultCard';
import { GuideCard } from './components/GuideCard';
import { RationalityChecker } from './components/RationalityChecker';
import { HistoryList } from './components/HistoryList';
import { FormulaModal } from './components/FormulaModal';
import { 
  calculateNTB, 
  parseRupiah, 
  formatRupiah, 
  formatDecimal,
  formatInputCurrency, 
  formatIndonesianDate, 
  exportHistoryToCSV,
  KATEGORI_LAPANGAN_USAHA
} from './utils/formatters';
import { Layers, Table, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const INITIAL_FORM_STATE = {
  namaUsaha: '',
  kategoriKode: 'C',
  nilaiProduksi: '120.000.000',
  biayaBarangTerjual: '',
  biayaProduksi: '45.000.000',
  biayaOperasional: '25.000.000',
};

const SAMPLE_PRESETS = {
  kuliner: {
    namaUsaha: 'Restoran & Katering Lombok Rasa',
    kategoriKode: 'I', // Penyediaan Akomodasi dan Makan Minum (Min 0.36, Max 0.69)
    nilaiProduksi: '150.000.000',
    biayaBarangTerjual: '',
    biayaProduksi: '55.000.000',
    biayaOperasional: '25.000.000',
  },
  dagang: {
    namaUsaha: 'Toko Kelontong Berkah Sejahtera',
    kategoriKode: 'G', // Perdagangan Besar & Eceran (Min 0.64, Max 0.78)
    nilaiProduksi: '200.000.000',
    biayaBarangTerjual: '140.000.000',
    biayaProduksi: '5.000.000',
    biayaOperasional: '12.000.000',
  },
  jasa: {
    namaUsaha: 'Studio Desain & Percetakan Digital',
    kategoriKode: 'J', // Informasi dan Komunikasi (Min 0.36, Max 0.73)
    nilaiProduksi: '85.000.000',
    biayaBarangTerjual: '',
    biayaProduksi: '12.000.000',
    biayaOperasional: '22.000.000',
  },
  manufaktur: {
    namaUsaha: 'Sentra Tenun Ikat Tradisional NTB',
    kategoriKode: 'C', // Industri Pengolahan (Min 0.15, Max 0.61)
    nilaiProduksi: '180.000.000',
    biayaBarangTerjual: '',
    biayaProduksi: '65.000.000',
    biayaOperasional: '35.000.000',
  },
};

export function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('calculator');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('ntb_history_se2026_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial mock history
    return [
      {
        id: 'hist-1',
        namaUsaha: 'Sentra Tenun Ikat Tradisional NTB',
        kategoriKode: 'C',
        kategoriNama: 'Kategori C - Industri Pengolahan',
        kategoriMin: 0.15,
        kategoriMax: 0.61,
        nilaiProduksi: 180000000,
        biayaBarangTerjual: 0,
        biayaProduksi: 65000000,
        biayaOperasional: 35000000,
        nilaiTambah: 80000000,
        rasio: 0.4444,
        rasioFormatted: '0,44',
        statusLabel: 'Wajar (Rasional Sesuai SE2026)',
        statusColor: 'green',
        timestamp: new Date().toISOString(),
        timestampFormatted: 'Hari ini, 09:30',
      },
      {
        id: 'hist-2',
        namaUsaha: 'Toko Kelontong Berkah Sejahtera',
        kategoriKode: 'G',
        kategoriNama: 'Kategori G - Perdagangan Besar & Eceran',
        kategoriMin: 0.64,
        kategoriMax: 0.78,
        nilaiProduksi: 200000000,
        biayaBarangTerjual: 140000000,
        biayaProduksi: 5000000,
        biayaOperasional: 12000000,
        nilaiTambah: 43000000,
        rasio: 0.7167,
        rasioFormatted: '0,72',
        statusLabel: 'Wajar (Rasional Sesuai SE2026)',
        statusColor: 'green',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        timestampFormatted: 'Kemarin, 14:15',
      }
    ];
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ntb_history_se2026_v2', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  // Live calculation based on current form & selected category
  const currentCalculation = calculateNTB({
    nilaiProduksi: parseRupiah(formData.nilaiProduksi),
    biayaBarangTerjual: parseRupiah(formData.biayaBarangTerjual),
    biayaProduksi: parseRupiah(formData.biayaProduksi),
    biayaOperasional: parseRupiah(formData.biayaOperasional),
    kategoriKode: formData.kategoriKode || 'C',
  });

  // Handle Calculate & Save
  const handleCalculateAndSave = () => {
    const calc = currentCalculation;

    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      namaUsaha: formData.namaUsaha || `Perhitungan #${history.length + 1}`,
      kategoriKode: calc.kategoriKode,
      kategoriNama: calc.kategoriInfo?.nama || `Kategori ${calc.kategoriKode}`,
      kategoriMin: calc.kategoriInfo?.min,
      kategoriMax: calc.kategoriInfo?.max,
      nilaiProduksi: calc.nilaiProduksi,
      biayaBarangTerjual: calc.biayaBarangTerjual,
      biayaProduksi: calc.biayaProduksi,
      biayaOperasional: calc.biayaOperasional,
      nilaiTambah: calc.nilaiTambah,
      rasio: calc.rasio,
      rasioFormatted: calc.rasioFormatted,
      statusLabel: calc.statusLabel,
      statusColor: calc.statusColor,
      timestamp: new Date().toISOString(),
      timestampFormatted: formatIndonesianDate(),
    };

    setHistory(prev => [newHistoryItem, ...prev]);

    // Trigger celebratory confetti if calculation is valid & in reasonable range
    if (calc.statusColor === 'green') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#5B58DE', '#F472B6', '#34D399', '#60A5FA']
        });
      } catch (e) {
        // ignore
      }
    }
  };

  // Handle Form Reset
  const handleResetForm = () => {
    setFormData({
      namaUsaha: '',
      kategoriKode: 'C',
      nilaiProduksi: '',
      biayaBarangTerjual: '',
      biayaProduksi: '',
      biayaOperasional: '',
    });
  };

  // Load Preset
  const handleLoadPreset = (presetKey) => {
    if (SAMPLE_PRESETS[presetKey]) {
      setFormData(SAMPLE_PRESETS[presetKey]);
      setActiveTab('calculator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Load History Item back to Form
  const handleLoadHistoryItem = (item) => {
    setFormData({
      namaUsaha: item.namaUsaha || '',
      kategoriKode: item.kategoriKode || 'C',
      nilaiProduksi: formatInputCurrency(item.nilaiProduksi?.toString() || ''),
      biayaBarangTerjual: item.biayaBarangTerjual ? formatInputCurrency(item.biayaBarangTerjual.toString()) : '',
      biayaProduksi: formatInputCurrency(item.biayaProduksi?.toString() || ''),
      biayaOperasional: formatInputCurrency(item.biayaOperasional?.toString() || ''),
    });
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete single history item
  const handleDeleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat perhitungan?')) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF2F9] text-slate-800 flex">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenFormula={() => setIsFormulaOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          {/* Header Bar */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenFormula={() => setIsFormulaOpen(true)}
            onToggleMobileMenu={() => setIsMobileOpen(true)}
          />

          {/* Hero Profile / Overview Card */}
          <HeroProfile
            historyCount={history.length}
            onOpenFormula={() => setIsFormulaOpen(true)}
            onLoadPreset={handleLoadPreset}
          />

          {/* Conditional Views based on Tab */}
          {activeTab === 'table' ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B58DE] flex items-center justify-center">
                    <Table className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Tabel Standar Rentang Wajar Rasio NTB (SE2026)</h3>
                    <p className="text-xs text-slate-500">Rentang nilai batas MIN & MAX per Kategori Lapangan Usaha (KBLI)</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('calculator')}
                  className="px-4 py-2 bg-[#5B58DE] text-white rounded-xl text-xs font-bold hover:bg-[#4C49CC] transition self-start sm:self-auto"
                >
                  Kembali ke Kalkulator
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#B45309] text-white font-bold">
                    <tr>
                      <th className="px-4 py-3">Kategori</th>
                      <th className="px-4 py-3">Nama Lapangan Usaha</th>
                      <th className="px-4 py-3 text-center">MIN</th>
                      <th className="px-4 py-3 text-center">MAX</th>
                      <th className="px-4 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {KATEGORI_LAPANGAN_USAHA.map((kat, idx) => (
                      <tr 
                        key={kat.kode} 
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      >
                        <td className="px-4 py-3 font-bold text-[#5B58DE]">
                          Kategori {kat.kode}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">
                          {kat.nama}
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">
                          {kat.dianalisis ? formatDecimal(kat.min) : '—'}
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">
                          {kat.dianalisis ? formatDecimal(kat.max) : '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {kat.dianalisis ? (
                            <button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, kategoriKode: kat.kode }));
                                setActiveTab('calculator');
                              }}
                              className="px-2.5 py-1 text-xs font-bold text-[#5B58DE] hover:bg-indigo-50 rounded-lg border border-indigo-200 transition"
                            >
                              Gunakan
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Dikecualikan</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'simulations' ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B58DE] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Simulasi Sektor Usaha SE2026</h3>
                  <p className="text-xs text-slate-500">Pilih sektor usaha untuk menguji rasionalitas nilai tambah standar</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(SAMPLE_PRESETS).map(([key, item]) => {
                  const kat = KATEGORI_LAPANGAN_USAHA.find(k => k.kode === item.kategoriKode);
                  return (
                    <div key={key} className="p-5 rounded-2xl bg-[#FAF9FD] border border-slate-100 hover:border-indigo-200 transition">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-base text-slate-800">{item.namaUsaha}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                          Kategori {item.kategoriKode}
                        </span>
                      </div>
                      <span className="text-xs text-[#5B58DE] font-semibold block mb-2">{kat?.singkat}</span>
                      <div className="text-[11px] text-slate-500 bg-white p-2 rounded-xl border border-slate-100 mb-3">
                        Rentang Wajar: <strong className="text-slate-800">{formatDecimal(kat?.min)} – {formatDecimal(kat?.max)}</strong>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600 mb-4">
                        <div className="flex justify-between"><span>Nilai Produksi:</span><strong>Rp {item.nilaiProduksi}</strong></div>
                        {item.biayaBarangTerjual && <div className="flex justify-between"><span>Beli Terjual:</span><strong>Rp {item.biayaBarangTerjual}</strong></div>}
                        <div className="flex justify-between"><span>Biaya Produksi:</span><strong>Rp {item.biayaProduksi}</strong></div>
                        <div className="flex justify-between"><span>Biaya Ops:</span><strong>Rp {item.biayaOperasional}</strong></div>
                      </div>
                      <button
                        onClick={() => handleLoadPreset(key)}
                        className="w-full py-2 bg-[#5B58DE] text-white rounded-xl text-xs font-bold hover:bg-[#4C49CC] transition flex items-center justify-center gap-1.5"
                      >
                        <span>Gunakan Template Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* All-in-One Dashboard: Form + Result + Uji Kewajaran Sektor + Riwayat Perhitungan */
            <div className="space-y-6 mb-6">
              {/* Top Row: Form Input (Left) & Result + Guide Cards (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Form Input (Span 7 or 8) */}
                <div className="lg:col-span-7 xl:col-span-8">
                  <CalculatorForm
                    formData={formData}
                    setFormData={setFormData}
                    onCalculateAndSave={handleCalculateAndSave}
                    onReset={handleResetForm}
                  />
                </div>

                {/* Right Column: Result Card & Guide Card (Span 5 or 4) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                  <ResultCard calculationResult={currentCalculation} />
                  <GuideCard
                    onOpenFormula={() => setIsFormulaOpen(true)}
                    onExportCSV={() => exportHistoryToCSV(history)}
                    historyLength={history.length}
                  />
                </div>
              </div>

              {/* Kolom Cek Kewajaran Lapangan Usaha (Searchable Combobox & Range Bar) */}
              <RationalityChecker
                kategoriKode={formData.kategoriKode || 'C'}
                setKategoriKode={(code) => setFormData(prev => ({ ...prev, kategoriKode: code }))}
                calculationResult={currentCalculation}
              />
            </div>
          )}

          {/* Bottom Card: History List (Terintegrasi Langsung di 1 Halaman) */}
          <HistoryList
            history={history}
            searchQuery={searchQuery}
            onLoadHistoryItem={handleLoadHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearAllHistory={handleClearAllHistory}
            onExportCSV={() => exportHistoryToCSV(history)}
          />

          {/* Footer branding */}
          <footer className="mt-8 text-center text-xs text-slate-400 py-4">
            <p>Kalkulator Rasionalitas NTB SE2026 • Dirancang untuk Kemudahan Validasi Sensus Ekonomi 2026</p>
            <p className="mt-1 text-slate-500">
              Dibuat oleh{' '}
              <a 
                href="https://github.com/ahmadrahman79" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#5B58DE] font-semibold hover:underline"
              >
                Ahmad Rahman (@ahmadrahman79)
              </a>
            </p>
          </footer>
        </main>
      </div>

      {/* Formula Explanation Modal */}
      <FormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
      />
    </div>
  );
}

export default App;
