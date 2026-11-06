import { useRef, useState } from "react";
import { Film } from "lucide-react";
import Modal from "../Modal";

const inputClass =
  "w-full h-10 px-3 bg-white border border-line rounded-lg text-body text-ink placeholder:text-muted focus:outline-none focus:border-primary";

function formatSize(bytes) {
  const mb = bytes / (1024 * 1024);

  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;

  return `${Math.max(1, Math.round(mb))} MB`;
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function TambahKontenModal({
  daftarPlaylist = [],
  onClose,
  onSubmit,
}) {
  const fileInput = useRef(null);

  const [judul, setJudul] = useState("");
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [playlistIds, setPlaylistIds] = useState([]);
  const [error, setError] = useState("");

  function togglePlaylist(id) {
    setPlaylistIds((lama) =>
      lama.includes(id) ? lama.filter((x) => x !== id) : [...lama, id]
    );
  }

  const handleFile = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setDuration("");
    setError("");

    // Baca durasi video dari metadata file di browser.
    const video = document.createElement("video");
    const videoUrl = URL.createObjectURL(selected);

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      if (Number.isFinite(video.duration)) {
        setDuration(formatDuration(video.duration));
      }

      URL.revokeObjectURL(videoUrl);
    };

    video.onerror = () => {
      URL.revokeObjectURL(videoUrl);
    };

    video.src = videoUrl;

    // Agar file yang sama bisa dipilih kembali.
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!judul.trim()) {
      setError("Judul wajib diisi.");
      return;
    }

    if (!file) {
      setError("Pilih file video terlebih dahulu.");
      return;
    }

    if (typeof onSubmit !== "function") {
      setError("Fungsi penyimpanan konten belum tersedia.");
      return;
    }

    onSubmit({
      judul: judul.trim(),
      file,
      duration: duration || "-",
      size: formatSize(file.size),
      playlistIds,
    });
  };

  return (
    <Modal title="Tambah Konten" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="judul"
            className="block mb-1.5 text-body font-medium text-ink"
          >
            Judul
          </label>

          <input
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Masukkan judul konten"
            className={inputClass}
          />
        </div>

        <div>
          <span className="block mb-1.5 text-body font-medium text-ink">
            Unggah File Video
          </span>

          <div className="flex items-center gap-3 p-3 bg-surface border border-line rounded-lg">
            <span className="w-14 h-10 rounded-md bg-tint text-primary flex items-center justify-center shrink-0">
              <Film size={18} />
            </span>

            <div className="min-w-0 flex-1">
              {file ? (
                <>
                  <p className="text-body font-medium text-ink truncate">
                    {file.name}
                  </p>

                  <p className="text-caption text-muted">
                    {formatSize(file.size)} · {duration || "--:--"}
                  </p>
                </>
              ) : (
                <p className="text-body text-muted">Belum ada file dipilih</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="h-8 px-3 shrink-0 rounded-lg border border-line bg-white text-body font-medium text-ink hover:bg-surface"
            >
              {file ? "Ganti File" : "Pilih File"}
            </button>

            <input
              ref={fileInput}
              type="file"
              accept="video/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>
        </div>

        {/* Pilihan playlist */}
        <div>
          <label className="block mb-1.5 text-body font-medium text-ink">
            Masukkan ke playlist (opsional)
          </label>

          {daftarPlaylist.length === 0 ? (
            <p className="text-body text-muted">Belum ada playlist.</p>
          ) : (
            <div className="max-h-32 space-y-1 overflow-y-auto rounded-lg border border-line p-2">
              {daftarPlaylist.map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2 text-body text-ink"
                >
                  <input
                    type="checkbox"
                    checked={playlistIds.includes(p.id)}
                    onChange={() => togglePlaylist(p.id)}
                    disabled={p.tayang}
                  />

                  <span>{p.nama}</span>

                  {p.tayang && (
                    <span className="text-caption text-muted">
                      (sedang tayang)
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-caption text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-lg border border-line bg-white text-body font-semibold text-ink hover:bg-surface"
          >
            Batalkan
          </button>

          <button
            type="submit"
            className="h-10 px-4 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold"
          >
            Simpan Konten
          </button>
        </div>
      </form>
    </Modal>
  );
}