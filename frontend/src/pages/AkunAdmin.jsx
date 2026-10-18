import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Users,
} from "lucide-react";
import AkunSayaCard from "../components/admin/AkunSayaCard";
import EditAkunModal from "../components/admin/EditAkunModal";
import HapusAdminModal from "../components/admin/HapusAdminModal";
import {
  getCurrentAdmin,
  updateCurrentAdmin,
  getAdminList,
  hapusAdmin,
} from "../services/adminService";

const PAGE_SIZE = 6;

export default function AkunAdmin() {
  const [currentAdmin, setCurrentAdmin] = useState(getCurrentAdmin());
  const [adminList, setAdminList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Modal states
  const [showEditMe, setShowEditMe] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  // Handler Hapus Admin Lain dengan Alasan
  const handleConfirmDelete = (id, reason, note) => {
    try {
      const target = adminList.find((a) => a.id === id);
      hapusAdmin(id, reason, note);
      setAdminList(getAdminList());
      setDeleteTarget(null);
      showToast(
        `Akun admin "${target?.name || "Admin"}" berhasil dihapus.`
      );
    } catch (err) {
      console.error(err);
      showToast(err.message || "Gagal menghapus admin.", "error");
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
          <h1 className="text-section sm:text-title font-bold text-ink">
            Manajemen Admin
          </h1>
          <p className="text-body text-muted mt-1">
            Kelola hak akses administrator sistem InfoSphere dan pengaturan akun Anda.
          </p>
        </div>

        <button
          type="button"
          className="h-11 px-5 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Tambah Admin Baru</span>
        </button>
      </div>

      {/* Konten Utama 2 Kolom (Kiri: Akun Saya, Kanan: Daftar Admin) - Sama Tinggi */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Kolom Kiri: Kartu Akun Saya */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col">
          <AkunSayaCard
            currentAdmin={currentAdmin}
            onEditClick={() => setShowEditMe(true)}
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

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      {/* Kolom Nama */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-tint text-primary text-caption font-bold flex items-center justify-center shrink-0 border border-primary/10">
                            {initials}
                          </span>
                          <div className="min-w-0">
                            <p className="text-body font-semibold text-ink truncate">
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

                      {/* Kolom Status (Aktif) */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {item.status || "Aktif"}
                        </span>
                      </td>

                      {/* Kolom Aksi: HANYA ADA TOMBOL HAPUS (Tidak ada edit admin lain) */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            title={`Hapus admin ${item.name}`}
                            aria-label={`Hapus admin ${item.name}`}
                            className="p-2 rounded-lg text-danger hover:bg-danger/10 hover:text-red-700 transition cursor-pointer"
                          >
                            <Trash2 size={17} />
                          </button>
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
      </div>

      {/* Modal Edit Akun Saya (Nama, Email, dan Foto Profil) */}
      {showEditMe && (
        <EditAkunModal
          currentAdmin={currentAdmin}
          onClose={() => setShowEditMe(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Modal Hapus Admin dengan Syarat Poin Alasan */}
      {deleteTarget && (
        <HapusAdminModal
          admin={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
