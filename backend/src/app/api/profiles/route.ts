import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
        emailVerified: true,
        passwordHash: true,
        image: true,
        organization: { select: { website: true, address: true } },
        profile: {
          select: {
            id: true,
            userId: true,
            displayName: true,
            contactEmail: true,
            contactPhone: true,
            bio: true,
            servicesOffered: true,
            pricingInfo: true,
            portfolioVisibility: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json({ ok: false, message: "Profile not found" }, { status: 404 });
    }

    const data = user.profile
      ? {
          ...user.profile,
          user: {
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            hasPassword: !!user.passwordHash,
            organization: user.organization,
          },
        }
      : {
          userId: user.id,
          displayName: user.name,
          contactEmail: user.email,
          contactPhone: null,
          bio: null,
          servicesOffered: null,
          pricingInfo: null,
          portfolioVisibility: "public",
          createdAt: null,
          updatedAt: null,
          user: {
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            hasPassword: !!user.passwordHash,
            organization: user.organization,
          },
        };

    return Response.json({ ok: true, data });
  }

  const users = await prisma.user.findMany({
    where: { role: "photographer" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      organization: { select: { website: true, address: true } },
      profile: {
        select: {
          id: true,
          userId: true,
          displayName: true,
          contactEmail: true,
          contactPhone: true,
          bio: true,
          servicesOffered: true,
          pricingInfo: true,
          portfolioVisibility: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  const data = users.map((user) => ({
    ...(user.profile ?? {
      userId: user.id,
      displayName: user.name,
      contactEmail: user.email,
      contactPhone: null,
      bio: null,
      servicesOffered: null,
      pricingInfo: null,
      portfolioVisibility: "public",
      createdAt: null,
      updatedAt: null,
    }),
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
      organization: user.organization,
    },
  }));

  return Response.json({ ok: true, data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      name,
      image,
      displayName,
      contactEmail,
      contactPhone,
      bio,
      servicesOffered,
      pricingInfo,
      website,
      address,
    } = body;

    // Protect against extremely large data URLs being saved directly to the DB
    if (image && typeof image === "string") {
      // If client sent a data URL, it can be very large; reject above safe threshold
      const maxSize = Number(process.env.MAX_PROFILE_IMAGE_BYTES ?? 500000); // ~500KB default
      if (image.length > maxSize) {
        return Response.json(
          { ok: false, message: "Image payload too large", details: `image length ${image.length} bytes` },
          { status: 413 },
        );
      }
    }

    if (!userId) {
      return Response.json({ ok: false, message: "User ID is required" }, { status: 400 });
    }

    const profile = await prisma.$transaction(async (tx) => {
      const savedProfile = await tx.profile.upsert({
        where: { userId },
        update: {
          displayName,
          contactEmail,
          contactPhone,
          bio,
          servicesOffered,
          pricingInfo,
        },
        create: {
          userId,
          displayName,
          contactEmail,
          contactPhone,
          bio,
          servicesOffered,
          pricingInfo,
        },
      });

      if (name !== undefined || image !== undefined) {
        await tx.user.update({
          where: { id: userId },
          data: {
            name,
            image,
          },
        });
      }

      if (website || address) {
        await tx.organization.upsert({
          where: { userId },
          update: {
            website,
            address,
          },
          create: {
            userId,
            website,
            address,
            orgName: displayName ?? undefined,
          },
        });
      }

      return savedProfile;
    });

    return Response.json({ ok: true, data: profile });
  } catch (error) {
    console.error("Update profile error:", error);
    const details =
      error instanceof Error ? error.message : "Unknown server error";
    return Response.json(
      { ok: false, message: "Failed to update profile", details },
      { status: 500 },
    );
  }
}
