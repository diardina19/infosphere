// Service untuk mengelola akun administrator InfoSphere
// Menggunakan localStorage untuk penyimpanan persisten dan dispatch custom event untuk reaktivitas UI.

const STORAGE_KEY_ADMINS = "infosphere_admin_list";
const STORAGE_KEY_CURRENT = "infosphere_current_admin";
const STORAGE_KEY_HISTORY = "infosphere_admin_delete_history";

export const INITIAL_CURRENT_ADMIN = {
  id: "me",
  name: "Raka Aditya",
  email: "raka.aditya@streamingtv.id",
  password: "admin123",
  status: "Aktif",
  badge: "Akun Anda",
  joinedDate: "12 Januari 2026",
  wajibGantiPassword: false,
  dinonaktifkanOleh: null,
  tanggalDinonaktifkan: null,
};

export const INITIAL_ADMIN_LIST = [
  {
    id: 1,
    name: "Maya Lestari",
    email: "maya.lestari@streamingtv.id",
    password: "admin123",
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: false,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
  },
  {
    id: 2,
    name: "Dedi Kurniawan",
    email: "dedi.kurniawan@streamingtv.id",
    password: "admin123",
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: false,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
  },
  {
    id: 3,
    name: "Aulia Putri",
    email: "aulia.putri@streamingtv.id",
    password: "admin123",
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: false,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
  },
  {
    id: 4,
    name: "Rara Putri",
    email: "rara.putri@streamingtv.id",
    password: "admin123",
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: false,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
  },
  {
    id: 5,
    name: "Andi Pratama",
    email: "andi.pratama@streamingtv.id",
    password: "admin123",
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: false,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
  },
  {
    id: 6,
    name: "Keisha Putri",
    email: "keisha.putri@streamingtv.id",
    password: "admin123",
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: false,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
  },
];

export const DELETE_REASONS = [
  "Sudah tidak bertugas / Resign / Mutasi",
  "Pelanggaran aturan & kebijakan keamanan sistem",
  "Duplikasi atau kesalahan pembuatan akun",
  "Permintaan penonaktifan dari pihak terkait",
  "Alasan lainnya",
];

// Helper inisialisasi / ambil akun yang sedang login
export function getCurrentAdmin() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error("Gagal membaca current admin dari storage:", err);
  }
  localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(INITIAL_CURRENT_ADMIN));
  return INITIAL_CURRENT_ADMIN;
}

// Simpan update akun admin sendiri (Nama, Email, dan Foto Profil)
export function updateCurrentAdmin({ name, email, avatar }) {
  const current = getCurrentAdmin();
  const updated = {
    ...current,
    name: name.trim(),
    email: email.trim(),
    avatar: avatar !== undefined ? avatar : (current.avatar || null),
  };

  localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(updated));

  // Trigger event agar komponen lain seperti Header langsung update otomatis
  window.dispatchEvent(
    new CustomEvent("admin-profile-updated", { detail: updated })
  );

  return updated;
}

// Ambil daftar admin lain
export function getAdminList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMINS);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error("Gagal membaca daftar admin dari storage:", err);
  }
  // Simpan data inisial jika belum ada
  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(INITIAL_ADMIN_LIST));
  return INITIAL_ADMIN_LIST;
}

// Tambah admin baru
// Validasi dilakukan di service agar mudah diganti ke API
export function tambahAdmin({ name, email, password }) {
  if (!name || !name.trim()) {
    throw new Error("Nama lengkap wajib diisi.");
  }

  if (!email || !email.trim()) {
    throw new Error("Alamat email wajib diisi.");
  }

  // Validasi format email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new Error("Format email tidak valid.");
  }

  // Cek email sudah dipakai admin lain
  const admins = getAdminList();
  const current = getCurrentAdmin();
  const emailLower = email.trim().toLowerCase();
  const emailSudahAda =
    admins.some((a) => a.email.toLowerCase() === emailLower) ||
    current.email.toLowerCase() === emailLower;
  if (emailSudahAda) {
    throw new Error("Email ini sudah digunakan oleh admin lain.");
  }

  if (!password) {
    throw new Error("Password awal wajib diisi.");
  }

  if (password.length < 8) {
    throw new Error("Password minimal 8 karakter.");
  }

  const baru = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    password: password,
    subtitle: "Administrator",
    status: "Aktif",
    wajibGantiPassword: true,
    dinonaktifkanOleh: null,
    tanggalDinonaktifkan: null,
    createdAt: new Date().toISOString(),
  };

  const updated = [baru, ...admins];
  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(updated));
  return baru;
}

// Nonaktifkan admin lain
// Validasi: tidak boleh menonaktifkan diri sendiri, minimal 1 admin aktif, password konfirmasi benar
export function nonaktifkanAdmin(id, passwordKonfirmasi) {
  const current = getCurrentAdmin();

  // Tidak boleh menonaktifkan diri sendiri
  if (String(id) === String(current.id)) {
    throw new Error("Anda tidak dapat menonaktifkan akun Anda sendiri.");
  }

  // Validasi password admin yang sedang login
  if (!passwordKonfirmasi) {
    throw new Error("Password konfirmasi wajib diisi.");
  }
  if (passwordKonfirmasi !== current.password) {
    throw new Error("Password salah.");
  }

  const admins = getAdminList();
  const target = admins.find((a) => a.id === id);
  if (!target) {
    throw new Error("Admin tidak ditemukan.");
  }

  if (target.status === "Nonaktif") {
    throw new Error("Admin ini sudah dalam status Nonaktif.");
  }

  // Hitung admin aktif (termasuk current admin)
  const adminAktifLain = admins.filter(
    (a) => a.status === "Aktif" && a.id !== id
  ).length;
  // current admin selalu aktif (karena sedang login)
  const totalAktifSetelah = adminAktifLain + 1; // +1 untuk current admin
  if (totalAktifSetelah < 1) {
    throw new Error(
      "Tidak dapat menonaktifkan admin ini. Minimal harus ada satu admin aktif dalam sistem."
    );
  }

  // Update status
  const now = new Date();
  const tanggalFormatted = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updated = admins.map((a) => {
    if (a.id === id) {
      return {
        ...a,
        status: "Nonaktif",
        dinonaktifkanOleh: current.name,
        tanggalDinonaktifkan: tanggalFormatted,
      };
    }
    return a;
  });

  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(updated));

  // Simpan riwayat
  try {
    const rawHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history = rawHistory ? JSON.parse(rawHistory) : [];
    history.unshift({
      id: Date.now(),
      targetAdmin: { id: target.id, name: target.name, email: target.email },
      action: "nonaktifkan",
      doneBy: current.name,
      timestamp: now.toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch (err) {
    console.error("Gagal menyimpan riwayat:", err);
  }

  return updated.find((a) => a.id === id);
}

// Aktifkan kembali admin yang dinonaktifkan
export function aktifkanAdmin(id) {
  const admins = getAdminList();
  const target = admins.find((a) => a.id === id);
  if (!target) {
    throw new Error("Admin tidak ditemukan.");
  }

  if (target.status === "Aktif") {
    throw new Error("Admin ini sudah dalam status Aktif.");
  }

  const updated = admins.map((a) => {
    if (a.id === id) {
      return {
        ...a,
        status: "Aktif",
        dinonaktifkanOleh: null,
        tanggalDinonaktifkan: null,
      };
    }
    return a;
  });

  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(updated));
  return updated.find((a) => a.id === id);
}

// Ubah password akun yang sedang login
export function changePassword(id, passwordLama, passwordBaru) {
  const current = getCurrentAdmin();

  if (String(id) !== String(current.id)) {
    throw new Error("Anda hanya dapat mengubah password akun Anda sendiri.");
  }

  if (!passwordLama) {
    throw new Error("Password lama wajib diisi.");
  }

  if (passwordLama !== current.password) {
    throw new Error("Password lama tidak sesuai.");
  }

  if (!passwordBaru) {
    throw new Error("Password baru wajib diisi.");
  }

  if (passwordBaru.length < 8) {
    throw new Error("Password baru minimal 8 karakter.");
  }

  if (passwordBaru === passwordLama) {
    throw new Error("Password baru tidak boleh sama dengan password lama.");
  }

  const updated = {
    ...current,
    password: passwordBaru,
    wajibGantiPassword: false,
  };

  localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(updated));

  // Trigger event agar komponen lain update
  window.dispatchEvent(
    new CustomEvent("admin-profile-updated", { detail: updated })
  );

  return updated;
}

// Hapus admin lain dengan alasan yang dipilih (legacy, tetap dipertahankan untuk kompatibilitas)
export function hapusAdmin(id, reason, note = "") {
  const admins = getAdminList();
  const target = admins.find((a) => a.id === id);
  if (!target) {
    throw new Error("Admin tidak ditemukan.");
  }

  const updated = admins.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(updated));

  // Simpan riwayat alasan penghapusan
  try {
    const rawHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history = rawHistory ? JSON.parse(rawHistory) : [];
    history.unshift({
      id: Date.now(),
      targetAdmin: { id: target.id, name: target.name, email: target.email },
      deletedBy: getCurrentAdmin().name,
      reason,
      note,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch (err) {
    console.error("Gagal menyimpan riwayat penghapusan:", err);
  }

  return true;
}
