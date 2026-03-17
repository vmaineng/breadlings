"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button, Input, Card } from "../ui";
import { signIn } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <div
      className="min-h-screen bg-cream flex items-center justify-center p-4"
      style={{
        backgroundImage: `radial-gradient(ellipse at 0% 0%, rgba(232,201,138,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(196,122,58,0.2) 0%, transparent 50%)`,
      }}
    >
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-fraunces font-black text-5xl text-crust">
            Bread<span className="text-wheat-deep italic">lings</span>
          </h1>
          <p className="text-text-light font-nunito font-semibold mt-1">
            Welcome back, baker 🍞
          </p>
        </div>

        <Card accent>
          <h2 className="font-fraunces font-bold text-2xl text-crust mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isPending}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              disabled={isPending}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm font-semibold text-text-light font-nunito mt-5">
            New here?{" "}
            <Link
              href="/auth/signup"
              className="text-wheat-deep font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
