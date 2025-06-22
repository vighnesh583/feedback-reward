
import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

interface Props {
  rating: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, onChange, size = 32, className = "" }: Props) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= rating;
    stars.push(
      <button
        key={i}
        type="button"
        aria-label={`Rate ${i}`}
        onClick={() => onChange?.(i)}
        className={`transition-all ${onChange ? "hover:scale-110" : ""} ${className}`}
        tabIndex={0}
      >
        {filled ? (
          <Star size={size} className={filled ? "text-yellow-400 fill-yellow-300" : "text-gray-300"} fill={filled ? "#facc15" : "none"} />
        ) : (
          <StarOff size={size} className="text-gray-300" />
        )}
      </button>
    );
  }
  return <div className="flex gap-1">{stars}</div>;
}
