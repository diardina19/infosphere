import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home, ChevronRight, ChevronDown } from "lucide-react";
import { menuItems } from "../layouts/menu";
import { getCurrentAdmin } from "../services/adminService";

function Header() {
  const { pathname } = useLocation();
  const current = menuItems.find((item) => item.path === pathname);

  const [currentUser, setCurrentUser] = useState(() => getCurrentAdmin());

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setCurrentUser(e.detail);
      }
    };
    window.addEventListener("admin-profile-updated", handleUpdate);
    return () => {
      window.removeEventListener("admin-profile-updated", handleUpdate);
    };
  }, []);

  const userName = currentUser?.name || "Raka Aditya";
  const initials = userName
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

      <div className="flex items-center gap-3 cursor-pointer">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={userName}
            className="w-9 h-9 rounded-full object-cover border border-primary/20"
          />
        ) : (
          <span className="w-9 h-9 rounded-full bg-tint text-primary text-caption font-semibold flex items-center justify-center">
            {initials}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          <span className="text-body font-medium text-ink">{userName}</span>
          <ChevronDown size={14} className="text-muted" />
        </div>
      </div>
    </header>
  );
}

export default Header;