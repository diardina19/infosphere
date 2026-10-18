import { Pencil, ShieldCheck, Mail, User, CheckCircle2 } from "lucide-react";

export default function AkunSayaCard({ currentAdmin, onEditClick }) {
  if (!currentAdmin) return null;

  const initials = (currentAdmin.name || "RA")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border border-line rounded-2xl shadow-card p-6 flex flex-col items-center text-center h-full justify-between">
      {/* Bagian Atas: Header & Informasi Profil */}
      <div className="w-full flex flex-col items-center">
        {/* Judul Kartu */}
        <div className="w-full text-left pb-4 border-b border-line mb-6">
          <h3 className="text-card font-bold text-ink">Profil Saya</h3>
          <p className="text-caption text-muted">Akun administrator Anda saat ini</p>
        </div>

        {/* Avatar Foto Profil atau Inisial */}
        <div className="relative mb-4">
          {currentAdmin.avatar ? (
            <img
              src={currentAdmin.avatar}
              alt={currentAdmin.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary/20 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-tint via-blue-50 to-[#dceaf5] border-2 border-primary/20 flex items-center justify-center shadow-inner">
              <span className="text-2xl font-bold text-primary tracking-wide">
                {initials}
              </span>
            </div>
          )}
          <div
            title="Akun Terverifikasi & Aktif"
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-success text-white flex items-center justify-center border-2 border-white shadow-sm"
          >
            <CheckCircle2 size={15} />
          </div>
        </div>

        {/* Identitas Admin */}
        <h2 className="text-section font-bold text-ink leading-tight">
          {currentAdmin.name}
        </h2>
        <p className="text-body text-muted mt-1 break-all">
          {currentAdmin.email}
        </p>

        {/* Badge Akun */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tint text-primary text-caption font-semibold border border-primary/15 shadow-2xs">
            <ShieldCheck size={13} />
            Akun Anda
          </span>
        </div>

        {/* Status Akun */}
        <div className="w-full mt-6 pt-4 border-t border-line text-left text-caption">
          <div className="flex items-center justify-between text-muted">
            <span>Status Akun:</span>
            <span className="font-medium text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Tombol Aksi Edit Akun */}
      <div className="w-full pt-6">
        <button
          type="button"
          onClick={onEditClick}
          className="w-full h-11 rounded-lg bg-surface hover:bg-tint text-primary hover:text-dark border border-line hover:border-primary/30 text-body font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
        >
          <Pencil size={16} />
          <span>Edit Akun Saya</span>
        </button>
      </div>
    </div>
  );
}
