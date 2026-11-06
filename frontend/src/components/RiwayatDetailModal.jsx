import { X } from 'lucide-react'
import { durasiSiaran } from '../services/riwayatService'
import { detikDariDurasi, formatDurasi, formatWaktu } from '../utils/format'

export default function RiwayatDetailModal({ riwayat, labelHasil, onClose }) {
  const satuPutaran = riwayat.konten.reduce((jumlah, k) => jumlah + detikDariDurasi(k.durasi), 0)

  const info = [
    ['Playlist', riwayat.playlistNama],
    ['Hasil', labelHasil],
    ['Mulai', formatWaktu(riwayat.mulai)],
    ['Selesai', riwayat.selesai ? formatWaktu(riwayat.selesai) : 'Masih berjalan'],
    ['Durasi tayang', formatDurasi(durasiSiaran(riwayat))],
    ['Satu putaran playlist', formatDurasi(satuPutaran)],
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-card font-semibold text-ink">Detail siaran</h3>
          <button type="button" onClick={onClose} aria-label="Tutup" className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          {info.map(([label, nilai]) => (
            <div key={label}>
              <dt className="text-caption text-muted">{label}</dt>
              <dd className="text-body font-medium text-ink">{nilai}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <p className="mb-2 text-body font-semibold text-ink">
            TV yang menayangkan ({riwayat.tv.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {riwayat.tv.map((nama) => (
              <span key={nama} className="rounded-full bg-tint px-2.5 py-0.5 text-caption font-medium text-primary">
                {nama}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-body font-semibold text-ink">
            Konten (urutan putar, berulang)
          </p>
          <div className="overflow-hidden rounded-lg border border-line">
            {riwayat.konten.map((k, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-line px-3 py-2 last:border-b-0"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded bg-surface text-caption font-semibold text-muted">
                  {i + 1}
                </span>
                <span className="flex-1 text-body text-ink">{k.judul}</span>
                <span className="text-body text-muted">{k.durasi}</span>
              </div>
            ))}
            {riwayat.konten.length === 0 && (
              <p className="px-3 py-4 text-center text-body text-muted">Tidak ada konten.</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line px-4 text-body font-semibold text-ink hover:bg-surface"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}