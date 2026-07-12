import React from "react";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin, User } from "lucide-react";

type CardData = {
  image?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  username?: string | null;
};

type ProfileCardProps = {
  data: CardData;
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80";

function toDisplay(value?: string | null, fallback = "Not available") {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

export default function ProfileCard({ data }: ProfileCardProps) {
  return (
    <div className="min-h-screen w-full bg-gray-500 flex items-center justify-center p-10">
      <div
        className="
          w-[900px]
          h-[420px]
          rounded-[32px]
          bg-[#141414]
          shadow-[0_25px_60px_rgba(0,0,0,0.6)]
          border border-[#2a2a2a]
          flex
          overflow-hidden
          relative
        "
      >
        <div className="w-[35%] flex items-center justify-center relative">
          <div className="absolute right-0 top-0 h-full w-[2px] bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

          <div
            className="
              w-[220px]
              h-[220px]
              rounded-full
              border-[4px]
              border-[#2f2f2f]
              overflow-hidden
              relative
              shadow-[0_0_25px_rgba(255,255,255,0.08)]
              bg-[#1e1e1e]
            "
          >
            <Image
              src={data.image || FALLBACK_IMAGE}
              alt={toDisplay(data.username, "Photographer")}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-[65%] flex flex-col justify-center gap-7 px-12">
          <InfoRow
            icon={<Phone size={24} />}
            color="text-cyan-400 border-cyan-400 shadow-cyan-400/40"
            value={toDisplay(data.phone)}
          />

          <InfoRow
            icon={<Mail size={24} />}
            color="text-yellow-400 border-yellow-400 shadow-yellow-400/40"
            value={toDisplay(data.email)}
          />

          <InfoRow
            icon={<Globe size={24} />}
            color="text-pink-400 border-pink-400 shadow-pink-400/40"
            value={toDisplay(data.website)}
          />

          <InfoRow
            icon={<MapPin size={24} />}
            color="text-blue-400 border-blue-400 shadow-blue-400/40"
            value={toDisplay(data.address)}
          />

          <InfoRow
            icon={<User size={24} />}
            color="text-purple-400 border-purple-400 shadow-purple-400/40"
            value={toDisplay(data.username, "Photographer")}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, color, value }: { icon: React.ReactNode; color: string; value: string }) {
  return (
    <div className="flex items-center gap-6">
      <div
        className={`
          w-[62px]
          h-[62px]
          rounded-full
          border-2
          flex
          items-center
          justify-center
          bg-[#1c1c1c]
          shadow-lg
          ${color}
        `}
      >
        {icon}
      </div>

      <div
        className="
          flex-1
          h-[62px]
          rounded-full
          bg-[#232323]
          border border-[#2e2e2e]
          flex items-center
          px-8
          text-gray-200
          text-lg
          shadow-inner
          overflow-hidden
        "
      >
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}
