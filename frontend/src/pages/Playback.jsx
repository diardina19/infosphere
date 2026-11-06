import { useEffect, useState } from 'react'
import { Play, Square, Film } from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal'
import { getTv } from '../services/tvService'
import { getPlaylist } from '../services/playlistService'
import { getKonten } from '../services/kontenService'
import { getPlayback, mulaiPlayback, hentikanPlayback } from '../services/playbackService'
import { detikDariDurasi, formatDurasi } from '../utils/format'

export default function Playback() {
  const [tvs, setTvs] = useState([])
  const [daftarPlaylist, setDaftarPlaylist] = useState([])
  const [daftarKonten, setDaftarKonten] = useState([])
  const [aktif, setAktif] = useState(null)
  const [playlistId, setPlaylistId] = useState('')
  const [tvIds, setTvIds] = useState([])
  const [sekarang, setSekarang] = useState(Date.now())
  const [konfirmasiGanti, setKonfirmasiGanti] = useState(false)

  useEffect(() => {
    async function muat() {
      const [t, p, k, a] = await Promise.all([getTv(), getPlaylist(), getKonten(), getPlayback()])
      setTvs(t)
      setDaftarPlaylist(p)
      setDaftarKonten(k)
      setAktif(a)
      if (a) {
        setPlaylistId(String(a.playlistId))
        setTvIds(a.tvIds)
      }
    }
    muat()
  }, [])

  // detak tiap 1 detik supaya progres ikut bergerak
  useEffect(() => {
    const timer = setInterval(() => setSekarang(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const kontenById = Object.fromEntries(daftarKonten.map((k) => [k.id, k]))
  const tvOnline = tvs.filter((t) => t.online)

  const playlistAktif = aktif ? daftarPlaylist.find((p) => p.id === aktif.playlistId) : null
  const playlistTerpilih = daftarPlaylist.find((p) => p.id === Number(playlistId))
  const playlistAntrean = playlistAktif || playlistTerpilih
  const antrean = playlistAntrean
    ? playlistAntrean.itemIds.map((id) => kontenById[id]).filter(Boolean)
    : []

  // hitung konten mana yang sedang diputar dari waktu mulai
  const durasiItem = antrean.map((k) => detikDariDurasi(k.durasi))
  const totalDurasi = durasiItem.reduce((jumlah, d) => jumlah + d, 0)
  let indeks = 0
  let posisi = 0
  if (aktif && totalDurasi > 0) {
    let sisa = Math.floor((sekarang - aktif.mulai) / 1000) % totalDurasi
    while (sisa >= durasiItem[indeks]) {
      sisa -= durasiItem[indeks]
      indeks++
    }
    posisi = sisa
  }
  const kini = antrean[indeks]
  const durasiKini = durasiItem[indeks] || 0
  const persen = durasiKini > 0 ? (posisi / durasiKini) * 100 : 0

  function toggleTv(id) {
    setTvIds((lama) => (lama.includes(id) ? lama.filter((x) => x !== id) : [...lama, id]))
  }

  async function jalankan() {
    const baru = await mulaiPlayback(Number(playlistId), tvIds)
    setAktif(baru)
    setKonfirmasiGanti(false)
  }

  function handlePutar() {
    if (aktif) setKonfirmasiGanti(true)
    else jalankan()
  }

  async function handleHentikan() {
    await hentikanPlayback()
    setAktif(null)
  }

  function labelAntrean(i) {
    if (!aktif) return `Urutan ${i + 1}`
    if (i === indeks) return 'Sedang diputar'
    if (i === (indeks + 1) % antrean.length) return 'Berikutnya'
    return `Urutan ${i + 1}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-white p-5 shadow-card">
        <div className="min-w-[200px] flex-1">
          <p className="text-card font-semibold text-ink">Pilih tujuan siaran</p>
          <p className="mt-0.5 text-caption text-muted">
            Pilih playlist dan perangkat, lalu putar secara serentak.
          </p>
        </div>
        <select
          value={playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
          className="h-10 w-64 cursor-pointer rounded-lg border border-line bg-white px-3 text-body text-ink focus:border-primary focus:outline-none"
        >
          <option value="">Pilih playlist</option>
          {daftarPlaylist.map((p) => (
            <option key={p.id} value={p.id} disabled={p.itemIds.length === 0}>
              {p.nama}
              {p.itemIds.length === 0 ? ' (kosong)' : ''}
              {aktif && aktif.playlistId === p.id ? ' (sedang tayang)' : ''}
            </option>
          ))}
        </select>
        <button
          onClick={handlePutar}
          disabled={!playlistId || tvIds.length === 0}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-body font-semibold text-white hover:bg-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Play size={16} /> Putar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div className="self-start overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="text-card font-semibold text-ink">Perangkat</p>
              <p className="text-caption text-muted">
                {tvIds.length} dipilih · {tvOnline.length} dari {tvs.length} online
              </p>
            </div>
            <button
              onClick={() => setTvIds(tvOnline.map((t) => t.id))}
              className="cursor-pointer text-caption font-semibold text-primary hover:underline"
            >
              Pilih semua online
            </button>
          </div>

          {tvs.map((t) => (
            <label
              key={t.id}
              className={`flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 ${
                t.online ? 'cursor-pointer hover:bg-surface' : 'opacity-60'
              } ${tvIds.includes(t.id) ? 'bg-tint' : ''}`}
            >
              <input
                type="checkbox"
                checked={tvIds.includes(t.id)}
                onChange={() => toggleTv(t.id)}
                disabled={!t.online}
              />
              <div className="flex-1">
                <p className="text-body font-medium text-ink">{t.nama}</p>
                <p className="font-mono text-caption text-muted">{t.ip}</p>
              </div>
              {aktif && aktif.tvIds.includes(t.id) && (
                <span className="text-caption text-success">Tayang</span>
              )}
              <span
                className={`h-2 w-2 rounded-full ${t.online ? 'bg-success' : 'bg-danger'}`}
                title={t.online ? 'Online' : 'Offline'}
              />
            </label>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-white p-5 shadow-card">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-card font-semibold text-ink">Sedang diputar</p>
                <p className="mt-0.5 text-caption text-muted">
                  {aktif && playlistAktif
                    ? `${playlistAktif.nama} · serentak di ${aktif.tvIds.length} TV`
                    : 'Belum ada siaran yang berjalan'}
                </p>
              </div>
              {aktif && (
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-caption font-medium text-success">
                    Live
                  </span>
                  <button
                    onClick={handleHentikan}
                    className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-line px-3 text-body font-semibold text-ink hover:bg-surface"
                  >
                    <Square size={14} /> Hentikan
                  </button>
                </div>
              )}
            </div>

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-dark">
  {aktif && kini && kini.url ? (
    <video
      key={kini.id}
      src={kini.url}
      autoPlay
      muted
      playsInline
      onLoadedMetadata={(e) => {
        e.currentTarget.currentTime = posisi
      }}
      className="h-full w-full object-contain"
    />
  ) : (
    <Film size={48} className="text-white/30" />
  )}
  {kini && aktif && (
    <p className="absolute bottom-3 left-4 text-body font-semibold text-white drop-shadow">
      {kini.judul}
    </p>
  )}
  {!aktif && (
    <p className="absolute bottom-3 left-4 text-body text-white/70">
      Pilih playlist dan perangkat, lalu klik Putar.
    </p>
  )}
</div>

            <div className="mt-3 flex items-center gap-3 text-caption text-muted">
              <span>{formatDurasi(aktif ? posisi : 0)}</span>
              <div className="h-1.5 flex-1 rounded-full bg-line">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${aktif ? persen : 0}%` }}
                />
              </div>
              <span>{formatDurasi(aktif ? durasiKini : 0)}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
            <div className="border-b border-line px-5 py-3">
              <p className="text-card font-semibold text-ink">Antrean playback</p>
            </div>
            {antrean.length === 0 && (
              <p className="px-5 py-8 text-center text-body text-muted">
                Pilih playlist untuk melihat antreannya.
              </p>
            )}
            {antrean.map((k, i) => {
              const sedangDiputar = aktif && i === indeks
              return (
                <div
                  key={k.id}
                  className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-b-0"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded text-caption font-semibold ${
                      sedangDiputar ? 'bg-primary text-white' : 'bg-surface text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-body font-medium text-ink">{k.judul}</p>
                    <p className={`text-caption ${sedangDiputar ? 'text-success' : 'text-muted'}`}>
                      {labelAntrean(i)}
                    </p>
                  </div>
                  <span className="text-body text-muted">{k.durasi}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {konfirmasiGanti && (
        <ConfirmModal
          judul="Ganti siaran?"
          labelKonfirmasi="Ganti siaran"
          onClose={() => setKonfirmasiGanti(false)}
          onConfirm={jalankan}
        >
          <p>Siaran yang sedang berjalan akan dihentikan dan diganti dengan playlist yang dipilih.</p>
        </ConfirmModal>
      )}
    </div>
  )
}