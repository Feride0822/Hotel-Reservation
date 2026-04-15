import { Star } from "lucide-react";

export function ReviewCard({ review }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#003580] to-[#0071C2] flex items-center justify-center text-white font-bold flex-shrink-0">
          {review.avatar}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-bold text-[#0F172A]">{review.author}</h4>
              <p className="text-sm text-[#64748B]">{formatDate(review.date)}</p>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#003580] text-white rounded-lg">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm font-semibold">{review.rating}</span>
            </div>
          </div>

          {/* Comment */}
          <p className="text-[#0F172A] leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
