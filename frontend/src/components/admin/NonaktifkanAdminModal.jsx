import { useState } from "react";
import { AlertTriangle, ShieldOff, Eye, EyeOff, Lock } from "lucide-react";
import Modal from "../Modal";

export default function NonaktifkanAdminModal({ admin, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!admin) return null;

  const initials = admin.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleConfirm = () => {
    setError("");
    setIsProcessing(true);
    setTimeout(() => {
      try {
        onConfirm(admin.id, password);
      } catch (err) {
        setError(err.message || "Gagal menonaktifkan admin.");
        setIsProcessing(false);
      }
    }, 300);
  };

  return (
    <Modal title="Konfirmasi Nonaktifkan Admin" onClose={onClose}>
      <div className="space-y-4">
        {/* Info Admin yang akan dinonaktifkan */}
        <div className="p-3.5 bg-surface border border-line rounded-xl flex items-center gap-3.5">
          <span className="w-11 h-11 rounded-full bg-tint text-primary text-body font-semibold flex items-center justify-center shrink-0 border border-primary/10">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-body font-bold text-ink truncate">{admin.name}</h4>
            <p className="text-caption text-muted truncate">{admin.email}</p>
          </div>
        </div>

        {/* Peringatan */}
        <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-danger shrink-0 mt-0.5" />
          <p className="text-caption text-danger leading-relaxed">
            Akun admin ini akan dinonaktifkan dan tidak dapat login ke sistem InfoSphere sampai diaktifkan kembali.
          </p>
        </div>

        {/* Password Konfirmasi */}
        <div>
          <label className="block text-body font-semibold text-ink mb-2">
            Masukkan Password Anda <span className="text-danger">*</span>
          </label>
          <p className="text-caption text-muted mb-2.5">
            Untuk keamanan, masukkan password akun Anda sebagai konfirmasi:
          </p>
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
                if (error) setError("");
              }}
              placeholder="Masukkan password Anda"
              className={
                "w-full h-11 pl-11 pr-11 rounded-lg border bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 transition " +
                (error
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-line focus:border-primary focus:ring-primary/20")
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="mt-1 text-caption text-danger">{error}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-lg border border-line bg-white text-ink text-body font-medium hover:bg-surface transition cursor-pointer"
          >
            Batalkan
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!password || isProcessing}
            className="h-10 px-4 rounded-lg bg-danger hover:bg-danger/90 text-white text-body font-semibold inline-flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            {isProcessing ? (
              <span>Memproses...</span>
            ) : (
              <>
                <ShieldOff size={16} />
                <span>Nonaktifkan Akun</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

