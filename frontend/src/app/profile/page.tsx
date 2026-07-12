"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { backendUrl, getSession, signOut, type AuthSession } from "@/lib/auth-client";

type ProfileForm = {
  displayName: string;
  contactEmail: string;
  contactPhone: string;
  servicesOffered: string;
  pricingInfo: string;
  website: string;
  address: string;
};

const EMPTY_FORM: ProfileForm = {
  displayName: "",
  contactEmail: "",
  contactPhone: "",
  servicesOffered: "",
  pricingInfo: "",
  website: "",
  address: "",
};

const SERVICE_OPTIONS = ["Portrait", "Wedding", "Event", "Fashion", "Product", "Architecture", "Wildlife", "Travel"];
const PRICING_OPTIONS = ["Budget (Under $200)", "Standard ($200 - $500)", "Premium ($500 - $1000)", "Luxury ($1000+)"];

export default function ProfilePage() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  const [verificationOtp, setVerificationOtp] = useState("");
  const [sendingVerification, setSendingVerification] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    getSession().then(setSession).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPreviewImage(session?.user?.image ?? null);
    setSelectedImage(null);
  }, [session]);

  useEffect(() => {
    async function loadProfile(userId: string, fallbackName?: string | null, fallbackEmail?: string | null) {
      setLoadingProfile(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/profiles?userId=${encodeURIComponent(userId)}`, {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          setForm({ ...EMPTY_FORM, displayName: fallbackName ?? "", contactEmail: fallbackEmail ?? "" });
          return;
        }

        const payload = (await response.json()) as {
          data?: {
            displayName?: string | null;
            contactEmail?: string | null;
            contactPhone?: string | null;
            servicesOffered?: string | null;
            pricingInfo?: string | null;
            user?: {
              hasPassword?: boolean;
              emailVerified?: string | null;
              organization?: { website?: string | null; address?: string | null } | null;
            } | null;
          };
        };

        const data = payload.data;
        setForm({
          displayName: data?.displayName ?? fallbackName ?? "",
          contactEmail: data?.contactEmail ?? fallbackEmail ?? "",
          contactPhone: data?.contactPhone ?? "",
          servicesOffered: data?.servicesOffered ?? "",
          pricingInfo: data?.pricingInfo ?? "",
          website: data?.user?.organization?.website ?? "",
          address: data?.user?.organization?.address ?? "",
        });
        setHasPassword(Boolean(data?.user?.hasPassword));
        setEmailVerified(Boolean(data?.user?.emailVerified));
      } catch {
        setError("Could not load profile details.");
      } finally {
        setLoadingProfile(false);
      }
    }

    const userId = session?.user?.id;
    if (userId) {
      void loadProfile(userId, session?.user?.name, session?.user?.email);
    }
  }, [session]);

  const user = session?.user;
  const displayName = user?.name ?? "User";
  const email = user?.email ?? "No email available";
  const role = user?.role ?? "normal";
  const isPhotographer = role === "photographer";

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userId = user?.id;
    if (!userId) {
      setError("You must be signed in to update profile.");
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`${backendUrl}/api/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId,
          displayName: form.displayName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          bio: null,
          servicesOffered: form.servicesOffered,
          pricingInfo: form.pricingInfo,
          website: form.website,
          address: form.address,
          ...(selectedImage ? { image: selectedImage } : {}),
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.message || payload?.details || "Failed to save profile. Please try again.");
        return;
      }

      setMessage(payload?.message || "Profile updated successfully.");
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function setField<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextPreview = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Unable to read image file."));
      reader.readAsDataURL(file);
    });

    setSelectedImage(nextPreview);
    setPreviewImage(nextPreview);
  }

  async function handlePasswordSave() {
    setSavingPassword(true);
    setError(null);
    setMessage(null);
    try {
      if (!newPassword) {
        setError("New password is required.");
        return;
      }
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const userId = user?.id;
      if (!userId) {
        setError("You must be signed in to change password.");
        return;
      }

      const body: any = { userId, newPassword };
      if (hasPassword) body.currentPassword = currentPassword;

      const res = await fetch(`${backendUrl}/api/auth/set-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const payload = await res.json();
      if (!res.ok) {
        setError(payload?.message || "Failed to update password.");
        return;
      }

      setMessage(payload?.message || "Password updated.");
      setHasPassword(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to update password. Please try again.");
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleSendVerificationCode() {
    const userId = user?.id;
    if (!userId || !email) {
      setError("You must be signed in to verify your email.");
      return;
    }

    setSendingVerification(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`${backendUrl}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };
      if (!response.ok || !payload.ok) {
        setError(payload.message || "Failed to send verification code.");
        return;
      }

      setMessage(payload.message || "Verification code sent to your email.");
    } catch {
      setError("Failed to send verification code.");
    } finally {
      setSendingVerification(false);
    }
  }

  async function handleVerifyEmail() {
    const userId = user?.id;
    if (!userId) {
      setError("You must be signed in to verify your email.");
      return;
    }

    if (!verificationOtp) {
      setError("Enter the verification code sent to your email.");
      return;
    }

    setVerifyingEmail(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`${backendUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, otp: verificationOtp }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };
      if (!response.ok || !payload.ok) {
        setError(payload.message || "Failed to verify email.");
        return;
      }

      setEmailVerified(true);
      setVerificationOtp("");
      setMessage(payload.message || "Email verified successfully.");
    } catch {
      setError("Failed to verify email.");
    } finally {
      setVerifyingEmail(false);
    }
  }

  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="Account"
            title={isPhotographer ? "Photographer Profile" : "User Profile"}
            description={
              isPhotographer
                ? "Manage your photographer identity and business details."
                : "Manage your personal profile information."
            }
          />

          {loading ? (
            <InfoCard title="Loading profile" meta="Session">
              <p>Checking your signed-in account.</p>
            </InfoCard>
          ) : user ? (
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <InfoCard title={isPhotographer ? "Photographer" : "Normal user"} meta={role}>
                  <div className="flex items-center gap-4">
                    {(previewImage || user.image) ? (
                      <img className="h-16 w-16 rounded-full object-cover" src={previewImage ?? user.image ?? undefined} alt={displayName} />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-xl text-white">{displayName.charAt(0).toUpperCase()}</div>
                    )}
                    <div>
                      <p className="text-xl">{displayName}</p>
                      <p className="mt-1 text-sm text-[#444748]">{email}</p>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard title="Update profile details" meta={loadingProfile ? "Loading" : "Editable"}>
                  <form className="grid gap-4" onSubmit={handleSave}>
                    <input className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" placeholder="Display name" value={form.displayName} onChange={(e) => setField("displayName", e.target.value)} />
                    <input className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" placeholder="Contact email" value={form.contactEmail} onChange={(e) => setField("contactEmail", e.target.value)} />
                    <input className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" placeholder="Contact phone" value={form.contactPhone} onChange={(e) => setField("contactPhone", e.target.value)} />

                    {isPhotographer ? (
                      <>
                        <label className="text-xs text-[#747878]">Update avatar</label>
                        <input type="file" accept="image/*" onChange={(e) => void handleImageUpload(e)} className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" />
                        <input className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" placeholder="Website" value={form.website} onChange={(e) => setField("website", e.target.value)} />
                        <input className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" placeholder="Address" value={form.address} onChange={(e) => setField("address", e.target.value)} />
                        <select className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" value={form.servicesOffered} onChange={(e) => setField("servicesOffered", e.target.value)}>
                          <option value="">Select service offered</option>
                          {SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                        <select className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" value={form.pricingInfo} onChange={(e) => setField("pricingInfo", e.target.value)}>
                          <option value="">Select pricing tier</option>
                          {PRICING_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </>
                    ) : null}

                    {message ? <p className="text-sm text-green-700">{message}</p> : null}
                    {error ? <p className="text-sm text-red-700">{error}</p> : null}
                    <button className="inline-flex items-center justify-center rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60" type="submit" disabled={saving || loadingProfile}>
                      {saving ? "Saving..." : "Save profile"}
                    </button>
                  </form>
                </InfoCard>
              </div>

              <aside className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
                <h2 className="text-lg">Account</h2>
                <p className="mt-2 text-sm text-[#444748]">Sign out when you are finished using this device.</p>
                {!emailVerified ? (
                  <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4">
                    <h3 className="text-sm font-semibold text-amber-900">Verify email</h3>
                    <p className="mt-2 text-xs text-amber-900/80">
                      Your email is not verified yet. Send a code to {email} and enter it here.
                    </p>
                    <div className="mt-3 grid gap-2">
                      <button className="inline-flex w-full items-center justify-center rounded-full border border-amber-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-amber-900 transition hover:bg-amber-900 hover:text-white disabled:opacity-60" type="button" onClick={() => void handleSendVerificationCode()} disabled={sendingVerification}>
                        {sendingVerification ? "Sending..." : "Send verification code"}
                      </button>
                      <input className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" placeholder="Enter verification code" value={verificationOtp} onChange={(e) => setVerificationOtp(e.target.value)} />
                      <button className="inline-flex w-full items-center justify-center rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60" type="button" onClick={() => void handleVerifyEmail()} disabled={verifyingEmail}>
                        {verifyingEmail ? "Verifying..." : "Verify email"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
                    <h3 className="text-sm font-semibold text-emerald-900">Email verified</h3>
                    <p className="mt-2 text-xs text-emerald-900/80">Your email is verified and ready for password login.</p>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold">Password</h3>
                  <p className="mt-2 text-xs text-[#444748]">{hasPassword ? "You have a password set. Change it below." : "You don't have a password set. Set one now to enable email/password login."}</p>
                  <div className="mt-3 grid gap-2">
                    {hasPassword ? (
                      <input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" />
                    ) : null}
                    <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" />
                    <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black" />
                    {message ? <p className="text-sm text-green-700">{message}</p> : null}
                    {error ? <p className="text-sm text-red-700">{error}</p> : null}
                    <button className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60" type="button" onClick={() => void handlePasswordSave()} disabled={savingPassword}>
                      {savingPassword ? "Saving..." : hasPassword ? "Change password" : "Set password"}
                    </button>
                  </div>
                </div>
                <button className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white" type="button" onClick={() => void signOut()}>
                  Sign out
                </button>
              </aside>
            </section>
          ) : (
            <InfoCard title="Sign in required" meta="Profile">
              <p>Sign in to view your profile page.</p>
              <div className="mt-6">
                <Button href="/auth/login" variant="outline">Go to sign in</Button>
              </div>
            </InfoCard>
          )}
        </Container>
      </Section>
    </main>
  );
}
