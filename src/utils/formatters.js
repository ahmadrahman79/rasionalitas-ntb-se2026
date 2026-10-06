// Format number to Indonesian Rupiah string (e.g. 1000000 -> "1.000.000" or "Rp 1.000.000")
export const formatRupiah = (value, withPrefix = true) => {
  if (value === null || value === undefined || isNaN(value)) {
    return withPrefix ? 'Rp 0' : '0';
  }
  const rounded = Math.round(value);
  const formatted = new Intl.NumberFormat('id-ID').format(rounded);
  return withPrefix ? `Rp ${formatted}` : formatted;
};

// Clean string input to pure integer/float number
export const parseRupiah = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  const cleanStr = str.toString().replace(/[^0-9-]/g, '');
  const parsed = parseInt(cleanStr, 10);
  return isNaN(parsed) ? 0 : parsed;
};

// Format input live while typing
export const formatInputCurrency = (rawVal) => {
  if (!rawVal) return '';
  const clean = rawVal.replace(/[^0-9]/g, '');
  if (!clean) return '';
  return new Intl.NumberFormat('id-ID').format(parseInt(clean, 10));
};

// Hitung Nilai Tambah Bruto (NTB)
// Rumus:
// Nilai Tambah = (Nilai Produksi/Penjualan/Pendapatan - Biaya pembelian barang yang terjual) - Biaya Produksi - Biaya Operasional
export const calculateNTB = ({
  nilaiProduksi = 0,
  biayaBarangTerjual = 0,
  biayaProduksi = 0,
  biayaOperasional = 0,
}) => {
  const pendapatanBersihBarang = nilaiProduksi - biayaBarangTerjual;
  const totalBiaya = biayaProduksi + biayaOperasional;
  const nilaiTambah = pendapatanBersihBarang - totalBiaya;

  // Rasio NTB terhadap Nilai Produksi (Output)
  const rasio = nilaiProduksi > 0 ? (nilaiTambah / nilaiProduksi) * 100 : 0;

  // Kategori Rasionalitas
  let status = 'normal';
  let statusLabel = 'Rasional (Wajar)';
  let statusColor = 'green';
  let statusDesc = 'Proporsi Nilai Tambah berada pada kisaran wajar sesuai standar akuntansi ekonomi sensus.';

  if (nilaiProduksi <= 0) {
    status = 'empty';
    statusLabel = 'Menunggu Input';
    statusColor = 'gray';
    statusDesc = 'Masukkan nilai produksi dan biaya operasional untuk melihat analisis.';
  } else if (nilaiTambah < 0) {
    status = 'anomali';
    statusLabel = 'Anomali / Defisit Nilai Tambah';
    statusColor = 'red';
    statusDesc = 'Total biaya (Input Antara + Operasional + Barang Terjual) melebihi output produksi. Periksa kembali isian komponen biaya!';
  } else if (rasio < 15) {
    status = 'low';
    statusLabel = 'Rasio Rendah (< 15%)';
    statusColor = 'yellow';
    statusDesc = 'Nilai tambah sangat tipis. Wajar untuk usaha dagang margin kecil atau industri perakitan, namun pastikan tidak ada biaya yang tercatat ganda.';
  } else if (rasio > 70) {
    status = 'high';
    statusLabel = 'Rasio Tinggi (> 70%)';
    statusColor = 'indigo';
    statusDesc = 'Proporsi nilai tambah tinggi. Khas sektor jasa profesional, sewa, seni, atau software digital.';
  } else {
    status = 'normal';
    statusLabel = 'Rasio Sehat (15% - 70%)';
    statusColor = 'green';
    statusDesc = 'Komposisi nilai tambah sangat rasional untuk kegiatan manufaktur, perdagangan, maupun jasa umum.';
  }

  return {
    nilaiProduksi,
    biayaBarangTerjual,
    biayaProduksi,
    biayaOperasional,
    pendapatanBersihBarang,
    totalBiaya,
    nilaiTambah,
    rasio: parseFloat(rasio.toFixed(2)),
    status,
    statusLabel,
    statusColor,
    statusDesc,
  };
};

// Format Timestamp to Indonesian
export const formatIndonesianDate = (dateObj = new Date()) => {
  const d = new Date(dateObj);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

// Export to CSV
export const exportHistoryToCSV = (historyItems) => {
  if (!historyItems || historyItems.length === 0) return;

  const headers = [
    'ID',
    'Waktu',
    'Nama Usaha / Catatan',
    'Sektor Usaha',
    'Nilai Produksi / Penjualan (Rp)',
    'Biaya Beli Barang Terjual (Rp)',
    'Biaya Produksi (Rp)',
    'Biaya Operasional (Rp)',
    'Nilai Tambah Bruto (Rp)',
    'Rasio NTB (%)',
    'Status Rasionalitas',
  ];

  const rows = historyItems.map((item, idx) => [
    idx + 1,
    `"${item.timestampFormatted || item.timestamp}"`,
    `"${(item.namaUsaha || 'Simulasi').replace(/"/g, '""')}"`,
    `"${(item.sektor || 'Umum').replace(/"/g, '""')}"`,
    item.nilaiProduksi || 0,
    item.biayaBarangTerjual || 0,
    item.biayaProduksi || 0,
    item.biayaOperasional || 0,
    item.nilaiTambah || 0,
    item.rasio || 0,
    `"${item.statusLabel || ''}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((e) => e.join(',')),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Riwayat_NTB_SE2026_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
