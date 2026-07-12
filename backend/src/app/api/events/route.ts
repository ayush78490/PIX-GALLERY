import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({
    include: {
      owner: { select: { id: true, name: true, email: true } },
      albums: { select: { id: true, title: true } },
      _count: { select: { albums: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ ok: true, data: events });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, eventDate, location, visibility, driveFolderId, ownerUserId } = body;

    if (!title) {
      return Response.json({ ok: false, message: "Title is required" }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        eventDate: eventDate ? new Date(eventDate) : null,
        location,
        visibility: visibility || "private",
        driveFolderId,
        ownerUserId: ownerUserId || "anonymous",
        shareCode: Math.random().toString(36).substring(2, 10),
      },
    });

    return Response.json({ ok: true, data: event }, { status: 201 });
  } catch (error) {
    console.error("Create event error:", error);
    return Response.json({ ok: false, message: "Failed to create event" }, { status: 500 });
  }
}