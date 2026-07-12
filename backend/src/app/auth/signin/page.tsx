"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `${frontendUrl}/profile`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.96),_rgba(249,249,247,1)_35%,_rgba(236,231,222,1)_100%)] text-[#1a1c1b]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,28,27,0.03)_25%,transparent_25%,transparent_50%,rgba(26,28,27,0.03)_50%,rgba(26,28,27,0.03)_75%,transparent_75%,transparent)] bg-[length:28px_28px] opacity-30" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-0 overflow-hidden rounded-[2rem] border border-[#c4c7c7]/70 bg-white/90 shadow-[0_24px_80px_rgba(26,28,27,0.14)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          <aside className="hidden bg-[#1d1f22] p-10 text-white lg:flex lg:min-h-[640px] lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/55">pixGallery</p>
              <h1 className="mt-6 max-w-md text-5xl leading-[0.96] text-white xl:text-6xl">
                Welcome back to your studio.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
                Sign in with Google to open your galleries, bookings, and profile in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Fast access", "One click with Google keeps sign-in simple."],
                ["Verified accounts", "Your profile and email verification stay in sync."],
                ["Editorial feel", "A warmer, modern palette that matches the app."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-2 text-xs leading-6 text-white/65">{description}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[640px] flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-[#747878]">Sign in</p>
                <h2 className="mt-3 text-3xl">Continue with Google</h2>
                <p className="mt-3 text-sm leading-6 text-[#444748]">
                  Use the Google account connected to your pixGallery profile.
                </p>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-[#c4c7c7]/70 bg-[#fbfbf9] p-6 shadow-[0_16px_50px_rgba(26,28,27,0.08)]">
                <div className="flex items-center gap-4 rounded-[1.35rem] border border-[#e4e0d8] bg-white px-4 py-4 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f2ec] text-sm font-semibold text-[#1a1c1b]">
                    G
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1c1b]">Google account</p>
                    <p className="text-xs text-[#747878]">Recommended for photographers and editors</p>
                  </div>
                </div>

                <button
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-black/90"
                  type="button"
                  onClick={() => void signIn("google", { callbackUrl })}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#4285f4]">
                    G
                  </span>
                  Sign in with Google
                </button>

                <div className="relative py-5">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-[#e4e0d8]" />
                  <span className="relative mx-auto block w-fit bg-[#fbfbf9] px-3 text-xs uppercase tracking-[0.3em] text-[#747878]">
                    Or
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    className="inline-flex items-center justify-center rounded-full border border-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
                    href={`${frontendUrl}/auth/login`}
                  >
                    Use email login
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center rounded-full border border-[#c4c7c7] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#1a1c1b] transition hover:border-black hover:bg-[#f5f2ec]"
                    href={`${frontendUrl}/auth/register`}
                  >
                    Create account
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-[#747878] lg:text-left">
                By continuing, you agree to use the pixGallery account system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}