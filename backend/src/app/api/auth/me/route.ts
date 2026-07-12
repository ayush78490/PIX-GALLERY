import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      id?: string;
      email?: string;
      role?: string;
    };

    if (!decoded.id) {
      return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return Response.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ ok: true, user });
  } catch {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
