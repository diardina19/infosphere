import { Link } from "react-router-dom";
import {
  Film,
  ListVideo,
  Monitor,
  ArrowRight,
} from "lucide-react";
import StatCard from "../components/StatCard";

// Data ringkasan statistik
const stats = {
  totalKonten: 248,
  playlistAktif: 18,
  playlistTayang: 6,
  totalPerangkat: 32,
  perangkatTerhubung: 28,
  perangkatOffline: 3,
};

// Data daftar playlist terbaru (banyak item agar scrollable)
const recentPlaylists = [
  {
    id: 1,
    title: "Promo Q4 Nasional",
    count: "12 konten",
    schedule: "Setiap hari - 06.00–10.00",
    status: "Tayang",
  },
  {
    id: 2,
    title: "Informasi Layanan Publik",
    count: "8 konten",
    schedule: "Sen–Jum - 10.00–16.00",
    status: "Tayang",
  },
  {
    id: 3,
    title: "Kampanye Produk Oktober",
    count: "16 konten",
    schedule: "01–31 Okt 2026",
    status: "Terjadwal",
  },
  {
    id: 4,
    title: "Materi Internal Cabang",
    count: "6 konten",
    schedule: "Belum dijadwalkan",
    status: "Draft",
  },
  {
    id: 5,
    title: "Program Akhir Pekan",
    count: "10 konten",
    schedule: "Sab–Min - 08.00–20.00",
    status: "Terjadwal",
  },
  {
    id: 6,
    title: "Profil & Sejarah Kampus",
    count: "5 konten",
    schedule: "Setiap hari - 12.00–14.00",
    status: "Tayang",
  },
  {
    id: 7,
    title: "Pengumuman Akademik Polibatam",
    count: "14 konten",
    schedule: "Sen–Jum - 08.00–17.00",
    status: "Terjadwal",
  },
  {
    id: 8,
    title: "Promo Q4 Nasional",
    count: "12 konten",
    schedule: "Setiap hari - 06.00–10.00",
    status: "Tayang",
  },
  {
    id: 9,
    title: "Informasi Layanan Publik",
    count: "8 konten",
    schedule: "Sen–Jum - 10.00–16.00",
    status: "Tayang",
  },
  {
    id: 10,
    title: "Kampanye Produk Oktober",
    count: "16 konten",
    schedule: "01–31 Okt 2026",
    status: "Terjadwal",
  },
  {
    id: 11,
    title: "Materi Internal Cabang",
    count: "6 konten",
    schedule: "Belum dijadwalkan",
    status: "Draft",
  },
  {
    id: 12,
    title: "Program Akhir Pekan",
    count: "10 konten",
    schedule: "Sab–Min - 08.00–20.00",
    status: "Terjadwal",
  },
];

// Data aktivitas perangkat aktif (banyak item agar scrollable)
const activeDevices = [
  {
    id: 1,
    code: "TV-LBY-LOBBY-01",
    location: "Surabaya - Lobby",
    playlist: "Promo Q4 Nasional",
    time: "1 mnt lalu",
    status: "online",
  },
  {
    id: 2,
    code: "TV-JKT-LANTAI-03",
    location: "Jakarta - Lantai 3",
    playlist: "Informasi Layanan Publik",
    time: "2 mnt lalu",
    status: "online",
  },
  {
    id: 3,
    code: "TV-BDG-KASIR-02",
    location: "Bandung - Area Kasir",
    playlist: "Promo Q4 Nasional",
    time: "4 mnt lalu",
    status: "online",
  },
  {
    id: 4,
    code: "TV-SMG-TUNGGU-01",
    location: "Semarang - Ruang Tunggu",
    playlist: "Program Akhir Pekan",
    time: "18 mnt lalu",
    status: "offline",
  },
  {
    id: 5,
    code: "TV-MDN-LOBBY-02",
    location: "Medan - Lobby",
    playlist: "Kampanye Produk Oktober",
    time: "5 mnt lalu",
    status: "online",
  },
  {
    id: 6,
    code: "TV-PLB-AUDITORIUM-01",
    location: "Palembang - Auditorium",
    playlist: "Informasi Layanan Publik",
    time: "3 mnt lalu",
    status: "online",
  },
  {
    id: 7,
    code: "TV-YOG-KANTIN-01",
    location: "Yogyakarta - Area Kantin",
    playlist: "Promo Q4 Nasional",
    time: "45 mnt lalu",
    status: "offline",
  },
  {
    id: 8,
    code: "TV-DPS-ENTRANCE-01",
    location: "Denpasar - Pintu Utama",
    playlist: "Kampanye Produk Oktober",
    time: "1 mnt lalu",
    status: "online",
  },
];

function PlaylistBadge({ status }) {
  if (status === "Tayang") {
    return (
      <span className="inline-flex items-center text-caption font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
        Tayang
      </span>
    );
  }
  if (status === "Terjadwal") {
    return (
      <span className="inline-flex items-center text-caption font-medium px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200/60">
        Terjadwal
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-caption font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
      Draft
    </span>
  );
}

function DeviceBadge({ status }) {
  const isOnline = status === "online";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-0.5 rounded-full ${
        isOnline
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
          : "bg-rose-50 text-rose-600 border border-rose-200/60"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOnline ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />
      {isOnline ? "Online" : "Offline"}
    </span>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 1. Baris Kartu Statistik Atas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total konten"
          value={stats.totalKonten}
          icon={Film}
        />
        <StatCard
          label="Playlist aktif"
          value={stats.playlistAktif}
          note={`${stats.playlistTayang} sedang tayang`}
          noteClass="text-primary font-medium"
          icon={ListVideo}
        />
        <StatCard
          label="Total perangkat"
          value={stats.totalPerangkat}
          note={`${stats.perangkatTerhubung} terhubung`}
          noteClass="text-success font-medium"
          icon={Monitor}
          iconClass="bg-success/10 text-success"
        />
      </div>

      {/* 2. Grid Konten Utama: 2 Card Besar Sejajar, Simetris & Modern */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri: Playlist Terbaru (Tinggi 540px dengan scroll vertikal) */}
        <section className="lg:col-span-7 bg-white border border-line rounded-xl shadow-card overflow-hidden flex flex-col h-[540px]">
          {/* Header Card */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-line shrink-0 bg-white">
            <div>
              <h2 className="text-card font-semibold text-ink">Playlist terbaru</h2>
              <p className="mt-0.5 text-caption text-muted">
                Pembaruan jadwal siaran
              </p>
            </div>
            <Link
              to="/playlist"
              className="h-8 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-line text-caption font-medium text-ink hover:bg-surface transition"
            >
              <span>Lihat semua</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Tabel / Daftar Playlist dengan Fitur Scroll Vertikal */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur-sm border-b border-line shadow-xs">
                <tr>
                  <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    PLAYLIST
                  </th>
                  <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    JADWAL
                  </th>
                  <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted text-right">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentPlaylists.map((pl, idx) => (
                  <tr
                    key={`${pl.id}-${idx}`}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-tint text-primary flex items-center justify-center shrink-0">
                          <ListVideo size={16} />
                        </span>
                        <div>
                          <p className="text-body font-semibold text-ink leading-tight">
                            {pl.title}
                          </p>
                          <p className="text-caption text-muted mt-0.5">
                            {pl.count}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-body text-ink/80 whitespace-nowrap">
                      {pl.schedule}
                    </td>
                    <td className="px-6 py-3 text-right whitespace-nowrap">
                      <PlaylistBadge status={pl.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Kolom Kanan: Card Terpadu TV & Status Perangkat (Tinggi 540px, Simetris Sempurna dengan Kiri) */}
        <section className="lg:col-span-5 bg-white border border-line rounded-xl shadow-card overflow-hidden flex flex-col h-[540px]">
          {/* Header Card */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-line shrink-0 bg-white">
            <div>
              <h2 className="text-card font-semibold text-ink">
                TV / perangkat
              </h2>
              <p className="mt-0.5 text-caption text-muted">
                Monitoring siaran & konektivitas layar
              </p>
            </div>
            <Link
              to="/perangkat"
              className="h-8 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-line text-caption font-medium text-ink hover:bg-surface transition"
            >
              <span>Kelola</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Quick Status Bar: Ringkasan Real-time Status Horizontal yang Rapi */}
          <div className="px-6 py-3 bg-surface/70 border-b border-line shrink-0 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Terhubung
              </span>

              {/* Rincian Angka Online & Offline */}
              <div className="flex items-center gap-3 text-caption font-medium">
                <span className="inline-flex items-center gap-1.5 text-ink">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Online:</span>
                  <strong className="text-ink">28</strong>
                  <span className="text-muted text-[11px]">(87,5%)</span>
                </span>
                <span className="text-line">|</span>
                <span className="inline-flex items-center gap-1.5 text-ink">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Offline:</span>
                  <strong className="text-ink">3</strong>
                  <span className="text-muted text-[11px]">(9,4%)</span>
                </span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-line/70 gap-0.5">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: "87.5%" }}
                title="Online: 28 (87,5%)"
              />
              <div
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: "9.4%" }}
                title="Offline: 3 (9,4%)"
              />
            </div>
          </div>

          {/* List Perangkat dengan Fitur Scroll Vertikal yang Lega */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-white border-b border-line shadow-xs">
                <tr>
                  <th className="px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    PERANGKAT
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    PLAYLIST
                  </th>
                  <th className="px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted text-right">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {activeDevices.map((dev) => (
                  <tr
                    key={dev.id}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-tint text-primary flex items-center justify-center shrink-0">
                          <Monitor size={16} />
                        </span>
                        <div>
                          <p className="text-body font-semibold text-ink leading-tight">
                            {dev.code}
                          </p>
                          <p className="text-caption text-muted mt-0.5">
                            {dev.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-body font-medium text-ink leading-tight">
                        {dev.playlist}
                      </p>
                      <p className="text-caption text-muted mt-0.5">
                        {dev.time}
                      </p>
                    </td>
                    <td className="px-6 py-3 text-right whitespace-nowrap">
                      <DeviceBadge status={dev.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
