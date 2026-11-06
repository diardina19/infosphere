import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Users,
  ShieldOff,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import AkunSayaCard from "../components/admin/AkunSayaCard";
import EditAkunModal from "../components/admin/EditAkunModal";
import TambahAdminModal from "../components/admin/TambahAdminModal";
import NonaktifkanAdminModal from "../components/admin/NonaktifkanAdminModal";
import UbahPasswordModal from "../components/admin/UbahPasswordModal";
import {
  getCurrentAdmin,
  updateCurrentAdmin,
  getAdminList,
  tambahAdmin,
  nonaktifkanAdmin,
  aktifkanAdmin,
  changePassword,
} from "../services/adminService";

const PAGE_SIZE = 6;

export default function AkunAdmin() {
  const [currentAdmin, setCurrentAdmin] = useState(getCurrentAdmin());
  const [adminList, setAdminList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Modal states
  const [showEditMe, setShowEditMe] = useState(false);
  const [showTambah, setShowTambah] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState(null);
  const [showUbahPassword, setShowUbahPassword] = useState(false);

  // Toast / feedback message
  const [toast, setToast] = useState(null);

  // Load data awal
  useEffect(() => {
    setCurrentAdmin(getCurrentAdmin());
    setAdminList(getAdminList());

    const handleProfileUpdate = (e) => {
      if (e.detail) {
        setCurrentAdmin(e.detail);
      }
    };

    window.addEventListener("admin-profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("admin-profile-updated", handleProfileUpdate);
    };
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handler Edit Akun Sendiri (Nama, Email, dan Password)
  const handleSaveProfile = (updatedData) => {
    try {
      const updated = updateCurrentAdmin(updatedData);
      setCurrentAdmin(updated);
      setShowEditMe(false);
      showToast("Data akun Anda berhasil diperbarui.");
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui akun.", "error");
    }
  };

  // Handler Tambah Admin Baru
  const handleTambahAdmin = (data) => {
    try {
      const baru = tambahAdmin(data);
      setAdminList(getAdminList());
      setShowTambah(false);
      showToast(`Akun admin "${baru.name}" berhasil ditambahkan.`);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Gagal menambahkan admin.", "error");
      throw err; // Re-throw agar modal tahu ada error
    }
  };

  // Handler Nonaktifkan Admin
  const handleNonaktifkan = (id, password) => {
    try {
      const result = nonaktifkanAdmin(id, password);
      setAdminList(getAdminList());
      setDeactivateTarget(null);
      showToast(`Akun admin "${result.name}" berhasil dinonaktifkan.`);
    } catch (err) {
      console.error(err);
      throw err; // Re-throw agar modal menampilkan error
    }
  };

  // Handler Aktifkan Admin
  const handleAktifkan = (id) => {
    try {
      const result = aktifkanAdmin(id);
      setAdminList(getAdminList());
      showToast(`Akun admin "${result.name}" berhasil diaktifkan kembali.`);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Gagal mengaktifkan admin.", "error");
    }
  };

  // Handler Ubah Password
  const handleUbahPassword = (passwordLama, passwordBaru) => {
    try {
      const updated = changePassword(currentAdmin.id, passwordLama, passwordBaru);
      setCurrentAdmin(updated);
      setShowUbahPassword(false);
      showToast("Password berhasil diubah.");
    } catch (err) {
      console.error(err);
      throw err; // Re-throw agar modal menampilkan error
    }
  };

  // Filter daftar admin berdasarkan pencarian nama atau email
  const filteredAdmins = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return adminList;
    return adminList.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
      );
    });
  }, [adminList, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAdmins.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedAdmins = filteredAdmins.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Hitung jumlah admin aktif (termasuk current admin)
  const adminAktifCount = adminList.filter((a) => a.status === "Aktif").length + 1;

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toast && (
        <div
          className={
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border transition-all duration-300 " +
            (toast.type === "error"
              ? "bg-danger text-white border-red-700"
              : toast.type === "info"
              ? "bg-[#002b50] text-white border-primary/40"
              : "bg-ink text-white border-gray-700")
          }
        >
          {toast.type === "error" ? (
            <AlertCircle size={18} className="text-white shrink-0" />
          ) : toast.type === "info" ? (
            <Info size={18} className="text-accent shrink-0" />
          ) : (
            <CheckCircle size={18} className="text-emerald-400 shrink-0" />
          )}
          <span className="text-body font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 hover:bg-white/20 rounded-md transition ml-2 cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Header Halaman: Judul & Tombol Tambah Admin Baru */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-section font-bold text-ink">Kelola Admin</h1>
        </div>

        <button
          type="button"
          onClick={() => setShowTambah(true)}
          className="h-11 px-5 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Tambah Admin Baru</span>
        </button>
      </div>

      {/* Banner Wajib Ganti Password */}
      {currentAdmin.wajibGantiPassword && (
        <div className="flex items-center gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertTriangle size={18} className="text-amber-600 shrink-0" />
          <p className="text-body text-amber-800 flex-1">
            Anda menggunakan password awal. Segera ganti password Anda untuk keamanan akun.
          </p>
          <button
            type="button"
            onClick={() => setShowUbahPassword(true)}
            className="h-8 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-caption font-semibold shrink-0 transition cursor-pointer shadow-sm"
          >
            Ganti Sekarang
          </button>
        </div>
      )}

      {/* Konten Utama 2 Kolom (Kiri: Akun Saya, Kanan: Daftar Admin) - Sama Tinggi */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Kolom Kiri: Kartu Akun Saya */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col">
          <AkunSayaCard
            currentAdmin={currentAdmin}
            onEditClick={() => setShowEditMe(true)}
            onChangePasswordClick={() => setShowUbahPassword(true)}
          />
        </div>

        {/* Kolom Kanan: Card Daftar Admin */}
        <div className="flex-1 min-w-0 w-full bg-white border border-line rounded-2xl shadow-card overflow-hidden flex flex-col justify-between">
          {/* Header Card & Filter Bar */}
          <div className="p-5 border-b border-line space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-card font-bold text-ink">Daftar Admin</h2>
                <span className="text-caption font-semibold px-2.5 py-0.5 rounded-full bg-surface text-muted border border-line">
                  {adminList.length} admin
                </span>
              </div>
            </div>

            {/* Form Pencarian */}
            <div className="flex gap-3">
              {/* Pencarian Nama atau Email */}
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Cari nama atau email..."
                  className="w-full h-10 pl-10 pr-4 bg-white border border-line rounded-lg text-body text-ink placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
            </div>
          </div>

          {/* Tabel Daftar Admin */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc] border-b border-line">
                <tr className="text-[11px] font-semibold tracking-wider text-muted uppercase">
                  <th className="px-6 py-3.5">Nama</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {pagedAdmins.map((item) => {
                  const initials = item.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  const isNonaktif = item.status === "Nonaktif";
                  const isSelf = String(item.id) === String(currentAdmin.id);
                  // Tidak boleh nonaktifkan jika tinggal 1 admin aktif
                  const canDeactivate = !isSelf && adminAktifCount > 1 && !isNonaktif;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      {/* Kolom Nama */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={
                            "w-10 h-10 rounded-full text-caption font-bold flex items-center justify-center shrink-0 border " +
                            (isNonaktif
                              ? "bg-gray-100 text-gray-400 border-gray-200"
                              : "bg-tint text-primary border-primary/10")
                          }>
                            {initials}
                          </span>
                          <div className="min-w-0">
                            <p className={"text-body font-semibold truncate " + (isNonaktif ? "text-muted" : "text-ink")}>
                              {item.name}
                            </p>
                            <p className="text-caption text-muted truncate">
                              {item.subtitle || "Administrator"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Kolom Email */}
                      <td className="px-6 py-4 text-body text-muted">
                        <span className="truncate block max-w-xs">{item.email}</span>
                      </td>

                      {/* Kolom Status */}
                      <td className="px-6 py-4">
                        {isNonaktif ? (
                          <div>
                            <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              Nonaktif
                            </span>
                            {item.dinonaktifkanOleh && (
                              <p className="text-[11px] text-muted mt-1 leading-snug">
                                Dinonaktifkan oleh {item.dinonaktifkanOleh} pada {item.tanggalDinonaktifkan}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Aktif
                          </span>
                        )}
                      </td>

                      {/* Kolom Aksi */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1">
                          {/* Tombol Nonaktifkan / Aktifkan */}
                          {!isSelf && (
                            <>
                              {isNonaktif ? (
                                <button
                                  type="button"
                                  onClick={() => handleAktifkan(item.id)}
                                  title={`Aktifkan kembali ${item.name}`}
                                  className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition cursor-pointer"
                                >
                                  <ShieldCheck size={17} />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setDeactivateTarget(item)}
                                  disabled={!canDeactivate}
                                  title={
                                    !canDeactivate
                                      ? "Tidak dapat menonaktifkan. Minimal harus ada satu admin aktif."
                                      : `Nonaktifkan ${item.name}`
                                  }
                                  className="p-2 rounded-lg text-danger hover:bg-danger/10 hover:text-red-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <ShieldOff size={17} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredAdmins.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-muted text-body"
                    >
                      <Users size={32} className="mx-auto mb-2 text-muted/50" />
                      Tidak ada akun admin yang sesuai dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Tabel & Navigasi Pagination */}
          <div className="p-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fafbfd]">
            <p className="text-caption text-muted">
              Menampilkan {filteredAdmins.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, filteredAdmins.length)} dari{" "}
              {filteredAdmins.length} admin
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
                className="w-8 h-8 rounded-lg border border-line bg-white text-muted hover:text-ink hover:bg-surface inline-flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={
                    "w-8 h-8 rounded-lg text-caption font-semibold transition cursor-pointer " +
                    (currentPage === n
                      ? "bg-primary text-white shadow-2xs"
                      : "border border-line bg-white text-muted hover:text-ink hover:bg-surface")
                  }
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Halaman berikutnya"
                className="w-8 h-8 rounded-lg border border-line bg-white text-muted hover:text-ink hover:bg-surface inline-flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>x

      {/* Modal Edit Akun Saya (Nama, Email, dan Foto Profil) */}
      {showEditMe && (
        <EditAkunModal
          currentAdmin={currentAdmin}
          onClose={() => setShowEditMe(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Modal Tambah Admin Baru */}
      {showTambah && (
        <TambahAdminModal
          onClose={() => setShowTambah(false)}
          onAdd={handleTambahAdmin}
        />
      )}

      {/* Modal Nonaktifkan Admin */}
      {deactivateTarget && (
        <NonaktifkanAdminModal
          admin={deactivateTarget}
          onClose={() => setDeactivateTarget(null)}
          onConfirm={handleNonaktifkan}
        />
      )}

      {/* Modal Ubah Password */}
      {showUbahPassword && (
        <UbahPasswordModal
          onClose={() => setShowUbahPassword(false)}
          onSave={handleUbahPassword}
        />
      )}
    </div>
  );
}
