import { Calendar, Users, MapPin, BedDouble } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month:   "long",
    day:     "numeric",
    year:    "numeric",
  });
}

export function BookingSummary({ room, checkIn, checkOut }) {
  const { t } = useLanguage();

  const type       = room?.room_type_rel ?? {};
  const image      = room?.images?.[0]   ?? null;
  const pricePerNight = type.base_price  ?? 0;

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const ms = new Date(checkOut) - new Date(checkIn);
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  })();

  const subtotal   = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.05);   // 5% service fee
  const taxes      = Math.round(subtotal * 0.12);   // 12% tax
  const total      = subtotal + serviceFee + taxes;

  return (
    <div className="sticky top-28 bg-white rounded-2xl shadow-lg p-6 border border-[#E2E8F0]">
      <h3 className="text-xl font-bold text-[#0F172A] mb-6">
        {t("booking.bookingSummary")}
      </h3>
 
      {/* Room image */}
      <div className="mb-6">
        {image ? (
          <img
            src={image}
            alt={type.type_name ?? "Room"}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        ) : (
          <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] flex items-center justify-center mb-4">
            <BedDouble className="w-10 h-10 text-[#94A3B8]" />
          </div>
        )}
 
        {room ? (
          <>
            <h4 className="font-bold text-[#0F172A] mb-1">
              {type.type_name ?? `Room ${room.room_number}`}
            </h4>
            {room.room_number && (
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <MapPin className="w-4 h-4" />
                <span>Room {room.room_number}{room.floor != null ? `, Floor ${room.floor}` : ""}</span>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-[#64748B]">Loading room details…</p>
        )}
      </div>
 
      {/* Dates */}
      <div className="space-y-4 mb-6 pb-6 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#64748B] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-[#64748B]">{t("booking.checkIn")}</p>
            <p className="font-semibold text-[#0F172A]">
              {checkIn ? formatDate(checkIn) : <span className="text-[#94A3B8]">Not selected</span>}
            </p>
          </div>
        </div>
 
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#64748B] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-[#64748B]">{t("booking.checkOut")}</p>
            <p className="font-semibold text-[#0F172A]">
              {checkOut ? formatDate(checkOut) : <span className="text-[#94A3B8]">Not selected</span>}
            </p>
          </div>
        </div>
 
        {nights > 0 && (
          <p className="text-sm text-[#0071C2] font-medium pl-8">
            {nights} {nights === 1 ? t("booking.night") ?? "night" : t("booking.nights")}
          </p>
        )}
      </div>
 
      {/* Room type */}
      {type.type_name && (
        <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
          <p className="text-sm text-[#64748B] mb-1">Room Type</p>
          <p className="font-semibold text-[#0F172A]">{type.type_name}</p>
          {type.description && (
            <p className="text-xs text-[#64748B] mt-1">{type.description}</p>
          )}
        </div>
      )}
 
      {/* Price Breakdown — only show when we have enough info */}
      {nights > 0 && pricePerNight > 0 ? (
        <>
          <div className="space-y-3 mb-6 pb-6 border-b border-[#E2E8F0]">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">
                ${pricePerNight} × {nights} {nights === 1 ? t("booking.night") ?? "night" : t("booking.nights")}
              </span>
              <span className="font-semibold text-[#0F172A]">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Service fee (5%)</span>
              <span className="font-semibold text-[#0F172A]">${serviceFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">{t("booking.taxes")} (12%)</span>
              <span className="font-semibold text-[#0F172A]">${taxes}</span>
            </div>
          </div>
 
          <div className="flex justify-between mb-6">
            <span className="text-lg font-bold text-[#0F172A]">{t("booking.total")}</span>
            <span className="text-2xl font-bold text-[#003580]">${total}</span>
          </div>
        </>
      ) : (
        <div className="mb-6 py-4 text-center text-sm text-[#94A3B8]">
          {!room
            ? "Loading price…"
            : "Select dates to see price breakdown"}
        </div>
      )}
 
      <div className="bg-[#F0F9FF] rounded-lg p-4">
        <p className="text-xs text-[#0071C2] text-center">
          {t("booking.cancellation")}
        </p>
      </div>
    </div>
  );
}