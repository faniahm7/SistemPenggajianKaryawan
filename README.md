<div align="center">

<img src="https://img.shields.io/badge/-A-BF9E5F?style=for-the-badge&labelColor=142D4C" height="70" />

# 💼 ArthaCore
### Enterprise Payroll System

**Sistem penggajian karyawan berbasis web untuk mengelola data karyawan, struktur departemen, jabatan, dan siklus payroll bulanan secara terpusat dan real-time.**

<br>

<a href="https://faniahm7.github.io/SistemPenggajianKaryawan/">
  <img src="https://img.shields.io/badge/🌐_KLIK_DI_SINI_UNTUK_BUKA_SISTEM-BF9E5F?style=for-the-badge&labelColor=142D4C&logoColor=white" height="45" />
</a>

<br><br>

[![HTML5](https://img.shields.io/badge/HTML5-142D4C?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-BF9E5F?style=for-the-badge&logo=css3&logoColor=142D4C)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-7A9478?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-BF9E5F?style=for-the-badge&logo=github&logoColor=142D4C)](https://pages.github.com/)

<br>

![Status](https://img.shields.io/badge/Status-Active-BF9E5F?style=flat-square&labelColor=142D4C)
![Snapshot](https://img.shields.io/badge/Snapshot-12_Oktober_2026-7A9478?style=flat-square&labelColor=142D4C)
![License](https://img.shields.io/badge/License-Internal-142D4C?style=flat-square)

</div>

---

## 👩‍🎓 Identitas Penyusun

<div align="center">

| | |
|---|---|
| **Nama** | **FANIA HIDAYATUL MUSTAFIDAH** |
| **NIM** | 12030124130178 |
| **Mata Kuliah / Kelas** | Pengkodean dan Pemrograman / D |
| **Dosen Pengampu** | Dr. Totok Dewayanto, S.E., M.Si., Akt., CA |
| **Program Studi** | S1 Akuntansi |
| **Fakultas** | Ekonomika dan Bisnis |
| **Universitas** | Diponegoro |

</div>

---

<div align="center">

### 💼 *"Kelola karyawan, kuasai payroll, raih efisiensi."*

</div>

---

## 📖 Tentang Proyek

**ArthaCore** adalah sistem penggajian karyawan (payroll system) berbasis web yang dirancang untuk memudahkan tim **HR & Finance** dalam mengelola seluruh siklus administrasi karyawan — mulai dari pendataan karyawan, struktur departemen, tingkatan jabatan, hingga penerbitan dan pemantauan payroll bulanan.

Sistem ini menampilkan data secara **real-time** dengan tampilan dashboard yang informatif, sehingga pengguna dapat dengan cepat mengetahui kondisi perusahaan: berapa karyawan aktif, berapa departemen yang berjalan, posisi apa saja yang tersedia, dan bagaimana tren penggajian beberapa bulan terakhir.

Proyek ini dikembangkan sebagai bagian dari mata kuliah **Pengkodean dan Pemrograman** dengan fokus pada implementasi struktur data keuangan dan integritas data penggajian.

---

## ✨ Fitur Utama

<table>
<tr>
<td width="50%">

### 📊 Dashboard
Ringkasan perusahaan: total karyawan, departemen, posisi jabatan, dan payroll bulan berjalan dalam satu tampilan.

### 📈 Tren Penggajian
Grafik total gaji bersih per bulan selama 6 bulan terakhir untuk memantau fluktuasi biaya tenaga kerja.

### 🥧 Komposisi Karyawan
Visualisasi jumlah karyawan aktif per departemen — memudahkan analisis distribusi SDM.

</td>
<td width="50%">

### 👥 Data Karyawan
Manajemen lengkap data karyawan: perusahaan, departemen, jabatan, tanggal bergabung, status, dan gaji pokok.

### 🏢 Data Departemen
Pengelolaan struktur dan unit organisasi perusahaan.

### 🧑‍💼 Data Jabatan
Pengaturan grade, gaji pokok, tunjangan, dan jumlah karyawan per posisi.

### 💰 Data Penggajian
Pencatatan payroll dengan status pembayaran: **Dibayarkan**, **Menunggu**, atau **Draft**.

</td>
</tr>
</table>

---

## 🎨 Tema & Desain

Sistem ini menggunakan palet warna yang mencerminkan identitas **ArthaCore** — profesional, tegas, dan terpercaya.

| Warna | Kode | Penggunaan |
|---|---|---|
| 🎨 **Navy** | `#142D4C` | Header, judul, tabel header |
| 🏆 **Gold** | `#BF9E5F` | Aksen, highlight, badge |
| 🌿 **Sage** | `#7A9478` | Status aktif, indikator positif |
| ☁️ **Cream** | `#FAF8F4` | Background halaman |

---

## 🛠️ Teknologi

| Layer | Teknologi |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Hosting** | GitHub Pages |
| **Visualisasi** | Chart & grafik (custom) |
| **Data** | Statis (siap dikembangkan ke API) |

---

## 🗄️ Arsitektur Data

### Diagram Relasi Entitas (ERD)

```mermaid
erDiagram
    PERUSAHAAN ||--o{ KARYAWAN : "mempekerjakan"
    DEPARTEMEN ||--o{ KARYAWAN : "menaungi"
    JABATAN ||--o{ KARYAWAN : "diemban"
    KARYAWAN ||--o{ PENGGAJIAN : "menerima"

    PERUSAHAAN {
        bigint id_perusahaan PK
        varchar nama_perusahaan
        varchar alamat
        boolean aktif
    }

    DEPARTEMEN {
        bigint id_departemen PK
        varchar kode_departemen
        varchar nama_departemen
        text deskripsi
    }

    JABATAN {
        bigint id_jabatan PK
        varchar grade
        numeric gaji_pokok
        numeric tunjangan
    }

    KARYAWAN {
        bigint id_karyawan PK
        bigint id_perusahaan FK
        bigint id_departemen FK
        bigint id_jabatan FK
        varchar nama_karyawan
        date tanggal_bergabung
        boolean aktif
        numeric gaji_pokok
    }

    PENGGAJIAN {
        bigint id_penggajian PK
        bigint id_karyawan FK
        varchar periode
        numeric gaji_pokok
        numeric tunjangan
        numeric potongan
        numeric gaji_bersih
        varchar status
    }
