import { Calendar, Users, MapPin } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function BookingSummary({ booking }) {
  const { t } = useLanguage();

  if (!booking) return null;

  const {
    hotel,
    checkIn,
    checkOut,
    guests,
    roomType,
    pricePerNight,
    nights,
    serviceFee,
    taxes,
  } = booking;

  const total = pricePerNight * nights + serviceFee + taxes;

  return (
    <div className="sticky top-28 bg-white rounded-2xl shadow-lg p-6 border border-[#E2E8F0]">
      <h3 className="text-xl font-bold text-[#0F172A] mb-6">
        {t("booking.bookingSummary")}
      </h3>

      {/* Hotel Info */}
      <div className="mb-6">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
        <h4 className="font-bold text-[#0F172A] mb-2">{hotel.name}</h4>
        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <MapPin className="w-4 h-4" />
          <span>{hotel.location}</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-4 mb-6 pb-6 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#64748B] mt-0.5" />
          <div>
            <p className="text-sm text-[#64748B]">{t("booking.checkIn")}</p>
            <p className="font-semibold text-[#0F172A]">
              {new Date(checkIn).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#64748B] mt-0.5" />
          <div>
            <p className="text-sm text-[#64748B]">{t("booking.checkOut")}</p>
            <p className="font-semibold text-[#0F172A]">
              {new Date(checkOut).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-[#64748B] mt-0.5" />
          <div>
            <p className="text-sm text-[#64748B]">{t("booking.guests")}</p>
            <p className="font-semibold text-[#0F172A]">
              {guests} {t("booking.adults")}
            </p>
          </div>
        </div>
      </div>

      {/* Room */}
      <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
        <p className="text-sm text-[#64748B]">Room Type</p>
        <p className="font-semibold text-[#0F172A]">{roomType}</p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-[#E2E8F0]">
        <div className="flex justify-between text-sm">
          <span className="text-[#64748B]">
            ${pricePerNight} × {nights} {t("booking.nights")}
          </span>
          <span className="font-semibold text-[#0F172A]">
            ${pricePerNight * nights}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[#64748B]">Service fee</span>
          <span className="font-semibold text-[#0F172A]">
            ${serviceFee}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[#64748B]">{t("booking.taxes")}</span>
          <span className="font-semibold text-[#0F172A]">
            ${taxes}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between mb-6">
        <span className="text-lg font-bold text-[#0F172A]">
          {t("booking.total")}
        </span>
        <span className="text-2xl font-bold text-[#003580]">
          ${total}
        </span>
      </div>

      <div className="bg-[#F0F9FF] rounded-lg p-4">
        <p className="text-xs text-[#0071C2] text-center">
          {t('booking.cancellation')}
        </p>
      </div>
    </div>
  );
}