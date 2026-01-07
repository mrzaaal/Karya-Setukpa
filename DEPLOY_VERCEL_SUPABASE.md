# Panduan Deploy GRATIS ke Vercel + Supabase
## Sistem Manajemen Makalah Digital SETUKPA
## 🆓 100% GRATIS - TANPA KARTU KREDIT

---

# OVERVIEW

| Komponen | Platform | Biaya |
|----------|----------|-------|
| Frontend | **Vercel** | 🆓 GRATIS |
| Backend | **Vercel Serverless** | 🆓 GRATIS |
| Database | **Supabase PostgreSQL** | 🆓 GRATIS |

**Total Biaya: Rp 0,-**

---

# BAGIAN 1: SETUP DATABASE (SUPABASE)

## Step 1.1: Buat Akun Supabase

1. Buka browser: **https://supabase.com**
2. Klik **"Start your project"** (tombol hijau)
3. Pilih **"Sign up with GitHub"**
4. Authorize Supabase untuk akses GitHub
5. Akun Supabase aktif!

---

## Step 1.2: Buat Project Baru

1. Di Dashboard Supabase, klik **"New Project"**
2. Isi form:

| Field | Isi dengan |
|-------|------------|
| **Organization** | (pilih personal) |
| **Name** | `setukpa-database` |
| **Database Password** | (buat password kuat, **SIMPAN BAIK-BAIK!**) |
| **Region** | **Southeast Asia (Singapore)** |
| **Pricing Plan** | **Free** |

3. Klik **"Create new project"**
4. Tunggu 1-2 menit sampai database siap

---

## Step 1.3: Dapatkan Connection String

1. Di sidebar kiri, klik **"Project Settings"** (icon gear)
2. Klik **"Database"**
3. Scroll ke bagian **"Connection string"**
4. Pilih tab **"URI"**
5. **COPY** connection string (yang dimulai dengan `postgresql://...`)

**Contoh format:**
```
postgresql://postgres.[PROJECT-ID]:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

6. **SIMPAN di Notepad!** (akan digunakan nanti)

**⚠️ PENTING**: Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat tadi!

---

# BAGIAN 2: DEPLOY BACKEND KE VERCEL

## Step 2.1: Buat Akun Vercel

1. Buka browser: **https://vercel.com**
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel
5. Pilih **"Hobby"** (gratis)
6. Akun aktif!

---

## Step 2.2: Import Backend Project

1. Di Dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Cari repository **"Karya-Setukpa"** atau **"mrzaaal/Karya-Setukpa"**
3. Klik **"Import"**

---

## Step 2.3: Konfigurasi Backend

1. Isi form deployment:

| Field | Isi dengan |
|-------|------------|
| **Project Name** | `setukpa-api` |
| **Framework Preset** | Other |
| **Root Directory** | `backend` (KLIK EDIT, ketik `backend`) |

2. Expand **"Build and Output Settings"**:

| Setting | Value |
|---------|-------|
| Build Command | `npm install && npx prisma generate && npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

3. Expand **"Environment Variables"**, tambahkan SATU PER SATU:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `DATABASE_URL` | (paste connection string dari Supabase) |
| `JWT_SECRET` | `setukpa-secret-key-2026-very-secure-production-key-xyz` |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | (kosongkan dulu) |

4. Klik **"Deploy"**
5. Tunggu proses build... (3-5 menit)

---

## Step 2.4: Jalankan Migrasi Database

Setelah deploy berhasil:

1. Install **Vercel CLI** di komputer Anda:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Link project:
```bash
cd C:\Users\ASUS\Downloads\Karya-Setukpa\backend
vercel link
```

4. Pull environment variables:
```bash
vercel env pull .env.production
```

5. Jalankan migrasi:
```bash
npx prisma migrate deploy
npx prisma db seed
```

**ATAU** alternatif lebih mudah:

6. Di Supabase Dashboard, klik **"SQL Editor"**
7. Copy-paste isi file `backend/database-setup.sql` (jika ada)
8. Klik **"Run"**

---

## Step 2.5: Catat URL Backend

Setelah deploy selesai, Vercel akan memberikan URL seperti:
```
https://setukpa-api.vercel.app
```

**SIMPAN URL ini!**

---

# BAGIAN 3: DEPLOY FRONTEND KE VERCEL

## Step 3.1: Import Frontend Project

1. Kembali ke Dashboard Vercel
2. Klik **"Add New..."** → **"Project"**
3. Repository yang sama akan muncul, klik **"Import"** lagi

---

## Step 3.2: Konfigurasi Frontend

1. Isi form:

| Field | Isi dengan |
|-------|------------|
| **Project Name** | `setukpa-web` |
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` (KLIK EDIT, ketik `frontend`) |

2. Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://setukpa-api.vercel.app/api` |

**Ganti URL dengan URL backend Anda dari Step 2.5!**

3. Klik **"Deploy"**
4. Tunggu build selesai (2-3 menit)

---

## Step 3.3: Catat URL Frontend

URL frontend seperti:
```
https://setukpa-web.vercel.app
```

---

# BAGIAN 4: HUBUNGKAN CORS

## Step 4.1: Update Backend CORS

1. Buka Dashboard Vercel
2. Klik project **"setukpa-api"** (backend)
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"**
5. Cari `CORS_ORIGIN`, klik **Edit**
6. Masukkan URL frontend:
```
https://setukpa-web.vercel.app
```
7. Klik **"Save"**
8. Klik tab **"Deployments"**, lalu **"Redeploy"** deployment terakhir

---

# BAGIAN 5: TEST APLIKASI

1. Buka URL frontend di browser:
```
https://setukpa-web.vercel.app
```

2. Login dengan akun default:
   - **NOSIS**: `SUPERADMIN`
   - **Password**: `superadmin123`

3. Jika berhasil masuk, **SELAMAT!** 🎉

---

# ⚠️ TROUBLESHOOTING

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| Build Error | Dependency issue | Cek logs, pastikan semua package ada |
| Database Error | Connection string salah | Cek ulang password di DATABASE_URL |
| CORS Error | CORS_ORIGIN belum diset | Update env variable di backend |
| 500 Error | Database belum dimigrate | Jalankan prisma migrate deploy |
| Login gagal | Database kosong | Jalankan prisma db seed |

---

# 📝 CHECKLIST AKHIR

- [ ] Akun Supabase dibuat
- [ ] Database PostgreSQL aktif
- [ ] Connection string disimpan
- [ ] Backend deploy ke Vercel
- [ ] Database dimigrate
- [ ] Frontend deploy ke Vercel
- [ ] CORS diupdate
- [ ] Bisa login ke aplikasi

---

# 🎯 URL APLIKASI ANDA

| Komponen | URL |
|----------|-----|
| Frontend | `https://[nama-project].vercel.app` |
| Backend | `https://[nama-api].vercel.app` |
| Database | Supabase Dashboard |

**SELAMAT! Aplikasi Anda sudah ONLINE dan GRATIS!** 🚀
