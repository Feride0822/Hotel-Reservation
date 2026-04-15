import { useState } from "react";
import { Hotel, DollarSign, Users, TrendingUp, Plus, Search, Edit, Trash2 } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useLanguage } from "../../i18n/LanguageContext";

const mockProperties = [
  {
    id: 1,
    name: "Oceanview Paradise Resort",
    location: "Maldives",
    price: 450,
    rating: 4.9,
    status: "active",
    image: "https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=200"
  },
  {
    id: 2,
    name: "Metropolitan Luxury Suites",
    location: "Dubai, UAE",
    price: 380,
    rating: 4.8,
    status: "active",
    image: "https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=200"
  },
];

const mockBookings = [
  {
    id: "BK123456",
    guest: "John Doe",
    property: "Oceanview Paradise Resort",
    checkIn: "2026-06-15",
    checkOut: "2026-06-20",
    amount: 2250,
    status: "confirmed"
  },
  {
    id: "BK789012",
    guest: "Sarah Smith",
    property: "Metropolitan Luxury Suites",
    checkIn: "2026-08-10",
    checkOut: "2026-08-15",
    amount: 1900,
    status: "pending"
  },
];

export function AdminDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: Hotel, label: t('adminDashboard.totalProperties'), value: "24", color: "from-[#003580] to-[#0071C2]" },
    { icon: TrendingUp, label: t('adminDashboard.totalBookings'), value: "1,234", color: "from-[#22C55E] to-[#16A34A]" },
    { icon: DollarSign, label: t('adminDashboard.totalRevenue'), value: "$125K", color: "from-[#F5A623] to-[#F97316]" },
    { icon: Users, label: t('adminDashboard.activeUsers'), value: "8,456", color: "from-[#8B5CF6] to-[#7C3AED]" }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            {t('adminDashboard.title')}
          </h1>
          <p className="text-[#64748B]">Manage your hotel properties and bookings</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E2E8F0] mb-8">
          <div className="flex gap-8">
            {[
              { id: "overview", label: t('adminDashboard.overview') },
              { id: "properties", label: t('adminDashboard.manageProperties') },
              { id: "bookings", label: "Bookings" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#0071C2] border-b-2 border-[#0071C2]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-[#64748B] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('adminDashboard.recentBookings')}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.bookingId')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.guest')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.property')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.status')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.amount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map(booking => (
                      <tr key={booking.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                        <td className="py-4 px-4 font-medium text-[#0F172A]">{booking.id}</td>
                        <td className="py-4 px-4 text-[#0F172A]">{booking.guest}</td>
                        <td className="py-4 px-4 text-[#64748B]">{booking.property}</td>
                        <td className="py-4 px-4"><StatusBadge status={booking.status} /></td>
                        <td className="py-4 px-4 font-semibold text-[#0F172A]">${booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#003580] text-white rounded-lg font-semibold hover:bg-[#0071C2] transition-colors">
                <Plus className="w-5 h-5" />
                {t('adminDashboard.addProperty')}
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map(property => (
                <div key={property.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">{property.name}</h3>
                    <p className="text-[#64748B] mb-4">{property.location}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-[#64748B]">Price per night</p>
                        <p className="text-2xl font-bold text-[#003580]">${property.price}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-[#0F172A]">{property.rating}</span>
                        <span className="text-[#F5A623]">★</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                        <Edit className="w-4 h-4" />
                        {t('common.edit')}
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#EF4444] text-[#EF4444] rounded-lg hover:bg-[#FEE2E2] transition-colors">
                        <Trash2 className="w-4 h-4" />
                        {t('common.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('adminDashboard.allProperties')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.bookingId')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.guest')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.property')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.dates')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.status')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">{t('adminDashboard.amount')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#64748B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map(booking => (
                    <tr key={booking.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                      <td className="py-4 px-4 font-medium text-[#0F172A]">{booking.id}</td>
                      <td className="py-4 px-4 text-[#0F172A]">{booking.guest}</td>
                      <td className="py-4 px-4 text-[#64748B]">{booking.property}</td>
                      <td className="py-4 px-4 text-[#64748B] text-sm">{booking.checkIn} - {booking.checkOut}</td>
                      <td className="py-4 px-4"><StatusBadge status={booking.status} /></td>
                      <td className="py-4 px-4 font-semibold text-[#0F172A]">${booking.amount}</td>
                      <td className="py-4 px-4">
                        <button className="text-[#0071C2] hover:underline text-sm font-semibold">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
