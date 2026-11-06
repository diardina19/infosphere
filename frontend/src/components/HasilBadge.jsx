const HASIL = {
  tayang: { label: "Sedang tayang", kelas: "bg-success/10 text-success" },
  dihentikan: { label: "Dihentikan", kelas: "bg-surface text-muted" },
  diganti: { label: "Diganti", kelas: "bg-tint text-primary" },
};

export default function HasilBadge({ hasil }) {
  const { label, kelas } = HASIL[hasil];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-caption font-medium ${kelas}`}
    >
      {label}
    </span>
  );
}