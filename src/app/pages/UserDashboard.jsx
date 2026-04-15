import { useState } from "react";
import { Calendar, MapPin, User, Settings, Heart, MessageSquare } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useLanguage } from "../../i18n/LanguageContext";

const mockBookings = [
  {
    id: "BK123456",
    hotel: "Oceanview Paradise Resort",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1715191904112-4a5d9c3089fa?w=200",
    checkIn: "2026-06-15",
    checkOut: "2026-06-20",
    guests: 2,
    total: 2250,
    status: "confirmed"
  },
  {
    id: "BK789012",
    hotel: "Metropolitan Luxury Suites",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1771775735088-59634fd40db5?w=200",
    checkIn: "2026-08-10",
    checkOut: "2026-08-15",
    guests: 2,
    total: 1900,
    status: "pending"
  },
];

export function UserDashboard() {
  const { t, language, changeLanguage, availableLanguages } = useLanguage();
  const [activeTab, setActiveTab] = useState("bookings");
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  const tabs = [
    { id: "bookings", label: t('userDashboard.myBookings'), icon: Calendar },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            {t('userDashboard.welcome')}, {userInfo.firstName}
          </h1>
          <p className="text-[#64748B]">Manage your bookings and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003580] to-[#0071C2] flex items-center justify-center text-white text-2xl font-bold">
                  {userInfo.firstName[0]}{userInfo.lastName[0]}
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">{userInfo.firstName} {userInfo.lastName}</p>
                  <p className="text-sm text-[#64748B]">{userInfo.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#F0F9FF] text-[#0071C2]'
                        : 'text-[#64748B] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "bookings" && (
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('userDashboard.myBookings')}</h2>
                
                <div className="space-y-6">
                  {mockBookings.map(booking => (
                    <div key={booking.id} className="border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={booking.image}
                          alt={booking.hotel}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-[#0F172A] mb-1">{booking.hotel}</h3>
                              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                                <MapPin className="w-4 h-4" />
                                {booking.location}
                              </div>
                            </div>
                            <StatusBadge status={booking.status} />
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-[#64748B] mb-1">{t('booking.checkIn')}</p>
                              <p className="font-semibold text-[#0F172A]">{booking.checkIn}</p>
                            </div>
                            <div>
                              <p className="text-[#64748B] mb-1">{t('booking.checkOut')}</p>
                              <p className="font-semibold text-[#0F172A]">{booking.checkOut}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                            <div>
                              <p className="text-sm text-[#64748B] mb-1">Booking ID</p>
                              <p className="font-bold text-[#0F172A]">{booking.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-[#64748B] mb-1">{t('booking.total')}</p>
                              <p className="text-2xl font-bold text-[#003580]">${booking.total}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('userDashboard.personalInfo')}</h2>
                
                <div className="space-y-5 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                        {t('booking.firstName')}
                      </label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                        {t('booking.lastName')}
                      </label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('booking.email')}
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('booking.phone')}
                    </label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] mb-4 mt-8">{t('userDashboard.preferences')}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('userDashboard.language')}
                    </label>
                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] bg-white"
                    >
                      {availableLanguages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="mt-8 px-8 py-3 bg-[#003580] text-white rounded-lg font-semibold hover:bg-[#0071C2] transition-colors">
                  {t('userDashboard.saveChanges')}
                </button>
              </div>
            )}

            {(activeTab === "saved" || activeTab === "reviews") && (
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
                <p className="text-[#64748B]">No {activeTab} yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
