import { useEffect, useState } from "react";
import { Calendar, MapPin, User, Heart, MessageSquare } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useLanguage } from "../../i18n/LanguageContext";
import { getUserProfile, updateUserProfile } from "../../api/authService";
import { getUserBookings } from "../../api/bookingService";

export function UserDashboard() {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("bookings");
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserProfile(); // GET /users/me
        const userBookings = await getUserBookings();
        console.log("bookings response:", userBookings);

        setUserInfo(user);
        setBookings(userBookings.bookings || []); // adjust based on actual response structure
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ UPDATE PROFILE
  const handleSave = async () => {
    setSaveError("");
    setSaveSuccess("");
    setSaveLoading(true);
    try {
      // PUT /users/me
      const updated = await updateUserProfile({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        country: userInfo.country,
      });
      setUserInfo(updated);
      setSaveSuccess("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setSaveError("Failed to update profile");
    } finally {
      setSaveLoading(false);
    }
  };

  const tabs = [
    { id: "bookings", label: t("userDashboard.myBookings"), icon: Calendar },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
  ];

  if (loading) return <div className="p-10">Loading...</div>;
  if (!userInfo) return <div className="p-10">Error loading data</div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {t("userDashboard.welcome")}, {userInfo.firstName}
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="mb-6 border-b pb-4">
                <p className="font-bold">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-sm text-gray-500">{userInfo.email}</p>
                <p className="text-xs text-gray-400 mt-1 capitalize">{userInfo.person_type}</p>
              </div>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === tab.id ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-3">
            {/* BOOKINGS */}
            {activeTab === "bookings" && (
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-4">
                  {t("userDashboard.myBookings")}
                </h2>

                {bookings.length === 0 ? (
                  <p>No bookings yet</p>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="border p-4 rounded mb-4">
                      <h3 className="font-bold">{b.hotelName}</h3>

                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={14} />
                        {b.location} •  Room {b.roomNumber}
                      </div>

                      <p>
                        {b.check_in} → {b.check_out} ({b.nt} nights)
                      </p>

                      <div className="mt-2"><StatusBadge status={b.status} /></div>

                      <p className="font-bold mt-2">${b.total}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-4">
                  {t("userDashboard.personalInfo")}
                </h2>
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                    <input
                      value={userInfo.firstName || ""}
                      onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                    <input
                      value={userInfo.lastName || ""}
                      onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      value={userInfo.email || ""}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input
                      value={userInfo.phone || ""}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                    <input
                      value={userInfo.country || ""}
                      onChange={(e) => setUserInfo({ ...userInfo, country: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
                  {saveSuccess && <p className="text-green-600 text-sm">{saveSuccess}</p>}

                  <button
                    onClick={handleSave}
                    disabled={saveLoading}
                    className="w-full py-3 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white font-bold rounded-xl disabled:opacity-50"
                  >
                    {saveLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {(activeTab === "saved" || activeTab === "reviews") && (
              <div className="bg-white p-6 rounded text-center">
                No {activeTab} yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}