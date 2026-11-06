import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Film, ListVideo, Monitor, ArrowRight } from "lucide-react";
import StatCard from "../components/StatCard";
import TvStatusBadge from "../components/TvStatusBadge";
import HasilBadge from "../components/HasilBadge";
import { getKonten } from "../services/kontenService";
import { getPlaylist } from "../services/playlistService";
import { getTv } from "../services/tvService";
import { getPlayback } from "../services/playbackService";
import { getRiwayat } from "../services/riwayatService";
import { formatWaktu } from "../utils/format";

function Dashboard() {
  const [konten, setKonten] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [tv, setTv] = useState([]);
  const [aktif, setAktif] = useState(null);
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    Promise.all([
      getKonten(),
      getPlaylist(),
      getTv(),
      getPlayback(),
      getRiwayat(),
    ]).then(([k, p, t, a, r]) => {
      setKonten(k);
      setPlaylist(p);
      setTv(t);
      setAktif(a);
      setRiwayat(r);
    });
  }, []);

  const tvOnline = tv.filter((t) => t.online).length;
  const sedangTayang = playlist.some((p) => p.tayang);
  const siaranTerbaru = riwayat.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Kartu statistik */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard label="Total konten" value={konten.length} icon={Film} />
        <StatCard
          label="Total playlist"
          value={playlist.length}
          note={sedangTayang ? "1 sedang tayang" : "Belum ada yang tayang"}
          noteClass={sedangTayang ? "text-success font-medium" : "text-muted"}
          icon={ListVideo}
        />
        <StatCard
          label="Total perangkat"
          value={tv.length}
          note={`${tvOnline} terhubung`}
          noteClass="text-success font-medium"
          icon={Monitor}
          iconClass="bg-success/10 text-success"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Kiri: siaran terbaru */}
        <section className="flex h-[540px] flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card lg:col-span-7">
          <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
            <div>
              <h2 className="text-card font-semibold text-ink">Siaran terbaru</h2>
              <p className="mt-0.5 text-caption text-muted">
                Riwayat playlist yang diputar ke TV
              </p>
            </div>
            <Link
              to="/history"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-3.5 text-caption font-medium text-ink transition hover:bg-surface"
            >
              <span>Lihat semua</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 border-b border-line bg-surface">
                <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <th className="px-6 py-3 font-semibold">Playlist</th>
                  <th className="px-6 py-3 font-semibold">Mulai</th>
                  <th className="px-6 py-3 text-right font-semibold">Hasil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {siaranTerbaru.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-surface/50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
                          <ListVideo size={16} />
                        </span>
                        <div>
                          <p className="text-body font-semibold leading-tight text-ink">
                            {r.playlistNama}
                          </p>
                          <p className="mt-0.5 text-caption text-muted">
                            {r.konten.length} konten · {r.tv.length} TV
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-body text-muted">
                      {formatWaktu(r.mulai)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-right">
                      <HasilBadge hasil={r.hasil} />
                    </td>
                  </tr>
                ))}

                {siaranTerbaru.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-14 text-center">
                      <p className="text-body font-medium text-muted">
                        Belum ada siaran.
                      </p>
                      <Link
                        to="/playback"
                        className="mt-1 inline-block text-caption font-semibold text-primary hover:underline"
                      >
                        Mulai siaran dari menu Playback
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Kanan: TV / perangkat */}
        <section className="flex h-[540px] flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card lg:col-span-5">
          <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
            <div>
              <h2 className="text-card font-semibold text-ink">TV / perangkat</h2>
              <p className="mt-0.5 text-caption text-muted">
                {tvOnline} dari {tv.length} terhubung
              </p>
            </div>
            <Link
              to="/perangkat"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-3.5 text-caption font-medium text-ink transition hover:bg-surface"
            >
              <span>Kelola</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 border-b border-line bg-surface">
                <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <th className="px-6 py-2.5 font-semibold">Perangkat</th>
                  <th className="px-6 py-2.5 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {tv.map((t) => (
                  <tr key={t.id} className="transition-colors hover:bg-surface/50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
                          <Monitor size={16} />
                        </span>
                        <div>
                          <p className="text-body font-semibold leading-tight text-ink">
                            {t.nama}
                          </p>
                          <p className="mt-0.5 font-mono text-caption text-muted">
                            {t.ip}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-right">
                      {aktif && aktif.tvIds.includes(t.id) && (
                        <span className="mr-2 text-caption text-success">Tayang</span>
                      )}
                      <TvStatusBadge online={t.online} />
                    </td>
                  </tr>
                ))}

                {tv.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-6 py-14 text-center text-body text-muted">
                      Belum ada perangkat terdaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;