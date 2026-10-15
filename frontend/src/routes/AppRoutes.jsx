import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import LupaKataSandi from "../pages/LupaKataSandi";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Konten from "../pages/Konten";
import Perangkat from "../pages/Perangkat";
import Playlist from '../pages/Playlist';
import PlaylistDetail from '../pages/PlaylistDetail';

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

function AppRoutes() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lupa-kata-sandi" element={<LupaKataSandi />} />
      <Route path="/forgot-password" element={<LupaKataSandi />} />


      {/* Halaman admin: semua memakai sidebar + header */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/konten" element={<Konten />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:id" element={<PlaylistDetail />} />
        <Route path="/perangkat" element={<Perangkat />} />
        <Route path="/playback" element={<Placeholder title="Playback" />} />
        <Route path="/history" element={<Placeholder title="History" />} />
        <Route path="/akun-admin" element={<Placeholder title="Akun Admin" />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;