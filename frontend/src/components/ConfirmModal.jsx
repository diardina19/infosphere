import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmModal({ judul, children, labelKonfirmasi = 'Hapus', onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
              <AlertTriangle size={18} />
            </span>
            <div>
              <h3 className="text-card font-semibold text-ink">{judul}</h3>
              <div className="mt-1 text-body text-muted">{children}</div>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup" className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line px-4 text-body font-medium text-ink hover:bg-surface"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-lg bg-danger px-4 text-body font-semibold text-white hover:bg-danger/90"
          >
            {labelKonfirmasi}
          </button>
        </div>
      </div>
    </div>
  )
}