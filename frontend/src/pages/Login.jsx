import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthBanner from "../components/AuthBanner";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!password) {
      setError("Kata sandi wajib diisi.");
      return;
    }

    setIsLoading(true);

    // Simulasi proses autentikasi (TODO: hubungkan dengan API backend di folder services/)
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row">
      {/* Sisi Kiri: Banner InfoSphere & Navigasi ke Landing Page */}
      <AuthBanner />

      {/* Sisi Kanan: Kartu Login */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
        {/* Kartu form di tengah */}
        <div className="my-auto w-full max-w-md mx-auto">
          <div className="bg-white border border-line rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Header Form */}
            <div className="mb-6">
              <h2 className="text-section sm:text-title font-bold text-ink">
                Selamat datang kembali
              </h2>
              <p className="mt-2 text-body text-muted leading-relaxed">
                Silakan masukkan detail akun Anda untuk mengakses portal streaming.
              </p>
            </div>

            {/* Alert Error */}
            {error && (
              <div className="mb-5 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-body">
                {error}
              </div>
            )}

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-body font-medium text-ink mb-1.5"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama.anda@polibatam.ac.id"
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Field Kata Sandi */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-body font-medium text-ink mb-1.5"
                >
                  Kata sandi
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-11 pr-11 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition p-0.5 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Tombol Submit Masuk */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 mt-6 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <span>Masuk sekarang</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Link Lupa Kata Sandi */}
              <div className="pt-2 text-left">
                <Link
                  to="/lupa-kata-sandi"
                  className="text-body font-medium text-primary hover:text-dark hover:underline transition"
                >
                  Lupa kata sandi?
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Layanan Kampus */}
        <div className="text-center pt-6">
          <p className="text-caption text-muted">
            Pusat Layanan & Bantuan Jurusan Informatika Politeknik Negeri Batam
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
