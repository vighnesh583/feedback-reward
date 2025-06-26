import React, { useState, useEffect } from "react";
import { FeedbackEntry } from "../lib/feedbackUtils";
import FeedbackTable from "../components/FeedbackTable";
import SummaryStats from "../components/SummaryStats";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";





const Admin = () => {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"date" | "rating">("date");
  const [asc, setAsc] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const userId = user?.id;


  function handleLogout() {
    logout();  
    navigate("/login");
  }
  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await fetch(`${API_URL}/api/feedback/${userId}`, {
          headers: {
           'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
       });
       if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unauthorized");
      }
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Expected array, got something else");

        // map _id → id for FeedbackEntry type
        const mapped = data.map((item: any) => ({
          id: item._id,
          name: item.name,
          email: item.email,
          rating: item.rating,
          message: item.message,
          discount: item.discount,
          discountCode: item.discountCode,
          date: item.date,
        }));

        setFeedback(mapped);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
      }
    }
    fetchFeedback();
  }, []);

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
  <div className="flex gap-2">
  {user && (
    <>
    <span className="text-gray-700 font-semibold">Hi, {user.name}</span>
    <p className="text-sm text-gray-600">
          Share this link:&nbsp;
          <code className="bg-gray-100 px-2 py-1 rounded text-blue-700">
            {`https://feedback-reward.vercel.app/feedback/${user.id}`}
          </code>
        </p>
    </>
  )}
    {!user ? (
      <>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Sign Up
        </button>
      </>
    ) : (
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    )}
  </div>
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
