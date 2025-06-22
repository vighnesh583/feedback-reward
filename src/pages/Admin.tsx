
import React, { useState, useMemo } from "react";
import { getAllFeedback, FeedbackEntry } from "../lib/feedbackUtils";
import FeedbackTable from "../components/FeedbackTable";
import SummaryStats from "../components/SummaryStats";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"date" | "rating">("date");
  const [asc, setAsc] = useState(false);
  const navigate = useNavigate();

  // For live view, reload all feedback on every render.
  const feedback: FeedbackEntry[] = useMemo(() => getAllFeedback(), []);
  
  const filtered = feedback
    .filter((fb) =>
      [fb.name, fb.email, fb.message]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "date") {
        return asc
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sort === "rating") {
        return asc ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="bg-gradient-to-tr from-blue-50 via-amber-50 to-purple-50 min-h-screen py-10 px-3">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">Feedback Dashboard</h1>
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
            title="Switch to Client View"
          >
            <ArrowLeft size={18} />
            Client View
          </Button>
        </div>
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center md:justify-between">
          <SummaryStats feedback={filtered} />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="search"
            placeholder="Search name, email, or keyword..."
            className="bg-white px-4 py-2 rounded-lg shadow border w-full max-w-sm focus:ring-2 focus:ring-blue-300 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSort("date")}
              className={`px-3 py-2 rounded-md font-semibold transition-colors ${
                sort === "date" ? "bg-blue-100 text-blue-800" : "bg-white text-gray-600"
              }`}
            >
              Sort by Date
            </button>
            <button
              onClick={() => setSort("rating")}
              className={`px-3 py-2 rounded-md font-semibold transition-colors ${
                sort === "rating" ? "bg-blue-100 text-blue-800" : "bg-white text-gray-600"
              }`}
            >
              Sort by Rating
            </button>
            <button
              onClick={() => setAsc((a) => !a)}
              className="px-3 py-2 rounded-md bg-gray-100 font-semibold text-gray-600 hover:bg-gray-200"
              title="Toggle ascending/descending"
            >
              {asc ? "Asc ↑" : "Desc ↓"}
            </button>
          </div>
        </div>
        <FeedbackTable feedback={filtered} />
      </div>
    </div>
  );
};

export default Admin;

