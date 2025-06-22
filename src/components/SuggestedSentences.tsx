
import React from "react";

const suggestions = [
  "Great service!",
  "Loved the ambiance",
  "Could be faster",
  "Friendly staff",
  "Amazing coffee",
  "Loved the decor",
  "Perfect for relaxing",
];

interface Props {
  onSelect: (value: string) => void;
}

export default function SuggestedSentences({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((txt) => (
        <button
          type="button"
          key={txt}
          onClick={() => onSelect(txt)}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full shadow-sm transition-colors text-sm font-medium"
        >
          {txt}
        </button>
      ))}
    </div>
  );
}
