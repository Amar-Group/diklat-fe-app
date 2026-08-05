# Project Structure

## Overview

Aplikasi **Diklat FE App** — Portal LMS dan Admin Dashboard untuk manajemen diklat (Amar Diklat).
Dibangun dengan **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS v3**, dan **shadcn/ui**.

## Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Framework        | Next.js 16.2.6 (App Router)               |
| UI Library       | React 19.2.4                              |
| Language         | TypeScript 6.0.3                          |
| Styling          | Tailwind CSS 3.4 + CSS Variables (oklch)  |
| Component Lib    | shadcn/ui v4 (base-nova style)            |
| State (Client)   | Zustand 5.0                               |
| State (Server)   | TanStack React Query 5.x                  |
| Tables           | TanStack React Table 8.x                  |
| Forms            | React Hook Form 7.x + Zod 4.x            |
| Icons            | Lucide React                              |
| HTTP Client      | Custom fetch wrapper (`apiClient`)        |
| Package Manager  | Bun                                       |

---

## Route Group Strategy

Project menggunakan Next.js **route groups** `(groupName)` untuk memisahkan layout berdasarkan domain *user*:

| Group          | Path Prefix   | Deskripsi / Tipe Layout                       | Auth Required |
| -------------- | ------------- | -------------------------------------------- | ------------- |
| `(admin)`      | `/dashboard`, `/diklat/*`, `/lms/*` | Admin Dashboard (Sidebar + Header + RBAC AuthGuard) | ✅ Ya |
| `(lms)`        | `/my-learning` | Portal Peserta LMS untuk mengikuti kelas     | ✅ Ya |
| `(auth)`       | `/auth/*`     | Minimal layout untuk Login/Register           | ❌ Tidak |
| `(public)`     | `/`, `/about`, `/programs` | Landing page pengunjung website | ❌ Tidak |

---

## Source Code Structure

```
src/
├── app/                        # Next.js App Router (Halaman & Layout)
│   ├── (admin)/                # Halaman Admin & Instruktur
│   │   ├── (rbac)/             # Pengaturan role & menu (Master Data)
│   │   ├── diklat/             # Manajemen Course & Class
│   │   ├── lms/                # Manajemen Modul, Materi, & Kuis
│   │   ├── logistics/          # Jadwal Sesi, Hotel, Attendance
│   │   ├── finance/            # Invoicing
│   │   ├── qc/                 # Evaluasi & Cetak Sertifikat
│   │   └── users/              # Data Instruktur & Profil Peserta
│   │
│   ├── (lms)/                  # Portal Pembelajaran Peserta
│   │   └── my-learning/        # Daftar kelas, putar video materi, kerjakan kuis
│   │
│   ├── (public)/               # Landing Page & Company Profile
│   │   ├── about/              # Profil & Visi Misi
│   │   ├── programs/           # Katalog Program Diklat
│   │   ├── curriculum/         # Daftar Kurikulum
│   │   ├── instructors/        # Daftar Pengajar
│   │   ├── faq/                # Testimoni
│   │   └── certificate/        # Pengecekan / Validasi Sertifikat Publik
│   │
│   └── (auth)/                 # Login (Admin/Instruktur/Peserta)
│
├── components/                 # Reusable components (Global)
│   ├── ui/                     # shadcn/ui components (button, input, modal, dll)
│   ├── shared/                 # DataTable, PageHeader, DeleteConfirmModal
│   ├── layout/                 # Admin Sidebar, Navbar, Mobile Menu
│   └── auth/                   # AuthGuard wrapper
│
├── features/                   # Feature Modules (Domain-Driven)
│   ├── auth/                   # Autentikasi
│   ├── rbac/                   # Manajemen Role & Menu Dinamis
│   ├── course/                 # Manajemen Program
│   ├── class/                  # Batch/Angkatan
│   ├── module/                 # Kurikulum Modul
│   ├── material/               # Upload Video/PDF
│   ├── quiz/                   # Kuis & Soal
│   ├── session/                # Sesi Tatap Muka/Online
│   ├── attendance/             # Absensi / Check-In
│   ├── logistic/               # Akomodasi Kelas Offline
│   ├── invoice/                # Penagihan
│   ├── evaluation/             # Feedback Peserta
│   ├── certificate/            # Generate Sertifikat
│   ├── instructor/             # Profil Pengajar
│   └── participant/            # Profil Peserta
│
├── services/                   # Global API Client (`apiClient<T>()`)
├── stores/                     # Zustand Global Stores (useAuth, dll)
├── hooks/                      # Global Hooks
└── utils/                      # Helper Functions
```

---

## Feature Module Pattern (6-Parts)

Setiap fitur (misalnya `features/class/`) dipecah secara rapi ke dalam beberapa file pendukung:

1. **`types/`**: Interface TypeScript & Schema (mirip DTO Backend).
2. **`services/`**: API Caller (Class berisi *static methods* memanggil `apiClient`).
3. **`hooks/`**: React Query Wrapper (`useClasses`, `useCreateClass`, dll) + Invalidation caching.
4. **`store.ts`**: (Opsional) Zustand store untuk *local state* fitur tersebut (misal `createCrudStore` untuk state modal form/edit/delete).
5. **`constants/`**: (Opsional) Dummy data, select options *hardcoded*.
6. **`utils/`**: (Opsional) Helper spesifik domain.

**Alur Data**:
`page.tsx` → `use-class.ts (React Query)` → `class-service.ts` → `apiClient (fetch)` → `Backend API`.

---

## Admin Page Pattern (CRUD)

Halaman Admin biasanya dibangun dari 5-6 file modular agar tidak *bloated*:
1. **`page.tsx`**: Orchestrator (Fetch data, pass prop ke Table, letakkan Modal utama).
2. **`_components/*-columns.tsx`**: Header & Cell render logic untuk TanStack Table.
3. **`_components/*-form-modal.tsx`**: Komponen Form dengan `react-hook-form` & `zod`, dipicu lewat action edit/tambah di tabel.
4. Fitur RBAC (Akses Menu): Dibungkus dengan fungsi `usePermissions()` untuk memeriksa flag `can_read`, `can_create`, `can_update`, `can_delete`.

## Payment & Check-In Pattern

Aplikasi ini masih diarsiteki dengan kapabilitas eksternal (meskipun sebagian modul midtrans dinonaktifkan di domain B2B):
- Sistem dapat diintegrasikan dengan alat pembayaran eksternal (Invoicing).
- Fitur Presensi mendukung metode **Manual** dan siap untuk integrasi Scanner (QR Code Check-in).