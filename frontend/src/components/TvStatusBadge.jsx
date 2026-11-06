export default function TvStatusBadge({ online }) {
  const kelas = online ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
  const titik = online ? 'bg-success' : 'bg-danger'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-medium ${kelas}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${titik}`} />
      {online ? 'Online' : 'Offline'}
    </span>
  )
}