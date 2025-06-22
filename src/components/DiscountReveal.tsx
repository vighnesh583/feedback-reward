
import React from "react";

interface Props {
  discount: number;
  code: string;
}

export default function DiscountReveal({ discount, code }: Props) {
  return (
    <div className="flex flex-col items-center my-8">
      <div className="mb-4 text-lg text-gray-600 font-medium animate-fade-in">
        You've unlocked an exclusive reward!
      </div>
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl px-10 py-8 text-center shadow-lg flex flex-col items-center gap-2 animate-scale-in">
        <div className="text-5xl font-black text-white tracking-wide animate-pulse">{discount}% OFF</div>
        <div className="uppercase tracking-[0.3em] text-lg bg-white text-yellow-700 rounded px-4 py-2 font-bold mt-3 shadow border border-yellow-300 select-all">
          {code}
        </div>
      </div>
      <div className="mt-3 text-gray-500 text-sm">Show this code at checkout to redeem!</div>
    </div>
  );
}
