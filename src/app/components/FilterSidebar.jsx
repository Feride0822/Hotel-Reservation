import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function FilterSidebar() {
  const { t } = useLanguage();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const amenities = [
    { key: "freeWifi", label: t('filters.freeWifi') },
    { key: "pool", label: t('filters.pool') },
    { key: "spa", label: t('filters.spa') },
    { key: "restaurant", label: t('filters.restaurant') },
    { key: "gym", label: t('filters.gym') },
    { key: "parking", label: t('filters.parking') },
    { key: "petFriendly", label: "Pet Friendly" },
    { key: "airConditioning", label: t('filters.airConditioning') },
    { key: "roomService", label: t('filters.roomService') },
    { key: "airportShuttle", label: "Airport Shuttle" }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const toggleAmenity = (amenityKey) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityKey)
        ? prev.filter(a => a !== amenityKey)
        : [...prev, amenityKey]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="font-bold text-[#0F172A] mb-4">{t('filters.priceRange')}</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#0071C2]"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="px-3 py-2 bg-[#F8FAFC] rounded-lg text-[#0F172A] font-medium">
              ${priceRange[0]}
            </span>
            <span className="text-[#64748B]">to</span>
            <span className="px-3 py-2 bg-[#F8FAFC] rounded-lg text-[#0F172A] font-medium">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h3 className="font-bold text-[#0F172A] mb-4">{t('filters.stars')}</h3>
        <div className="space-y-2.5">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleRating(rating)}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedRatings.includes(rating)
                    ? 'bg-[#0071C2] border-[#0071C2]'
                    : 'border-[#CBD5E1] group-hover:border-[#0071C2]'
                }`}
              >
                {selectedRatings.includes(rating) && (
                  <Check className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-[#F5A623]"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-bold text-[#0F172A] mb-4">{t('filters.amenities')}</h3>
        <div className="space-y-2.5 max-h-64 overflow-y-auto">
          {amenities.map((amenity) => (
            <label
              key={amenity.key}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleAmenity(amenity.key)}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedAmenities.includes(amenity.key)
                    ? 'bg-[#0071C2] border-[#0071C2]'
                    : 'border-[#CBD5E1] group-hover:border-[#0071C2]'
                }`}
              >
                {selectedAmenities.includes(amenity.key) && (
                  <Check className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="text-sm text-[#0F172A]">{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <button className="w-full py-3 bg-[#003580] text-white rounded-lg font-semibold hover:bg-[#0071C2] transition-colors">
          {t('filters.title').replace(':', '')}
        </button>
        <button
          onClick={() => {
            setPriceRange([0, 1000]);
            setSelectedAmenities([]);
            setSelectedRatings([]);
          }}
          className="w-full py-3 border border-[#E2E8F0] text-[#0F172A] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors"
        >
          {t('filters.clearAll')}
        </button>
      </div>
    </div>
  );
}
