export function detikDariDurasi(durasi) {
  if (typeof durasi === "number") {
    return durasi;
  }

  if (!durasi || typeof durasi !== "string") {
    return 0;
  }

  const bagian = durasi.split(":").map(Number);

  if (bagian.some((angka) => !Number.isFinite(angka) || angka < 0)) {
    return 0;
  }

  if (bagian.length === 2) {
    const [menit, detik] = bagian;
    return menit * 60 + detik;
  }

  if (bagian.length === 3) {
    const [jam, menit, detik] = bagian;
    return jam * 3600 + menit * 60 + detik;
  }

  return 0;
}

export function formatDurasi(detik) {
  const totalDetik = Math.max(0, Math.floor(Number(detik) || 0));

  const jam = Math.floor(totalDetik / 3600);
  const menit = Math.floor((totalDetik % 3600) / 60);
  const sisaDetik = totalDetik % 60;

  const duaDigit = (angka) => String(angka).padStart(2, "0");

  if (jam > 0) {
    return `${duaDigit(jam)}:${duaDigit(menit)}:${duaDigit(sisaDetik)}`;
  }

  return `${duaDigit(menit)}:${duaDigit(sisaDetik)}`;
}

export function formatWaktu(waktu) {
  if (!waktu) return "-";

  const tanggal = new Date(waktu);

  if (Number.isNaN(tanggal.getTime())) {
    return String(waktu);
  }

  return tanggal.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function statusPlaylist(playlist) {
  if (playlist?.tayang) return "tayang";
  return playlist?.itemIds?.length > 0 ? "siap" : "kosong";
}