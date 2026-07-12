import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, otp } = body;

    if (!userId || !otp) {
      return Response.json(
        { ok: false, message: "User ID and OTP are required" },
        { status: 400 }
      );
    }

    const otpRecord = await prisma.otpToken.findFirst({
      where: {
        userId,
        otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      return Response.json(
        { ok: false, message: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.otpToken.update({
        where: { id: otpRecord.id },
        data: { used: true },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          emailVerified: new Date(),
          status: "active",
        },
      });
    });

    return Response.json({
      ok: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return Response.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
