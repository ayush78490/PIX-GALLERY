import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email } = body;

    if (!userId && !email) {
      return Response.json(
        { ok: false, message: "User ID or email is required" },
        { status: 400 }
      );
    }

    const user = userId
      ? await prisma.user.findUnique({ where: { id: userId } })
      : await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return Response.json(
        { ok: false, message: "Email already verified" },
        { status: 400 }
      );
    }

    const resolvedUserId = user.id;

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.$transaction(async (tx) => {
      await tx.otpToken.updateMany({
        where: { userId: resolvedUserId, used: false },
        data: { used: true },
      });

      await tx.otpToken.create({
        data: {
          id: uuidv4(),
          email: user.email,
          otp,
          expiresAt,
          userId: resolvedUserId,
        },
      });
    });

    let emailDeliveryFailed = false;
    try {
      await sendOtpEmail(user.email, otp, user.name || undefined);
    } catch (mailError) {
      emailDeliveryFailed = true;
      console.error("Resend OTP email error:", mailError);
    }

    const isDev = process.env.NODE_ENV !== "production";

    return Response.json({
      ok: true,
      message: emailDeliveryFailed
        ? "OTP regenerated, but email failed. Use dev OTP fallback."
        : "Verification code resent to your email",
      ...(isDev ? { devOtp: otp } : {}),
      emailDeliveryFailed,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return Response.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
