import { useEffect, useState } from 'react'
import { Search, Download, Eye, Radio, Clock, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import StatCard from '../components/StatCard'
import RiwayatDetailModal from '../components/RiwayatDetailModal'
import { getRiwayat, durasiSiaran } from '../services/riwayatService'
import { formatDurasi, formatWaktu } from '../utils/format'

const PER_HALAMAN = 8

const HASIL = {
  tayang: { label: 'Sedang tayang', kelas: 'bg-success/10 text-success' },
  dihentikan: { label: 'Dihentikan', kelas: 'bg-surface text-muted' },
  diganti: { label: 'Diganti', kelas: 'bg-tint text-primary' },
}

// ms -> "2026-10-21" (tanggal lokal)
function tanggalLokal(ms) {
  return new Date(ms).toLocaleDateString('en-CA')
}

function eksporCsv(baris) {
  const kepala = ['Mulai', 'Selesai', 'Playlist', 'Konten', 'TV', 'Durasi', 'Hasil']
  const isi = baris.map((r) => [
    formatWaktu(r.mulai),
    r.selesai ? formatWaktu(r.selesai) : '-',
    r.playlistNama,
    r.konten.map((k) => k.judul).join(' | '),
    r.tv.join(' | '),
    formatDurasi(durasiSiaran(r)),
    HASIL[r.hasil].label,
  ])
  const csv = [kepala, ...isi]
    .map((b) => b.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'riwayat-playback.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function History() {
  const [daftar, setDaftar] = useState([])
  const [cari, setCari] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [filterTv, setFilterTv] = useState('semua')
  const [filterHasil, setFilterHasil] = useState('semua')
  const [halaman, setHalaman] = useState(1)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    getRiwayat().then(setDaftar)
  }, [])

  const namaTv = [...new Set(daftar.flatMap((r) => r.tv))].sort()

  const hariIni = tanggalLokal(Date.now())
  const siaranHariIni = daftar.filter((r) => tanggalLokal(r.mulai) === hariIni)
  const durasiHariIni = siaranHariIni.reduce((jumlah, r) => jumlah + durasiSiaran(r), 0)
  const sedangTayang = daftar.some((r) => r.hasil === 'tayang')

  const kata = cari.toLowerCase()
  const hasil = daftar.filter((r) => {
    const teks = `${r.playlistNama} ${r.konten.map((k) => k.judul).join(' ')} ${r.tv.join(' ')}`.toLowerCase()
    return (
      teks.includes(kata) &&
      (!tanggal || tanggalLokal(r.mulai) === tanggal) &&
      (filterTv === 'semua' || r.tv.includes(filterTv)) &&
      (filterHasil === 'semua' || r.hasil === filterHasil)
    )
  })

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / PER_HALAMAN))
  const halamanAktif = Math.min(halaman, totalHalaman)
  const awal = (halamanAktif - 1) * PER_HALAMAN
  const tampil = hasil.slice(awal, awal + PER_HALAMAN)

  const inputKelas =
    'h-10 rounded-lg border border-line bg-white px-3 text-body text-ink focus:border-primary focus:outline-none'

  function ubahFilter(setter) {
    return (e) => {
      setter(e.target.value)
      setHalaman(1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard label="Siaran hari ini" value={siaranHariIni.length} icon={Radio} />
        <StatCard label="Durasi tayang hari ini" value={formatDurasi(durasiHariIni)} icon={Clock} />
        <StatCard
          label="Sedang tayang"
          value={sedangTayang ? 1 : 0}
          icon={Play}
          iconClass="bg-success/10 text-success"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={cari}
            onChange={ubahFilter(setCari)}
            placeholder="Cari playlist, konten, atau nama TV..."
            className={`${inputKelas} w-full pl-9 placeholder:text-muted`}
          />
        </div>

        <input type="date" value={tanggal} onChange={ubahFilter(setTanggal)} className={inputKelas} />

        <select value={filterTv} onChange={ubahFilter(setFilterTv)} className={`${inputKelas} cursor-pointer`}>
          <option value="semua">Semua perangkat</option>
          {namaTv.map((nama) => (
            <option key={nama} value={nama}>
              {nama}
            </option>
          ))}
        </select>

        <select value={filterHasil} onChange={ubahFilter(setFilterHasil)} className={`${inputKelas} cursor-pointer`}>
          <option value="semua">Semua hasil</option>
          <option value="tayang">Sedang tayang</option>
          <option value="dihentikan">Dihentikan</option>
          <option value="diganti">Diganti</option>
        </select>

        <button
          onClick={() => eksporCsv(hasil)}
          disabled={hasil.length === 0}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-4 text-body font-semibold text-ink hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download size={16} /> Ekspor CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-line bg-surface">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th className="px-6 py-3 font-semibold">Mulai</th>
                <th className="px-5 py-3 font-semibold">Selesai</th>
                <th className="px-5 py-3 font-semibold">Playlist</th>
                <th className="px-5 py-3 font-semibold">Konten</th>
                <th className="px-5 py-3 font-semibold">TV</th>
                <th className="px-5 py-3 font-semibold">Durasi</th>
                <th className="px-5 py-3 font-semibold">Hasil</th>
                <th className="px-5 py-3 text-right font-semibold">Detail</th>
              </tr>
            </thead>
            <tbody>
              {tampil.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-b-0 hover:bg-surface/60">
                  <td className="px-6 py-4 text-body text-muted">{formatWaktu(r.mulai)}</td>
                  <td className="px-5 py-4 text-body text-muted">
                    {r.selesai ? formatWaktu(r.selesai) : '—'}
                  </td>
                  <td className="px-5 py-4 text-body font-medium text-ink">{r.playlistNama}</td>
                  <td className="px-5 py-4 text-body text-muted">{r.konten.length} konten</td>
                  <td className="px-5 py-4 text-body text-muted">{r.tv.length} TV</td>
                  <td className="px-5 py-4 font-mono text-body text-muted">
                    {formatDurasi(durasiSiaran(r))}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-caption font-medium ${HASIL[r.hasil].kelas}`}
                    >
                      {HASIL[r.hasil].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setDetail(r)}
                        aria-label="Lihat detail"
                        title="Lihat detail"
                        className="cursor-pointer rounded-md p-2 text-muted hover:bg-surface hover:text-primary"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {tampil.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-14 text-center">
                    <p className="text-body font-medium text-muted">Belum ada riwayat siaran.</p>
                    <p className="mt-1 text-caption text-muted">
                      Riwayat muncul setelah ada siaran yang diputar dari menu Playback.
                    </p>
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
            <span className="text-caption text-muted">
              Halaman {halamanAktif} dari {totalHalaman}
            </span>
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

      {detail && (
        <RiwayatDetailModal
          riwayat={detail}
          labelHasil={HASIL[detail.hasil].label}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  )
}