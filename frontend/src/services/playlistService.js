let data = [
  { id: 1, nama: 'Promo Q4 Nasional', itemIds: [2, 4, 1], tayang: true, jumlahTv: 8, diperbarui: '2026-09-30T13:45:00' },
  { id: 2, nama: 'Informasi Layanan Publik', itemIds: [1, 3, 5], tayang: false, jumlahTv: 0, diperbarui: '2026-09-30T11:20:00' },
  { id: 3, nama: 'Materi Internal Cabang', itemIds: [7, 3], tayang: false, jumlahTv: 0, diperbarui: '2026-09-28T09:32:00' },
  { id: 4, nama: 'Program Akhir Pekan', itemIds: [6], tayang: false, jumlahTv: 0, diperbarui: '2026-09-27T14:55:00' },
  { id: 5, nama: 'Edukasi Keselamatan', itemIds: [], tayang: false, jumlahTv: 0, diperbarui: '2026-09-24T10:10:00' },
]
let nextId = 6

function sekarang() {
  return new Date().toISOString()
}

export async function getPlaylist() {
  return [...data]
}

export async function getPlaylistById(id) {
  return data.find((p) => p.id === id) || null
}

export async function buatPlaylist(nama) {
  const baru = { id: nextId++, nama, itemIds: [], tayang: false, jumlahTv: 0, diperbarui: sekarang() }
  data = [baru, ...data]
  return baru
}

export async function ubahNama(id, nama) {
  data = data.map((p) => (p.id === id ? { ...p, nama, diperbarui: sekarang() } : p))
}

export async function hapusPlaylist(id) {
  data = data.filter((p) => p.id !== id)
}

// tambah beberapa konten ke akhir playlist (yang sudah ada dilewati)
export async function tambahItem(id, kontenIds) {
  data = data.map((p) => {
    if (p.id !== id) return p
    const baru = kontenIds.filter((k) => !p.itemIds.includes(k))
    return { ...p, itemIds: [...p.itemIds, ...baru], diperbarui: sekarang() }
  })
}

export async function hapusItem(id, kontenId) {
  data = data.map((p) =>
    p.id === id
      ? { ...p, itemIds: p.itemIds.filter((k) => k !== kontenId), diperbarui: sekarang() }
      : p
  )
}

// arah: -1 = naik, 1 = turun
export async function geserItem(id, kontenId, arah) {
  data = data.map((p) => {
    if (p.id !== id) return p
    const urutan = [...p.itemIds]
    const i = urutan.indexOf(kontenId)
    const j = i + arah
    if (i === -1 || j < 0 || j >= urutan.length) return p
    const sementara = urutan[i]
    urutan[i] = urutan[j]
    urutan[j] = sementara
    return { ...p, itemIds: urutan, diperbarui: sekarang() }
  })
}

// playlist mana saja yang memakai konten ini
export async function getPemakaiKonten(kontenId) {
  return data.filter((p) => p.itemIds.includes(kontenId))
}

// dipanggil saat konten dihapus
export async function hapusKontenDariSemuaPlaylist(kontenId) {
  data = data.map((p) =>
    p.itemIds.includes(kontenId)
      ? { ...p, itemIds: p.itemIds.filter((k) => k !== kontenId), diperbarui: sekarang() }
      : p
  )
}