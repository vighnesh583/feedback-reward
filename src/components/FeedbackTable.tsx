
import React from "react";
import type { FeedbackEntry } from "../lib/feedbackUtils";
import { Star } from "lucide-react";

interface Props {
  feedback: FeedbackEntry[];
}

function renderStars(rating: number) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={20}
          className={i <= rating ? "text-yellow-400 fill-yellow-300" : "text-gray-300"}
          fill={i <= rating ? "#facc15" : "none"}
        />
      ))}
    </div>
  );
}

export default function FeedbackTable({ feedback }: Props) {
  if (feedback.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow text-gray-500 px-8 py-12 text-lg mt-8 text-center">
        No feedback yet. Encourage customers to scan the QR code!
      </div>
    );
  }
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto rounded-xl overflow-hidden shadow border">
        <thead>
          <tr className="bg-blue-100 text-blue-800">
            <th className="p-3 text-left font-bold">Name</th>
            <th className="p-3 text-left font-bold">Email</th>
            <th className="p-3 text-center font-bold">Rating</th>
            <th className="p-3 text-left font-bold">Feedback</th>
            <th className="p-3 text-center font-bold">Discount</th>
            <th className="p-3 text-center font-bold">Date</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((fb) => (
            <tr key={fb.id} className="even:bg-blue-50 odd:bg-white border-b">
              <td className="p-3">{fb.name}</td>
              <td className="p-3">{fb.email}</td>
              <td className="p-3 text-center">{renderStars(fb.rating)}</td>
              <td className="p-3">{fb.message}</td>
              <td className="p-3 text-center">
                <span className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-lg font-bold">
                  {fb.discount}% <span className="ml-1 text-xs">({fb.discountCode})</span>
                </span>
              </td>
              <td className="p-3 text-center text-xs text-gray-500">{new Date(fb.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
