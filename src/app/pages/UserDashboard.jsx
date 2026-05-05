import { useEffect, useState } from "react";
import { Calendar, MapPin, User, Heart, MessageSquare } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useLanguage } from "../../i18n/LanguageContext";
import { getUserProfile, updateUserProfile } from "../../api/authService";
import { getUserBookings } from "../../api/bookingService";

export function UserDashboard() {
  const { t, language, changeLanguage, availableLanguages } = useLanguage();

  const [activeTab, setActiveTab] = useState("bookings");
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH USER + BOOKINGS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserProfile();
        const userBookings = await getUserBookings();

        setUserInfo(user);
        setBookings(userBookings);
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
    try {
      await updateUserProfile(userInfo);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
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
              </div>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`block w-full text-left p-3 rounded ${
                    activeTab === tab.id ? "bg-blue-100" : ""
                  }`}
                >
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
                        {b.location}
                      </div>

                      <p>
                        {b.checkIn} → {b.checkOut}
                      </p>

                      <StatusBadge status={b.status} />

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

                <input
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  className="input"
                  placeholder="First Name"
                />

                <input
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  className="input"
                  placeholder="Last Name"
                />

                <input
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="input"
                  placeholder="Email"
                />

                <button onClick={handleSave} className="btn-primary mt-4">
                  Save Changes
                </button>
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