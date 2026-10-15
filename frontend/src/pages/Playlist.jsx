import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plus, Pencil, Trash2, ListVideo, Radio, ListX, ChevronLeft, ChevronRight,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import PlaylistModal from '../components/PlaylistModal'
import { getPlaylist, buatPlaylist, hapusPlaylist } from '../services/playlistService'
import { getKonten } from '../services/kontenService'
import { detikDariDurasi, formatDurasi, formatWaktu, statusPlaylist } from '../utils/format'

const PER_HALAMAN = 6

export default function Playlist() {
  const navigate = useNavigate()
  const [daftar, setDaftar] = useState([])
  const [daftarKonten, setDaftarKonten] = useState([])
  const [cari, setCari] = useState('')
  const [filter, setFilter] = useState('semua')
  const [halaman, setHalaman] = useState(1)
  const [modalBuka, setModalBuka] = useState(false)

  useEffect(() => {
    getPlaylist().then(setDaftar)
    getKonten().then(setDaftarKonten)
  }, [])

  const detikKonten = Object.fromEntries(
    daftarKonten.map((k) => [k.id, detikDariDurasi(k.durasi)])
  )

  function totalDetik(playlist) {
    return playlist.itemIds.reduce((jumlah, id) => jumlah + (detikKonten[id] || 0), 0)
  }

  const hasil = daftar.filter(
    (p) =>
      p.nama.toLowerCase().includes(cari.toLowerCase()) &&
      (filter === 'semua' || statusPlaylist(p) === filter)
  )
  const totalHalaman = Math.max(1, Math.ceil(hasil.length / PER_HALAMAN))
  const halamanAktif = Math.min(halaman, totalHalaman)
  const awal = (halamanAktif - 1) * PER_HALAMAN
  const tampil = hasil.slice(awal, awal + PER_HALAMAN)

  const sedangTayang = daftar.find((p) => p.tayang)
  const jumlahKosong = daftar.filter((p) => p.itemIds.length === 0).length

  async function handleBuat(nama) {
    const baru = await buatPlaylist(nama)
    navigate(`/playlist/${baru.id}`)
  }

  async function handleHapus(playlist) {
    if (!window.confirm(`Hapus playlist "${playlist.nama}"? Konten di dalamnya tidak ikut terhapus.`)) return
    await hapusPlaylist(playlist.id)
    setDaftar((lama) => lama.filter((p) => p.id !== playlist.id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Total playlist" value={daftar.length} icon={ListVideo} />
        <StatCard
          label="Sedang tayang"
          value={sedangTayang ? 1 : 0}
          extra={sedangTayang ? `${sedangTayang.nama} · ${sedangTayang.jumlahTv} TV` : undefined}
          icon={Radio}
        />
        <StatCard label="Playlist kosong" value={jumlahKosong} icon={ListX} />
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66727E]" />
          <input
            value={cari}
            onChange={(e) => {
              setCari(e.target.value)
              setHalaman(1)
            }}
            placeholder="Cari nama playlist..."
            className="w-full rounded-md border border-[#D9E1E8] bg-white py-2 pl-9 pr-3 text-sm text-[#17212B] outline-none focus:border-[#003B70]"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setHalaman(1)
          }}
          className="rounded-md border border-[#D9E1E8] bg-white px-3 py-2 text-sm text-[#17212B] outline-none focus:border-[#003B70]"
        >
          <option value="semua">Semua status</option>
          <option value="tayang">Tayang</option>
          <option value="siap">Siap</option>
          <option value="kosong">Kosong</option>
        </select>
        <button
          onClick={() => setModalBuka(true)}
          className="flex items-center gap-2 rounded-md bg-[#003B70] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002B50]"
        >
          <Plus size={16} /> Buat playlist
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#D9E1E8] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F5F7F9] text-xs uppercase text-[#66727E]">
            <tr>
              <th className="px-4 py-3 font-medium">Playlist</th>
              <th className="px-4 py-3 font-medium">Konten</th>
              <th className="px-4 py-3 font-medium">Durasi</th>
              <th className="px-4 py-3 font-medium">Diperbarui</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9E1E8]">
            {tampil.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-[#EAF4FA] p-2 text-[#003B70]">
                      <ListVideo size={18} />
                    </div>
                    <button
                      onClick={() => navigate(`/playlist/${p.id}`)}
                      className="text-left font-medium text-[#17212B] hover:text-[#003B70]"
                    >
                      {p.nama}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#66727E]">{p.itemIds.length} konten</td>
                <td className="px-4 py-3 text-[#66727E]">{formatDurasi(totalDetik(p))}</td>
                <td className="px-4 py-3 text-[#66727E]">{formatWaktu(p.diperbarui)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={statusPlaylist(p)} />
                  {p.tayang && <span className="ml-2 text-xs text-[#66727E]">{p.jumlahTv} TV</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => navigate(`/playlist/${p.id}`)}
                      className="text-[#003B70] hover:text-[#002B50]"
                      aria-label="Kelola isi playlist"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleHapus(p)}
                      disabled={p.tayang}
                      title={p.tayang ? 'Playlist yang sedang tayang tidak bisa dihapus' : 'Hapus'}
                      className="text-[#C94C4C] hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tampil.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#66727E]">
                  Tidak ada playlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-[#D9E1E8] px-4 py-3 text-xs text-[#66727E]">
          <p>
            Menampilkan {hasil.length === 0 ? 0 : awal + 1}-{awal + tampil.length} dari {hasil.length} data
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHalaman(halamanAktif - 1)}
              disabled={halamanAktif === 1}
              className="rounded border border-[#D9E1E8] p-1.5 hover:bg-[#F5F7F9] disabled:opacity-40"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={14} />
            </button>
            <span>Halaman {halamanAktif} dari {totalHalaman}</span>
            <button
              onClick={() => setHalaman(halamanAktif + 1)}
              disabled={halamanAktif === totalHalaman}
              className="rounded border border-[#D9E1E8] p-1.5 hover:bg-[#F5F7F9] disabled:opacity-40"
              aria-label="Berikutnya"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {modalBuka && <PlaylistModal onClose={() => setModalBuka(false)} onSubmit={handleBuat} />}
    </div>
  )
}