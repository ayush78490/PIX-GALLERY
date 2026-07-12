import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lastSyncToken } = body;

    if (!userId) {
      return Response.json({ ok: false, message: "User ID is required" }, { status: 400 });
    }

    const syncState = await prisma.driveSyncState.upsert({
      where: { userId },
      update: {
        lastSyncToken,
        lastSyncedAt: new Date(),
      },
      create: {
        userId,
        lastSyncToken,
        lastSyncedAt: new Date(),
      },
    });

    return Response.json({ ok: true, data: syncState });
  } catch (error) {
    console.error("Drive sync error:", error);
    return Response.json({ ok: false, message: "Sync failed" }, { status: 500 });
  }
}