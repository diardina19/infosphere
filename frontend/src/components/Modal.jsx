import { useEffect } from "react";
import { X } from "lucide-react";

// Kerangka modal umum: latar gelap, kotak putih, judul, dan tombol tutup.
// Bisa dipakai ulang di halaman lain. Isi modal dikirim lewat "children".
// Modal bisa ditutup dengan tombol X, klik latar, atau tombol Esc.
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md max-h-[90vh] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-line shrink-0">
          <h2 className="text-card font-semibold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-1 rounded-md text-muted hover:bg-surface cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;