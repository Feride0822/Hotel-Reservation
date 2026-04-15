import { Link } from "react-router";
import { Star, MapPin, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export function HotelCard({ hotel }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/hotel/${hotel.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-[#64748B]'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-[#003580] text-white rounded-lg">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm font-semibold">{hotel.rating}</span>
            </div>
            <span className="text-sm text-[#64748B]">({hotel.reviews.toLocaleString()} {t('hotelCard.reviews')})</span>
          </div>

          {/* Hotel Name */}
          <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#0071C2] transition-colors line-clamp-1">
            {hotel.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[#64748B] mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{hotel.location}</span>
          </div>

          {/* Features */}
          {hotel.features && hotel.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-2.5 py-1 bg-[#F8FAFC] text-[#64748B] rounded-lg"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline justify-between pt-3 border-t border-[#E2E8F0]">
            <div>
              <span className="text-sm text-[#64748B]">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#003580]">${hotel.price}</span>
                <span className="text-sm text-[#64748B]">/{t('hotelCard.perNight')}</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-[#003580] text-white rounded-lg text-sm font-semibold group-hover:bg-[#0071C2] transition-colors">
              {t('hotelCard.viewDetails')}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
