import { NavLink, useNavigate } from "react-router-dom";
import { Tv, LogOut } from "lucide-react";
import { menuItems } from "../layouts/menu";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: hapus token / data login di sini sebelum pindah halaman
    navigate("/login");
  };

  return (
    <aside className="w-60 shrink-0 self-start sticky top-0 h-screen bg-dark text-white flex flex-col">
      {/* Brand */}
      <div className="h-18 px-6 flex items-center gap-3 border-b border-white/10">
        <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
          <Tv size={20} />
        </span>
        <span>
          <span className="block text-body font-semibold">InfoSphere</span>
          <span className="block text-caption text-white/60">Sistem Manajemen</span>
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <p className="px-3 mb-3 text-caption uppercase tracking-wider text-white/50">
          Menu utama
        </p>
        <ul className="space-y-1">
          {menuItems.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  "flex items-center gap-3 h-10 px-3 rounded-lg text-body font-medium " +
                  (isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white")
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 h-10 px-3 rounded-lg text-body font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;