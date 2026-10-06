# Kalkulator Rasionalitas Nilai Tambah Bruto (NTB) - Sensus Ekonomi 2026 (SE2026)

Aplikasi web modern dan responsif untuk menghitung dan menguji **Rasionalitas Nilai Tambah Bruto (NTB)** dalam satuan Rupiah (IDR) sesuai standar akuntansi ekonomi dan konsep sensus usaha SE2026.

![Dashboard Preview](https://raw.githubusercontent.com/ahmadrahman79/rasionalitas-ntb-se2026/main/preview.png)

## 📌 Rumus Perhitungan

$$
\text{Nilai Tambah Bruto} = (\text{Nilai Produksi} - \text{Biaya Pembelian Barang yang Terjual}) - \text{Biaya Produksi} - \text{Biaya Operasional}
$$

### Keterangan Komponen:
1. **Nilai Produksi / Penjualan / Pendapatan Barang/Jasa** (*Wajib*): Total nilai kotor omzet penjualan produk atau penerimaan imbalan jasa yang dihasilkan.
2. **Biaya Pembelian Barang yang Terjual** (*Opsional / Jika Ada*): Nilai perolehan/harga beli atas barang dagangan yang dijual kembali tanpa proses transformasi/pengolahan lanjutan (khusus usaha perdagangan).
3. **Biaya Produksi / Input Antara** (*Wajib*): Seluruh pengeluaran untuk bahan baku utama, bahan pembantu, kemasan, energi listrik/bahan bakar mesin produksi, dan jasa industri.
4. **Biaya Operasional** (*Wajib*): Beban upah/gaji karyawan, sewa ruang/alat, air, telepon, internet, transportasi, dan beban pemeliharaan/administrasi.

---

## ✨ Fitur Utama
- 🎨 **Desain UI/UX Elegan**: Mengadopsi tata letak modern rounded dashboard dengan palet warna lavender, ungu, dan kartu pastel estetik.
- ⚡ **Realtime Live Calculation**: Nilai Tambah Bruto dan Rasio terhadap Output langsung terkalkulasi secara instan saat mengisi input.
- 💰 **Auto Currency Masker (Rupiah)**: Format angka ribuan otomatis saat mengetik untuk mencegah kekeliruan nominal nol.
- 📜 **Riwayat Perhitungan (LocalStorage)**: Data tersimpan di peramban secara otomatis, dapat dimuat kembali (*load*), difilter (*search*), dan dihapus.
- 📊 **Export ke CSV / Excel**: Unduh seluruh daftar riwayat kalkulasi dalam format CSV sekali klik.
- 💡 **Template / Preset Cepat**: Simulasi langsung untuk usaha Kuliner, Toko Kelontong, Jasa Digital, dan Pabrik Tenun.
- 📱 **Mobile & Tablet Friendly**: Desain responsif dengan drawer sidebar yang mulus di ponsel.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/ahmadrahman79/rasionalitas-ntb-se2026.git
   cd rasionalitas-ntb-se2026
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

4. Buka di browser: `http://localhost:5173`

---

## 🌐 Cara Deploy Gratis ke Vercel

1. Buka [Vercel](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** → **"Project"**.
3. Hubungkan ke repositori `ahmadrahman79/rasionalitas-ntb-se2026` (atau nama repositori yang Anda buat).
4. Pengaturan Framework Preset: **Vite** (otomatis terdeteksi).
5. Klik **Deploy**. Web aplikasi akan langsung aktif dan memiliki domain gratis `*.vercel.app`!

---

## 🛠️ Teknologi yang Digunakan
- **React 18** (SPA Framework)
- **Vite** (Fast Build Tool)
- **Tailwind CSS** (Utility-first styling & theme)
- **Lucide Icons** (Vector modern icons)
- **Canvas-Confetti** (Interactive milestone effect)

---

## 👤 Dibuat Oleh
- **Ahmad Rahman** ([@ahmadrahman79](https://github.com/ahmadrahman79))
