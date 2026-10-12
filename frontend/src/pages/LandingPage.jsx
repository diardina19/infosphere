import Navbar from "../components/Navbar";
import {
  Film,
  ListVideo,
  Monitor,
  PlayCircle,
  History,
  UserCog,
  Upload,
  CalendarClock,
  Activity,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

const features = [
  { icon: Film, title: "Manajemen konten", desc: "Simpan dan kelola materi siaran dalam satu pustaka yang rapi.", },
  { icon: ListVideo, title: "Playlist & jadwal", desc: "Susun kumpulan konten dan tentukan waktu penayangannya.", },
  { icon: Monitor, title: "TV / perangkat", desc: "Kenali layar di setiap lokasi dan lihat status koneksinya.", },
  { icon: PlayCircle, title: "Playback", desc: "Lihat playlist yang sedang diputar pada setiap perangkat.", },
  { icon: History, title: "History", desc: "Telusuri riwayat penayangan sebagai referensi saat meninjau aktivitas.", },
  { icon: UserCog, title: "Akun admin", desc: "Kelola daftar administrator, peran, dan informasi akun.", },
];

const steps = [
  { no: "01", icon: Upload, title: "Unggah konten", desc: "Tambahkan materi, beri kategori, dan simpan ke pustaka." },
  { no: "02", icon: ListVideo, title: "Susun playlist", desc: "Kelompokkan materi dan atur urutan tayangnya." },
  { no: "03", icon: CalendarClock, title: "Atur penayangan", desc: "Tentukan jadwal dan perangkat TV tujuan." },
  { no: "04", icon: Activity, title: "Pantau aktivitas", desc: "Lihat status perangkat, playback, dan riwayat." },
];

const screens = [
  { name: "TV Lobby Utama", playlist: "Playlist Pagi", status: "online" },
  { name: "TV Kantin", playlist: "Informasi Umum", status: "online" },
  { name: "TV Ruang Tunggu", playlist: "Layanan Pelanggan", status: "online" },
  { name: "TV Area Produksi", playlist: "-", status: "offline" },
];

const usage = [
  "Lihat status online dan offline setiap perangkat",
  "Ketahui playlist yang sedang tayang di tiap lokasi",
  "Tinjau riwayat penayangan kapan saja",
];

const faqs = [
  { q: "Siapa yang bisa mengakses sistem ini?", a: "Hanya administrator terdaftar. Akun dibuat dan dikelola oleh Super Admin." },
  { q: "Apakah konten bisa dijadwalkan?", a: "Bisa. Playlist dapat diberi jadwal tayang dan dikirim ke perangkat TV tertentu." },
  { q: "Bagaimana cara mengetahui TV sedang aktif?", a: "Setiap perangkat menampilkan status online atau offline di dashboard." },
  { q: "Apakah satu playlist bisa dipakai di banyak TV?", a: "Bisa. Satu playlist dapat ditujukan ke beberapa perangkat sekaligus." },
];

function Eyebrow({ children }) {
  return (
    <p className="text-caption uppercase tracking-wider text-primary">{children}</p>
  );
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-title font-semibold text-ink">{title}</h2>
      {desc && (
        <p className="mt-3 max-w-2xl mx-auto text-body text-muted">{desc}</p>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const online = status === "online";
  return (
    <span
      className={
        online
          ? "text-caption px-2 py-1 rounded-md bg-success/10 text-success"
          : "text-caption px-2 py-1 rounded-md bg-danger/10 text-danger"
      }
    >
      {online ? "Online" : "Offline"}
    </span>
  );
}

function LandingPage() {
  return (
    <div className="bg-white text-ink">
      <Navbar />

      {/* Hero */}
      <section id="beranda" className="bg-dark text-white scroll-mt-18">
        <div className="max-w-3xl mx-auto px-8 py-24 text-center">
          <span className="inline-block text-caption text-white/80 border border-white/20 rounded-full px-3 py-1">
            Sistem manajemen jaringan layar
          </span>
          <h1 className="mt-6 text-metric font-bold">
            Kelola seluruh jaringan layar
            <br />
            dalam satu tempat.
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-body text-white/70">
            Dari konten hingga perangkat, satukan pengelolaan siaran Anda.
            Susun playlist, atur jadwal, dan pantau layar di setiap lokasi.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-caption text-white/70">
            {["Konten terorganisir", "Jadwal terencana", "Perangkat terpantau"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check size={14} className="text-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="max-w-6xl mx-auto px-8 py-20 scroll-mt-18">
        <SectionHeader
          eyebrow="Fitur sistem"
          title="Semua kebutuhan siaran, saling terhubung."
          desc="Satu ruang kerja untuk mengelola materi, merencanakan penayangan, dan mengikuti aktivitas jaringan layar."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc, tags }) => (
            <article
              key={title}
              className="bg-white border border-line rounded-xl p-6 shadow-card"
            >
              <span className="w-10 h-10 rounded-lg bg-tint text-primary flex items-center justify-center">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-card font-semibold">{title}</h3>
              <p className="mt-2 text-body text-muted">{desc}</p>
              <p className="mt-4 text-caption text-primary">{tags}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="bg-surface scroll-mt-18">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <SectionHeader
            eyebrow="Cara kerja"
            title="Dari materi ke layar, dengan alur yang jelas."
          />

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {steps.map(({ no, icon: Icon, title, desc }) => (
              <div key={no}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-md bg-primary text-white text-caption font-semibold flex items-center justify-center">
                    {no}
                  </span>
                  <span className="flex-1 h-px bg-line" />
                  <Icon size={18} className="text-muted" />
                </div>
                <h3 className="mt-4 text-card font-semibold">{title}</h3>
                <p className="mt-2 text-body text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penggunaan */}
      <section
        id="penggunaan"
        className="max-w-6xl mx-auto px-8 py-20 grid gap-12 md:grid-cols-2 items-center scroll-mt-18"
      >
        <div>
          <Eyebrow>Penggunaan</Eyebrow>
          <h2 className="mt-2 text-title font-semibold">
            Pantau semua layar dari satu dashboard.
          </h2>
          <p className="mt-3 text-body text-muted">
            Tidak perlu datang ke lokasi untuk memastikan siaran berjalan.
            Semua informasi penting tersedia dalam satu tampilan.
          </p>
          <ul className="mt-6 space-y-3">
            {usage.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-tint text-primary flex items-center justify-center shrink-0">
                  <Check size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-line rounded-xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-line text-card font-semibold">
            Status perangkat
          </div>
          <ul>
            {screens.map((s) => (
              <li
                key={s.name}
                className="px-5 py-4 flex items-center justify-between border-b border-line last:border-b-0"
              >
                <div>
                  <p className="text-body font-medium">{s.name}</p>
                  <p className="text-caption text-muted">{s.playlist}</p>
                </div>
                <StatusBadge status={s.status} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-surface scroll-mt-18">
        <div className="max-w-3xl mx-auto px-8 py-20">
          <SectionHeader eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />

          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group bg-white border border-line rounded-lg px-5 py-4"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-body font-medium">
                  {item.q}
                  <ChevronDown
                    size={16}
                    className="text-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-body text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="bg-primary rounded-xl px-8 py-12 text-center text-white">
          <h2 className="text-title font-semibold">Siap mengelola layar Anda?</h2>
          <p className="mt-2 text-body text-white/70">
            Masuk sebagai administrator untuk mulai mengatur konten dan penayangan.
          </p>
          <a
            href="/login"
            className="mt-6 h-10 px-5 inline-flex items-center gap-2 rounded-lg bg-white text-primary text-body font-semibold hover:bg-tint"
          >
            Masuk ke Sistem
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-caption text-white/60">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-wrap justify-between gap-2">
          <span>© 2026 INFOSPHERE</span>
          <span>Sistem Manajemen Tv Terpusat</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;