import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ ok: false, message: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, currentPassword, newPassword } = body;

    if (!userId || !newPassword) {
      return Response.json({ ok: false, message: "userId and newPassword are required" }, { status: 400 });
    }

    if (session.user.id !== userId) {
      return Response.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return Response.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    const hasPassword = Boolean(user.passwordHash);

    if (hasPassword) {
      if (!currentPassword) {
        return Response.json({ ok: false, message: "Current password required" }, { status: 400 });
      }
      const valid = await bcrypt.compare(currentPassword, user.passwordHash!);
      if (!valid) {
        return Response.json({ ok: false, message: "Current password is incorrect" }, { status: 401 });
      }
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

    return Response.json({ ok: true, message: hasPassword ? "Password updated" : "Password set" });
  } catch (error) {
    console.error("Set password error:", error);
    return Response.json({ ok: false, message: "Something went wrong" }, { status: 500 });
  }
}
