import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, ArrowUp, ArrowDown, X, Film } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import PlaylistModal from '../components/PlaylistModal'
import PilihKontenModal from '../components/PilihKontenModal'
import { getPlaylistById, ubahNama, tambahItem, hapusItem, geserItem } from '../services/playlistService'
import { getKonten } from '../services/kontenService'
import { detikDariDurasi, formatDurasi, statusPlaylist } from '../utils/format'

export default function PlaylistDetail() {
  const { id } = useParams()
  const playlistId = Number(id)
  const navigate = useNavigate()

  const [playlist, setPlaylist] = useState(undefined) // undefined = memuat, null = tidak ketemu
  const [daftarKonten, setDaftarKonten] = useState([])
  const [modalNama, setModalNama] = useState(false)
  const [modalPilih, setModalPilih] = useState(false)

  async function muat() {
    const [p, k] = await Promise.all([getPlaylistById(playlistId), getKonten()])
    setPlaylist(p)
    setDaftarKonten(k)
  }

  useEffect(() => {
    muat()
  }, [playlistId])

  if (playlist === undefined) return null

  if (playlist === null) {
    return (
      <div className="space-y-3">
        <p className="text-[#66727E]">Playlist tidak ditemukan.</p>
        <button onClick={() => navigate('/playlist')} className="text-sm font-semibold text-[#003B70]">
          Kembali ke daftar playlist
        </button>
      </div>
    )
  }

  const kontenById = Object.fromEntries(daftarKonten.map((k) => [k.id, k]))
  const isi = playlist.itemIds.map((kid) => kontenById[kid]).filter(Boolean)
  const totalDetik = isi.reduce((jumlah, k) => jumlah + detikDariDurasi(k.durasi), 0)
  const kontenTersedia = daftarKonten.filter((k) => !playlist.itemIds.includes(k.id))
  const terkunci = playlist.tayang

  async function handleUbahNama(nama) {
    await ubahNama(playlistId, nama)
    setModalNama(false)
    muat()
  }

  async function handleTambah(ids) {
    await tambahItem(playlistId, ids)
    setModalPilih(false)
    muat()
  }

  async function handleHapusItem(kontenId) {
    await hapusItem(playlistId, kontenId)
    muat()
  }

  async function handleGeser(kontenId, arah) {
    await geserItem(playlistId, kontenId, arah)
    muat()
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate('/playlist')}
        className="flex items-center gap-1 text-sm text-[#66727E] hover:text-[#003B70]"
      >
        <ArrowLeft size={16} /> Kembali ke playlist
      </button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#17212B]">{playlist.nama}</h2>
            <StatusBadge status={statusPlaylist(playlist)} />
          </div>
          <p className="mt-1 text-sm text-[#66727E]">
            {isi.length} konten · total durasi {formatDurasi(totalDetik)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setModalNama(true)}
            className="flex items-center gap-2 rounded-md border border-[#D9E1E8] bg-white px-4 py-2 text-sm font-semibold text-[#17212B] hover:bg-[#F5F7F9]"
          >
            <Pencil size={16} /> Ubah nama
          </button>
          <button
            onClick={() => setModalPilih(true)}
            disabled={terkunci}
            className="flex items-center gap-2 rounded-md bg-[#003B70] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002B50] disabled:opacity-40"
          >
            <Plus size={16} /> Tambah konten
          </button>
        </div>
      </div>

      {terkunci && (
        <div className="rounded-md bg-[#D99A2B]/10 px-4 py-3 text-sm text-[#17212B]">
          Playlist ini sedang tayang di {playlist.jumlahTv} TV. Hentikan dulu dari menu Playback untuk mengubah isinya.
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-[#D9E1E8] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F5F7F9] text-xs uppercase text-[#66727E]">
            <tr>
              <th className="w-12 px-4 py-3 font-medium">No</th>
              <th className="px-4 py-3 font-medium">Konten</th>
              <th className="px-4 py-3 font-medium">Durasi</th>
              <th className="px-4 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9E1E8]">
            {isi.map((k, i) => (
              <tr key={k.id}>
                <td className="px-4 py-3 text-[#66727E]">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-16 items-center justify-center rounded bg-[#D9E1E8] text-[#66727E]">
                      <Film size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-[#17212B]">{k.judul}</p>
                      <p className="text-xs text-[#66727E]">{k.kategori}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#66727E]">{k.durasi}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleGeser(k.id, -1)}
                      disabled={terkunci || i === 0}
                      aria-label="Naikkan"
                      className="rounded border border-[#D9E1E8] p-1.5 text-[#66727E] hover:bg-[#F5F7F9] disabled:opacity-40"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => handleGeser(k.id, 1)}
                      disabled={terkunci || i === isi.length - 1}
                      aria-label="Turunkan"
                      className="rounded border border-[#D9E1E8] p-1.5 text-[#66727E] hover:bg-[#F5F7F9] disabled:opacity-40"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      onClick={() => handleHapusItem(k.id)}
                      disabled={terkunci}
                      aria-label="Keluarkan dari playlist"
                      className="p-1.5 text-[#C94C4C] hover:opacity-80 disabled:opacity-40"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {isi.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#66727E]">
                  Playlist masih kosong. Klik "Tambah konten" untuk memilih konten.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalNama && (
        <PlaylistModal playlist={playlist} onClose={() => setModalNama(false)} onSubmit={handleUbahNama} />
      )}
      {modalPilih && (
        <PilihKontenModal
          kontenTersedia={kontenTersedia}
          onClose={() => setModalPilih(false)}
          onSubmit={handleTambah}
        />
      )}
    </div>
  )
}