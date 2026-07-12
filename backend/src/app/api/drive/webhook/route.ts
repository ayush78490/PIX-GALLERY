import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channelId, resourceId, userId } = body;

    if (!userId) {
      return Response.json({ ok: false, message: "User ID is required" }, { status: 400 });
    }

    const syncState = await prisma.driveSyncState.findUnique({
      where: { userId },
    });

    if (!syncState) {
      return Response.json({ ok: false, message: "No sync state found for user" }, { status: 404 });
    }

    return Response.json({
      ok: true,
      message: "Webhook received, sync triggered",
      data: { channelId, resourceId },
    });
  } catch (error) {
    console.error("Drive webhook error:", error);
    return Response.json({ ok: false, message: "Webhook processing failed" }, { status: 500 });
  }
}