import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroProfile } from './components/HeroProfile';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultCard } from './components/ResultCard';
import { GuideCard } from './components/GuideCard';
import { HistoryList } from './components/HistoryList';
import { FormulaModal } from './components/FormulaModal';
import { 
  calculateNTB, 
  parseRupiah, 
  formatRupiah, 
  formatInputCurrency, 
  formatIndonesianDate, 
  exportHistoryToCSV 
} from './utils/formatters';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const INITIAL_FORM_STATE = {
  namaUsaha: '',
  sektor: 'Industri Pengolahan',
  nilaiProduksi: '120.000.000',
  biayaBarangTerjual: '',
  biayaProduksi: '45.000.000',
  biayaOperasional: '25.000.000',
};

const SAMPLE_PRESETS = {
  kuliner: {
    namaUsaha: 'Restoran & Katering Lombok Rasa',
    sektor: 'Penyediaan Makan Minum (Kuliner)',
    nilaiProduksi: '150.000.000',
    biayaBarangTerjual: '',
    biayaProduksi: '55.000.000',
    biayaOperasional: '30.000.000',
  },
  dagang: {
    namaUsaha: 'Toko Kelontong Berkah Sejahtera',
    sektor: 'Perdagangan Eceran',
    nilaiProduksi: '200.000.000',
    biayaBarangTerjual: '140.000.000',
    biayaProduksi: '5.000.000',
    biayaOperasional: '18.000.000',
  },
  jasa: {
    namaUsaha: 'Studio Desain & Percetakan Digital',
    sektor: 'Jasa Informasi & Komunikasi',
    nilaiProduksi: '85.000.000',
    biayaBarangTerjual: '',
    biayaProduksi: '12.000.000',
    biayaOperasional: '22.000.000',
  },
  manufaktur: {
    namaUsaha: 'Sentra Tenun Ikat Tradisional NTB',
    sektor: 'Industri Tekstil & Kerajinan',
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
      const saved = localStorage.getItem('ntb_history_se2026');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial mock history
    return [
      {
        id: 'hist-1',
        namaUsaha: 'Sentra Tenun Ikat Tradisional NTB',
        sektor: 'Industri Tekstil & Kerajinan',
        nilaiProduksi: 180000000,
        biayaBarangTerjual: 0,
        biayaProduksi: 65000000,
        biayaOperasional: 35000000,
        nilaiTambah: 80000000,
        rasio: 44.44,
        statusLabel: 'Rasio Sehat (15% - 70%)',
        statusColor: 'green',
        timestamp: new Date().toISOString(),
        timestampFormatted: 'Hari ini, 09:30',
      },
      {
        id: 'hist-2',
        namaUsaha: 'Toko Kelontong Berkah Sejahtera',
        sektor: 'Perdagangan Eceran',
        nilaiProduksi: 200000000,
        biayaBarangTerjual: 140000000,
        biayaProduksi: 5000000,
        biayaOperasional: 18000000,
        nilaiTambah: 37000000,
        rasio: 18.5,
        statusLabel: 'Rasio Sehat (15% - 70%)',
        statusColor: 'green',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        timestampFormatted: 'Kemarin, 14:15',
      }
    ];
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ntb_history_se2026', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  // Live calculation based on current form
  const currentCalculation = calculateNTB({
    nilaiProduksi: parseRupiah(formData.nilaiProduksi),
    biayaBarangTerjual: parseRupiah(formData.biayaBarangTerjual),
    biayaProduksi: parseRupiah(formData.biayaProduksi),
    biayaOperasional: parseRupiah(formData.biayaOperasional),
  });

  // Handle Calculate & Save
  const handleCalculateAndSave = () => {
    const calc = currentCalculation;

    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      namaUsaha: formData.namaUsaha || `Perhitungan #${history.length + 1}`,
      sektor: formData.sektor || 'Umum',
      nilaiProduksi: calc.nilaiProduksi,
      biayaBarangTerjual: calc.biayaBarangTerjual,
      biayaProduksi: calc.biayaProduksi,
      biayaOperasional: calc.biayaOperasional,
      nilaiTambah: calc.nilaiTambah,
      rasio: calc.rasio,
      statusLabel: calc.statusLabel,
      statusColor: calc.statusColor,
      timestamp: new Date().toISOString(),
      timestampFormatted: formatIndonesianDate(),
    };

    setHistory(prev => [newHistoryItem, ...prev]);

    // Trigger celebratory confetti if calculation is valid and non-negative
    if (calc.nilaiTambah > 0) {
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
      sektor: 'Industri Pengolahan',
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
    }
  };

  // Load History Item back to Form
  const handleLoadHistoryItem = (item) => {
    setFormData({
      namaUsaha: item.namaUsaha || '',
      sektor: item.sektor || 'Umum',
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
      {/* Left Sidebar (Matching design mockup) */}
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
          {activeTab === 'simulations' ? (
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
                {Object.entries(SAMPLE_PRESETS).map(([key, item]) => (
                  <div key={key} className="p-5 rounded-2xl bg-[#FAF9FD] border border-slate-100 hover:border-indigo-200 transition">
                    <h4 className="font-bold text-base text-slate-800 mb-1">{item.namaUsaha}</h4>
                    <span className="text-xs text-[#5B58DE] font-semibold block mb-3">{item.sektor}</span>
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
                ))}
              </div>
            </div>
          ) : activeTab === 'validations' ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Kaidah Validasi Sensus Ekonomi 2026</h3>
                  <p className="text-xs text-slate-500">Pedoman pemeriksaan kewajaran data usaha di lapangan</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-emerald-900">1. Nilai Tambah Bruto (NTB) Harus Positif</h5>
                    <p className="text-xs text-emerald-800 mt-0.5">Nilai produksi harus mampu menutupi konsumsi antara (biaya barang terjual dan biaya bahan baku). Defisit menandakan salah input atau usaha dalam kondisi ekstrem.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B58DE] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-indigo-900">2. Pemisahan Biaya Pembelian Barang Terjual</h5>
                    <p className="text-xs text-indigo-800 mt-0.5">Khusus pedagang eceran/grosir, nilai beli barang dagangan dikurangkan langsung dari penjualan agar tidak menggelembungkan nilai tambah perdagangan.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-purple-900">3. Ketelitian Upah & Beban Operasional</h5>
                    <p className="text-xs text-purple-800 mt-0.5">Pastikan upah tenaga kerja tidak dimasukkan ke dalam biaya bahan baku, melainkan dicatat pada biaya operasional usaha.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Main 2-Column Grid (Matching layout of Mes formations + Informations de paiement / Abonnement) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
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
          )}

          {/* Bottom Card: History List (Matching Activité récente) */}
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
