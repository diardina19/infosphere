import { useEffect, useState } from "react";
import {
  Film,
  CheckCircle2,
  HardDrive,
  Search,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import StatCard from "../components/StatCard";
import TambahKontenModal from "../components/konten/TambahKontenModal";
import HapusKontenModal from "../components/konten/HapusKontenModal";

import {
  getPlaylist,
  getPemakaiKonten,
} from "../services/playlistService";

import {
  getKonten,
  hapusKonten,
} from "../services/kontenService";

// Data contoh untuk tampilan statistik.
const stats = {
  total: 248,
  aktif: 231,
  usedGB: 340,
  totalGB: 500,
};

const initialContents = [
  {
    id: 1,
    title: "Selamat Datang di Nusantara",
    category: "Informasi Publik",
    duration: "02:45",
    size: "184 MB",
    date: "30 Sep 2026",
  },
  {
    id: 2,
    title: "Promo Produk Q4",
    category: "Promosi",
    duration: "00:30",
    size: "42 MB",
    date: "29 Sep 2026",
  },
  {
    id: 3,
    title: "Panduan Layanan Digital",
    category: "Tutorial",
    duration: "04:12",
    size: "256 MB",
    date: "28 Sep 2026",
  },
  {
    id: 4,
    title: "Kampanye Produk Oktober",
    category: "Promosi",
    duration: "01:15",
    size: "98 MB",
    date: "27 Sep 2026",
  },
  {
    id: 5,
    title: "Keselamatan di Area Publik",
    category: "Edukasi",
    duration: "03:08",
    size: "210 MB",
    date: "25 Sep 2026",
  },
  {
    id: 6,
    title: "Program Akhir Pekan",
    category: "Hiburan",
    duration: "00:45",
    size: "61 MB",
    date: "24 Sep 2026",
  },
  {
    id: 7,
    title: "Materi Internal Cabang",
    category: "Internal",
    duration: "05:20",
    size: "318 MB",
    date: "22 Sep 2026",
  },
];

function Konten() {
  const [daftar, setDaftar] = useState(initialContents);
  const [daftarPlaylist, setDaftarPlaylist] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(stats.total);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Ambil data konten dan playlist saat halaman dibuka.
  useEffect(() => {
    async function muatData() {
      try {
        const [dataKonten, dataPlaylist] = await Promise.all([
          getKonten(),
          getPlaylist(),
        ]);

        setDaftar(dataKonten);
        setDaftarPlaylist(dataPlaylist);
        setTotal(dataKonten.length);
      } catch (error) {
        console.error("Gagal memuat data konten atau playlist:", error);
      }
    }

    muatData();
  }, []);

  const storagePercent = Math.round(
    (stats.usedGB / stats.totalGB) * 100
  );

  const keyword = search.toLowerCase();

  const filtered = daftar.filter(
    (item) =>
      (item.title ?? item.judul ?? "")
        .toLowerCase()
        .includes(keyword) ||
      (item.category ?? item.kategori ?? "")
        .toLowerCase()
        .includes(keyword)
  );

  // Tambah konten dari modal.
  const handleTambah = async (data) => {
    try {
      // TODO:
      // Kirim data.file, data.judul, data.kategori,
      // data.deskripsi, dan data.playlistIds ke backend.
      //
      // Setelah API penyimpanan tersedia, panggil service
      // untuk menyimpan konten dan relasi playlist.
      // Lalu muat ulang daftar konten dari API.

      const today = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const newItem = {
        id: Date.now(),
        title: data.judul,
        category: data.kategori,
        duration: data.duration,
        size: data.size,
        date: today,
      };

      // Sementara menggunakan state lokal.
      setDaftar((lama) => [newItem, ...lama]);
      setTotal((lama) => lama + 1);
      setShowAdd(false);
    } catch (error) {
      console.error("Gagal menambahkan konten:", error);
      window.alert("Konten gagal ditambahkan.");
    }
  };

  // Hapus konten dengan memeriksa playlist yang menggunakannya.
  async function handleHapus(id) {
    try {
      const pemakai = await getPemakaiKonten(id);

      const tayang = pemakai.find((p) => p.tayang);

      // Konten tidak boleh dihapus jika playlist sedang tayang.
      if (tayang) {
        window.alert(
          `Konten ini ada di playlist "${tayang.nama}" yang sedang tayang, jadi belum bisa dihapus.`
        );

        return false;
      }

      const pesan =
        pemakai.length > 0
          ? `Konten ini dipakai di ${pemakai.length} playlist dan akan ikut keluar dari playlist tersebut. Lanjutkan?`
          : "Hapus konten ini?";

      if (!window.confirm(pesan)) {
        return false;
      }

      await hapusKonten(id);

      setDaftar((lama) =>
        lama.filter((item) => item.id !== id)
      );

      setTotal((lama) => Math.max(0, lama - 1));

      return true;
    } catch (error) {
      console.error("Gagal menghapus konten:", error);
      window.alert(
        "Konten gagal dihapus. Silakan coba lagi."
      );

      return false;
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const berhasil = await handleHapus(deleteTarget.id);

    if (berhasil) {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kartu ringkasan */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Total konten"
          value={total}
          icon={Film}
        />

        <StatCard
          label="Aktif"
          value={stats.aktif}
          icon={CheckCircle2}
        />

        <StatCard
          label="Penyimpanan"
          value={`${storagePercent}%`}
          note={`${stats.usedGB} dari ${stats.totalGB} GB`}
          icon={HardDrive}
        >
          <div className="mt-3 h-1.5 rounded-full bg-line">
            <div
              className="h-1.5 rounded-full bg-primary"
              style={{ width: `${storagePercent}%` }}
            />
          </div>
        </StatCard>
      </div>

      {/* Pencarian dan tombol tambah */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari judul atau kategori..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-line rounded-lg text-body text-ink placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold"
        >
          <Plus size={16} />
          Tambah Konten
        </button>
      </div>

      {/* Tabel konten */}
      <div className="bg-white border border-line rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-line">
              <tr className="text-caption uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-normal">
                  Konten
                </th>

                <th className="px-5 py-3 font-normal">
                  Durasi
                </th>

                <th className="px-5 py-3 font-normal">
                  Ukuran
                </th>

                <th className="px-5 py-3 font-normal">
                  Tanggal upload
                </th>

                <th className="px-5 py-3 font-normal text-right">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-line last:border-b-0 hover:bg-surface/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-14 h-10 rounded-md bg-tint text-primary flex items-center justify-center shrink-0">
                        <Film size={18} />
                      </span>

                      <div>
                        <p className="text-body font-medium text-ink">
                          {item.title ?? item.judul}
                        </p>

                        <p className="text-caption text-muted">
                          {item.category ?? item.kategori}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-body text-muted">
                    {item.duration ?? item.durasi ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-body text-muted">
                    {item.size ?? item.ukuran ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-body text-muted">
                    {item.date ?? item.tanggal_upload ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Hapus ${item.title ?? item.judul}`}
                      className="p-2 rounded-md text-danger hover:bg-danger/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-body text-muted"
                  >
                    Konten tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer tabel */}
        <div className="px-5 py-4 border-t border-line flex items-center justify-between">
          <p className="text-caption text-muted">
            Menampilkan {filtered.length} dari {total} data
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              aria-label="Halaman sebelumnya"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-line text-muted hover:bg-surface"
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={
                  "w-8 h-8 rounded-md text-body font-medium " +
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
              onClick={() => setPage(Math.min(3, page + 1))}
              aria-label="Halaman berikutnya"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-line text-muted hover:bg-surface"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal tambah konten */}
      {showAdd && (
        <TambahKontenModal
          daftarPlaylist={daftarPlaylist}
          onClose={() => setShowAdd(false)}
          onSubmit={handleTambah}
        />
      )}

      {/* Modal hapus konten */}
      {deleteTarget && (
        <HapusKontenModal
          item={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Konten;