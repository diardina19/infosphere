import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import AuthBanner from "../components/AuthBanner";

function LupaKataSandi() {
  const navigate = useNavigate();

  // Langkah flow: 1 (Email) -> 2 (OTP) -> 3 (Password Baru) -> 4 (Berhasil)
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [mockOtp, setMockOtp] = useState("749201");

  const inputRefs = useRef([]);

  // Timer hitung mundur untuk kirim ulang OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handler Langkah 1: Kirim OTP ke Email
  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!email.includes("@")) {
      setError("Format alamat email tidak valid.");
      return;
    }

    setIsLoading(true);

    // Simulasi pengiriman kode OTP ke Gmail (Frontend Mock)
    setTimeout(() => {
      setIsLoading(false);
      setMockOtp("749201");
      setTimer(60);
      setStep(2);
    }, 600);
  };

  // Handler input digit OTP
  const handleOtpChange = (value, index) => {
    const cleanValue = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);
    setError("");

    // Pindah fokus ke kotak berikutnya jika diisi
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Tombol Backspace kembali ke kotak sebelumnya jika kosong
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Handler Langkah 2: Verifikasi Kode OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");

    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Silakan masukkan 6 digit kode OTP lengkap.");
      return;
    }

    // Untuk simulasi frontend: menerima mockOtp ('749201') atau '123456'
    if (fullOtp !== mockOtp && fullOtp !== "123456") {
      setError("Kode OTP salah. Cek tips demo di bawah atau masukkan kode 749201.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 500);
  };

  // Kirim ulang OTP
  const handleResendOtp = () => {
    if (timer > 0) return;
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setMockOtp("749201");
      inputRefs.current[0]?.focus();
    }, 400);
  };

  // Handler Langkah 3: Simpan Sandi Baru
  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword) {
      setError("Kata sandi baru wajib diisi.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Kata sandi minimal terdiri dari 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsLoading(true);

    // Simulasi penyimpanan kata sandi baru (Frontend Mock)
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row">
      {/* Sisi Kiri: Banner InfoSphere & Navigasi ke Landing Page */}
      <AuthBanner />

      {/* Sisi Kanan: Kartu Alur OTP */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
        <div className="my-auto w-full max-w-md mx-auto">
          <div className="bg-white border border-line rounded-2xl shadow-xl p-8 sm:p-10">

            {/* Indikator Langkah (Step indicator) */}
            {step < 4 && (
              <div className="mb-6 flex items-center justify-between text-caption font-medium">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-caption font-bold ${
                      step >= 1 ? "bg-primary text-white" : "bg-line text-muted"
                    }`}
                  >
                    1
                  </span>
                  <span className={step === 1 ? "text-primary font-semibold" : "text-muted"}>
                    Email
                  </span>
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-line" />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-caption font-bold ${
                      step >= 2 ? "bg-primary text-white" : "bg-line text-muted"
                    }`}
                  >
                    2
                  </span>
                  <span className={step === 2 ? "text-primary font-semibold" : "text-muted"}>
                    OTP
                  </span>
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-line" />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-caption font-bold ${
                      step >= 3 ? "bg-primary text-white" : "bg-line text-muted"
                    }`}
                  >
                    3
                  </span>
                  <span className={step === 3 ? "text-primary font-semibold" : "text-muted"}>
                    Sandi Baru
                  </span>
                </div>
              </div>
            )}

            {/* Alert Pesan Error */}
            {error && (
              <div className="mb-5 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-body">
                {error}
              </div>
            )}

            {/* ========================================================
                LANGKAH 1: Masukkan Alamat Email
               ======================================================== */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-section sm:text-title font-bold text-ink">
                    Lupa Kata Sandi
                  </h2>
                  <p className="mt-2 text-body text-muted leading-relaxed">
                    Masukkan email akun Anda untuk menerima 6 digit kode OTP pemulihan kata sandi.
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="block text-body font-medium text-ink mb-1.5"
                    >
                      Email akun
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                      />
                      <input
                        id="reset-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama.anda@polibatam.ac.id"
                        className="w-full h-11 pl-11 pr-4 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 mt-6 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <span>Mengirim kode OTP...</span>
                    ) : (
                      <>
                        <span>Kirim Kode OTP</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-left">
                    <Link
                      to="/login"
                      className="text-body font-medium text-primary hover:text-dark hover:underline inline-flex items-center gap-1.5 transition"
                    >
                      <ArrowLeft size={14} />
                      <span>Kembali ke halaman login</span>
                    </Link>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================================
                LANGKAH 2: Verifikasi 6 Digit OTP dari Gmail
               ======================================================== */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-section sm:text-title font-bold text-ink">
                    Verifikasi Kode OTP
                  </h2>
                  <p className="mt-2 text-body text-muted leading-relaxed">
                    Kode verifikasi 6 digit telah dikirim ke{" "}
                    <span className="font-semibold text-ink">{email}</span>.
                  </p>
                </div>

                {/* Banner Tips Demo OTP */}
                <div className="mb-5 p-3 rounded-lg bg-tint border border-accent/20 text-caption text-primary flex items-start gap-2">
                  <KeyRound size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Simulasi Demo Frontend:</span>
                    <br />
                    Gunakan kode OTP <strong className="font-mono text-ink text-body bg-white px-1.5 py-0.5 rounded border border-line">{mockOtp}</strong> atau <strong className="font-mono text-ink text-body bg-white px-1.5 py-0.5 rounded border border-line">123456</strong>.
                  </div>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div>
                    <label className="block text-body font-medium text-ink mb-2">
                      Masukkan 6 digit kode OTP
                    </label>
                    <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (inputRefs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          onKeyDown={(e) => handleOtpKeyDown(e.target.value, idx)}
                          className="w-11 h-12 text-center text-section font-bold font-mono rounded-lg border border-line bg-white text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Kirim Ulang OTP */}
                  <div className="flex items-center justify-between text-caption text-muted">
                    <span>Tidak menerima kode?</span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={timer > 0 || isLoading}
                      className={`inline-flex items-center gap-1 font-medium transition ${
                        timer > 0
                          ? "text-muted/60 cursor-not-allowed"
                          : "text-primary hover:underline cursor-pointer"
                      }`}
                    >
                      <RotateCcw size={12} />
                      {timer > 0 ? `Kirim ulang (${timer}s)` : "Kirim Ulang OTP"}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 mt-4 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <span>Memverifikasi...</span>
                    ) : (
                      <>
                        <span>Verifikasi Kode OTP</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="pt-1 flex items-center justify-between text-body">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError("");
                      }}
                      className="text-muted hover:text-ink text-caption inline-flex items-center gap-1 transition cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Ganti email</span>
                    </button>

                    <Link
                      to="/login"
                      className="text-caption font-medium text-primary hover:underline"
                    >
                      Batal
                    </Link>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================================
                LANGKAH 3: Buat Kata Sandi Baru
               ======================================================== */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-section sm:text-title font-bold text-ink">
                    Atur Sandi Baru
                  </h2>
                  <p className="mt-2 text-body text-muted leading-relaxed">
                    Silakan buat kata sandi baru untuk akun Anda.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* Kata Sandi Baru */}
                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-body font-medium text-ink mb-1.5"
                    >
                      Kata sandi baru
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                      />
                      <input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="w-full h-11 pl-11 pr-11 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition p-0.5 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Konfirmasi Kata Sandi Baru */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-body font-medium text-ink mb-1.5"
                    >
                      Konfirmasi kata sandi baru
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                      />
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi kata sandi baru"
                        className="w-full h-11 pl-11 pr-11 rounded-lg border border-line bg-white text-ink text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition p-0.5 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 mt-6 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <span>Menyimpan sandi baru...</span>
                    ) : (
                      <>
                        <span>Perbarui Kata Sandi</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================
                LANGKAH 4: Konfirmasi Berhasil
               ======================================================== */}
            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-success/10 text-success flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>

                <div>
                  <h2 className="text-section sm:text-title font-bold text-ink">
                    Kata Sandi Berhasil Diperbarui!
                  </h2>
                  <p className="mt-2 text-body text-muted leading-relaxed">
                    Kata sandi untuk akun <span className="font-semibold text-ink">{email}</span> telah berhasil diubah. Silakan login kembali dengan sandi baru Anda.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full h-11 rounded-lg bg-primary hover:bg-dark text-white text-body font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <span>Masuk Sekarang ke Sistem</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

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

export default LupaKataSandi;
