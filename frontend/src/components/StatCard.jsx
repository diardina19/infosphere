// Kartu angka ringkas. Bisa dipakai ulang di Dashboard maupun halaman lain.
// "children" dipakai kalau kartu butuh isi tambahan di bawah, misalnya progress bar.
function StatCard({ label, value, note, noteClass, icon: Icon, iconClass, children }) {
  return (
    <div className="bg-white border border-line rounded-xl shadow-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body text-muted">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-metric font-bold text-ink">{value}</span>
            {note && (
              <span className={`text-caption ${noteClass || "text-muted"}`}>
                {note}
              </span>
            )}
          </div>
        </div>
        <span
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            iconClass || "bg-tint text-primary"
          }`}
        >
          <Icon size={20} />
        </span>
      </div>
      {children}
    </div>
  );
}

export default StatCard;