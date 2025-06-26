// pages/SignupPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
