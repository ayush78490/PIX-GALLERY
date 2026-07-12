import Link from "next/link";
import React from "react";

type CardData = {
  image?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  username?: string | null;
};

type PhotographerProfileCardProps = {
  data: CardData;
  href: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80";

function toDisplay(value?: string | null, fallback = "Not available") {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function IconPhone() {
  return <span aria-hidden="true">☎</span>;
}
function IconMail() {
  return <span aria-hidden="true">✉</span>;
}
function IconGlobe() {
  return <span aria-hidden="true">◉</span>;
}
function IconMapPin() {
  return <span aria-hidden="true">⌖</span>;
}
function IconUser() {
  return <span aria-hidden="true">👤</span>;
}

export default function PhotographerProfileCard({
  data,
  href,
}: PhotographerProfileCardProps) {
  return (
    <div className="w-full">
      <Link
        className="
          block
          w-full
          max-w-[420px]
          min-h-[240px]
          rounded-[20px]
          bg-[#111]
          shadow-[0_14px_30px_rgba(0,0,0,0.45)]
          border border-[#2a2a2a]
          flex items-stretch
          overflow-hidden
          relative
          transition
          duration-300
          hover:-translate-y-1
          hover:border-[#555]
        "
        href={href}
      >
        <div className="w-[34%] flex items-center justify-center relative p-3">
          <div className="absolute right-0 top-0 h-full w-px bg-[#3f3f3f]" />

          <div
            className="
              w-[96px]
              h-[96px]
              rounded-full
              border-2
              border-[#3b3b3b]
              overflow-hidden
              shadow-[0_0_12px_rgba(255,255,255,0.08)]
              bg-[#1e1e1e]
            "
          >
            <img
              src={data.image || FALLBACK_IMAGE}
              alt={toDisplay(data.username, "Photographer")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-[66%] flex flex-col justify-center gap-2.5 px-3 py-3">
          <InfoRow
            icon={<IconPhone />}
            color="text-white border-[#666]"
            value={toDisplay(data.phone)}
          />

          <InfoRow
            icon={<IconMail />}
            color="text-white border-[#666]"
            value={toDisplay(data.email)}
          />

          <InfoRow
            icon={<IconGlobe />}
            color="text-white border-[#666]"
            value={toDisplay(data.website)}
          />

          <InfoRow
            icon={<IconMapPin />}
            color="text-white border-[#666]"
            value={toDisplay(data.address)}
          />

          <InfoRow
            icon={<IconUser />}
            color="text-white border-[#666]"
            value={toDisplay(data.username, "Photographer")}
          />
        </div>
      </Link>
    </div>
  );
}

function InfoRow({
  icon,
  color,
  value,
}: {
  icon: React.ReactNode;
  color: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`
          w-7
          h-7
          rounded-full
          border
          flex
          items-center
          justify-center
          bg-[#1a1a1a]
          text-[12px]
          ${color}
        `}
      >
        {icon}
      </div>

      <div
        className="
          flex-1
          h-7
          rounded-full
          bg-[#1b1b1b]
          border border-[#333]
          flex items-center
          px-3
          text-gray-200
          text-[11px]
          overflow-hidden
        "
      >
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}
