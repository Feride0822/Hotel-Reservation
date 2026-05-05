import { useEffect, useState } from "react";
import {
  Hotel,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

import { StatusBadge } from "../../components/StatusBadge";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../../../api/hotelService";
import { getBookings } from "../../../api/bookingService";
import { useLanguage } from "../../../i18n/LanguageContext";

export function SuperAdminDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(null);

  // Fetch hotels
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await getHotels(searchQuery);
      setHotels(data);
    } catch {
      setError(t("superAdminDashboard.failedLoadHotels"));
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch {
      setError(t("superAdminDashboard.failedLoadBookings"));
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchBookings();
  }, []);

  // Add hotel (simple demo)
  const handleAddHotel = async () => {
    const name = prompt(t("superAdminDashboard.propertyName") + "?");
    if (!name) return;

    try {
      await createHotel({ name, location: "Unknown", price: 100 });
      fetchHotels();
    } catch {
      setError(t("superAdminDashboard.failedAddHotel"));
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      setActionLoading(id);
      await deleteHotel(id);
      fetchHotels();
    } catch {
      setError(t("superAdminDashboard.failedDeleteHotel"));
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = [
    { key: "overview", label: t("superAdminDashboard.overview") },
    { key: "hotels",   label: t("superAdminDashboard.allProperties") },
    { key: "bookings", label: t("superAdminDashboard.recentBookings") },
  ];

  // Stats
  const stats = [
    {
      icon: Hotel,
      label: t("superAdminDashboard.totalProperties"),
      value: hotels.length,
      color: "from-[#003580] to-[#0071C2]",
    },
    {
      icon: TrendingUp,
      label: t("superAdminDashboard.totalBookings"),
      value: bookings.length,
      color: "from-[#22C55E] to-[#16A34A]",
    },
    {
      icon: DollarSign,
      label: t("superAdminDashboard.totalRevenue"),
      value: `$${bookings.reduce((sum, b) => sum + b.amount, 0)}`,
      color: "from-[#F59E0B] to-[#D97706]",
    },
    {
      icon: Users,
      label: t("superAdminDashboard.activeUsers"),
      value: bookings.length,
      color: "from-[#8B5CF6] to-[#7C3AED]",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A]">
            {t("superAdminDashboard.title")}
          </h1>
          <p className="text-[#64748B]">
            {t("superAdminDashboard.manageProperties")}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8 flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <s.icon className="mb-2" />
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* HOTELS */}
        {activeTab === "hotels" && (
          <div>
            {/* Actions */}
            <div className="flex justify-between mb-6">
              <input
                placeholder={t("common.search") + "..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchHotels();
                }}
                className="border px-4 py-2 rounded-lg"
              />

              <button
                onClick={handleAddHotel}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus size={16} /> {t("superAdminDashboard.addProperty")}
              </button>
            </div>

            {loading ? (
              <p>{t("common.loading")}</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-xl shadow p-4"
                  >
                    <h3 className="font-bold">{hotel.name}</h3>
                    <p className="text-sm text-gray-500">
                      {hotel.location}
                    </p>

                    <p className="mt-2 font-semibold">
                      ${hotel.price}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button className="border px-3 py-1 rounded">
                        <Edit size={14} /> {t("common.edit")}
                      </button>

                      <button
                        onClick={() => handleDelete(hotel.id)}
                        className="border px-3 py-1 rounded text-red-500"
                      >
                        {actionLoading === hotel.id
                          ? "..."
                          : <><Trash2 size={14} /> {t("common.delete")}</>} 
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th>{t("superAdminDashboard.bookingId")}</th>
                  <th>{t("superAdminDashboard.guest")}</th>
                  <th>{t("superAdminDashboard.property")}</th>
                  <th>{t("superAdminDashboard.status")}</th>
                  <th>{t("superAdminDashboard.amount")}</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td>{b.id}</td>
                    <td>{b.guest}</td>
                    <td>{b.hotel}</td>
                    <td>
                      <StatusBadge status={b.status} />
                    </td>
                    <td>${b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}