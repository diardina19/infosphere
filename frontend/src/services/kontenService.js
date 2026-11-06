import {
  tambahItem,
  hapusKontenDariSemuaPlaylist,
} from "./playlistService"

import { formatDurasi } from '../utils/format';

// Data sementara selama aplikasi berjalan.
let data = [];
let nextId = 1;

// Ambil semua konten.
export async function getKonten() {
  return [...data];
}

// membaca durasi video dari filenya, hasilnya seperti "02:45"
function bacaDurasi(url) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      const detik = Number.isFinite(video.duration) ? Math.round(video.duration) : 0
      resolve(formatDurasi(detik))
    }
    video.onerror = () => resolve('00:00')
    video.src = url
  })
}

export async function tambahKonten({ judul, kategori, file, playlistIds = [] }) {
  const url = URL.createObjectURL(file) // alamat sementara file di dalam browser
  const baru = {
    id: nextId++,
    judul,
    durasi: await bacaDurasi(url),
    ukuran: Math.max(1, Math.round(file.size / 1024 / 1024)),
    tanggal: new Date().toISOString(),
    status: 'aktif',
    url,
  }
  data = [baru, ...data]
  for (const playlistId of playlistIds) {
    await tambahItem(playlistId, [baru.id])
  }
  return baru
}

// Hapus konten dan keluarkan dari playlist.
export async function hapusKonten(id) {
  await hapusKontenDariSemuaPlaylist(id);

  data = data.filter((item) => item.id !== id);

  return true;
}