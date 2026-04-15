import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

export function SearchBar({ variant = "hero" }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">{t('search.destination')}</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder={t('search.destinationPlaceholder')}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] text-sm"
            />
          </div>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">{t('search.checkIn')}</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] text-sm"
            />
          </div>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">{t('search.checkOut')}</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] text-sm"
            />
          </div>
        </div>

        <div className="w-32">
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">{t('search.guests')}</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] text-sm appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? t('search.guests').slice(0, -1) : t('search.guests')}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-[#003580] text-white rounded-lg hover:bg-[#0071C2] transition-colors font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">{t('search.search')}</span>
        </button>
      </form>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">{t('search.destination')}</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder={t('search.destinationPlaceholder')}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">{t('search.checkIn')}</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">{t('search.checkOut')}</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">{t('search.guests')}</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0071C2] transition-colors appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? t('search.guests').slice(0, -1) : t('search.guests')}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
      >
        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
        {t('search.search')} {t('nav.stays')}
      </button>
    </motion.form>
  );
}
