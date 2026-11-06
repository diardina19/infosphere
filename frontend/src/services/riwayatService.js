const menitLalu = (menit) => Date.now() - menit * 60000

let data = [
  {
    id: 4,
    mulai: menitLalu(300),
    selesai: menitLalu(240),
    hasil: 'dihentikan',
    playlistNama: 'Promo Q4 Nasional',
    konten: [
      { judul: 'Promo Produk Q4', durasi: '00:30' },
      { judul: 'Kampanye Produk Oktober', durasi: '01:15' },
    ],
    tv: ['TV-KANTIN-01', 'TV-KANTIN-02', 'TV-KANTIN-03', 'TV-KANTIN-04'],
  },
  {
    id: 3,
    mulai: menitLalu(1350),
    selesai: menitLalu(1290),
    hasil: 'dihentikan',
    playlistNama: 'Informasi Layanan Publik',
    konten: [
      { judul: 'Selamat Datang di Nusantara', durasi: '02:45' },
      { judul: 'Panduan Layanan Digital', durasi: '04:12' },
    ],
    tv: ['TV-KANTIN-01', 'TV-KANTIN-02'],
  },
  {
    id: 2,
    mulai: menitLalu(1440),
    selesai: menitLalu(1350),
    hasil: 'diganti',
    playlistNama: 'Program Akhir Pekan',
    konten: [{ judul: 'Program Akhir Pekan', durasi: '00:45' }],
    tv: ['TV-KANTIN-05', 'TV-KANTIN-06'],
  },
  {
    id: 1,
    mulai: menitLalu(2880),
    selesai: menitLalu(2820),
    hasil: 'dihentikan',
    playlistNama: 'Promo Q4 Nasional',
    konten: [
      { judul: 'Promo Produk Q4', durasi: '00:30' },
      { judul: 'Kampanye Produk Oktober', durasi: '01:15' },
    ],
    tv: ['TV-KANTIN-01', 'TV-KANTIN-03', 'TV-KANTIN-05'],
  },
]
let nextId = 5

export async function getRiwayat() {
  return [...data]
}

// dipanggil saat siaran dimulai, mengembalikan id catatan
export async function catatMulai({ playlist, konten, tv, mulai }) {
  const baru = {
    id: nextId++,
    mulai,
    selesai: null,
    hasil: 'tayang',
    playlistNama: playlist.nama,
    konten: konten.map((k) => ({ judul: k.judul, durasi: k.durasi })),
    tv: tv.map((t) => t.nama),
  }
  data = [baru, ...data]
  return baru.id
}

// hasil: 'dihentikan' (admin menekan Stop) atau 'diganti' (diganti siaran lain)
export async function catatSelesai(id, hasil) {
  data = data.map((r) => (r.id === id ? { ...r, selesai: Date.now(), hasil } : r))
}

// lama siaran dalam detik (kalau masih tayang, dihitung sampai sekarang)
export function durasiSiaran(riwayat) {
  const akhir = riwayat.selesai ?? Date.now()
  return Math.max(0, Math.round((akhir - riwayat.mulai) / 1000))
}