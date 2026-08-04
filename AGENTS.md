<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Diklat FE App — Agent Rules & Conventions

> Baca file ini SEBELUM menulis kode apa pun di project ini.
> File ini adalah sumber kebenaran untuk semua konvensi, arsitektur, dan pattern yang berlaku.

## 1. Project Identity

| Key              | Value                                            |
| ---------------- | ------------------------------------------------ |
| **Nama**         | Diklat FE App (Amar Diklat Frontend)                 |
| **Stack**        | Next.js 16 (App Router) · React 19 · TypeScript 6 |
| **Styling**      | Tailwind CSS v3 + CSS Variables (oklch) + shadcn/ui (base-nova style) |
| **State**        | Zustand v5 (global) · TanStack React Query v5 (server state) |
| **Forms**        | React Hook Form v7 + Zod v4 (validation)         |
| **Tables**       | TanStack React Table v8                          |
| **Icons**        | Lucide React                                     |
| **Rich Text**    | TipTap v3                                        |
| **Charts**       | ApexCharts (via react-apexcharts)                |
| **Date Picker**  | react-datepicker                                 |
| **File Upload**  | react-dropzone + Cloudinary (via custom hook)    |
| **Select**       | react-select (untuk multi-select / searchable)   |
| **Theme**        | next-themes (light/dark via class strategy)      |
| **Package Mgr**  | Bun                                              |
| **Backend API**  | REST API di `diklat-be-app` (default: http://localhost:4000) |
| **Bahasa UI**    | **Bahasa Indonesia** untuk semua label, placeholder, notifikasi, dan pesan error |

## 2. Architecture Overview

```
Architecture: Feature-Sliced Design (Modular)
Rendering: Client-side heavy (most pages use "use client")
Auth: JWT token via localStorage + Zustand store
RBAC: Backend-driven navigation & permission per route
API Layer: Custom fetch wrapper (apiClient) → Service classes → React Query hooks
```

### Route Group Strategy

Project menggunakan Next.js **route groups** `(groupName)` untuk memisahkan layout:

| Group          | Path Prefix   | Layout Behavior                              | Auth Required |
| -------------- | ------------- | -------------------------------------------- | ------------- |
| `(admin)`      | `/dashboard`, `/diklat/*`, `/lms/*`, dll | Sidebar + Header + AuthGuard | ✅ Ya |
| `(admin)/(rbac)` | `/master-data/*`, `/users/*`, `/logistics/*` | RBAC permission check per route | ✅ Ya |
| `(lms)`        | `/my-learning` | Portal Pembelajaran LMS untuk Peserta | ✅ Ya |
| `(auth)`       | `/auth/*`     | Minimal layout (bg #F8F9FD)                  | ❌ Tidak |
| `(public)`     | `/`, `/about` | Public Landing Page                          | ❌ Tidak |

## 3. Directory & File Conventions

### Path Alias
```
@/* → ./src/*   (dikonfigurasi di tsconfig.json)
```

### Feature Module Structure
Setiap domain bisnis diorganisir sebagai feature module di `src/features/`:
```
src/features/<domain>/
├── types/           # TypeScript types & interfaces (index.ts)
├── services/        # Service class (static methods, uses apiClient)
├── hooks/           # React Query hooks (useXxx, useCreateXxx, dst)
├── constants/       # Konstanta & dummy data (opsional)
├── utils/           # Helper functions khusus feature (opsional)
├── store.ts         # Zustand CRUD store (createCrudStore atau custom) (opsional)
└── components/      # (opsional) Komponen khusus feature
```
> **Catatan:** Minimum yang WAJIB ada di setiap feature module: `types/`, `services/`, `hooks/`.

**Feature modules yang sudah ada:**
| Domain | Module | Deskripsi |
|---|---|---|
| **Auth** | `features/auth/` | Login service & auth types |
| **RBAC** | `features/rbac/user/` | CRUD user, navigation, permissions |
| **RBAC** | `features/rbac/role/` | CRUD role |
| **RBAC** | `features/rbac/menu/` | CRUD menu (sidebar items) |
| **RBAC** | `features/rbac/role-permission/` | CRUD role-permission mapping |
| **Diklat** | `features/course/` | CRUD Program/Course |
| **Diklat** | `features/class/` | CRUD Batch/Angkatan kelas |
| **LMS** | `features/module/` | Kurikulum Modul LMS |
| **LMS** | `features/material/` | Upload & Putar Video/PDF Pembelajaran |
| **LMS** | `features/quiz/` | Konfigurasi Kuis dan soal-soal |
| **Operation** | `features/session/` | Jadwal Tatap Muka/Online |
| **Operation** | `features/attendance/`| Check-in Presensi Peserta |
| **Logistik** | `features/logistic/` | Hotel & Akomodasi |
| **Finance** | `features/invoice/` | Penagihan B2B/B2C |
| **User** | `features/instructor/` | Master Data Instruktur |
| **User** | `features/participant/` | Master Data Peserta & Organisasi |
| **QC** | `features/evaluation/` | Feedback & Rating dari peserta |
| **QC** | `features/certificate/` | Penerbitan Sertifikat |

### Store Organization
```
src/stores/
├── use-auth.ts          # Auth state (token, user, isAuthenticated, setAuth, clearAuth, hydrate)
├── use-store.ts         # UI state (isSidebarOpen, toggleSidebar, dll)
└── create-crud-store.ts # Generic factory for CRUD modal state management
```

## 4. Coding Patterns & Rules

### 4.1 Service Class Pattern
Setiap service WAJIB menggunakan pattern **static class** yang memanggil `apiClient`:
```typescript
import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { MyEntity, CreateRequest, UpdateRequest } from "../types";

export class MyEntityService {
  static async getAll(): Promise<ApiResponse<MyEntity[]>> {
    return apiClient<ApiResponse<MyEntity[]>>("/api/my-entities");
  }

  static async create(payload: CreateRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/my-entities", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
```

### 4.2 Admin Page Pattern (CRUD)
Setiap halaman Admin untuk fitur CRUD diatur menggunakan komponen modular:
1. `"use client"` directive di entry page (`page.tsx`)
2. Menggunakan `createCrudStore<T>()` untuk local state modal (`openEdit`, `closeModal`).
3. `page.tsx`: Bertugas sebagai orchestrator (fetch via React Query, render header & table).
4. `_components/*-columns.tsx`: Definisi kolom `TanStack Table`, memakai `cell: ({ row })` untuk custom action (Edit/Delete icons).
5. `_components/*-form-modal.tsx`: Komponen modal berisi form `react-hook-form` & `zod`.
6. Akses fungsi CRUD dibatasi oleh permission RBAC (ambil dari `usePermissions()`).

### 4.3 Checklist Menambah Fitur Baru
1. Buat folder di `src/features/<feature-name>/`.
2. Buat `types/index.ts` (Mirror dari backend DTO).
3. Buat `services/<feature>-service.ts` (API Client).
4. Buat `hooks/use-<feature>.ts` (React Query queries & mutations).
5. (Optional) Buat `store.ts` via `createCrudStore`.
6. Buat file `page.tsx` di `src/app/(admin)/.../<feature>/page.tsx`.
7. Tambah komponen `*-columns.tsx` dan `*-form-modal.tsx` di folder `_components`.
8. Jika fitur backend butuh RBAC, pastikan di table `menus` di backend ada endpoint permission-nya.

## 5. Larangan (DO NOTs)
1. ❌ **Jangan pakai axios**. Selalu gunakan `apiClient` dari `src/services/api/client.ts`.
2. ❌ **Jangan styling inline atau buat file CSS terpisah**. Selalu gunakan Tailwind Classes & `cn()` utility.
3. ❌ **Jangan letakkan bisnis logic di `page.tsx`**. Pindahkan state rumit ke hooks/Zustand dan logika *fetch* ke `services/`.
4. ❌ **Jangan abaikan loading state & error state**. Saat *submit* (mutasi), tombol harus dalam *loading mode*, form di-disable.
5. ❌ **Jangan biarkan pesan error / toast berbahasa Inggris**. Translasi otomatis ke Bahasa Indonesia.
