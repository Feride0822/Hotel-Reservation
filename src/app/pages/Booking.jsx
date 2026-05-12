import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { CreditCard, Lock, Loader2, AlertCircle } from "lucide-react";
import { BookingSummary } from "../components/BookingSummary";
import { useLanguage } from "../../i18n/LanguageContext";
import { getRoom } from "../../api/roomService";
import { createBooking } from "../../api/bookingService";

export function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    checkIn: searchParams.get("check_in") ?? "",
    checkOut: searchParams.get("check_out") ?? "",
    cardNumber: "",
    cardName: "",
    // expiryDate & cvv are UI-only; the API does not accept them
    expiryDate: "",
    cvv: "",
  });

  const [room, setRoom] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [roomError, setRoomError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoadingRoom(true);
      setRoomError(null);
      try {
        const data = await getRoom(id);
        setRoom(data);
      } catch (err) {
        console.error(err);
        setRoomError(
          "Could not load room details. Please go back and try again.",
        );
      } finally {
        setLoadingRoom(false);
      }
    }
    load();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
 
    try {
      // Build the exact payload the API expects
      await createBooking({
        room_id:          Number(id),
        check_in:         formData.checkIn,
        check_out:        formData.checkOut,
        special_requests: formData.specialRequests || undefined,
        payment_method:   "credit_card",
        card_number:      formData.cardNumber.replace(/\s/g, ""), // strip spaces
        card_name:        formData.cardName,
      });
 
      navigate("/booking-success");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.detail ?? err.message ?? "Booking failed. Please try again.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3 text-[#64748B]">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading booking details…</span>
      </div>
    );
  }

  if (roomError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[#64748B]">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p>{roomError}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#0071C2] underline underline-offset-2"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
          {t("booking.title")}
        </h1>
        <p className="text-[#64748B] mb-8">{t("booking.subtitle")}</p>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Booking Form ── */}
          <div className="lg:col-span-2 space-y-6">
 
            {/* Guest Details */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {t("booking.yourDetails")}
              </h2>
 
              <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t("booking.firstName")} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t("booking.lastName")} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
 
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("booking.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    placeholder="Email address"
                  />
                </div>
 
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("booking.phone")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    placeholder="Phone"
                  />
                </div>
 
                {/* ── Dates ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t("booking.checkIn") ?? "Check-in date"} *
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t("booking.checkOut") ?? "Check-out date"} *
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                      min={formData.checkIn || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    />
                  </div>
                </div>
 
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("booking.specialRequests")}
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] resize-none"
                    placeholder={t("booking.requestsPlaceholder")}
                  />
                </div>
              </form>
            </div>
 
            {/* Payment Details */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-[#22C55E]" />
                <h2 className="text-2xl font-bold text-[#0F172A]">Secure Payment</h2>
              </div>
 
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t("booking.cardNumber")} *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        // Auto-format as "1234 5678 9012 3456"
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16)
                          .replace(/(.{4})/g, "$1 ")
                          .trim();
                        setFormData((prev) => ({ ...prev, cardNumber: val }));
                      }}
                      required
                      maxLength={19}
                      form="booking-form"
                      className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>
 
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    form="booking-form"
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    placeholder="John Doe"
                  />
                </div>
 
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t("booking.expiryDate")} *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        // Auto-format MM/YY
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4)
                          .replace(/^(\d{2})(\d)/, "$1/$2");
                        setFormData((prev) => ({ ...prev, expiryDate: val }));
                      }}
                      required
                      maxLength={5}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t("booking.cvv")} *
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setFormData((prev) => ({ ...prev, cvv: val }));
                      }}
                      required
                      maxLength={4}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="•••"
                    />
                  </div>
                </div>
 
                <div className="bg-[#F8FAFC] rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#22C55E] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A] mb-1">
                      {t("booking.paysec")}
                    </p>
                    <p className="text-xs text-[#64748B]">{t("booking.secmsg")}</p>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Terms & Conditions */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  form="booking-form"
                  className="mt-1 w-5 h-5 rounded border-[#CBD5E1] text-[#0071C2] focus:ring-2 focus:ring-[#0071C2]"
                />
                <span className="text-sm text-[#64748B]">
                  {t("auth.register.agree")}{" "}
                  <a href="#" className="text-[#0071C2] hover:underline">
                    {t("auth.register.terms")}
                  </a>
                </span>
              </label>
            </div>
 
            {/* Submit error */}
            {submitError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm">{submitError}</p>
              </div>
            )}
 
            <button
              type="submit"
              form="booking-form"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white font-bold rounded-xl hover:shadow-xl transition-all text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing…
                </>
              ) : (
                t("booking.completeBooking")
              )}
            </button>
          </div>
 
          {/* Booking Summary - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <BookingSummary room={room} checkIn={formData.checkIn} checkOut={formData.checkOut} />
          </div>
        </div>
      </div>
    </div>
  );
}
