import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Plus, RefreshCw } from "lucide-react";
import Modal from "../Modal";

function generatePassword(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function TambahAdminModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi.";
    }

    if (!email.trim()) {
      newErrors.email = "Alamat email wajib diisi.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Format email tidak valid.";
      }
    }

    if (!password) {
      newErrors.password = "Password awal wajib diisi.";
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        onAdd({
          name: name.trim(),
          email: email.trim(),
          password,
        });
      } catch (err) {
        // Tampilkan pesan error dari service (contoh: email sudah dipakai)
        setErrors({ form: err.message });
        setIsSubmitting(false);
      }
    }, 300);
  };

  const handleAutoGenerate = () => {
    const generated = generatePassword(10);
    setPassword(generated);
    setShowPassword(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.password;
      return next;
    });
  };

  return (
    <Modal title="Tambah Admin Baru" onClose={onClose}>
      <p className="text-body text-muted -mt-2 mb-4">
        Tambahkan pengguna baru untuk mengelola sistem InfoSphere.
      </p>

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
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Contoh: Maya Lestari"
              className={
                "w-full h-11 pl-11 pr-4 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (errors.name
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-caption text-danger">{errors.name}</p>
          )}
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="nama@streamingtv.id"
              className={
                "w-full h-11 pl-11 pr-4 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (errors.email
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-caption text-danger">{errors.email}</p>
          )}
        </div>

        {/* Password Awal */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Password Awal <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Minimal 8 karakter"
              className={
                "w-full h-11 pl-11 pr-20 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (errors.password
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
              <button
                type="button"
                onClick={handleAutoGenerate}
                title="Buat otomatis"
                className="p-1.5 text-muted hover:text-primary hover:bg-surface rounded-md cursor-pointer transition"
              >
                <RefreshCw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-muted hover:text-ink cursor-pointer transition"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="mt-1 text-caption text-danger">{errors.password}</p>
          )}
          <p className="mt-1.5 text-caption text-muted leading-relaxed">
            Berikan password ini ke admin baru, ia wajib menggantinya saat login pertama.
          </p>
        </div>

        {/* Pesan error dari service (contoh: email sudah dipakai) */}
        {errors.form && (
          <p className="text-caption text-danger">{errors.form}</p>
        )}

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