import { Link } from "react-router";
import { Users, Maximize, BedDouble } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function RoomCard({ room, hotelId }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Image */}
        <div className="md:col-span-1">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-48 md:h-full object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2 flex flex-col">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{room.name}</h3>

            {/* Room Specs */}
            <div className="flex items-center gap-6 mb-4 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4" />
                <span>{room.size}m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{room.guests} {t('roomCard.maxGuests')}</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                <span>{room.beds}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm text-[#0F172A]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071C2]" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Price per night</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#003580]">${room.price}</span>
                <span className="text-sm text-[#64748B]">+ taxes</span>
              </div>
            </div>
            <Link
              to={`/booking/${hotelId}?room=${room.id}`}
              className="px-8 py-3 bg-[#003580] text-white rounded-lg font-semibold hover:bg-[#0071C2] transition-colors shadow-md hover:shadow-lg"
            >
              {t('roomCard.reserve')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
