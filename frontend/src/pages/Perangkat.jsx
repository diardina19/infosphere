import { useState } from "react";
import {
  Monitor,
  Wifi,
  WifiOff,
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
} from "lucide-react";
import StatCard from "../components/StatCard";

// Data contoh. Nanti ganti dengan data dari backend (lewat folder services/).
const initialDevices = [
  {
    id: 1,
    code: "TV-LBY-LOBBY-01",
    location: "Lobby Utama",
    playlist: "Promo Q4 Nasional",
    ip: "10.21.4.18",
    lastActive: "Baru saja",
    status: "online",
  },
  {
    id: 2,
    code: "TV-JKT-LANTAI-03",
    location: "Lantai 3",
    playlist: "Informasi Layanan Publik",
    ip: "10.18.5.42",
    lastActive: "2 mnt lalu",
    status: "online",
  },
  {
    id: 3,
    code: "TV-BDG-KASIR-02",
    location: "Bandung · Area Kasir",
    playlist: "Promo Q4 Nasional",
    ip: "10.24.8.16",
    lastActive: "4 mnt lalu",
    status: "online",
  },
  {
    id: 4,
    code: "TV-SMG-TUNGGU-01",
    location: "Semarang · Ruang Tunggu",
    playlist: "Program Akhir Pekan",
    ip: "10.31.2.11",
    lastActive: "18 mnt lalu",
    status: "offline",
  },
  {
    id: 5,
    code: "TV-MDN-LOBBY-02",
    location: "Medan · Lobby",
    playlist: "Kampanye Produk Oktober",
    ip: "10.28.5.24",
    lastActive: "5 mnt lalu",
    status: "online",
  },
  {
    id: 6,
    code: "TV-DPS-GATE-04",
    location: "Denpasar · Gate 4",
    playlist: "Informasi Layanan Publik",
    ip: "10.38.1.09",
    lastActive: "8 mnt lalu",
    status: "online",
  },
  {
    id: 7,
    code: "TV-MKS-LOBBY-01",
    location: "Makassar · Lobby",
    playlist: "—",
    ip: "10.42.7.20",
    lastActive: "1 jam lalu",
    status: "maintenance",
  },
  {
    id: 8,
    code: "TV-SBY-AULA-01",
    location: "Surabaya · Aula Utama",
    playlist: "Promo Q4 Nasional",
    ip: "10.17.3.55",
    lastActive: "10 mnt lalu",
    status: "online",
  },
];

const PAGE_SIZE = 8;
const STATUS_OPTIONS = ["Semua status", "Online", "Offline", "Pemeliharaan"];

function StatusBadge({ status }) {
  if (status === "online") {
    return (
      <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Online
      </span>
    );
  }
  if (status === "offline") {
    return (
      <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Offline
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      Pemeliharaan
    </span>
  );
}

// ─── Modal Edit Nama TV ───────────────────────────────────────────────────────
function ModalEdit({ device, onClose, onSave }) {
  const [name, setName] = useState(device.code);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(device.id, name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-line animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-tint text-primary flex items-center justify-center">
              <Pencil size={18} />
            </span>
            <div>
              <h3 className="text-card font-semibold text-ink">Edit Nama Perangkat</h3>
              <p className="text-caption text-muted mt-0.5">Ubah nama / kode identifikasi TV</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:bg-surface hover:text-ink transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label
              htmlFor="edit-device-name"
              className="block text-body font-medium text-ink mb-1.5"
            >
              Nama / Kode Perangkat
            </label>
            <input
              id="edit-device-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="w-full h-11 px-4 rounded-lg border border-line text-body text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              placeholder="Contoh: TV-GKU-LOBBY-01"
            />
            <p className="mt-1.5 text-caption text-muted">
              Lokasi perangkat tidak dapat diubah dari halaman ini.
            </p>
          </div>

          {/* Aksi */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg border border-line text-body font-medium text-ink hover:bg-surface transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold transition cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Modal Hapus (konfirmasi langsung, tanpa ketik nama) ─────────────────────
function ModalHapus({ device, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-line">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-line">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-danger/10 text-danger flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={18} />
            </span>
            <div>
              <h3 className="text-card font-semibold text-ink">Hapus Perangkat</h3>
              <p className="text-caption text-muted mt-0.5">
                Tindakan ini tidak dapat dibatalkan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:bg-surface hover:text-ink transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <div className="p-4 rounded-xl bg-danger/5 border border-danger/15">
            <p className="text-body text-ink leading-relaxed">
              Anda akan menghapus perangkat{" "}
              <strong className="font-semibold text-danger">{device.code}</strong>{" "}
              di lokasi <span className="font-medium">{device.location}</span>.
              Semua data sinkronisasi perangkat ini akan hilang permanen.
            </p>
          </div>

          {/* Aksi */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg border border-line text-body font-medium text-ink hover:bg-surface transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => onConfirm(device.id)}
              className="flex-1 h-10 rounded-lg bg-danger hover:bg-danger/90 text-white text-body font-semibold transition cursor-pointer"
            >
              Hapus Perangkat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama TV / Perangkat ─────────────────────────────────────────────
function Perangkat() {
  const [devices, setDevices] = useState(initialDevices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua status");
  const [page, setPage] = useState(1);

  // Modal state
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Statistik Derivatif
  const totalOnline = devices.filter((d) => d.status === "online").length;
  const totalOffline = devices.filter((d) => d.status === "offline").length;
  const totalMaintenance = devices.filter((d) => d.status === "maintenance").length;

  // Filter & Pencarian
  const keyword = search.toLowerCase();
  const filtered = devices.filter((d) => {
    const matchSearch =
      d.code.toLowerCase().includes(keyword) ||
      d.location.toLowerCase().includes(keyword) ||
      d.ip.includes(keyword);
    const matchStatus =
      statusFilter === "Semua status" ||
      (statusFilter === "Online" && d.status === "online") ||
      (statusFilter === "Offline" && d.status === "offline") ||
      (statusFilter === "Pemeliharaan" && d.status === "maintenance");
    return matchSearch && matchStatus;
  });

  // Paginasi
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handler Edit: Simpan nama baru
  const handleSaveEdit = (id, newCode) => {
    // TODO: panggil API update di sini
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, code: newCode } : d))
    );
    setEditTarget(null);
  };

  // Handler Hapus: Konfirmasi lalu hapus
  const handleConfirmDelete = (id) => {
    // TODO: panggil API hapus di sini
    setDevices((prev) => prev.filter((d) => d.id !== id));
    setDeleteTarget(null);
    // Kembali ke halaman 1 jika halaman aktif kosong
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* ── Statistik Atas ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total perangkat"
          value={devices.length}
          icon={Monitor}
        />
        <StatCard
          label="Online"
          value={totalOnline}
          noteClass="text-success font-medium"
          icon={Wifi}
          iconClass="bg-success/10 text-success"
        />
        <StatCard
          label="Offline"
          value={totalOffline + totalMaintenance}
          noteClass="text-danger font-medium"
          icon={WifiOff}
          iconClass="bg-danger/10 text-danger"
        />
      </div>

      {/* ── Toolbar: Pencarian + Filter Status + Tambah ─── */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari nama, lokasi, atau alamat IP..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-line rounded-lg text-body text-ink placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Dropdown Filter Status */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 px-3 pr-8 bg-white border border-line rounded-lg text-body text-ink focus:outline-none focus:border-primary cursor-pointer"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold transition cursor-pointer"
        >
          <Plus size={16} />
          Tambah Perangkat
        </button>
      </div>

      {/* ── Tabel Perangkat ─── */}
      <div className="bg-white border border-line rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-line">
              <tr className="text-[11px] uppercase tracking-wider text-muted font-semibold">
                <th className="px-6 py-3 font-semibold">Perangkat</th>
                <th className="px-5 py-3 font-semibold">Playlist Aktif</th>
                <th className="px-5 py-3 font-semibold">Alamat IP</th>
                <th className="px-5 py-3 font-semibold">Terakhir Aktif</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((device) => (
                <tr
                  key={device.id}
                  className="border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors"
                >
                  {/* Perangkat */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-tint text-primary flex items-center justify-center shrink-0">
                        <Monitor size={18} />
                      </span>
                      <div>
                        <p className="text-body font-semibold text-ink leading-tight">
                          {device.code}
                        </p>
                        <p className="text-caption text-muted mt-0.5">
                          {device.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Playlist Aktif */}
                  <td className="px-5 py-4 text-body text-ink/80">
                    {device.playlist}
                  </td>

                  {/* Alamat IP */}
                  <td className="px-5 py-4">
                    <code className="text-body font-mono text-ink/70">
                      {device.ip}
                    </code>
                  </td>

                  {/* Terakhir Aktif */}
                  <td className="px-5 py-4 text-body text-muted">
                    {device.lastActive}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={device.status} />
                  </td>

                  {/* Aksi: Edit & Hapus */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      {/* Tombol Edit */}
                      <button
                        type="button"
                        onClick={() => setEditTarget(device)}
                        aria-label={`Edit ${device.code}`}
                        title="Edit nama perangkat"
                        className="p-2 rounded-md text-muted hover:bg-surface hover:text-primary transition cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Tombol Hapus */}
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(device)}
                        aria-label={`Hapus ${device.code}`}
                        title="Hapus perangkat"
                        className="p-2 rounded-md text-danger hover:bg-danger/10 transition cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <Monitor size={32} className="mx-auto text-muted/40 mb-3" />
                    <p className="text-body text-muted font-medium">
                      Perangkat tidak ditemukan.
                    </p>
                    <p className="text-caption text-muted mt-1">
                      Coba ubah kata pencarian atau filter status.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer: Info Data + Paginasi ─── */}
        <div className="px-6 py-4 border-t border-line flex items-center justify-between">
          <p className="text-caption text-muted">
            Menampilkan {paginated.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–
            {Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              aria-label="Halaman sebelumnya"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-line text-muted hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={
                  "w-8 h-8 rounded-md text-body font-medium transition " +
                  (page === n
                    ? "bg-primary text-white"
                    : "border border-line text-muted hover:bg-surface")
                }
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              aria-label="Halaman berikutnya"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-line text-muted hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal Edit ─── */}
      {editTarget && (
        <ModalEdit
          device={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* ── Modal Hapus ─── */}
      {deleteTarget && (
        <ModalHapus
          device={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Perangkat;
