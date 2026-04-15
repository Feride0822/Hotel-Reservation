import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

const mockHotels = [
  {
    id: 1,
    name: "Oceanview Paradise Resort",
    location: "Maldives",
    price: 450,
    rating: 4.9,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=800",
    features: ["Beachfront", "Spa", "Pool"]
  },
  {
    id: 2,
    name: "Metropolitan Luxury Suites",
    location: "Dubai, UAE",
    price: 380,
    rating: 4.8,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=800",
    features: ["City View", "Restaurant", "Gym"]
  },
  {
    id: 3,
    name: "Seaside Grand Hotel",
    location: "Nice, France",
    price: 320,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1772903191730-fa9bc478c1de?w=800",
    features: ["Ocean View", "Spa", "Fine Dining"]
  },
  {
    id: 4,
    name: "Palm Garden Resort",
    location: "Bali, Indonesia",
    price: 280,
    rating: 4.8,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1763914767111-b4451913ceba?w=800",
    features: ["Pool", "Spa", "Beach Access"]
  },
  {
    id: 5,
    name: "Alpine Chalet Retreat",
    location: "Swiss Alps",
    price: 520,
    rating: 4.9,
    reviews: 756,
    image: "https://images.unsplash.com/photo-1771775605733-218cfd42b6bf?w=800",
    features: ["Mountain View", "Spa", "Ski Access"]
  },
  {
    id: 6,
    name: "Urban Boutique Hotel",
    location: "New York, USA",
    price: 290,
    rating: 4.6,
    reviews: 1834,
    image: "https://images.unsplash.com/photo-1775318203173-4bec0ac65c78?w=800",
    features: ["Rooftop Bar", "Gym", "City Center"]
  },
  {
    id: 7,
    name: "Tropical Island Resort",
    location: "Phuket, Thailand",
    price: 240,
    rating: 4.7,
    reviews: 2456,
    image: "https://images.unsplash.com/photo-1762425430465-0d9f08d64147?w=800",
    features: ["Beach", "Pool", "Spa"]
  },
  {
    id: 8,
    name: "Historic Palace Hotel",
    location: "Prague, Czech Republic",
    price: 340,
    rating: 4.8,
    reviews: 1123,
    image: "https://images.unsplash.com/photo-1771617724305-36e915d68992?w=800",
    features: ["Historic", "Restaurant", "City View"]
  },
];

export function SearchResults() {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 8;

  const totalPages = Math.ceil(mockHotels.length / hotelsPerPage);
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const displayedHotels = mockHotels.slice(startIndex, startIndex + hotelsPerPage);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar variant="inline" />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-1">
              {t('searchResults.showing')} {mockHotels.length} {t('searchResults.properties')}
            </h1>
            <p className="text-[#64748B]">Find the perfect place to stay</p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] bg-white hidden sm:block"
            >
              <option value="recommended">{t('searchResults.recommended')}</option>
              <option value="price-low">{t('searchResults.priceLowHigh')}</option>
              <option value="price-high">{t('searchResults.priceHighLow')}</option>
              <option value="rating">{t('searchResults.rating')}</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F8FAFC] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">{t('filters.title').replace(':', '')}</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Hotels Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {displayedHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-[#003580] text-white'
                        : 'border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween" }}
                className="w-full max-w-sm h-full bg-white overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#0F172A]">{t('filters.title')}</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
