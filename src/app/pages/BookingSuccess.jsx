import { Link, useLocation, useNavigate } from "react-router";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Download,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useEffect } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BookingSuccess() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const email = location.state?.email;
  // If someone lands here directly without a booking, send them home
  useEffect(() => {
    if (!booking) navigate("/", { replace: true });
  }, [booking, navigate]);

  if (!booking) return null;

  // The API returns: id, check_in, check_out, status, nt (nights),
  // hotelName, location, roomNumber, total, special_requests, created_at
  const bookingRef = `BK${String(booking.id).padStart(6, "0")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            {t("bookingSuccess.title")}
          </h1>
          <p className="text-xl text-[#64748B]">
            {t("bookingSuccess.subtitle")}
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-8"
        >
          {/* Booking Reference */}
          <div className="text-center mb-8 pb-8 border-b border-[#E2E8F0]">
            <p className="text-sm text-[#64748B] mb-2">
              {t("bookingSuccess.bookingReference")}
            </p>
            <p className="text-3xl font-bold text-[#003580] tracking-wider">
              {bookingRef}
            </p>
          </div>

          {/* Hotel Details */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
                  {booking.hotelName}
                </h2>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.location}</span>
                </div>
                {booking.roomNumber && (
                  <p className="text-sm text-[#64748B] mt-1">
                    Room {booking.roomNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Booking Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0071C2]" />
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">
                    {t("booking.checkIn")}
                  </p>
                  <p className="font-bold text-[#0F172A]">
                    {formatDate(booking.check_in)}
                  </p>
                  <p className="text-sm text-[#64748B]">After 3:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0071C2]" />
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">
                    {t("booking.checkOut")}
                  </p>
                  <p className="font-bold text-[#0F172A]">
                    {formatDate(booking.check_out)}
                  </p>
                  <p className="text-sm text-[#64748B]">Before 11:00 AM</p>
                </div>
              </div>

              {email && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#0071C2]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">
                      {t("bookingSuccess.confirmationSent")}
                    </p>
                    <p className="font-bold text-[#0F172A]">{email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Room & Price */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#64748B]">Room</p>
                <p className="font-bold text-[#0F172A]">
                  {booking.roomNumber ? `Room ${booking.roomNumber}` : "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#64748B]">{t("booking.total")}</p>
                <p className="text-2xl font-bold text-[#003580]">
                  ${booking.total?.toLocaleString() ?? "—"}
                </p>
              </div>
            </div>
            {booking.nt && (
              <p className="text-xs text-[#64748B]">
                {booking.nt}{" "}
                {booking.nt === 1
                  ? (t("booking.night") ?? "night")
                  : t("booking.nights")}{" "}
                • Includes taxes and fees
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#003580] text-[#003580] rounded-lg font-semibold hover:bg-[#003580] hover:text-white transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Confirmation
            </button>
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#003580] text-white rounded-lg font-semibold hover:bg-[#0071C2] transition-colors"
            >
              {t("bookingSuccess.viewBookings")}
            </Link>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <h3 className="text-xl font-bold text-[#0F172A] mb-6">
            What's Next?
          </h3>
          <div className="space-y-4">
            {[
              {
                n: 1,
                title: "Check your email",
                desc: "We've sent a confirmation with all the details to your email address.",
              },
              {
                n: 2,
                title: "Prepare for your trip",
                desc: "Review the hotel's check-in policy and make any special arrangements if needed.",
              },
              {
                n: 3,
                title: "Enjoy your stay",
                desc: `Have a wonderful time at ${booking.hotelName}!`,
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#003580] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {n}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">{title}</p>
                  <p className="text-sm text-[#64748B]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <Link to="/" className="text-[#0071C2] font-semibold hover:underline">
            {t("bookingSuccess.backHome")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
