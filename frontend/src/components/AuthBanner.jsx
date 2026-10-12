import { Link } from "react-router-dom";
import { Tv, ArrowLeft } from "lucide-react";
import authBg from "../assets/auth-bg.png";

function AuthBanner() {
  return (
    <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-screen bg-dark text-white flex flex-col justify-between p-8 sm:p-12 overflow-hidden select-none">
      {/* Background visual dengan gambar server / control room & overlay gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
        style={{ backgroundImage: `url(${authBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#001f3d]/95 via-dark/90 to-[#00172e]/98" />

      {/* Efek grid dot halus */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Bagian Atas: Logo InfoSphere & Tombol Kembali ke Landing Page */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <Link
          to="/"
          title="Kembali ke Halaman Utama"
          className="group flex items-center gap-3 transition"
        >
          <span className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white/20 transition shadow-sm">
            <Tv size={20} />
          </span>
          <div>
            <span className="block text-body font-semibold tracking-tight text-white group-hover:text-white/90">
              infosphere
            </span>
            <span className="block text-caption text-white/60">
              Digital Signage System
            </span>
          </div>
        </Link>

        {/* Navigasi cepat kembali ke Landing Page */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-caption font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-lg transition backdrop-blur-sm"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Kembali ke Beranda</span>
          <span className="sm:hidden">Beranda</span>
        </Link>
      </div>

      {/* Bagian Tengah: Headline & Deskripsi */}
      <div className="relative z-10 my-10 lg:my-auto max-w-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight">
          Kelola seluruh jaringan layar dalam satu tempat.
        </h1>
        <p className="mt-4 text-body sm:text-card text-white/70 leading-relaxed">
          Akses pusat kendali siaran video dan audio kampus secara terdistribusi,
          tersinkronisasi, dan dapat diandalkan.
        </p>
      </div>

      {/* Bagian Bawah: Copyright sistem */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <p className="text-caption text-white/50">
          © 2026 Infosphere V1.0. Sistem Digital Signage Terpadu
        </p>
      </div>
    </div>
  );
}

export default AuthBanner;
