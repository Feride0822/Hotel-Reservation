import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getHotels } from "../../api/hotelService";

export function SearchResults() {
  const { t } = useLanguage();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hotelsPerPage = 8;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);

        const data = await getHotels({
          page: currentPage,
          limit: hotelsPerPage,
          sort: sortBy,
          country: "Uzbekistan",
        });

        setHotels(data.hotels || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch hotels", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [currentPage, sortBy]);

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
              {t("searchResults.showing")} {hotels.length}{" "}
              {t("searchResults.properties")}
            </h1>
            <p className="text-[#64748B]">Find the perfect place to stay</p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] bg-white hidden sm:block"
            >
              <option value="recommended">
                {t("searchResults.recommended")}
              </option>
              <option value="price-low">
                {t("searchResults.priceLowHigh")}
              </option>
              <option value="price-high">
                {t("searchResults.priceHighLow")}
              </option>
              <option value="rating">{t("searchResults.rating")}</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F8FAFC] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">
                {t("filters.title").replace(":", "")}
              </span>
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
            {loading ? (
              <div className="flex justify-center py-20">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {/* 3. PLACE: Added optional chaining to prevent map errors */}
                {hotels?.map((hotel, index) => (
                  <motion.div
                    key={hotel.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        currentPage === page
                          ? "bg-[#003580] text-white"
                          : "border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
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
                    <h2 className="text-xl font-bold text-[#0F172A]">
                      {t("filters.title")}
                    </h2>
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
