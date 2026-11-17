import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import authBg from "../assets/auth-bg.png";
import {
  Film,
  ListVideo,
  Monitor,
  PlayCircle,
  History,
  UserCog,
  Upload,
  Radio,
  Activity,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Manajemen konten",
    desc: "Unggah video siaran ke pustaka dan hapus yang sudah tidak dipakai.",
  },
  {
    icon: ListVideo,
    title: "Playlist",
    desc: "Susun konten ke dalam playlist dan atur urutan tayangnya.",
  },
  {
    icon: Monitor,
    title: "TV / perangkat",
    desc: "Daftarkan TV lewat alamat IP dan pantau status online atau offline-nya.",
  },
  {
    icon: PlayCircle,
    title: "Playback",
    desc: "Pilih playlist dan TV tujuan, lalu putar atau hentikan secara serentak.",
  },
  {
    icon: History,
    title: "History",
    desc: "Setiap siaran tercatat lengkap dengan playlist, TV, dan waktunya.",
  },
  {
    icon: UserCog,
    title: "Akun admin",
    desc: "Tambah admin baru, ubah password, dan nonaktifkan akun yang tidak lagi dipakai.",
  },
];

const steps = [
  { no: "01", icon: Upload, title: "Unggah konten", desc: "Tambahkan video ke pustaka konten." },
  { no: "02", icon: ListVideo, title: "Susun playlist", desc: "Kelompokkan video dan atur urutan tayangnya." },
  { no: "03", icon: Radio, title: "Pilih TV dan putar", desc: "Tentukan TV tujuan, lalu tekan Putar. Semua TV tayang serentak." },
  { no: "04", icon: Activity, title: "Pantau aktivitas", desc: "Lihat status TV dan riwayat setiap siaran." },
];

const screens = [
  { name: "TV-KANTIN-01", ip: "192.168.1.101", status: "online" },
  { name: "TV-KANTIN-02", ip: "192.168.1.102", status: "online" },
  { name: "TV-KANTIN-03", ip: "192.168.1.103", status: "online" },
  { name: "TV-KANTIN-04", ip: "192.168.1.104", status: "offline" },
];

const usage = [
  "Lihat status online dan offline setiap TV",
  "Ketahui playlist yang sedang tayang dan di TV mana",
  "Tinjau riwayat siaran kapan saja",
];

const faqs = [
  {
    q: "Siapa yang bisa mengakses sistem ini?",
    a: "Hanya administrator terdaftar. Semua administrator memiliki hak akses yang sama untuk mengelola siaran.",
  },
  {
    q: "Bagaimana cara memutar siaran ke TV?",
    a: "Pilih playlist dan TV tujuan di menu Playback, lalu tekan Putar. Semua TV yang dipilih menayangkan playlist yang sama secara serentak. Tekan Hentikan untuk mengakhiri.",
  },
  {
    q: "Apakah sistem membutuhkan internet?",
    a: "Tidak. Sistem berjalan di jaringan lokal perusahaan, jadi TV tidak perlu terhubung ke internet.",
  },
  {
    q: "Berapa banyak TV yang bisa dihubungkan?",
    a: "Penerapan awal dimulai dari 8 TV dan dirancang bisa bertambah hingga sekitar 100 TV. Status online atau offline tiap TV terlihat di dashboard.",
  },
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
      <section
        id="beranda"
        className="relative bg-dark text-white scroll-mt-18 overflow-hidden select-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none"
          style={{ backgroundImage: `url(${authBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001f3d]/80 via-[#002b50]/75 to-[#00172e]/85 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-8 py-24 text-center">
          <span className="inline-block text-caption text-white/90 bg-white/10 border border-white/20 rounded-full px-3.5 py-1">
            Sistem Manajemen TV
          </span>
          <h1 className="mt-6 text-metric font-bold text-white">
            Kelola seluruh layar informasi perusahaan
            <br />
            dalam satu tempat.
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-body text-white/80 leading-relaxed">
            Unggah konten, susun playlist, dan siarkan serentak ke seluruh TV
            informasi perusahaan dari satu dashboard.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-caption text-white/80">
            {["Tayang seragam", "Update sekali, serentak", "Status TV terpantau"].map((item) => (
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
          desc="Satu ruang kerja untuk mengelola konten, menyusun playlist, menyiarkan ke TV, dan memantau aktivitasnya."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="bg-white border border-line rounded-xl p-6 shadow-card"
            >
              <span className="w-10 h-10 rounded-lg bg-tint text-primary flex items-center justify-center">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-card font-semibold">{title}</h3>
              <p className="mt-2 text-body text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="bg-surface scroll-mt-18">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <SectionHeader
            eyebrow="Cara kerja"
            title="Dari video ke layar, dengan alur yang jelas."
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
            Tidak perlu lagi mendatangi tiap TV untuk memperbarui atau memeriksa
            tampilannya. Semua informasi penting tersedia dalam satu tampilan.
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
          <div className="px-5 py-4 border-b border-line flex items-center justify-between gap-3">
            <span className="text-card font-semibold">Status perangkat</span>
            <span className="text-caption text-muted">
              Sedang tayang: Informasi Umum
            </span>
          </div>
          <ul>
            {screens.map((s) => (
              <li
                key={s.name}
                className="px-5 py-4 flex items-center justify-between border-b border-line last:border-b-0"
              >
                <div>
                  <p className="text-body font-medium">{s.name}</p>
                  <p className="font-mono text-caption text-muted">{s.ip}</p>
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
            Masuk sebagai administrator untuk mulai mengelola konten dan siaran.
          </p>
          <Link
            to="/login"
            className="mt-6 h-10 px-5 inline-flex items-center gap-2 rounded-lg bg-white text-primary text-body font-semibold hover:bg-tint transition"
          >
            Masuk ke Sistem
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-caption text-white/60">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-wrap justify-between gap-2">
          <span>© 2026 INFOSPHERE</span>
          <span>Sistem Manajemen TV Terpusat</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;