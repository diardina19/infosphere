import { useState } from 'react'
import { Search, X } from 'lucide-react'

export default function PilihKontenModal({ kontenTersedia, onClose, onSubmit }) {
  const [cari, setCari] = useState('')
  const [dipilih, setDipilih] = useState([])

  const tampil = kontenTersedia.filter((k) =>
    `${k.judul} ${k.kategori}`.toLowerCase().includes(cari.toLowerCase())
  )

  function toggle(id) {
    setDipilih((lama) => (lama.includes(id) ? lama.filter((x) => x !== id) : [...lama, id]))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#17212B]">Tambah konten ke playlist</h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="text-[#66727E]">
            <X size={18} />
          </button>
        </div>

        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66727E]" />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari judul atau kategori..."
            className="w-full rounded-md border border-[#D9E1E8] py-2 pl-9 pr-3 text-sm text-[#17212B] outline-none focus:border-[#003B70]"
          />
        </div>

        <div className="flex-1 overflow-y-auto rounded-md border border-[#D9E1E8]">
          {tampil.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-[#66727E]">
              Tidak ada konten yang bisa ditambahkan.
            </p>
          )}
          {tampil.map((k) => (
            <label
              key={k.id}
              className="flex cursor-pointer items-center gap-3 border-b border-[#D9E1E8] px-3 py-2 last:border-b-0 hover:bg-[#F5F7F9]"
            >
              <input type="checkbox" checked={dipilih.includes(k.id)} onChange={() => toggle(k.id)} />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#17212B]">{k.judul}</p>
                <p className="text-xs text-[#66727E]">{k.kategori}</p>
              </div>
              <span className="text-sm text-[#66727E]">{k.durasi}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#D9E1E8] px-4 py-2 text-sm font-semibold text-[#17212B] hover:bg-[#F5F7F9]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onSubmit(dipilih)}
            disabled={dipilih.length === 0}
            className="rounded-md bg-[#003B70] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002B50] disabled:opacity-40"
          >
            Tambahkan ({dipilih.length})
          </button>
        </div>
      </div>
    </div>
  )
}