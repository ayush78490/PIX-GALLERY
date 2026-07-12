import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ galleryId: string }> }) {
  const { galleryId } = await params;
  const gallery = await prisma.gallery.findUnique({
    where: { id: galleryId },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          owner: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!gallery) {
    return Response.json({ ok: false, message: "Gallery not found" }, { status: 404 });
  }

  return Response.json({ ok: true, data: gallery });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ galleryId: string }> }) {
  const { galleryId } = await params;
  try {
    const body = await request.json();
    const { title, isPublic } = body;

    const gallery = await prisma.gallery.update({
      where: { id: galleryId },
      data: { title, isPublic },
    });

    return Response.json({ ok: true, data: gallery });
  } catch (error) {
    console.error("Update gallery error:", error);
    return Response.json({ ok: false, message: "Failed to update gallery" }, { status: 500 });
  }
}