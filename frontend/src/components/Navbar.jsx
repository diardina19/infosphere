import { Tv } from "lucide-react";

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
          <span className="w-10 h-10 rounded-lg bg-dark text-white flex items-center justify-center">
            <Tv size={20} />
          </span>
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

        <a
          href="/login"
          className="h-10 px-5 inline-flex items-center rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold"
        >
          Masuk
        </a>
      </div>
    </header>
  );
}

export default Navbar;