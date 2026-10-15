import { useState } from 'react'
import { X } from 'lucide-react'

export default function PlaylistModal({ playlist, onClose, onSubmit }) {
  const [nama, setNama] = useState(playlist ? playlist.nama : '')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!nama.trim()) {
      setError('Nama playlist wajib diisi.')
      return
    }
    onSubmit(nama.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#17212B]">
            {playlist ? 'Ubah playlist' : 'Buat playlist'}
          </h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="text-[#66727E]">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm text-[#66727E]">Nama playlist</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full rounded-md border border-[#D9E1E8] px-3 py-2 text-sm text-[#17212B] outline-none focus:border-[#003B70]"
          />
        </div>

        {error && <p className="text-sm text-[#C94C4C]">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#D9E1E8] px-4 py-2 text-sm font-semibold text-[#17212B] hover:bg-[#F5F7F9]"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#003B70] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002B50]"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}