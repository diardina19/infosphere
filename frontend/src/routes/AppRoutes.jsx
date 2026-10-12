import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AdminLayout from "../layouts/AdminLayout";
import Konten from "../pages/Konten";

// Sementara, untuk halaman yang belum dibuat.
// Ganti elemen <Placeholder /> dengan halaman aslinya, misalnya <Konten />.
function Placeholder({ title }) {
  return (
    <div className="bg-white border border-line rounded-xl shadow-card p-6">
      <h1 className="text-card font-semibold">{title}</h1>
      <p className="mt-1 text-body text-muted">Halaman ini belum dibuat.</p>
    </div>
  );
}

// Sementara, sampai halaman login asli dibuat oleh tim.
// Tombolnya hanya untuk pindah ke dashboard saat pengembangan.
function LoginPlaceholder() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="w-full max-w-sm bg-white border border-line rounded-xl shadow-card p-8 text-center">
        <h1 className="text-section font-semibold">Login</h1>
        <p className="mt-2 text-body text-muted">
          Halaman login sedang dibuat oleh tim.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 h-10 px-5 inline-flex items-center rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold"
        >
          Lanjut ke Dashboard (sementara)
        </Link>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPlaceholder />} />

      {/* Halaman admin: semua memakai sidebar + header */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
        <Route path="/konten" element={<Konten />} />
        <Route path="/playlist" element={<Placeholder title="Playlist" />} />
        <Route path="/perangkat" element={<Placeholder title="TV / Perangkat" />} />
        <Route path="/playback" element={<Placeholder title="Playback" />} />
        <Route path="/history" element={<Placeholder title="History" />} />
        <Route path="/akun-admin" element={<Placeholder title="Akun Admin" />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;