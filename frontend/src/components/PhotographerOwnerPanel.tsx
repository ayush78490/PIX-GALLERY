"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import { backendUrl, getSession, type AuthSession } from "@/lib/auth-client";

type PhotographerOwnerPanelProps = {
  photographerId: string;
};

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PhotographerOwnerPanel({ photographerId }: PhotographerOwnerPanelProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const routeSlug = useMemo(() => toSlug(photographerId), [photographerId]);

  useEffect(() => {
    getSession().then((currentSession) => {
      setSession(currentSession);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setName(session?.user?.name ?? "");
    setPreview(session?.user?.image ?? null);
    setSelectedImage(null);
  }, [session]);

  const isOwner = useMemo(() => {
    const user = session?.user;
    if (!user || user.role !== "photographer") {
      return false;
    }

    return toSlug(user.name ?? "") === toSlug(photographerId);
  }, [photographerId, session]);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const nextPreview = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Unable to read image file."));
      reader.readAsDataURL(file);
    });

    setSelectedImage(nextPreview);
    setPreview(nextPreview);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userId = session?.user?.id;
    if (!userId) {
      setError("You must be signed in to edit your profile.");
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          name,
          ...(selectedImage ? { image: selectedImage } : {}),
          displayName: name,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || payload.ok === false) {
        setError(payload.message || "Failed to update profile.");
        return;
      }

      if (toSlug(name) !== routeSlug && typeof window !== "undefined") {
        window.location.assign(`/photographers/${encodeURIComponent(name)}`);
        return;
      }

      setMessage("Profile updated successfully.");
      setSession((currentSession) =>
        currentSession
          ? {
              ...currentSession,
              user: {
                ...currentSession.user,
                name,
                image: selectedImage ?? currentSession.user?.image,
              },
            }
          : currentSession,
      );
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !isOwner) {
    return null;
  }

  return (
    <section className="mb-20 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <InfoCard title="Edit your profile" meta="Owner only">
        <form className="grid gap-4" onSubmit={handleSave}>
          <div className="flex items-center gap-4">
            {preview ? (
              <img className="h-16 w-16 rounded-full object-cover" src={preview} alt={name || "Profile photo"} />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-xl text-white">
                {(name || "P").charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-black">Profile photo</p>
              <p className="text-xs text-[#747878]">Choose a photo from your device to replace the current avatar.</p>
            </div>
          </div>

          <input
            className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="Rename your profile"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            className="rounded-xl border border-[#c4c7c7]/60 px-4 py-3 text-sm outline-none focus:border-black"
            type="file"
            accept="image/*"
            onChange={(event) => {
              void handleImageUpload(event);
            }}
          />

          <p className="text-xs text-[#747878]">
            If you do not choose a local file, your existing avatar stays unchanged.
          </p>

          {message ? <p className="text-sm text-green-700">{message}</p> : null}
          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button
            className="inline-flex items-center justify-center rounded-full border border-black px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </InfoCard>

      <InfoCard title="Portfolio" meta="Collections">
        <div className="space-y-4">
          <p>Manage your portfolio galleries and curated sets from the gallery area.</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/galleries" variant="outline" size="sm">
              Manage portfolio
            </Button>
            <Button href="/profile" variant="outline" size="sm">
              Account settings
            </Button>
          </div>
          <p className="text-xs text-[#747878]">
            Portfolio uploads are organized in galleries, while your name and profile
            photo update here.
          </p>
        </div>
      </InfoCard>
    </section>
  );
}