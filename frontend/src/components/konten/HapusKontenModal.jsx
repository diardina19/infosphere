import { Film } from "lucide-react";
import Modal from "../Modal";

function HapusKontenModal({ item, onClose, onConfirm }) {
  return (
    <Modal title="Konfirmasi Hapus" onClose={onClose}>
      <p className="text-body text-ink">Hapus konten “{item.title}”?</p>

      <div className="mt-4 flex items-center gap-3 p-3 bg-surface border border-line rounded-lg">
        <span className="w-14 h-10 rounded-md bg-tint text-primary flex items-center justify-center shrink-0">
          <Film size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-body font-medium text-ink truncate">{item.title}</p>
          <p className="text-caption text-muted">
            {item.category} · {item.duration} · {item.size}
          </p>
        </div>
      </div>

      <p className="mt-4 text-body text-muted">
        Konten akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-10 px-4 rounded-lg border border-line bg-white text-body font-semibold text-ink hover:bg-surface"
        >
          Batalkan
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="h-10 px-4 rounded-lg bg-danger hover:opacity-90 text-white text-body font-semibold"
        >
          Hapus Permanen
        </button>
      </div>
    </Modal>
  );
}

export default HapusKontenModal;