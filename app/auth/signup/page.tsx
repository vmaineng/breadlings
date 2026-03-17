"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button, Input, Card } from "../../ui";
import { signUp } from "../actions";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await signUp(formData);
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
        <div className="text-center mb-8">
          <h1 className="font-fraunces font-black text-5xl text-crust">
            Bread<span className="text-wheat-deep italic">lings</span>
          </h1>
          <p className="text-text-light font-nunito font-semibold mt-1">
            Start your sourdough journey 🌱
          </p>
        </div>

        <Card accent>
          <h2 className="font-fraunces font-bold text-2xl text-crust mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="username"
              type="text"
              placeholder="Username"
              required
              disabled={isPending}
            />
            <Input
              name="email"
              type="email"
              placeholder="min 8 chars"
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
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              disabled={isPending}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              variant="primary"
              size="lg"
            >
              {isPending ? "Creating Account..." : "Create Account 🍞"}
            </Button>
          </form>

          <p className="text-center text-sm font-semibold text-text-light font-nunito mt-5">
            Already baking?{" "}
            <Link
              href="/auth/login"
              className="text-wheat-deep font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
