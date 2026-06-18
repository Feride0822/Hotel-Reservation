import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle, Search } from "lucide-react";
import { useLanguage } from "../../../i18n/LanguageContext";
import { getUsers, approveUser, rejectUser } from "../../../api/userService";

export function GuestAdminDashboard() {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // user id
  const [error, setError] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(searchQuery);
      setUsers(data.users ?? []); // adjust based on actual response structure
    } catch {
      setError(t("guestAdminDashboard.failedLoadUsers"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search (optional: debounce later)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchUsers(value);
  };

  // Approve
  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      await approveUser(id);
      await fetchUsers(searchQuery); // refresh
    } catch {
      setError(t("guestAdminDashboard.failedApprove"));
    } finally {
      setActionLoading(null);
    }
  };

  // Reject
  const handleReject = async (id) => {
    try {
      setActionLoading(id);
      await rejectUser(id);
      await fetchUsers(searchQuery); // refresh
    } catch {
      setError(t("guestAdminDashboard.failedReject"));
    } finally {
      setActionLoading(null);
    }
  };

  const getStatus = (user) => {
    if (user.is_active) return "approved";
    return "pending";
  }

  const stats = [
    {
      icon: Users,
      label: t("guestAdminDashboard.totalUsers"),
      value: users.length,
      color: "from-[#003580] to-[#0071C2]",
    },
    {
      icon: CheckCircle,
      label: t("guestAdminDashboard.approved"),
      value: users.filter((u) => u.status === "approved").length,
      color: "from-[#22C55E] to-[#16A34A]",
    },
    {
      icon: XCircle,
      label: t("guestAdminDashboard.pending"),
      value: users.filter((u) => u.status === "pending").length,
      color: "from-[#F59E0B] to-[#D97706]",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            {t("guestAdminDashboard.title")}
          </h1>
          <p className="text-[#64748B]">
            {t("guestAdminDashboard.subtitle")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-[#64748B] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder={t("guestAdminDashboard.searchPlaceholder")}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
            {t("guestAdminDashboard.users")}
          </h2>

          {loading ? (
            <p>{t("guestAdminDashboard.loadingUsers")}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="py-3 px-4 text-left text-sm text-[#64748B]">{t("guestAdminDashboard.name")}</th>
                    <th className="py-3 px-4 text-left text-sm text-[#64748B]">{t("guestAdminDashboard.email")}</th>
                    <th className="py-3 px-4 text-left text-sm text-[#64748B]">{t("guestAdminDashboard.role")}</th>
                    <th className="py-3 px-4 text-left text-sm text-[#64748B]">{t("guestAdminDashboard.status")}</th>
                    <th className="py-3 px-4 text-left text-sm text-[#64748B]">{t("guestAdminDashboard.actions")}</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-[#F8FAFC]">
                      <td className="py-4 px-4">{user.firstName} {user.lastName}</td>
                      <td className="py-4 px-4">{user.email}</td>
                      <td className="py-4 px-4 capitalize">{user.person_type}</td>
                      <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            getStatus(user) === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {getStatus(user)}
                          </span>
                        </td>

                      <td className="py-4 px-4 flex gap-2">
                        {!user.is_active ? (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              disabled={actionLoading === user.id}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                              {actionLoading === user.id ? "..." : t("guestAdminDashboard.approve")}
                            </button>

                            <button
                              onClick={() => handleReject(user.id)}
                              disabled={actionLoading === user.id}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                              {actionLoading === user.id ? "..." : t("guestAdminDashboard.reject")}
                            </button>
                          </>
                        ) : (
                          <span className="text-sm text-gray-400">
                            {t("guestAdminDashboard.noActions")}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}