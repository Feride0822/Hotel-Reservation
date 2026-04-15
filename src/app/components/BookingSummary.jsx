import { Calendar, Users, MapPin } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function BookingSummary() {
  const { t } = useLanguage();

  return (
    <div className="sticky top-28 bg-white rounded-2xl shadow-lg p-6 border border-[#E2E8F0]">
      <h3 className="text-xl font-bold text-[#0F172A] mb-6">{t('booking.bookingSummary')}</h3>

      {/* Hotel Info */}
      <div className="mb-6">
        <img
          src="https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=400"
          alt="Oceanview Paradise Resort"
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
        <h4 className="font-bold text-[#0F172A] mb-2">Oceanview Paradise Resort</h4>
        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <MapPin className="w-4 h-4" />
          <span>Maldives</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-4 mb-6 pb-6 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#64748B] mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#64748B]">{t('booking.checkIn')}</p>
            <p className="font-semibold text-[#0F172A]">April 20, 2026</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#64748B] mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#64748B]">{t('booking.checkOut')}</p>
            <p className="font-semibold text-[#0F172A]">April 25, 2026</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-[#64748B] mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#64748B]">{t('booking.guests')}</p>
            <p className="font-semibold text-[#0F172A]">2 {t('booking.adults')}</p>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
        <p className="text-sm text-[#64748B] mb-1">Room Type</p>
        <p className="font-semibold text-[#0F172A]">Deluxe Ocean View</p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">$450 × 5 {t('booking.nights')}</span>
          <span className="font-semibold text-[#0F172A]">$2,250</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">Service fee</span>
          <span className="font-semibold text-[#0F172A]">$112</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">{t('booking.taxes')}</span>
          <span className="font-semibold text-[#0F172A]">$236</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-bold text-[#0F172A]">{t('booking.total')}</span>
        <span className="text-2xl font-bold text-[#003580]">$2,598</span>
      </div>

      <div className="bg-[#F0F9FF] rounded-lg p-4">
        <p className="text-xs text-[#0071C2] text-center">
          Free cancellation up to 24 hours before check-in
        </p>
      </div>
    </div>
  );
}
