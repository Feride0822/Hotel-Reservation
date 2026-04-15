import { motion } from "motion/react";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import {
  Shield,
  Award,
  HeadphonesIcon,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

const featuredHotels = [
  {
    id: 1,
    name: "Oceanview Paradise Resort",
    location: "Maldives",
    price: 450,
    rating: 4.9,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=800",
    features: ["Beachfront", "Spa", "Pool"],
  },
  {
    id: 2,
    name: "Metropolitan Luxury Suites",
    location: "Dubai, UAE",
    price: 380,
    rating: 4.8,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=800",
    features: ["City View", "Restaurant", "Gym"],
  },
  {
    id: 3,
    name: "Seaside Grand Hotel",
    location: "Nice, France",
    price: 320,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1772903191730-fa9bc478c1de?w=800",
    features: ["Ocean View", "Spa", "Fine Dining"],
  },
  {
    id: 4,
    name: "Palm Garden Resort",
    location: "Bali, Indonesia",
    price: 280,
    rating: 4.8,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1763914767111-b4451913ceba?w=800",
    features: ["Pool", "Spa", "Beach Access"],
  },
];

const destinations = [
  {
    name: "Luxembourg",
    country: "Luxembourg",
    image: "https://images.unsplash.com/photo-1748030278234-5c1e9f155c1a?w=600",
    hotels: 234,
  },
  {
    name: "Monaco",
    country: "Monaco",
    image: "https://images.unsplash.com/photo-1605130284788-c77b7fdf1535?w=600",
    hotels: 156,
  },
  {
    name: "Budapest",
    country: "Hungary",
    image: "https://images.unsplash.com/photo-1750005163191-e67625d6fb63?w=600",
    hotels: 892,
  },
  {
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1586375979817-3305326a780a?w=600",
    hotels: 567,
  },
  {
    name: "Marseille",
    country: "France",
    image: "https://images.unsplash.com/photo-1771860010897-e0e30e3912f4?w=600",
    hotels: 423,
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1707216386391-4ffb0881a7ef?w=600",
    hotels: 645,
  },
];

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

export function Home() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758714919725-d2740fc99f14?w=1600"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
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

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Hotels */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel, index) => (
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
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <motion.a
                key={destination.name}
                href={`/search?destination=${destination.name}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-white/90 mb-2">{destination.country}</p>
                  <p className="text-sm text-white/80">
                    {destination.hotels} hotels
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
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
            <p className="text-lg text-[#64748B]">
              Experience the StayEase advantage
            </p>
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
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
              className="flex-1 px-6 py-4 rounded-xl text-[#0F172A] focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#F5A623] text-white font-semibold rounded-xl hover:bg-[#F5A623]/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
