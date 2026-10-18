import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Plus, Check } from "lucide-react";
import Modal from "../Modal";

export default function TambahAdminModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    if (!password) {
      setError("Kata sandi wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onAdd({
        name: name.trim(),
        email: email.trim(),
        password,
        status: "Aktif",
      });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <Modal title="Tambah Admin Baru" onClose={onClose}>
      <p className="text-body text-muted -mt-2 mb-4">
        Tambahkan pengguna baru untuk mengelola sistem InfoSphere.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-body">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Contoh: Maya Lestari"
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

        {/* Kata Sandi */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Kata Sandi <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full h-11 pl-11 pr-11 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Konfirmasi Kata Sandi */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Konfirmasi Kata Sandi <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi"
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
              <span>Menambahkan...</span>
            ) : (
              <>
                <Plus size={16} />
                <span>Tambah Admin</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
