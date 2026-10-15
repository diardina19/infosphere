const STATUS = {
  tayang: { label: 'Tayang', kelas: 'bg-[#2E8B57]/10 text-[#2E8B57]' },
  siap: { label: 'Siap', kelas: 'bg-[#EAF4FA] text-[#003B70]' },
  kosong: { label: 'Kosong', kelas: 'bg-[#F5F7F9] text-[#66727E]' },
}

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs ${STATUS[status].kelas}`}>
      {STATUS[status].label}
    </span>
  )
}