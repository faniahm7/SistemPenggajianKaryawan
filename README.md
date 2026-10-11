# ArthaCore — Enterprise Payroll System

Aplikasi dashboard sistem penggajian karyawan dengan empat entitas database:
Departemen, Jabatan, Karyawan, dan Penggajian.
Satu workspace dan satu project Supabase digunakan untuk satu perusahaan. Nama
perusahaan ditetapkan dari daftar pilihan atau nama sendiri saat koneksi
dikonfigurasi, bukan dipilih per karyawan.

Jika skema Supabase sebelumnya sudah pernah dijalankan, jalankan kembali
`database/schema.sql` untuk menambahkan kolom dan komponen payroll terbaru. Skrip
membangun ulang kolom terhitung `payrolls.net_salary`; periksa dependensi view atau
integrasi eksternal sebelum menjalankan migrasi pada project produksi.

## Menjalankan aplikasi

1. Buat project Supabase khusus untuk satu perusahaan, lalu jalankan isi
   `database/schema.sql` di **SQL Editor**.
2. Isi `frontend/config.js` dengan URL dan publishable key. Isi `companyName`
   opsional untuk menampilkan nama workspace yang benar; jika dikosongkan, aplikasi
   memakai nama workspace bawaan. File ini dibaca bersama aplikasi; pengunjung
   tidak perlu memasukkan kembali konfigurasi tersebut.
3. Buka `frontend/index.html` atau deploy folder `frontend` ke hosting statis.
   Untuk GitHub Pages dengan sumber **Deploy from a branch**, pilih branch `main`
   dan folder `/(root)`, lalu buka alamat
   `https://USERNAME.github.io/NAMA-REPO/frontend/index.html`.
   GitHub Pages tidak menyediakan pilihan folder `frontend` pada pengaturan branch.
   Jika ingin aplikasi tampil langsung di alamat utama Pages, publikasikan isi folder
   `frontend` ke root atau gunakan workflow GitHub Actions khusus.
   Apa pun cara publikasinya, pertahankan folder `assets` bersebelahan dengan
   `index.html`; semua foto dan logo dibaca dari `./assets/...` dan nama file harus
   tetap sama persis (GitHub peka huruf besar/kecil).
4. Aplikasi menggunakan publishable key tanpa login. Skema memberi akses baca/tulis
   kepada role `anon`. Jangan gunakan konfigurasi ini untuk data payroll atau
   informasi karyawan sungguhan: siapa pun yang mengetahui alamat aplikasi dan
   publishable key dapat membaca, menambah, mengubah, dan menghapus seluruh data
   dalam project.

Contoh konfigurasi:

```js
window.ARTHACORE_CONFIG = {
  supabaseUrl: 'https://project-ref.supabase.co',
  publishableKey: 'sb_publishable_...',
  companyName: 'Nama Resmi Perusahaan'
};
```

### Membagikan dashboard dan data terbaru

- Untuk membuka dashboard dari perangkat lain, deploy aplikasi pada alamat HTTPS
  (misalnya hosting statis) dan gunakan project Supabase yang sama. Data master dan
  penggajian tersimpan di Supabase, bukan di browser lokal, sehingga perubahan yang
  tersimpan akan dimuat untuk pengguna lain.
- Mode tanpa login mengizinkan akses `anon` ke semua tabel pada project. Batasi
  pemakaian ke demo dengan data palsu; untuk data perusahaan sungguhan, gunakan
  autentikasi dan RLS yang membatasi akses pengguna.
- `frontend/config.js` adalah konfigurasi publik yang disertakan bersama frontend.
  Publishable key memang dapat dilihat pengunjung; jangan masukkan
  service-role/secret key.
- `localStorage` hanya berlaku pada profil browser dan alamat web yang sama. Pada
  perangkat/profil baru, konfigurasi yang disediakan `config.js` tetap tersedia.
  Jika konfigurasi deployment terisi, nilainya menjadi sumber utama dibanding
  konfigurasi lokal browser.
- Jika aplikasi dibuka langsung melalui `file://`, penyimpanan browser dapat
  berbeda antar browser/perangkat. Gunakan satu alamat HTTPS yang sama untuk
  membagikan web.

Frontend berkomunikasi langsung dengan Supabase REST API, sehingga tidak memerlukan
server lokal maupun dependensi eksternal. Tampilan font memakai font sistem sebagai
fallback apabila koneksi Google Fonts tidak tersedia.

### Isolasi perusahaan

- Buat **project Supabase terpisah untuk setiap perusahaan**. Jangan memakai URL
  project yang sama untuk dua perusahaan.
- Mode anon membuka seluruh isi project, jadi gunakan project terpisah dan hanya
  data demo palsu. Jangan mengisi data personal atau payroll sebenarnya.
- Untuk produksi, jangan gunakan policy anon ini; gunakan autentikasi Supabase,
  RLS berbasis pengguna/perusahaan, serta publishable key. Jangan pernah memakai
  service-role/secret key pada browser.
- Pilihan perusahaan mencakup sejumlah perusahaan Indonesia dan opsi nama sendiri;
  hanya perusahaan aktif pada workspace yang dicatat. Setiap pilihan harus
  menggunakan project Supabase tersendiri, bukan menambah tabel perusahaan.
- Dashboard menampilkan deretan nama 15 perusahaan pilihan yang bergerak otomatis
  secara horizontal tanpa slider posisi. Perusahaan workspace yang aktif tetap
  ditentukan terpisah melalui Pengaturan perusahaan.
- Teks ticker memakai gaya warna dan font sistem yang mendekati identitas merek,
  bukan file logo atau font korporat resmi. Untuk tampilan yang benar-benar sesuai
  wordmark/font asli, gunakan aset logo resmi berformat SVG/PNG atau font yang
  disediakan dan berhak digunakan oleh pemilik merek.

Foto hero dashboard bertema dokumen keuangan disimpan lokal di
`frontend/assets/payroll-team.jpg`; sumber foto: [Unsplash](https://images.unsplash.com/photo-1554224155-6726b3ff858f).
Foto untuk data master dan departemen juga disimpan secara lokal di
`frontend/assets/` (`master-*.jpg` dan `department-*.jpg`) agar tidak bergantung pada
permintaan foto eksternal saat aplikasi dibuka. Logo aplikasi tersedia di
`frontend/assets/arthacore-mark.svg`. Pastikan seluruh file di folder tersebut ikut
diunggah ke GitHub; bila hanya file HTML/JS/CSS yang dipublikasikan, gambar tidak akan tampil.

Slip gaji tersedia melalui tombol cetak pada setiap baris penggajian. Slip memuat
identitas perusahaan pada workspace, periode, identitas
karyawan, rincian pendapatan, potongan, gaji bersih beserta terbilang, status
pembayaran, dan kolom tanda tangan. Dialog cetak browser menggunakan ukuran kertas
A4; pilih **Save as PDF** apabila menginginkan salinan PDF.

## Perhitungan payroll Indonesia

Form penggajian menampilkan estimasi langsung dan menyimpan snapshot tiap komponen
ke entitas Penggajian:

- **PPh 21 bulanan:** tarif efektif rata-rata (TER) Kategori A/B/C menurut status
  PTKP, dengan ambang penghasilan bruto dari [PP 58/2023](https://peraturan.go.id/files/pp-no-58-tahun-2023.pdf).
- **Masa pajak terakhir:** opsi rekonsiliasi menghitung PPh tahunan dengan tarif
  progresif Pasal 17 setelah biaya jabatan, iuran JHT/JP karyawan, dan PTKP;
  masukkan bruto kena pajak, PPh 21, iuran pensiun, dan jumlah masa sebelumnya
  secara kumulatif. Bruto sebelumnya mencakup manfaat BPJS Kesehatan, JKK, dan JKM
  yang menjadi penghasilan kena pajak. PPh lebih potong tampil sebagai pengembalian.
- **BPJS PPU:** Kesehatan 1% karyawan + 4% pemberi kerja (plafon upah Rp12 juta),
  JHT 2% + 3,7%, JP 1% + 2% (plafon JP dapat disunting), serta JKK dan JKM
  ditanggung pemberi kerja sesuai kelas risiko/parameter yang tersedia. Basis upah
  menggunakan gaji pokok dan tunjangan tetap, dengan UMP/UMK yang dimasukkan pada
  data karyawan sebagai batas dasar. Referensi: [BPJS Ketenagakerjaan—Penerima
  Upah](https://www.bpjsketenagakerjaan.go.id/penerima-upah.html) dan
  [Perpres 59/2024](https://peraturan.go.id/files/perpres-no-59-tahun-2024.pdf).
- **Lembur:** estimasi hari kerja biasa menggunakan upah sejam = (gaji pokok +
  tunjangan tetap) / 173, pengali 1,5 untuk jam pertama dan 2 untuk jam berikutnya.
  Tarif hari libur tidak dihitung oleh kalkulator ini.

Tarif dan plafon dapat berubah serta perlakuannya dapat bergantung pada kondisi
karyawan/perusahaan. Konfirmasi parameter tahun berjalan dan hasil payroll kepada
HR/pengelola pajak sebelum pembayaran; fitur ini adalah kalkulator estimasi, bukan
nasihat pajak atau pengganti validasi kepatuhan.

## Backend Node.js opsional

Backend menggunakan modul bawaan Node.js, tanpa `package.json` atau instalasi paket:

```powershell
$env:SUPABASE_URL = "https://project-ref.supabase.co"
$env:SUPABASE_PUBLISHABLE_KEY = "sb_publishable_..."
node backend/app.js
```

Server tersedia di `http://localhost:3000`, menyajikan frontend sekaligus meneruskan
API melalui `/api/{employees|departments|positions|payrolls}`. Endpoint pemeriksaan
koneksi tersedia di `/api/health`. File `frontend/index.html` juga tetap dapat dibuka
langsung, tanpa backend.

## Struktur proyek

```text
SISTEMPENGGAJIANBARU/
├── backend/
│   └── app.js
├── database/
│   └── schema.sql
├── frontend/
│   ├── assets/
│   │   ├── arthacore-mark.svg
│   │   ├── department-finance.jpg
│   │   ├── department-meeting.jpg
│   │   ├── department-office.jpg
│   │   ├── department-people.jpg
│   │   ├── department-workspace.jpg
│   │   ├── master-departments.jpg
│   │   ├── master-employees.jpg
│   │   ├── master-payroll.jpg
│   │   ├── master-positions.jpg
│   │   └── payroll-team.jpg
│   ├── app.js
│   ├── config.js
│   ├── index.html
│   └── styles.css
└── README.md
```

> Kebijakan RLS pada skema ini mengizinkan role publik `anon` membaca dan mengubah
> seluruh data demi mendukung mode tanpa login. Ini hanya layak untuk demonstrasi
> dengan data palsu. Untuk pemakaian produksi, ganti kebijakan ini dengan akses
> `authenticated` yang sesuai dan aktifkan login.
