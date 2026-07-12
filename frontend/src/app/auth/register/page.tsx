"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import { backendUrl, googleSignInUrl } from "@/lib/auth-client";

type Role = "normal" | "photographer";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("normal");
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
        userId?: string;
      };

      if (!response.ok || !payload.ok || !payload.userId) {
        setError(payload.message || "Failed to create account.");
        return;
      }

      setUserId(payload.userId);
      setMessage("We sent a verification code to your email. Enter it below to finish setting up your account.");
    } catch {
      setError("Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) {
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${backendUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !payload.ok) {
        setError(payload.message || "OTP verification failed.");
        return;
      }

      router.push("/auth/login");
    } catch {
      setError("OTP verification failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode() {
    setResending(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${backendUrl}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !payload.ok) {
        setError(payload.message || "Could not resend verification code.");
        return;
      }

      setMessage(payload.message || "Verification code sent again.");
    } catch {
      setError("Could not resend verification code.");
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.96),_rgba(249,249,247,1)_40%,_rgba(233,228,219,1)_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,28,27,0.03)_25%,transparent_25%,transparent_50%,rgba(26,28,27,0.03)_50%,rgba(26,28,27,0.03)_75%,transparent_75%,transparent)] bg-[length:28px_28px] opacity-25" />
      <section className="relative mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="order-2 rounded-[2rem] border border-[#c4c7c7]/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(26,28,27,0.12)] backdrop-blur sm:p-8 lg:order-1 lg:max-w-[500px]">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-[#747878]">Create account</p>
            <h2 className="mt-3 text-3xl">Join pixGallery</h2>
            <p className="mt-3 text-sm leading-6 text-[#444748]">
              Create your account, verify your email with OTP, and unlock your profile tools.
            </p>
          </div>

          {!userId ? (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">Name</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#9a9d9b] focus:border-black"
                  placeholder="Ayush Raj"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">Email address</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#9a9d9b] focus:border-black"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#9a9d9b] focus:border-black"
                  placeholder="Create a password (optional)"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">Account type</label>
                <select
                  className="mt-2 w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition focus:border-black"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="normal">Normal user</option>
                  <option value="photographer">Photographer</option>
                </select>
              </div>

              {error ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </p>
              ) : null}

              <Button className="w-full py-3 text-sm" type="submit">
                {loading ? "Creating account..." : "Create account"}
              </Button>

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
                Continue with Google
              </Button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <div className="rounded-2xl border border-[#e4e0d8] bg-[#fbfbf9] p-4 text-sm text-[#444748]">
                Enter the 6-digit code we sent to <span className="font-medium text-black">{email}</span>.
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">Verification code</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-[#c4c7c7]/70 bg-[#fbfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#9a9d9b] focus:border-black"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              {error ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </p>
              ) : null}

              <Button className="w-full py-3 text-sm" type="submit">
                {loading ? "Verifying..." : "Verify email"}
              </Button>

              <button
                className="w-full rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                type="button"
                onClick={() => void handleResendCode()}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend code"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-[#747878]">
            Already have an account?{" "}
            <Link className="font-medium text-black underline-offset-4 hover:underline" href="/auth/login">
              Sign in
            </Link>
          </div>
        </div>

        <div className="order-1 hidden rounded-[2rem] border border-[#c4c7c7]/70 bg-[#212126] p-10 text-white shadow-[0_30px_100px_rgba(0,0,0,0.16)] lg:order-2 lg:flex lg:min-h-[720px] lg:flex-col lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">Account setup</p>
            <h1 className="mt-6 max-w-lg text-5xl leading-[0.95] text-white xl:text-6xl">Build your profile, then verify it.</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/72">
              Register once, confirm your email, and then manage your identity, password, and photographer details from one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["OTP verification", "A code is sent to your inbox to activate the account."],
              ["Optional password", "You can set a password now or later from your profile."],
              ["Google sign-in", "Use the Google button if you prefer a faster start."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-2 text-xs leading-6 text-white/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}