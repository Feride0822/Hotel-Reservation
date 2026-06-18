import { Link, useSearchParams } from "react-router";
import { Users, Maximize, BedDouble } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function RoomCard({ room, hotelId }) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  // { id, hotel_id, room_number, floor, status, images[], amenities[],
  //   room_type_rel: { id, type_name, description, base_price, capacity } }
  const type     = room.room_type_rel ?? {};
  const image    = room.images?.[0] ?? null;
  const price    = type.base_price ?? null;
  const capacity = type.capacity   ?? null;
  const amenities = room.amenities ?? [];

  // Carry check_in / check_out forward from the search so Booking pre-fills dates
  const checkIn  = searchParams.get("check_in")  ?? "";
  const checkOut = searchParams.get("check_out") ?? "";
  const dateParams = new URLSearchParams();
  if (checkIn)  dateParams.set("check_in",  checkIn);
  if (checkOut) dateParams.set("check_out", checkOut);
  const dateQuery = dateParams.toString() ? `?${dateParams.toString()}` : "";
 
  const isAvailable = room.status?.toLowerCase() === "available";

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
 
        {/* Image */}
        <div className="md:col-span-1">
          {image ? (
            <img
              src={image}
              alt={type.type_name ?? `Room ${room.room_number}`}
              className="w-full h-48 md:h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-48 md:h-full rounded-xl bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] flex items-center justify-center">
              <BedDouble className="w-10 h-10 text-[#94A3B8]" />
            </div>
          )}
        </div>
 
        {/* Details */}
        <div className="md:col-span-2 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-2xl font-bold text-[#0F172A]">
                {type.type_name ?? `Room ${room.room_number}`}
              </h3>
              {/* Availability badge */}
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isAvailable ? "Available" : room.status}
              </span>
            </div>
 
            {type.description && (
              <p className="text-sm text-[#64748B] mb-3">{type.description}</p>
            )}
 
            {/* Room Specs */}
            <div className="flex flex-wrap items-center gap-6 mb-4 text-sm text-[#64748B]">
              {room.floor != null && (
                <div className="flex items-center gap-2">
                  <Maximize className="w-4 h-4" />
                  <span>Floor {room.floor}</span>
                </div>
              )}
              {capacity && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{capacity} {t("roomCard.maxGuests")}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                <span>Room {room.room_number}</span>
              </div>
            </div>
 
            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-[#0F172A]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0071C2]" />
                    {amenity}
                  </div>
                ))}
              </div>
            )}
          </div>
 
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Price per night</p>
              {price != null ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#003580]">${price}</span>
                  <span className="text-sm text-[#64748B]">+ taxes</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-[#64748B]">Price on request</span>
              )}
            </div>
 
            {isAvailable ? (
              <Link
                to={`/booking/${room.id}${dateQuery}`}
                className="px-8 py-3 bg-[#003580] text-white rounded-lg font-semibold hover:bg-[#0071C2] transition-colors shadow-md hover:shadow-lg"
              >
                {t("roomCard.reserve")}
              </Link>
            ) : (
              <button
                disabled
                className="px-8 py-3 bg-[#E2E8F0] text-[#94A3B8] rounded-lg font-semibold cursor-not-allowed"
              >
                Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
