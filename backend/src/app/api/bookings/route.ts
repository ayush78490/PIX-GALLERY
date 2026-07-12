import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      photographer: { select: { id: true, name: true, email: true } },
      client: { select: { id: true, name: true, email: true } },
      event: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ ok: true, data: bookings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { photographerUserId, clientUserId, eventId, scheduledStart, scheduledEnd } = body;

    if (!photographerUserId) {
      return Response.json({ ok: false, message: "Photographer is required" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        photographerUserId,
        clientUserId,
        eventId,
        scheduledStart: scheduledStart ? new Date(scheduledStart) : null,
        scheduledEnd: scheduledEnd ? new Date(scheduledEnd) : null,
      },
    });

    return Response.json({ ok: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return Response.json({ ok: false, message: "Failed to create booking" }, { status: 500 });
  }
}