import { setTayang, getPlaylistById } from './playlistService'
import { getKonten } from './kontenService'
import { getTv } from './tvService'
import { catatMulai, catatSelesai } from './riwayatService'

let aktif = null // { playlistId, tvIds, mulai, riwayatId }

export async function getPlayback() {
  return aktif
}

async function akhiri(hasil) {
  await catatSelesai(aktif.riwayatId, hasil)
  aktif = null
  await setTayang(null)
}

export async function mulaiPlayback(playlistId, tvIds) {
  if (aktif) await akhiri('diganti')

  const [playlist, daftarKonten, daftarTv] = await Promise.all([
    getPlaylistById(playlistId),
    getKonten(),
    getTv(),
  ])
  const konten = playlist.itemIds
    .map((id) => daftarKonten.find((k) => k.id === id))
    .filter(Boolean)
  const tv = daftarTv.filter((t) => tvIds.includes(t.id))

  const mulai = Date.now()
  const riwayatId = await catatMulai({ playlist, konten, tv, mulai })
  aktif = { playlistId, tvIds, mulai, riwayatId }
  await setTayang(playlistId, tvIds.length)
  return aktif
}

export async function hentikanPlayback() {
  if (aktif) await akhiri('dihentikan')
}