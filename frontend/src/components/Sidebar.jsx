import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Tv, LogOut, X } from "lucide-react";
import { menuItems } from "../layouts/menu";

// ─── Modal Konfirmasi Logout ──────────────────────────────────────────────────
function ModalLogout({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-line">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <LogOut size={18} />
            </span>
            <div>
              <h3 className="text-card font-semibold text-ink">Keluar dari Sistem</h3>
              <p className="text-caption text-muted mt-0.5">Sesi Anda akan diakhiri</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:bg-surface hover:text-ink transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <p className="text-body text-ink/80 leading-relaxed">
            Apakah Anda yakin ingin keluar? Anda perlu login kembali untuk
            mengakses dasbor.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg border border-line text-body font-medium text-ink hover:bg-surface transition cursor-pointer"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 h-10 rounded-lg bg-danger hover:bg-danger/90 text-white text-body font-semibold transition cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleConfirmLogout = () => {
    // TODO: hapus token / data login di sini sebelum pindah halaman
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <>
      <aside className="w-60 shrink-0 self-start sticky top-0 h-screen bg-dark text-white flex flex-col">
        {/* Brand */}
        <div className="h-18 px-6 flex items-center gap-3 border-b border-white/10">
          <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Tv size={20} />
          </span>
          <span>
            <span className="block text-body font-semibold">InfoSphere</span>
            <span className="block text-caption text-white/60">Sistem Manajemen</span>
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="px-3 mb-3 text-caption uppercase tracking-wider text-white/50">
            Menu utama
          </p>
          <ul className="space-y-1">
            {menuItems.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    "flex items-center gap-3 h-10 px-3 rounded-lg text-body font-medium " +
                    (isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white")
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center gap-3 h-10 px-3 rounded-lg text-body font-medium text-white/70 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Modal Konfirmasi Logout */}
      {showLogout && (
        <ModalLogout
          onClose={() => setShowLogout(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}

export default Sidebar;