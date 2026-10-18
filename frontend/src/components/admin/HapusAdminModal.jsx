import { useState } from "react";
import { AlertTriangle, Trash2, ShieldAlert } from "lucide-react";
import Modal from "../Modal";
import { DELETE_REASONS } from "../../services/adminService";

export default function HapusAdminModal({ admin, onClose, onConfirm }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!admin) return null;

  const initials = admin.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleConfirm = () => {
    if (!selectedReason) return;
    setIsDeleting(true);
    setTimeout(() => {
      onConfirm(admin.id, selectedReason, customNote);
      setIsDeleting(false);
    }, 300);
  };

  return (
    <Modal title="Konfirmasi Hapus Admin" onClose={onClose}>
      <div className="space-y-4">
        {/* Info Admin yang akan dihapus */}
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
            Akun admin ini akan dihapus secara permanen dan dicabut seluruh aksesnya ke sistem InfoSphere.
          </p>
        </div>

        {/* Pilihan Alasan Penghapusan */}
        <div>
          <label className="block text-body font-semibold text-ink mb-2">
            Pilih Alasan Penghapusan <span className="text-danger">*</span>
          </label>
          <p className="text-caption text-muted mb-2.5">
            Pilih salah satu poin alasan di bawah ini sebagai syarat penghapusan akun:
          </p>

          <div className="space-y-2">
            {DELETE_REASONS.map((reason) => {
              const isSelected = selectedReason === reason;
              return (
                <label
                  key={reason}
                  className={
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition text-body " +
                    (isSelected
                      ? "border-primary bg-primary/5 text-ink font-medium"
                      : "border-line bg-white hover:bg-surface text-ink")
                  }
                >
                  <input
                    type="radio"
                    name="deleteReason"
                    value={reason}
                    checked={isSelected}
                    onChange={() => setSelectedReason(reason)}
                    className="w-4 h-4 text-primary border-line focus:ring-primary/20 accent-[#003b70]"
                  />
                  <span>{reason}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Kolom catatan tambahan jika pilih 'Alasan lainnya' */}
        {selectedReason === "Alasan lainnya" && (
          <div>
            <label className="block text-caption font-medium text-ink mb-1">
              Rincian Alasan Tambahan:
            </label>
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Tuliskan keterangan detail alasan penghapusan..."
              className="w-full p-2.5 rounded-lg border border-line text-body text-ink placeholder:text-muted/60 focus:outline-none focus:border-primary"
            />
          </div>
        )}

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
            disabled={!selectedReason || isDeleting}
            className="h-10 px-4 rounded-lg bg-danger hover:bg-danger/90 text-white text-body font-semibold inline-flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            {isDeleting ? (
              <span>Menghapus...</span>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Hapus Akun Admin</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
