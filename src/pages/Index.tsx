import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import SuggestedSentences from "../components/SuggestedSentences";
import { generateDiscount, generateCode } from "../lib/feedbackUtils";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  name: "",
  email: "",
  rating: 0,
  message: "",
};

const bgLight = "bg-gradient-to-tr from-blue-100 via-teal-100 to-amber-50";

const Index = () => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || form.rating === 0) {
      setError("Please enter your name, email, and give a rating!");
      return;
    }
    setSubmitting(true);
    const discount = generateDiscount();
    const code = generateCode();

    try {
      await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          rating: form.rating,
          message: form.message,
          discount,
          discountCode: code,
          date: new Date().toISOString(),
        })
      });

      setTimeout(() => {
        navigate("/thank-you", { state: { discount, code } });
      }, 900);
    } catch (err) {
      console.error(err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSuggested(txt: string) {
    setForm((prev) => ({
      ...prev,
      message: prev.message.length > 0 ? prev.message + " " + txt : txt,
    }));
  }

  return (
    <div className={`${bgLight} min-h-screen w-full flex items-center justify-center relative`}>
      {/* <Button
        variant="secondary"
        onClick={() => navigate("/admin")}
        className="absolute top-4 right-4 flex items-center gap-2"
        title="Switch to Admin Dashboard"
      >
        <BarChart3 size={18} />
        Dashboard
      </Button> */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fade-in border border-blue-100"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <h1 className="text-2xl font-extrabold text-blue-800 mb-1 tracking-tight">We'd love your feedback</h1>
        <div className="text-base text-gray-500 mb-4">Help us improve and get a random discount for your next visit!</div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={form.name}
            autoComplete="name"
            onChange={handleChange}
            className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
            placeholder="Your name"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={form.email}
            autoComplete="email"
            onChange={handleChange}
            className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Star rating</label>
          <StarRating rating={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} size={36} />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="message">Feedback</label>
          <textarea
            name="message"
            id="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none resize-none transition-all"
            placeholder="Tell us about your experience"
          ></textarea>
        </div>

        <SuggestedSentences onSelect={handleSuggested} />

        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        <button
          type="submit"
          className={`mt-7 w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold py-2.5 rounded-lg shadow-lg hover:scale-105 transition-all text-lg ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit & Get Discount 🎁"}
        </button>
      </form>
    </div>
  );
};

export default Index;
