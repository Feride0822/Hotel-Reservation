import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Hotel, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t, language, changeLanguage, availableLanguages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".language-dropdown")) {
      setLanguageMenuOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <img
                src="/logo3.png"
                alt="Zenith Logo"
                className="w-full h-full object-contain scale-180"
              />
            </div>
            <span
              className={`font-bold text-xl tracking-tight ${
                scrolled || !isHome ? "text-[#003580]" : "text-white"
              }`}
            >
              Zenith
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/search"
              className={`font-medium transition-colors duration-200 hover:text-[#0071C2] ${
                scrolled || !isHome ? "text-[#0F172A]" : "text-white"
              }`}
            >
              {t("nav.stays")}
            </Link>
            <Link
              to="/search?deals=true"
              className={`font-medium transition-colors duration-200 hover:text-[#0071C2] ${
                scrolled || !isHome ? "text-[#0F172A]" : "text-white"
              }`}
            >
              {t("nav.home")}
            </Link>
          </div>

          {/* Language & Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative language-dropdown">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  scrolled || !isHome
                    ? "text-[#003580] hover:bg-[#003580]/5"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#F8FAFC] transition-colors ${
                        language === lang.code
                          ? "bg-[#F8FAFC] text-[#0071C2]"
                          : "text-[#0F172A]"
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/signin"
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                scrolled || !isHome
                  ? "text-[#003580] hover:bg-[#003580]/5"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {t("nav.signIn")}
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#0071C2] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {t("nav.register")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome
                ? "text-[#003580] hover:bg-[#003580]/5"
                : "text-white hover:bg-white/10"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-[#E2E8F0]"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Language Selector Mobile */}
              <div className="pb-4 border-b border-[#E2E8F0]">
                <div className="text-xs font-medium text-gray-500 mb-2 px-4">
                  {t("userDashboard.language")}
                </div>
                <div className="space-y-2">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                        language === lang.code
                          ? "bg-[#F8FAFC] text-[#0071C2]"
                          : "text-[#0F172A] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/search"
                className="block px-4 py-3 rounded-lg text-[#0F172A] font-medium hover:bg-[#F8FAFC] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.stays")}
              </Link>
              <Link
                to="/search?deals=true"
                className="block px-4 py-3 rounded-lg text-[#0F172A] font-medium hover:bg-[#F8FAFC] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <Link
                  to="/signin"
                  className="block px-4 py-3 rounded-lg text-[#003580] font-medium hover:bg-[#003580]/5 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.signIn")}
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#0071C2] transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
