import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      albums: { include: { photos: true } },
      gallery: true,
      bookings: true,
    },
  });

  if (!event) {
    return Response.json({ ok: false, message: "Event not found" }, { status: 404 });
  }

  return Response.json({ ok: true, data: event });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  try {
    const body = await request.json();
    const { title, description, eventDate, location, visibility } = body;

    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        description,
        eventDate: eventDate ? new Date(eventDate) : undefined,
        location,
        visibility,
      },
    });

    return Response.json({ ok: true, data: event });
  } catch (error) {
    console.error("Update event error:", error);
    return Response.json({ ok: false, message: "Failed to update event" }, { status: 500 });
  }
}