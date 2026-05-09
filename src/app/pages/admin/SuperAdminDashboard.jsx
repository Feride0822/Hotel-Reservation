import { useEffect, useState } from "react";
import {
  Hotel, DollarSign, Users, TrendingUp,
  Plus, Search, Edit, Trash2, Star, X,
} from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { getHotels, createHotel, updateHotel, deleteHotel } from "../../../api/hotelService";
import { getBookings } from "../../../api/bookingService";
import { useLanguage } from "../../../i18n/LanguageContext";

const EMPTY_FORM = {
  name: "", address: "", phone_no: "", email: "",
  city: "", star_rating: "", thumbnail: "",
};

export function SuperAdminDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const [hotels, setHotels]     = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // Hotel modal state
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null); // null = create mode
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch hotels
  const fetchHotels = async (search = "") => {
    try {
      setLoading(true);
      setError("");
      const params = { page: 1, limit: 20 };
      if (search) params.search = search;
      const data = await getHotels(params);
      setHotels(data.hotels);
      setTotalHotels(data.total);
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

  // Open modal for create
  const openCreate = () => {
    setEditingHotel(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setShowModal(true);
  };

  // Open modal for edit
  const openEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name || "",
      address: hotel.address || "",
      phone_no: hotel.phone_no || "",
      email: hotel.email || "",
      city: hotel.city || "",
      star_rating: hotel.star_rating || "",
      thumbnail: hotel.thumbnail || "",
    });
    setFormError("");
    setShowModal(true);
  };

  // Submit create or update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    try {
      const payload = {
        ...formData,
        star_rating: Number(formData.star_rating),
      };
      if (editingHotel) {
        await updateHotel(editingHotel.id, payload);
      } else {
        await createHotel(payload);
      }
      setShowModal(false);
      fetchHotels(searchQuery);
    } catch (err) {
      const data = err.response?.data;
      if (data?.detail && Array.isArray(data.detail)) {
        setFormError(data.detail.map((e) => e.msg).join(", "));
      } else {
        setFormError(data?.detail || "Failed to save hotel.");
      }
    } finally {
      setFormLoading(false);
    }
  };

  // Delete hotel
  const handleDelete = async (id) => {
    if (!confirm("Delete this hotel?")) return;
    try {
      setActionLoading(id);
      await deleteHotel(id);
      fetchHotels(searchQuery);
    } catch {
      setError(t("superAdminDashboard.failedDeleteHotel"));
    } finally {
      setActionLoading(null);
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

  const stats = [
    { icon: Hotel,      label: t("superAdminDashboard.totalProperties"), value: totalHotels,          color: "from-[#003580] to-[#0071C2]" },
    { icon: TrendingUp, label: t("superAdminDashboard.totalBookings"),   value: bookings.length,       color: "from-[#22C55E] to-[#16A34A]" },
    { icon: DollarSign, label: t("superAdminDashboard.totalRevenue"),    value: `$${totalRevenue}`,    color: "from-[#F59E0B] to-[#D97706]" },
    { icon: Users,      label: t("superAdminDashboard.activeUsers"),     value: bookings.length,       color: "from-[#8B5CF6] to-[#7C3AED]" },
  ];

  const tabs = [
    { key: "overview", label: t("superAdminDashboard.overview") },
    { key: "hotels",   label: t("superAdminDashboard.allProperties") },
    { key: "bookings", label: t("superAdminDashboard.recentBookings") },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A]">{t("superAdminDashboard.title")}</h1>
          <p className="text-[#64748B]">{t("superAdminDashboard.manageProperties")}</p>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8 flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-[#0071C2] text-[#0071C2]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* HOTELS */}
        {activeTab === "hotels" && (
          <div>
            <div className="flex justify-between mb-6 gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  placeholder={t("common.search") + "..."}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchHotels(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                />
              </div>
              <button
                onClick={openCreate}
                className="bg-[#0071C2] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
              >
                <Plus size={16} /> {t("superAdminDashboard.addProperty")}
              </button>
            </div>

            {loading ? (
              <p>{t("common.loading")}</p>
            ) : hotels.length === 0 ? (
              <p className="text-gray-500">No hotels found.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-xl shadow overflow-hidden">
                    {hotel.thumbnail && (
                      <img src={hotel.thumbnail} alt={hotel.name} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{hotel.name}</h3>
                      <p className="text-sm text-gray-500">{hotel.city} · {hotel.address}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: hotel.star_rating || 0 }).map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{hotel.email}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => openEdit(hotel)}
                          className="flex items-center gap-1 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50"
                        >
                          <Edit size={14} /> {t("common.edit")}
                        </button>
                        <button
                          onClick={() => handleDelete(hotel.id)}
                          disabled={actionLoading === hotel.id}
                          className="flex items-center gap-1 border px-3 py-1.5 rounded-lg text-sm text-red-500 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          {actionLoading === hotel.id ? "..." : t("common.delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b text-sm text-gray-500">
                  <th className="py-3 px-4">{t("superAdminDashboard.bookingId")}</th>
                  <th className="py-3 px-4">{t("superAdminDashboard.guest")}</th>
                  <th className="py-3 px-4">{t("superAdminDashboard.property")}</th>
                  <th className="py-3 px-4">Check-in</th>
                  <th className="py-3 px-4">Check-out</th>
                  <th className="py-3 px-4">{t("superAdminDashboard.status")}</th>
                  <th className="py-3 px-4">{t("superAdminDashboard.amount")}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#{b.id}</td>
                    <td className="py-3 px-4">{b.guest}</td>
                    <td className="py-3 px-4">{b.hotel}</td>
                    <td className="py-3 px-4">{b.check_in}</td>
                    <td className="py-3 px-4">{b.check_out}</td>
                    <td className="py-3 px-4"><StatusBadge status={b.status} /></td>
                    <td className="py-3 px-4 font-semibold">${b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <p className="text-center text-gray-500 py-6">No bookings yet</p>
            )}
          </div>
        )}
      </div>

      {/* Hotel Modal — Create / Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-6">
              {editingHotel ? "Edit Hotel" : "Add New Hotel"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {[
                { label: "Hotel Name",  key: "name",      type: "text" },
                { label: "Address",     key: "address",   type: "text" },
                { label: "City",        key: "city",      type: "text" },
                { label: "Email",       key: "email",     type: "email" },
                { label: "Phone",       key: "phone_no",  type: "text" },
                { label: "Thumbnail URL", key: "thumbnail", type: "text" },
                { label: "Star Rating (1-5)", key: "star_rating", type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    min={type === "number" ? 1 : undefined}
                    max={type === "number" ? 5 : undefined}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0071C2]"
                  />
                </div>
              ))}

              {formError && <p className="text-red-500 text-sm">{formError}</p>}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white font-bold rounded-xl disabled:opacity-50"
              >
                {formLoading ? "Saving..." : editingHotel ? "Update Hotel" : "Create Hotel"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}