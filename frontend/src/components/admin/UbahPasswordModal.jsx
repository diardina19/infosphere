import { useState } from "react";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import Modal from "../Modal";

export default function UbahPasswordModal({ onClose, onSave }) {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showLama, setShowLama] = useState(false);
  const [showBaru, setShowBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!passwordLama) {
      newErrors.passwordLama = "Password lama wajib diisi.";
    }

    if (!passwordBaru) {
      newErrors.passwordBaru = "Password baru wajib diisi.";
    } else if (passwordBaru.length < 8) {
      newErrors.passwordBaru = "Password baru minimal 8 karakter.";
    } else if (passwordBaru === passwordLama) {
      newErrors.passwordBaru = "Password baru tidak boleh sama dengan password lama.";
    }

    if (!konfirmasi) {
      newErrors.konfirmasi = "Konfirmasi password baru wajib diisi.";
    } else if (konfirmasi !== passwordBaru) {
      newErrors.konfirmasi = "Konfirmasi password tidak cocok.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Penanda kalau modal ini belum tersambung ke fungsi penyimpan
  if (typeof onSave !== "function") {
    setErrors({ passwordBaru: "Fungsi penyimpanan password belum tersambung." });
    return;
  }

  setIsSubmitting(true);
  setTimeout(() => {
    try {
      onSave(passwordLama, passwordBaru);
      onClose(); // tutup modal setelah berhasil
    } catch (err) {
      // Error dari service (misalnya password lama salah)
      if (err.message.toLowerCase().includes("lama")) {
        setErrors({ passwordLama: err.message });
      } else {
        setErrors({ passwordBaru: err.message });
      }
      setIsSubmitting(false);
    }
  }, 300);
};

  return (
    <Modal title="Ubah Password" onClose={onClose}>
      <p className="text-body text-muted -mt-2 mb-4">
        Masukkan password lama dan password baru untuk akun Anda.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password Lama */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Password Lama <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type={showLama ? "text" : "password"}
              value={passwordLama}
              onChange={(e) => {
                setPasswordLama(e.target.value);
                if (errors.passwordLama) setErrors((prev) => ({ ...prev, passwordLama: undefined }));
              }}
              placeholder="Masukkan password lama"
              className={
                "w-full h-11 pl-11 pr-11 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (errors.passwordLama
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
            <button
              type="button"
              onClick={() => setShowLama(!showLama)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              {showLama ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.passwordLama && (
            <p className="mt-1 text-caption text-danger">{errors.passwordLama}</p>
          )}
        </div>

        {/* Password Baru */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Password Baru <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type={showBaru ? "text" : "password"}
              value={passwordBaru}
              onChange={(e) => {
                setPasswordBaru(e.target.value);
                if (errors.passwordBaru) setErrors((prev) => ({ ...prev, passwordBaru: undefined }));
              }}
              placeholder="Minimal 8 karakter"
              className={
                "w-full h-11 pl-11 pr-11 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (errors.passwordBaru
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
            <button
              type="button"
              onClick={() => setShowBaru(!showBaru)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              {showBaru ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.passwordBaru && (
            <p className="mt-1 text-caption text-danger">{errors.passwordBaru}</p>
          )}
        </div>

        {/* Konfirmasi Password Baru */}
        <div>
          <label className="block text-body font-medium text-ink mb-1.5">
            Konfirmasi Password Baru <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              type={showKonfirmasi ? "text" : "password"}
              value={konfirmasi}
              onChange={(e) => {
                setKonfirmasi(e.target.value);
                if (errors.konfirmasi) setErrors((prev) => ({ ...prev, konfirmasi: undefined }));
              }}
              placeholder="Ulangi password baru"
              className={
                "w-full h-11 pl-11 pr-11 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (errors.konfirmasi
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
            <button
              type="button"
              onClick={() => setShowKonfirmasi(!showKonfirmasi)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              {showKonfirmasi ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.konfirmasi && (
            <p className="mt-1 text-caption text-danger">{errors.konfirmasi}</p>
          )}
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
                <span>Simpan Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

