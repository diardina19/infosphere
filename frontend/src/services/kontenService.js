import {
  tambahItem,
  hapusKontenDariSemuaPlaylist,
} from "./playlistService";

// Data sementara selama aplikasi berjalan.
let data = [];
let nextId = 1;

// Ambil semua konten.
export async function getKonten() {
  return [...data];
}

// Tambah konten dan masukkan ke playlist pilihan.
export async function tambahKonten({
  judul,
  kategori,
  deskripsi = "",
  file,
  playlistIds = [],
}) {
  if (!file) {
    throw new Error("File video wajib dipilih.");
  }

  const baru = {
    id: nextId++,
    judul,
    kategori,
    deskripsi,
    file,
    durasi: "00:00",
    ukuran: Math.max(
      1,
      Math.round(file.size / 1024 / 1024)
    ),
    tanggal: new Date().toISOString(),
    status: "aktif",
  };

  data = [baru, ...data];

  try {
    for (const playlistId of playlistIds) {
      await tambahItem(playlistId, [baru.id]);
    }
  } catch (error) {
    data = data.filter((item) => item.id !== baru.id);
    throw error;
  }

  return baru;
}

// Hapus konten dan keluarkan dari playlist.
export async function hapusKonten(id) {
  await hapusKontenDariSemuaPlaylist(id);

  data = data.filter((item) => item.id !== id);

  return true;
}