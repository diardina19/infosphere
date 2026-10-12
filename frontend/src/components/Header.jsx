import { useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { menuItems } from "../layouts/menu";

// TODO: ganti dengan data admin yang sedang login (misalnya dari AuthContext)
const user = { name: "Admin", role: "Administrator" };

function Header() {
  const { pathname } = useLocation();
  const current = menuItems.find((item) => item.path === pathname);
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-10 h-18 bg-white border-b border-line px-8 flex items-center justify-between">
      <div className="flex items-center gap-2 text-body text-muted">
        <Home size={16} />
        <ChevronRight size={14} />
        <span className="font-medium text-ink">{current ? current.label : ""}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-tint text-primary text-caption font-semibold flex items-center justify-center">
          {initials}
        </span>
        <span className="leading-tight">
          <span className="block text-body font-medium text-ink">{user.name}</span>
          <span className="block text-caption text-muted">{user.role}</span>
        </span>
      </div>
    </header>
  );
}

export default Header;