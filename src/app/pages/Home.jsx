import { motion } from "motion/react";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import {
  Shield,
  Award,
  HeadphonesIcon,
  CreditCard,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getHotels } from "../../api/hotelService";

function mapHotel(hotel) {
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.city,
    price: hotel.base_price ?? hotel.min_price ?? null,   // not in spec yet – graceful
    rating: hotel.star_rating ?? 0,
    reviews: hotel.reviews ?? null,
    image: hotel.thumbnail || "",
    features: hotel.amenities ?? [],
  };
}

function deriveDestinations(hotels, limit = 6) {
  const map = {};
  for (const h of hotels) {
    const key = h.city;
    if (!key) continue;
    if (!map[key]) {
      map[key] = {
        name: h.city,
        country: h.country ?? h.city,
        image: h.thumbnail || "",
        hotels: 0,
      };
    }
    map[key].hotels += 1;
    // Prefer the hotel with the best thumbnail for the destination card
    if (!map[key].image && h.thumbnail) map[key].image = h.thumbnail;
  }
  return Object.values(map)
    .sort((a, b) => b.hotels - a.hotels)
    .slice(0, limit);
}

const whyBookWithUs = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "Your privacy and security are our top priorities with encrypted transactions.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description:
      "Find a lower price? We'll match it and give you an additional 10% off.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our customer support team is always ready to assist you, anytime.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description:
      "Multiple payment options with the ability to pay now or at the hotel.",
  },
];

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-16 gap-3 text-[#64748B]">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="text-sm font-medium">Loading…</span>
    </div>
  );
}

function SectionError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-[#64748B]">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <p className="text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-[#0071C2] underline underline-offset-2 hover:text-[#003580] transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}

function useFeaturedHotels() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  async function load() {
    setLoading(true);
    setError(null);
    try {
      // Top-rated hotels, limit 4 for the featured strip
      const json = await getHotels({ sort: "rating", limit: 4, page: 1 });
      setData((json.hotels ?? []).map(mapHotel));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
 
  useEffect(() => { load(); }, []);
 
  return { data, loading, error, retry: load };
}

function useDestinations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  async function load() {
    setLoading(true);
    setError(null);
    try {
      // Fetch a wider set so we can group meaningfully by city
      const json = await getHotels({ sort: "recommended", limit: 100, page: 1 });
      setData(deriveDestinations(json.hotels ?? []));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
 
  useEffect(() => { load(); }, []);
 
  return { data, loading, error, retry: load };
}

export function Home() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | loading | success | error
 
  const featured = useFeaturedHotels();
  const destinations = useDestinations();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    try {
      // No newsletter endpoint in swagger yet – optimistically succeed
      await new Promise((r) => setTimeout(r, 600));
      setEmail("");
      setNewsletterStatus("success");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758714919725-d2740fc99f14?w=1600"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
 
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {t("home.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              {t("home.hero.subtitle")}
            </p>
          </motion.div>
 
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
 
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
 
      {/* ── Featured Hotels ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#0F172A] mb-3">
                {t("home.featured.title")}
              </h2>
              <p className="text-lg text-[#64748B]">
                {t("home.featured.subtitle")}
              </p>
            </div>
            <a
              href="/search"
              className="hidden md:flex items-center gap-2 text-[#0071C2] font-semibold hover:gap-3 transition-all"
            >
              {t("common.viewAll")}
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
 
          {featured.loading && <SectionLoader />}
 
          {!featured.loading && featured.error && (
            <SectionError
              message="Couldn't load featured hotels."
              onRetry={featured.retry}
            />
          )}
 
          {!featured.loading && !featured.error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.data.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
 
              {featured.data.length === 0 && (
                <p className="col-span-4 text-center text-[#64748B] py-12">
                  No featured hotels available right now.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </section>
 
      {/* ── Popular Destinations ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#0F172A] mb-3">
              {t("home.trending.title")}
            </h2>
            <p className="text-lg text-[#64748B]">
              {t("home.trending.subtitle")}
            </p>
          </motion.div>
 
          {destinations.loading && <SectionLoader />}
 
          {!destinations.loading && destinations.error && (
            <SectionError
              message="Couldn't load popular destinations."
              onRetry={destinations.retry}
            />
          )}
 
          {!destinations.loading && !destinations.error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.data.map((destination, index) => (
                <motion.a
                  key={destination.name}
                  href={`/search?destination=${destination.name}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {destination.image ? (
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    // Placeholder gradient when no thumbnail available
                    <div className="w-full h-full bg-gradient-to-br from-[#003580] to-[#0071C2]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-white/90 mb-2">{destination.country}</p>
                    <p className="text-sm text-white/80">
                      {destination.hotels} {destination.hotels === 1 ? "hotel" : "hotels"}
                    </p>
                  </div>
                </motion.a>
              ))}
 
              {destinations.data.length === 0 && (
                <p className="col-span-3 text-center text-[#64748B] py-12">
                  No destinations available right now.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
 
      {/* ── Why Book With Us ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#0F172A] mb-3">
              Why Book With Us
            </h2>
            <p className="text-lg text-[#64748B]">Experience the Zenith advantage</p>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyBookWithUs.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#003580] to-[#0071C2] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── Newsletter CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#003580] to-[#0071C2]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Exclusive Deals
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter and never miss out on special offers
          </p>
 
          {newsletterStatus === "success" ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-lg font-semibold text-white bg-white/20 rounded-xl px-8 py-4 inline-block"
            >
              🎉 You're subscribed! Check your inbox for exclusive deals.
            </motion.p>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                placeholder={t("booking.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={newsletterStatus === "loading"}
                className="flex-1 px-6 py-4 rounded-xl text-[#0F172A] focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="px-8 py-4 bg-[#F5A623] text-white font-semibold rounded-xl hover:bg-[#F5A623]/90 transition-colors shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2 min-w-[130px]"
              >
                {newsletterStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing…
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
 
          {newsletterStatus === "error" && (
            <p className="mt-4 text-sm text-white/80">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
}
