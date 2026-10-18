import { useState, useRef } from "react";
import { User, Mail, Check, Camera, Trash2, Upload } from "lucide-react";
import Modal from "../Modal";

export default function EditAkunModal({ currentAdmin, onClose, onSave }) {
  const [name, setName] = useState(currentAdmin?.name || "");
  const [email, setEmail] = useState(currentAdmin?.email || "");
  const [avatar, setAvatar] = useState(currentAdmin?.avatar || null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const initials = (name || "RA")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File yang diunggah harus berupa gambar (JPG, PNG, atau WebP).");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Ukuran gambar maksimal adalah 3 MB.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama lengkap tidak boleh kosong.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        name: name.trim(),
        email: email.trim(),
        avatar: avatar,
      });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <Modal title="Edit Akun Saya" onClose={onClose}>
      <p className="text-body text-muted -mt-2 mb-4">
        Perbarui informasi nama, email, dan foto profil akun Anda.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-body">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Unggah Foto Profil */}
        <div className="p-3.5 bg-surface border border-line rounded-xl flex items-center gap-4">
          <div className="relative shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt="Foto Profil"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-tint text-primary text-body font-bold flex items-center justify-center border-2 border-primary/20">
                {initials}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-body font-medium text-ink">Foto Profil</p>
            <p className="text-caption text-muted mb-2">
              JPG, PNG, atau WebP (Maks. 3 MB)
            </p>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-upload"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 px-3 rounded-lg bg-white border border-line hover:bg-surface text-ink text-caption font-semibold inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <Upload size={13} />
                <span>Pilih Foto</span>
              </button>
              {avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="h-8 px-2.5 rounded-lg text-danger hover:bg-danger/10 text-caption font-medium inline-flex items-center gap-1 transition cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Nama Lengkap */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Nama Lengkap <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full h-11 pl-11 pr-4 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Alamat Email <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@streamingtv.id"
              className="w-full h-11 pl-11 pr-4 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-lg border border-line bg-white text-ink text-body font-medium hover:bg-surface transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-5 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center gap-2 transition disabled:opacity-60 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <span>Menyimpan...</span>
            ) : (
              <>
                <Check size={16} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
