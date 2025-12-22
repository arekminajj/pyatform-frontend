"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "Registration failed");
      return;
    }

    router.push("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow bg-white dark:bg-gray-800 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded border dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded border dark:bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-indigo-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
