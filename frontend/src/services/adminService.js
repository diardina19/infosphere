// Service untuk mengelola akun administrator InfoSphere
// Menggunakan localStorage untuk penyimpanan persisten dan dispatch custom event untuk reaktivitas UI.

const STORAGE_KEY_ADMINS = "infosphere_admin_list";
const STORAGE_KEY_CURRENT = "infosphere_current_admin";
const STORAGE_KEY_HISTORY = "infosphere_admin_delete_history";

export const INITIAL_CURRENT_ADMIN = {
  id: "me",
  name: "Raka Aditya",
  email: "raka.aditya@streamingtv.id",
  status: "Aktif",
  badge: "Akun Anda",
  joinedDate: "12 Januari 2026",
};

export const INITIAL_ADMIN_LIST = [
  {
    id: 1,
    name: "Maya Lestari",
    email: "maya.lestari@streamingtv.id",
    subtitle: "Administrator",
    role: "Super Admin",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Dedi Kurniawan",
    email: "dedi.kurniawan@streamingtv.id",
    subtitle: "Administrator",
    role: "Editor",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Aulia Putri",
    email: "aulia.putri@streamingtv.id",
    subtitle: "Administrator",
    role: "Reporter",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Rara Putri",
    email: "rara.putri@streamingtv.id",
    subtitle: "Administrator",
    role: "Reporter",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Andi Pratama",
    email: "andi.pratama@streamingtv.id",
    subtitle: "Administrator",
    role: "Editor",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Keisha Putri",
    email: "keisha.putri@streamingtv.id",
    subtitle: "Administrator",
    role: "Reporter",
    status: "Aktif",
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
export function tambahAdmin({ name, email, status = "Aktif", password }) {
  const admins = getAdminList();
  const baru = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    subtitle: "Administrator",
    status: status || "Aktif",
    createdAt: new Date().toISOString(),
  };

  const updated = [baru, ...admins];
  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(updated));
  return baru;
}

// Hapus admin lain dengan alasan yang dipilih
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
