import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CreditCard, Lock } from "lucide-react";
import { BookingSummary } from "../components/BookingSummary";
import { useLanguage } from "../../i18n/LanguageContext";

export function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/booking-success");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">{t('booking.title')}</h1>
        <p className="text-[#64748B] mb-8">Just a few more steps to secure your stay</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Details */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('booking.yourDetails')}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('booking.firstName')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('booking.lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t('booking.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t('booking.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    {t('booking.specialRequests')}
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] resize-none"
                    placeholder={t('booking.requestsPlaceholder')}
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
                    {t('booking.cardNumber')} *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      maxLength={19}
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
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('booking.expiryDate')} *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      maxLength={5}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {t('booking.cvv')} *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      maxLength={4}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2]"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#22C55E] mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A] mb-1">
                      Your payment is secure
                    </p>
                    <p className="text-xs text-[#64748B]">
                      All transactions are encrypted and secure. We never store your full card details.
                    </p>
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
                  className="mt-1 w-5 h-5 rounded border-[#CBD5E1] text-[#0071C2] focus:ring-2 focus:ring-[#0071C2]"
                />
                <span className="text-sm text-[#64748B]">
                  {t('auth.register.agree')}{" "}
                  <a href="#" className="text-[#0071C2] hover:underline">
                    {t('auth.register.terms')}
                  </a>
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-[#003580] to-[#0071C2] text-white font-bold rounded-xl hover:shadow-xl transition-all text-lg"
            >
              {t('booking.completeBooking')}
            </button>
          </div>

          {/* Booking Summary - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <BookingSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
