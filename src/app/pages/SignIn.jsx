import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Phone, Lock, Eye, EyeOff, Hotel } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { loginWithEmail, sendOtp, loginWithPhone } from "../../api/authService";

export function SignIn() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0); // for OTP resend timer
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    countryCode: "+1",
    password: "",
    otp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let response;

      if (loginMethod === "email") {
        response = await loginWithEmail({
          email: formData.email,
          password: formData.password,
          rememberMe,
        });
      } else {
        response = await loginWithPhone({
          phone: `${formData.countryCode}${formData.phone}`,
          otp: formData.otp,
        });
      }

      // DEBUG: inspect backend response
      console.log("LOGIN RESPONSE:", response);

      // flexible token extraction
      const token =
        response.token ||
        response.accessToken ||
        response.data?.token ||
        response.data?.accessToken;

      const user = response.user || response.data?.user || null;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (user?.person_type) {
        localStorage.setItem("person_type", user.person_type);
      }
      // if token exists, navigate to dashboard, else show error
      if (token) {
        const personType = user?.person_type;
        if (personType === "super_admin") {
          navigate("/super-admin");
        } else if (personType === "guest_admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid server response: no token received");
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.detail && Array.isArray(data.detail)) {
        setError(data.detail.map((e) => e.msg).join(", "));
      } else if (typeof data?.detail === "string") {
        setError(data.detail);
      } else {
        setError(
          data?.message || data?.error || "Login failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await sendOtp({
        phone: `${formData.countryCode}${formData.phone}`,
      });

      setOtpSent(true);
      setSuccess(res.message || "OTP sent successfully");
      setTimer(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Brand & Image */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[#003580] to-[#0071C2] items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1758714919725-d2740fc99f14?w=1200"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-white max-w-md">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Hotel className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold">Zenith</span>
          </Link>
          <h2 className="text-4xl font-bold mb-4">{t("auth.signIn.title")}!</h2>
          <p className="text-xl text-white/90 mb-8">
            {t("auth.signIn.subtitle")}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Exclusive member deals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Manage all your bookings</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Save favorite properties</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-md">
              <img
                src="/logo.png"
                alt="Zenith Logo"
                className="w-full h-full object-contain scale-170"
              />
            </div>
            <span className="text-2xl font-bold text-[#003580]">Zenith</span>
          </Link>

          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
            {t("auth.signIn.title")}
          </h1>
          <p className="text-[#64748B] mb-8">{t("auth.signIn.subtitle")}</p>

          {/* Login Method Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F8FAFC] rounded-xl">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                loginMethod === "email"
                  ? "bg-white text-[#003580] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {t("auth.signIn.emailTab")}
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                loginMethod === "phone"
                  ? "bg-white text-[#003580] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {t("auth.signIn.phoneTab")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {loginMethod === "email" ? (
              <>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("auth.register.emailPlaceholder").split(" ")[0]}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
                      placeholder={t("auth.signIn.emailPlaceholder")}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("auth.signIn.password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-12 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
                      placeholder={t("auth.signIn.passwordPlaceholder")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#CBD5E1] text-[#0071C2] focus:ring-2 focus:ring-[#0071C2]"
                    />
                    <span className="text-sm text-[#64748B]">
                      {t("auth.signIn.rememberMe")}
                    </span>
                  </label>
                  <Link
                    to="#"
                    className="text-sm text-[#0071C2] hover:underline font-semibold"
                  >
                    {t("auth.signIn.forgotPassword")}
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("auth.register.phonePlaceholder").split(" ")[0]}{" "}
                    {t("auth.register.phonePlaceholder").split(" ")[1]}
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                      className="w-24 px-3 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] bg-white"
                    >
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                      <option value="+86">+86</option>
                      <option value="+998">+998</option>
                      <option value="+7">+7</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
                        placeholder={t("auth.signIn.phonePlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                    maxLength={6}
                    className="w-full px-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading || timer > 0}
                    className="mt-2 text-sm text-[#0071C2] hover:underline font-semibold disabled:opacity-50"
                  >
                    {loading
                      ? "Sending..."
                      : timer > 0
                        ? `Resend OTP in ${timer}s`
                        : otpSent
                          ? "Resend OTP"
                          : "Send OTP"}
                  </button>
                </div>
              </>
            )}
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : t("auth.signIn.signInButton")}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-[#64748B]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors font-semibold">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors font-semibold">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#64748B]">
            {t("auth.signIn.noAccount")}{" "}
            <Link
              to="/register"
              className="text-[#0071C2] font-semibold hover:underline"
            >
              {t("auth.signIn.signUp")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
