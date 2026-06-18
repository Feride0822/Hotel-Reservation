import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Hotel,
  User,
  Globe,
  Check,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { registerWithEmail } from "../../api/authService";

export function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [registerMethod, setRegisterMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    countryCode: "",
    otp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // confirm password check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // terms check
    if (!agreeToTerms) {
      setError("You must accept the terms");
      return;
    }

    try {
      setLoading(true);

      // backend swagger payload
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || null,
        country: formData.country,
        // terms_accepted: agreeToTerms,
      };

      const res = await registerWithEmail(payload);

      console.log("REGISTER RESPONSE:", res);

      if (res?.token) localStorage.setItem("token", res.token);
      if (res?.user) localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/signin");
    } catch (err) {
      const data = err.response?.data;
      console.log("FULL ERROR:", JSON.stringify(err.response?.data, null, 2));

      if (data?.detail && Array.isArray(data.detail)) {
        setError(data.detail.map((e) => e.msg).join(", "));
      } else if (typeof data?.detail === "string") {
        setError(data.detail);
      } else if (Array.isArray(data)) {
        setError(data.map((e) => e.msg).join(", "));
      } else {
        setError(
          data?.message ||
            data?.error ||
            "Registration failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["#EF4444", "#F97316", "#F5A623", "#22C55E"];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Brand & Image */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[#0071C2] to-[#003580] items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=1200"
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
          <h2 className="text-4xl font-bold mb-4">
            {t("auth.register.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t("auth.register.subtitle")}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Access to exclusive member-only deals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Earn rewards with every booking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Save and manage your favorite hotels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex items-center justify-center p-8 bg-background overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md py-8"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-md">
              <img
                src="/logo.png"
                alt="Zenith Logo"
                className="w-full h-full object-contain scale-170"
              />
            </div>
            <span className="text-2xl font-bold text-[#003580]">Zenith</span>
          </Link>

          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
            {t("auth.register.title")}
          </h1>
          <p className="text-[#64748B] mb-8">{t("auth.register.subtitle")}</p>

          {/* Registration Method Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F8FAFC] rounded-xl">
            <button
              onClick={() => setRegisterMethod("email")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                registerMethod === "email"
                  ? "bg-white text-[#003580] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {t("auth.register.emailTab")}
            </button>
            <button
              onClick={() => setRegisterMethod("phone")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                registerMethod === "phone"
                  ? "bg-white text-[#003580] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {t("auth.register.phoneTab")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                {t("auth.register.firstName")} & {t("auth.register.lastName")}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <div className="grid grid-cols-2 gap-3">
                  {/* First Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
                      placeholder="First name"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {registerMethod === "email" ? (
              <>
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("booking.email")}
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
                      placeholder={t("auth.register.emailPlaceholder")}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("auth.register.password")}
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
                      placeholder={t("auth.register.passwordPlaceholder")}
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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${(passwordStrength / 4) * 100}%`,
                              backgroundColor:
                                strengthColors[passwordStrength - 1] ||
                                strengthColors[0],
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color:
                              strengthColors[passwordStrength - 1] ||
                              strengthColors[0],
                          }}
                        >
                          {strengthLabels[passwordStrength - 1] ||
                            strengthLabels[0]}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`flex items-center gap-2 text-xs ${formData.password.length >= 8 ? "text-[#22C55E]" : "text-[#64748B]"}`}
                        >
                          {formData.password.length >= 8 ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                          At least 8 characters
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? "text-[#22C55E]" : "text-[#64748B]"}`}
                        >
                          {/[A-Z]/.test(formData.password) &&
                          /[a-z]/.test(formData.password) ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                          Uppercase & lowercase letters
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("auth.register.confirmPassword")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none transition-colors ${
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword
                          ? "border-[#EF4444] focus:border-[#EF4444]"
                          : "border-[#E2E8F0] focus:border-[#0071C2]"
                      }`}
                      placeholder={t(
                        "auth.register.confirmPasswordPlaceholder",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="mt-1 text-xs text-[#EF4444]">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </>
            ) : (
              <>
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("booking.phone")}
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
                      required
                      className="w-24 px-3 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] bg-white"
                    >
                      <option value="" disabled>
                        Code
                      </option>
                      <option value="+93">🇦🇫 +93</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+994">🇦🇿 +994</option>
                      <option value="+375">🇧🇾 +375</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+1">🇨🇦 +1</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+62">🇮🇩 +62</option>
                      <option value="+98">🇮🇷 +98</option>
                      <option value="+964">🇮🇶 +964</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+7">🇰🇿 +7</option>
                      <option value="+996">🇰🇬 +996</option>
                      <option value="+60">🇲🇾 +60</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+48">🇵🇱 +48</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+992">🇹🇯 +992</option>
                      <option value="+993">🇹🇲 +993</option>
                      <option value="+90">🇹🇷 +90</option>
                      <option value="+380">🇺🇦 +380</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+998">🇺🇿 +998</option>
                      <option value="+84">🇻🇳 +84</option>
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
                        placeholder={t("auth.register.phonePlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                {/* OTP */}
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
                    className="mt-2 text-sm text-[#0071C2] hover:underline font-semibold"
                  >
                    Send OTP
                  </button>
                </div>

                {/* Set Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("auth.register.password")}
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
                      placeholder={t("auth.register.passwordPlaceholder")}
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
              </>
            )}

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                {t("guestAdminDashboard.country")}
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <select
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] bg-white appearance-none"
                >
                  <option value="">Select your country</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AU">Australia</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BY">Belarus</option>
                  <option value="BR">Brazil</option>
                  <option value="CA">Canada</option>
                  <option value="CN">China</option>
                  <option value="EG">Egypt</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran</option>
                  <option value="IQ">Iraq</option>
                  <option value="IT">Italy</option>
                  <option value="JP">Japan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="MY">Malaysia</option>
                  <option value="MX">Mexico</option>
                  <option value="NL">Netherlands</option>
                  <option value="PK">Pakistan</option>
                  <option value="PL">Poland</option>
                  <option value="RU">Russia</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="KR">South Korea</option>
                  <option value="ES">Spain</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TR">Turkey</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VN">Vietnam</option>
                </select>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5 rounded border-[#CBD5E1] text-[#0071C2] focus:ring-2 focus:ring-[#0071C2]"
                />
                <span className="text-sm text-[#64748B]">
                  {t("auth.register.agree")}{" "}
                  <a href="#" className="text-[#0071C2] hover:underline">
                    {t("auth.register.terms")}
                  </a>
                </span>
              </label>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#EF4444] text-center">
                {error}
              </div>
            )}
            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!agreeToTerms || loading}
            >
              {loading ? "Creating..." : t("auth.register.createAccount")}
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#64748B]">
            {t("auth.register.haveAccount")}{" "}
            <Link
              to="/signin"
              className="text-[#0071C2] font-semibold hover:underline"
            >
              {t("auth.register.signIn")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
