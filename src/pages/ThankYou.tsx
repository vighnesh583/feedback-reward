
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiscountReveal from "../components/DiscountReveal";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Discount and code are expected in state
  const { discount, code } = (location.state as { discount: number; code: string }) || {};

  if (!discount || !code) {
    // fallback
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 via-teal-100 to-amber-50">
        <div className="text-2xl font-bold mb-6 text-blue-700">Thank you for your feedback!</div>
        <div className="text-lg text-gray-600">We couldn't find your reward - please submit feedback again.</div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow"
        >
          Back to Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 via-teal-100 to-amber-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in border border-blue-100">
        <div className="text-2xl font-extrabold text-blue-700 tracking-tight mb-3">Thank you for your feedback!</div>
        <DiscountReveal discount={discount} code={code} />
        <button
          onClick={() => navigate("/feedback")}
          className="mt-6 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          Submit More Feedback
        </button>
        <div className="mt-3 text-gray-400 text-xs text-center">Have questions? Ask our staff for details.</div>
      </div>
    </div>
  );
};

export default ThankYou;
