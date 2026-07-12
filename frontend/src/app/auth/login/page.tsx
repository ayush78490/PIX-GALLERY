"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import { backendUrl, googleSignInUrl, setStoredAuthToken } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
        token?: string;
      };

      if (!response.ok || !payload.ok || !payload.token) {
        if (payload.message?.toLowerCase().includes("verify your email")) {
          setNeedsVerification(true);
        }
        setError(payload.message || "Sign in failed.");
        return;
      }

      setStoredAuthToken(payload.token);
      router.push("/profile");
    } catch {
      setError("Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    setResending(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.message || "Could not resend verification code.");
        return;
      }

      setNeedsVerification(true);
      setError(payload.message);
    } catch {
      setError("Could not resend verification code.");
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(249,249,247,1)_38%,_rgba(235,231,224,1)_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.02)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.02)_75%,transparent_75%,transparent)] bg-[length:28px_28px] opacity-30" />
      <section className="relative mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="hidden rounded-[2rem] border border-[#c4c7c7]/70 bg-[#1f2024] p-10 text-white shadow-[0_30px_100px_rgba(0,0,0,0.16)] lg:flex lg:min-h-[720px] lg:flex-col lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">pixGallery access</p>
            <h1 className="mt-6 max-w-lg text-5xl leading-[0.95] text-white xl:text-6xl">Welcome back.</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/72">
              Sign in to manage galleries, track bookings, and keep your photography workflow in one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Secure access", "Email verification keeps accounts protected."],
              ["Google login", "Use your Google account for a faster sign-in."],
              ["Profile tools", "Set password, verify email, and update details."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-2 text-xs leading-6 text-white/65">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[460px] rounded-[2rem] border border-[#c4c7c7]/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(26,28,27,0.12)] backdrop-blur sm:p-8">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-[#747878]">Sign in</p>
            <h2 className="mt-3 text-3xl">Welcome back</h2>
            <p className="mt-3 text-sm leading-6 text-[#444748]">
              Enter your email and password, or continue with Google to access your account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#444748]">Email address</label>
              <input
                className="mt-2 w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#9a9d9b] focus:border-black"
                placeholder="studio@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label className="text-xs uppercase tracking-widest text-[#444748]">Password</label>
                <Link className="text-xs text-[#747878] transition hover:text-black" href="/auth/register">
                  Need an account?
                </Link>
              </div>
              <input
                className="w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#9a9d9b] focus:border-black"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <Button className="w-full py-3 text-sm" type="submit">
              {loading ? "Signing in..." : "Log in"}
            </Button>

            {needsVerification ? (
              <button
                className="w-full rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                type="button"
                onClick={() => void handleResendVerification()}
                disabled={resending || !email}
              >
                {resending ? "Resending..." : "Resend verification code"}
              </button>
            ) : null}

            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#e4e0d8]" />
              <span className="relative mx-auto block w-fit bg-white/90 px-3 text-xs uppercase tracking-[0.3em] text-[#747878]">
                Or
              </span>
            </div>

            <Button className="w-full gap-3 border border-[#c4c7c7]/70 bg-[#fbfbf9] text-black hover:bg-[#f3f1ec]" variant="inverse" href={googleSignInUrl()}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d2d2d2] bg-white text-[11px] font-bold text-[#4285f4]">
                G
              </span>
              Sign in with Google
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#747878]">
            Don&apos;t have an account?{" "}
            <Link className="font-medium text-black underline-offset-4 hover:underline" href="/auth/register">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}