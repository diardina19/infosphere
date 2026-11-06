import { useState } from 'react'
import { X } from 'lucide-react'

const inputKelas =
  'h-10 w-full rounded-lg border border-line px-3 text-body text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-surface disabled:text-muted'

// 4 bagian angka 0-255, tanpa angka 0 di depan (contoh: 192.168.1.101)
function ipValid(ip) {
  const bagian = ip.trim().split('.')
  return (
    bagian.length === 4 &&
    bagian.every((b) => /^(0|[1-9]\d{0,2})$/.test(b) && Number(b) <= 255)
  )
}

export default function TvFormModal({ tv, onClose, onSubmit }) {
  const modeUbah = Boolean(tv)
  const [nama, setNama] = useState(tv ? tv.nama : '')
  const [ip, setIp] = useState(tv ? tv.ip : '')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nama.trim()) {
      setError('Nama perangkat wajib diisi.')
      return
    }
    if (!modeUbah && !ipValid(ip)) {
      setError('Alamat IP tidak valid. Contoh: 192.168.1.101')
      return
    }
    try {
      await onSubmit({ nama: nama.trim(), ip: ip.trim() })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-card font-semibold text-ink">
            {modeUbah ? 'Ubah nama perangkat' : 'Tambah perangkat'}
          </h3>
          <button type="button" onClick={onClose} aria-label="Tutup" className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-body font-medium text-ink">Nama perangkat</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            autoFocus
            placeholder="Contoh: TV-KANTIN-09"
            className={inputKelas}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-body font-medium text-ink">Alamat IP</label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            disabled={modeUbah}
            placeholder="Contoh: 192.168.1.109"
            className={`${inputKelas} font-mono`}
          />
          <p className="mt-1.5 text-caption text-muted">
            {modeUbah
              ? 'Alamat IP tidak bisa diubah. Jika PC diganti, hapus lalu daftarkan ulang.'
              : 'ID perangkat dibuat otomatis. Pastikan IP PC TV sudah tetap (statis).'}
          </p>
        </div>

        {error && <p className="text-body text-danger">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line px-4 text-body font-medium text-ink hover:bg-surface"
          >
            Batal
          </button>
          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-4 text-body font-semibold text-white hover:bg-dark"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}