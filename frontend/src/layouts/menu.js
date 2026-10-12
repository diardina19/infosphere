import {
  LayoutDashboard,
  Film,
  ListVideo,
  Monitor,
  PlayCircle,
  History,
  UserCog,
} from "lucide-react";

// Daftar menu sidebar. Untuk menambah halaman baru, cukup tambah satu baris di sini
// dan satu <Route> di routes/AppRoutes.jsx.
export const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Konten", path: "/konten", icon: Film },
  { label: "Playlist", path: "/playlist", icon: ListVideo },
  { label: "TV / Perangkat", path: "/perangkat", icon: Monitor },
  { label: "Playback", path: "/playback", icon: PlayCircle },
  { label: "History", path: "/history", icon: History },
  { label: "Akun Admin", path: "/akun-admin", icon: UserCog },
];