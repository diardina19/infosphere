let data = [
  { id: 1, nama: 'TV-KANTIN-01', ip: '192.168.1.101', online: true },
  { id: 2, nama: 'TV-KANTIN-02', ip: '192.168.1.102', online: true },
  { id: 3, nama: 'TV-KANTIN-03', ip: '192.168.1.103', online: true },
  { id: 4, nama: 'TV-KANTIN-04', ip: '192.168.1.104', online: true },
  { id: 5, nama: 'TV-KANTIN-05', ip: '192.168.1.105', online: true },
  { id: 6, nama: 'TV-KANTIN-06', ip: '192.168.1.106', online: true },
  { id: 7, nama: 'TV-KANTIN-07', ip: '192.168.1.107', online: false },
  { id: 8, nama: 'TV-KANTIN-08', ip: '192.168.1.108', online: false },
]
let nextId = 9

function cekDuplikat(nama, ip, kecualiId = null) {
  const lain = data.filter((t) => t.id !== kecualiId)
  if (lain.some((t) => t.nama.toLowerCase() === nama.toLowerCase())) {
    throw new Error('Nama perangkat sudah dipakai.')
  }
  if (ip && lain.some((t) => t.ip === ip)) {
    throw new Error('Alamat IP sudah terdaftar.')
  }
}

export async function getTv() {
  return [...data]
}

export async function tambahTv({ nama, ip }) {
  cekDuplikat(nama, ip)
  // TV baru berstatus offline sampai TV Player-nya terhubung
  const baru = { id: nextId++, nama, ip, online: false }
  data = [baru, ...data]
  return baru
}

export async function ubahNamaTv(id, nama) {
  cekDuplikat(nama, null, id)
  data = data.map((t) => (t.id === id ? { ...t, nama } : t))
}

export async function hapusTv(id) {
  data = data.filter((t) => t.id !== id)
}