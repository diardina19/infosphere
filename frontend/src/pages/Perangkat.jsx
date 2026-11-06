import { useEffect, useState } from 'react'
import {
  Monitor, Wifi, WifiOff, Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import TvStatusBadge from '../components/TvStatusBadge'
import TvFormModal from '../components/TvFormModal'
import ConfirmModal from '../components/ConfirmModal'
import { getTv, tambahTv, ubahNamaTv, hapusTv } from '../services/tvService'
import { getPlayback } from '../services/playbackService'
import { formatIdTv } from '../utils/format'

const PER_HALAMAN = 8

export default function Perangkat() {
  const [daftar, setDaftar] = useState([])
  const [aktif, setAktif] = useState(null) // siaran yang sedang berjalan
  const [cari, setCari] = useState('')
  const [filter, setFilter] = useState('semua')
  const [halaman, setHalaman] = useState(1)
  const [formBuka, setFormBuka] = useState(false)
  const [dipilih, setDipilih] = useState(null) // null = tambah baru, isi = ubah nama
  const [hapusTarget, setHapusTarget] = useState(null)

  async function muat() {
    const [t, a] = await Promise.all([getTv(), getPlayback()])
    setDaftar(t)
    setAktif(a)
  }

  useEffect(() => {
    muat()
  }, [])

  const jumlahOnline = daftar.filter((t) => t.online).length
  const jumlahOffline = daftar.length - jumlahOnline

  const kata = cari.toLowerCase()
  const hasil = daftar.filter((t) => {
    const cocokKata = `${formatIdTv(t.id)} ${t.nama} ${t.ip}`.toLowerCase().includes(kata)
    const cocokStatus =
      filter === 'semua' ||
      (filter === 'online' && t.online) ||
      (filter === 'offline' && !t.online)
    return cocokKata && cocokStatus
  })

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / PER_HALAMAN))
  const halamanAktif = Math.min(halaman, totalHalaman)
  const awal = (halamanAktif - 1) * PER_HALAMAN
  const tampil = hasil.slice(awal, awal + PER_HALAMAN)

  function sedangTayang(id) {
    return Boolean(aktif && aktif.tvIds.includes(id))
  }

  function bukaTambah() {
    setDipilih(null)
    setFormBuka(true)
  }

  function bukaUbah(tv) {
    setDipilih(tv)
    setFormBuka(true)
  }

  // kalau service melempar error (nama/IP kembar), modal yang menampilkannya
  async function handleSimpan({ nama, ip }) {
    if (dipilih) {
      await ubahNamaTv(dipilih.id, nama)
    } else {
      await tambahTv({ nama, ip })
    }
    setFormBuka(false)
    await muat()
  }

  async function handleHapus() {
    await hapusTv(hapusTarget.id)
    setHapusTarget(null)
    await muat()
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard label="Total perangkat" value={daftar.length} icon={Monitor} />
        <StatCard label="Online" value={jumlahOnline} icon={Wifi} iconClass="bg-success/10 text-success" />
        <StatCard label="Offline" value={jumlahOffline} icon={WifiOff} iconClass="bg-danger/10 text-danger" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={cari}
            onChange={(e) => {
              setCari(e.target.value)
              setHalaman(1)
            }}
            placeholder="Cari ID, nama, atau alamat IP..."
            className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-body text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setHalaman(1)
          }}
          className="h-10 cursor-pointer rounded-lg border border-line bg-white px-3 pr-8 text-body text-ink focus:border-primary focus:outline-none"
        >
          <option value="semua">Semua status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
        <button
          onClick={bukaTambah}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-body font-semibold text-white hover:bg-dark"
        >
          <Plus size={16} /> Tambah Perangkat
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-line bg-surface">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th className="px-6 py-3 font-semibold">ID TV</th>
                <th className="px-5 py-3 font-semibold">Nama</th>
                <th className="px-5 py-3 font-semibold">Alamat IP</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tampil.map((t) => (
                <tr key={t.id} className="border-b border-line last:border-b-0 hover:bg-surface/60">
                  <td className="px-6 py-4 font-mono text-body text-muted">{formatIdTv(t.id)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
                        <Monitor size={18} />
                      </span>
                      <span className="text-body font-semibold text-ink">{t.nama}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-body text-ink/70">{t.ip}</td>
                  <td className="px-5 py-4">
                    <TvStatusBadge online={t.online} />
                    {sedangTayang(t.id) && (
                      <span className="ml-2 text-caption text-success">Tayang</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => bukaUbah(t)}
                        aria-label={`Ubah nama ${t.nama}`}
                        title="Ubah nama"
                        className="cursor-pointer rounded-md p-2 text-muted hover:bg-surface hover:text-primary"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setHapusTarget(t)}
                        disabled={sedangTayang(t.id)}
                        aria-label={`Hapus ${t.nama}`}
                        title={sedangTayang(t.id) ? 'Sedang tayang, hentikan dulu dari menu Playback' : 'Hapus'}
                        className="cursor-pointer rounded-md p-2 text-danger hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {tampil.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-14 text-center">
                    <Monitor size={32} className="mx-auto mb-3 text-muted/40" />
                    <p className="text-body font-medium text-muted">Perangkat tidak ditemukan.</p>
                    <p className="mt-1 text-caption text-muted">Coba ubah kata pencarian atau filter status.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-line px-6 py-4">
          <p className="text-caption text-muted">
            Menampilkan {hasil.length === 0 ? 0 : awal + 1}–{awal + tampil.length} dari {hasil.length} data
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHalaman(halamanAktif - 1)}
              disabled={halamanAktif === 1}
              aria-label="Halaman sebelumnya"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setHalaman(n)}
                className={
                  'h-8 w-8 rounded-md text-body font-medium ' +
                  (n === halamanAktif
                    ? 'bg-primary text-white'
                    : 'border border-line text-muted hover:bg-surface')
                }
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setHalaman(halamanAktif + 1)}
              disabled={halamanAktif === totalHalaman}
              aria-label="Halaman berikutnya"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {formBuka && (
        <TvFormModal tv={dipilih} onClose={() => setFormBuka(false)} onSubmit={handleSimpan} />
      )}

      {hapusTarget && (
        <ConfirmModal judul="Hapus perangkat" onClose={() => setHapusTarget(null)} onConfirm={handleHapus}>
          <p>
            Perangkat <strong className="font-semibold text-ink">{hapusTarget.nama}</strong> (
            {formatIdTv(hapusTarget.id)}) akan dihapus dan tidak bisa terhubung lagi sampai
            didaftarkan ulang.
          </p>
        </ConfirmModal>
      )}
    </div>
  )
}