
import React from "react";
import type { FeedbackEntry } from "../lib/feedbackUtils";
import { Star } from "lucide-react";

interface Props {
  feedback: FeedbackEntry[];
}

export default function SummaryStats({ feedback }: Props) {
  const count = feedback.length;
  const avg = count
    ? (feedback.map((f) => f.rating).reduce((acc, n) => acc + n, 0) / count).toFixed(2)
    : "0";
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <div className="px-4 py-2 bg-blue-200 text-blue-900 rounded-lg font-bold text-lg">{count} Responses</div>
      <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg flex items-center font-bold text-lg">
        <Star size={22} className="text-yellow-400 fill-yellow-300 mr-1" fill="#facc15" />
        {avg} Avg Rating
      </div>
    </div>
  );
}
