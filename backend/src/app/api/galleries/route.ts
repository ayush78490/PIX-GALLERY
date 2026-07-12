import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const galleries = await prisma.gallery.findMany({
    include: {
      event: {
        select: {
          id: true,
          title: true,
          owner: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ ok: true, data: galleries });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, title, isPublic, driveFolderId } = body;

    if (!eventId) {
      return Response.json({ ok: false, message: "Event ID is required" }, { status: 400 });
    }

    const gallery = await prisma.gallery.create({
      data: {
        eventId,
        title,
        isPublic: isPublic ?? true,
        driveFolderId,
      },
    });

    return Response.json({ ok: true, data: gallery }, { status: 201 });
  } catch (error) {
    console.error("Create gallery error:", error);
    return Response.json({ ok: false, message: "Failed to create gallery" }, { status: 500 });
  }
}