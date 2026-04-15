import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, MapPin, Wifi, Dumbbell, Coffee, Wind, Waves, Utensils, Car, Clock } from "lucide-react";
import { motion } from "motion/react";
import { RoomCard } from "../components/RoomCard";
import { ReviewCard } from "../components/ReviewCard";
import { useLanguage } from "../../i18n/LanguageContext";

const mockRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    size: 45,
    guests: 2,
    beds: "1 King Bed",
    price: 450,
    image: "https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=600",
    amenities: ["Ocean View", "Balcony", "Mini Bar", "WiFi"]
  },
  {
    id: 2,
    name: "Premium Suite",
    size: 65,
    guests: 4,
    beds: "1 King + 2 Twin Beds",
    price: 680,
    image: "https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=600",
    amenities: ["Ocean View", "Living Room", "Kitchenette", "Balcony", "WiFi"]
  },
];

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

export function HotelDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hotelImages = [
    "https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=1200",
    "https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=1200",
    "https://images.unsplash.com/photo-1772903191730-fa9bc478c1de?w=1200",
  ];

  const amenities = [
    { icon: Wifi, name: t('filters.freeWifi') },
    { icon: Waves, name: t('filters.pool') },
    { icon: Dumbbell, name: t('filters.gym') },
    { icon: Utensils, name: t('filters.restaurant') },
    { icon: Coffee, name: "Breakfast" },
    { icon: Car, name: t('filters.parking') },
    { icon: Wind, name: t('filters.airConditioning') },
    { icon: Clock, name: "24/7 Front Desk" }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
          <div className="md:col-span-3 relative rounded-2xl overflow-hidden group">
            <img
              src={hotelImages[currentImageIndex]}
              alt="Hotel"
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
              {t('hotelDetail.showPhotos')}
            </button>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4">
            {hotelImages.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden">
                <img src={img} alt={`Hotel ${idx + 2}`} className="w-full h-full object-cover" />
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
                    Oceanview Paradise Resort
                  </h1>
                  <div className="flex items-center gap-2 text-[#64748B] mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>Maldives</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#003580] text-white rounded-lg">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-xl font-bold">4.9</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E2E8F0] mb-8">
              <div className="flex gap-8">
                {[
                  { id: "overview", label: t('hotelDetail.overview') },
                  { id: "rooms", label: t('hotelDetail.rooms') },
                  { id: "reviews", label: t('hotelDetail.reviews') }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 font-semibold transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-[#0071C2]'
                        : 'text-[#64748B] hover:text-[#0F172A]'
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

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">About This Property</h2>
                  <p className="text-[#64748B] leading-relaxed">
                    Experience luxury at its finest in our beachfront paradise. With stunning ocean views,
                    world-class amenities, and exceptional service, Oceanview Paradise Resort offers an
                    unforgettable tropical escape. Enjoy pristine beaches, gourmet dining, and endless relaxation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">{t('hotelDetail.facilities')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                          <amenity.icon className="w-5 h-5 text-[#0071C2]" />
                        </div>
                        <span className="text-sm text-[#0F172A]">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rooms" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F172A]">Available Rooms</h2>
                {mockRooms.map(room => (
                  <RoomCard key={room.id} room={room} hotelId={id} />
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F172A]">{t('hotelDetail.guestReviews')}</h2>
                <p className="text-[#64748B]">
                  {t('hotelDetail.basedOn')} {mockReviews.length} {t('hotelDetail.verifiedReviews')}
                </p>
                {mockReviews.map(review => (
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
                  <span className="text-4xl font-bold text-[#003580]">$450</span>
                  <span className="text-[#64748B]">/{t('hotelCard.perNight')}</span>
                </div>
                <p className="text-sm text-[#22C55E]">Free cancellation</p>
              </div>

              <Link
                to={`/booking/${id}`}
                className="block w-full py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white text-center font-bold rounded-xl hover:shadow-xl transition-all mb-4"
              >
                {t('roomCard.reserve')}
              </Link>

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
