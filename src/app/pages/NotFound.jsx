import { Link } from "react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { Home, ArrowLeft, Search } from "lucide-react";

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#003580]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0071C2]/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#003580]/3 rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">

        {/* 404 number */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[180px] md:text-[220px] font-black leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #003580 0%, #0071C2 50%, #003580 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.12,
            }}
          >
            404
          </span>
          {/* Compass icon overlaid */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-[spin_20s_linear_infinite]"
              >
                <circle cx="60" cy="60" r="56" stroke="#003580" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
                <circle cx="60" cy="60" r="44" stroke="#0071C2" strokeWidth="1" opacity="0.2" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="30" stroke="#003580" strokeWidth="2" fill="white" />
                  <circle cx="32" cy="32" r="4" fill="#003580" />
                  {/* Compass needle N */}
                  <polygon points="32,8 28,32 32,28 36,32" fill="#003580" />
                  {/* Compass needle S */}
                  <polygon points="32,56 28,32 32,36 36,32" fill="#CBD5E1" />
                  {/* Cardinal labels */}
                  <text x="29" y="6" fontSize="7" fill="#003580" fontWeight="bold">N</text>
                  <text x="29" y="62" fontSize="7" fill="#94A3B8">S</text>
                  <text x="2" y="35" fontSize="7" fill="#94A3B8">W</text>
                  <text x="56" y="35" fontSize="7" fill="#94A3B8">E</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">
            {t("notFound.title")}
          </h1>
          <p className="text-[#64748B] text-base leading-relaxed max-w-sm mx-auto">
            {t("notFound.subtitle")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#002a6b] text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg shadow-[#003580]/20"
          >
            <Home className="w-4 h-4" />
            {t("notFound.backHome")}
          </Link>

          <Link
            to="/search"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-[#F1F5F9] text-[#003580] border border-[#E2E8F0] px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
            {t("notFound.searchHotels")}
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
          <p className="text-xs text-[#94A3B8] uppercase tracking-widest font-medium">
            {t("notFound.errorCode")} 404
          </p>
        </div>
      </div>
    </div>
  );
}