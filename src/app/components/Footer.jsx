import { Link } from "react-router";
import { Hotel, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#003580] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Zenith Logo"
                  className="w-full h-full object-contain scale-125 transition-transform group-hover:scale-150"
                />
              </div>
              <span className="font-bold text-xl">Zenith</span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2.5">
              {[
                { key: "aboutUs" },
                { key: "careers" },
                { key: "press" },
                { key: "blog" },
              ].map(({ key }) => (
                <li key={key}>
                  <Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2.5">
              {[
                { key: "helpCenter" },
                { key: "contactUs" },
                { key: "safetyResource" },
                { key: "cancellationOptions" },
              ].map(({ key }) => (
                <li key={key}>
                  <Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2.5">
              {[
                { key: "privacyPolicy" },
                { key: "termsOfService" },
                { key: "cookiePolicy" },
                { key: "accessibility" },
              ].map(({ key }) => (
                <li key={key}>
                  <Link to="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/60 text-sm text-center">
            © {currentYear} Zenith. {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
