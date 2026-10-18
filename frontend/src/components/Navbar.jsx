import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const links = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara kerja", href: "#cara-kerja" },
  { label: "Penggunaan", href: "#penggunaan" },
  { label: "FAQ", href: "#faq" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-18 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto h-full px-8 flex items-center justify-between">
        <a href="#beranda" className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Logo InfoSphere"
            className="w-10 h-10 rounded-lg object-contain bg-white p-1 border border-line shadow-2xs"
          />
          <span>
            <span className="block text-body font-semibold text-ink">INFOSPHERE</span>
            <span className="block text-caption text-muted">Sistem Manajemen</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body font-medium text-muted hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          to="/login"
          className="h-10 px-5 inline-flex items-center rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold transition"
        >
          Masuk
        </Link>
      </div>
    </header>
  );
}

export default Navbar;