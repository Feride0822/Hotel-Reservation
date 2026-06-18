import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Star, MapPin, Wifi, Dumbbell, Coffee, Wind, Waves, Utensils, Car, Clock, Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { RoomCard } from "../components/RoomCard";
import { ReviewCard } from "../components/ReviewCard";
import { useLanguage } from "../../i18n/LanguageContext";
import { getHotel } from "../../api/hotelService";
import { getRooms } from "../../api/roomService";

const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "SJ",
    rating: 5.0,
    date: "2026-03-15",
    comment: "Absolutely amazing experience! The staff was incredibly friendly and the ocean view from our room was breathtaking. Will definitely come back!"
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "MC",
    rating: 4.8,
    date: "2026-03-10",
    comment: "Great hotel with excellent facilities. The spa was outstanding and the food at the restaurant was delicious. Minor issue with room service timing."
  },
];

const AMENITY_ICONS = {
  wifi:            Wifi,
  "free wifi":     Wifi,
  pool:            Waves,
  swimming:        Waves,
  gym:             Dumbbell,
  fitness:         Dumbbell,
  restaurant:      Utensils,
  dining:          Utensils,
  breakfast:       Coffee,
  coffee:          Coffee,
  parking:         Car,
  "air conditioning": Wind,
  ac:              Wind,
};

function getAmenityIcon(name = "") {
  const key = name.toLowerCase();
  for (const [k, Icon] of Object.entries(AMENITY_ICONS)) {
    if (key.includes(k)) return Icon;
  }
  return Clock; // default
}

export function HotelDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [hotel, setHotel]       = useState(null);
  const [rooms, setRooms]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [hotelData, roomsData] = await Promise.all([
          getHotel(id),
          getRooms(id),
        ]);
        setHotel(hotelData);
        setRooms(roomsData);
      } catch (err) {
        console.error(err);
        setError("Could not load hotel details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3 text-[#64748B]">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading hotel details…</span>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[#64748B]">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p>{error ?? "Hotel not found."}</p>
        <Link to="/search" className="text-sm text-[#0071C2] underline underline-offset-2">
          Back to search
        </Link>
      </div>
    );
  }

  const hotelImages = hotel.images?.length
    ? hotel.images
    : hotel.thumbnail
    ? [hotel.thumbnail]
    : ["https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=1200"];

  const hotelAmenities = hotel.amenities?.length
    ? hotel.amenities.map((name) => ({ icon: getAmenityIcon(name), name }))
    : [
        { icon: Wifi,     name: t("filters.freeWifi") },
        { icon: Waves,    name: t("filters.pool") },
        { icon: Dumbbell, name: t("filters.gym") },
        { icon: Utensils, name: t("filters.restaurant") },
        { icon: Coffee,   name: "Breakfast" },
        { icon: Car,      name: t("filters.parking") },
        { icon: Wind,     name: t("filters.airConditioning") },
        { icon: Clock,    name: "24/7 Front Desk" },
      ];

  // Lowest room price for the booking card
  const lowestPrice = rooms.reduce((min, room) => {
    const price = room.room_type_rel?.base_price ?? Infinity;
    return price < min ? price : min;
  }, Infinity);

  const prevImage = () =>
    setCurrentImageIndex((i) => (i - 1 + hotelImages.length) % hotelImages.length);
  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % hotelImages.length);

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
          {/* Main image */}
          <div className="md:col-span-3 relative rounded-2xl overflow-hidden group">
            <img
              src={hotelImages[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {hotelImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5 text-[#0F172A]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5 text-[#0F172A]" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {hotelImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
 
          {/* Thumbnail strip */}
          <div className="hidden md:grid grid-rows-2 gap-4">
            {hotelImages.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx + 1)}
                className="relative rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={img}
                  alt={`${hotel.name} ${idx + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center gap-2 text-[#64748B] mb-2">
                    <MapPin className="w-5 h-5" />
                    <span>{hotel.city}</span>
                  </div>
                  {hotel.address && (
                    <p className="text-sm text-[#64748B]">{hotel.address}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#003580] text-white rounded-lg shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-xl font-bold">{hotel.star_rating?.toFixed(1) ?? "—"}</span>
                </div>
              </div>
            </div>
 
            {/* Tabs */}
            <div className="border-b border-[#E2E8F0] mb-8">
              <div className="flex gap-8">
                {[
                  { id: "overview", label: t("hotelDetail.overview") },
                  { id: "rooms",    label: t("hotelDetail.rooms") },
                  { id: "reviews",  label: t("hotelDetail.reviews") },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 font-semibold transition-colors relative ${
                      activeTab === tab.id
                        ? "text-[#0071C2]"
                        : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071C2]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                    About This Property
                  </h2>
                  <p className="text-[#64748B] leading-relaxed">
                    {hotel.description ??
                      `Welcome to ${hotel.name}, located in the heart of ${hotel.city}. Enjoy world-class amenities, exceptional service, and an unforgettable stay.`}
                  </p>
                </div>
 
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                    {t("hotelDetail.facilities")}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hotelAmenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                          <amenity.icon className="w-5 h-5 text-[#0071C2]" />
                        </div>
                        <span className="text-sm text-[#0F172A]">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
 
                {/* Contact info */}
                {(hotel.phone_no || hotel.email) && (
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-4">Contact</h3>
                    <div className="space-y-2 text-sm text-[#64748B]">
                      {hotel.phone_no && <p>📞 {hotel.phone_no}</p>}
                      {hotel.email    && <p>✉️ {hotel.email}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}
 
            {/* Rooms Tab */}
            {activeTab === "rooms" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F172A]">Available Rooms</h2>
                {rooms.length === 0 ? (
                  <p className="text-[#64748B]">No rooms available at the moment.</p>
                ) : (
                  rooms.map((room) => (
                    <RoomCard key={room.id} room={room} hotelId={id} />
                  ))
                )}
              </div>
            )}
 
            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  {t("hotelDetail.guestReviews")}
                </h2>
                <p className="text-[#64748B]">
                  {t("hotelDetail.basedOn")} {mockReviews.length}{" "}
                  {t("hotelDetail.verifiedReviews")}
                </p>
                {mockReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
 
          {/* Booking Card - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl shadow-lg p-6 border border-[#E2E8F0]">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  {lowestPrice !== Infinity ? (
                    <>
                      <span className="text-4xl font-bold text-[#003580]">
                        ${lowestPrice}
                      </span>
                      <span className="text-[#64748B]">/{t("hotelCard.perNight")}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-[#64748B]">
                      Price on request
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#22C55E]">Free cancellation</p>
              </div>
 
              <button
                onClick={() => setActiveTab("rooms")}
                className="block w-full py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white text-center font-bold rounded-xl hover:shadow-xl transition-all mb-4"
              >
                {t("roomCard.reserve")}
              </button>
 
              <p className="text-xs text-center text-[#64748B]">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
