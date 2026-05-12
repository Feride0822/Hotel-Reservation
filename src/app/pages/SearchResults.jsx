import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { SlidersHorizontal, X, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getHotels, searchHotels } from "../../api/hotelService";

const SORT_MAP = {
  recommended: "recommended",
  price_low: "price_low",
  price_high: "price_high",
  rating: "rating",
};

export function SearchResults() {
  const { t } = useLanguage();
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get("q") ?? searchParams.get("destination") ?? "";
  const initialCity  = searchParams.get("city") ?? "";
  const initialCheckIn  = searchParams.get("check_in")  ?? "";
  const initialCheckOut = searchParams.get("check_out") ?? "";

  const [query, setQuery]               = useState(initialQuery);
  const [hotels, setHotels] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    city:       initialCity,
    min_rating: null,
    min_price:  null,
    max_price:  null,
  });
  const hotelsPerPage = 8;

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query.trim()) {
        // Use Elasticsearch endpoint when there's a search query
        data = await searchHotels({
          q:          query.trim(),
          city:       filters.city       || undefined,
          min_rating: filters.min_rating || undefined,
          page:       currentPage,
          limit:      hotelsPerPage,
        });
      } else {
        // Fallback to browsing endpoint when no query
        data = await getHotels({
          city:       filters.city       || undefined,
          min_price:  filters.min_price  || undefined,
          max_price:  filters.max_price  || undefined,
          star_rating: filters.min_rating || undefined,
          sort:       SORT_MAP[sortBy],
          page:       currentPage,
          limit:      hotelsPerPage,
        });
      }
 
      setHotels(data.hotels   ?? []);
      setTotal(data.total     ?? 0);
      setTotalPages(data.totalPages ?? 1);

    } catch (err) {
      console.error("Failed to fetch hotels", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query, filters, sortBy, currentPage]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

    // Reset to page 1 whenever the search query, filters, or sort change
  const handleQueryChange = (val) => {
    setQuery(val);
    setCurrentPage(1);
  };
 
  const handleSortChange = (val) => {
    setSortBy(val);
    setCurrentPage(1);
  };
 
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            variant="inline"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
 
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-1">
              {loading
                ? t("searchResults.searching") ?? "Searching…"
                : `${t("searchResults.showing")} ${total} ${t("searchResults.properties")}`}
            </h1>
            <p className="text-[#64748B]">Find the perfect place to stay</p>
          </div>
 
          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              disabled={!!query.trim()} // /search doesn't support sort
              className="px-4 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] bg-white hidden sm:block disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="recommended">{t("searchResults.recommended")}</option>
              <option value="price_low">{t("searchResults.priceLowHigh")}</option>
              <option value="price_high">{t("searchResults.priceHighLow")}</option>
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
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>
 
          {/* Hotels Grid */}
          <div className="flex-1">
 
            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center gap-3 py-20 text-[#64748B]">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading hotels…</span>
              </div>
            )}
 
            {/* Error */}
            {!loading && error && (
              <div className="flex flex-col items-center gap-4 py-20 text-[#64748B]">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <p>{error}</p>
                <button
                  onClick={fetchHotels}
                  className="text-sm text-[#0071C2] underline underline-offset-2 hover:text-[#003580] transition-colors"
                >
                  Try again
                </button>
              </div>
            )}
 
            {/* Empty state */}
            {!loading && !error && hotels.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-20 text-[#64748B]">
                <p className="text-lg font-medium">No hotels found.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            )}
 
            {/* Results */}
            {!loading && !error && hotels.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {hotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id ?? index}
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
            {!loading && totalPages > 1 && (
              <div className="flex justify-center gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                  <FilterSidebar filters={filters} onChange={handleFilterChange} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
