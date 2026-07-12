import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function normalizeRole(role?: string): "normal" | "photographer" {
  if (role?.toLowerCase() === "photographer") {
    return "photographer";
  }
  return "normal";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email) {
      return Response.json(
        { ok: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const finalRole = normalizeRole(role);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.emailVerified) {
        return Response.json(
          { ok: false, message: "An account with this email already exists" },
          { status: 409 }
        );
      }
    }

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await prisma.$transaction(async (tx) => {
      let userRecord = existingUser;

      if (!userRecord) {
        userRecord = await tx.user.create({
          data: {
            id: uuidv4(),
            email,
            passwordHash,
            name: name || null,
            role: finalRole,
            status: "pending",
          },
        });
      } else {
        const updateData: any = { role: finalRole, name: name || userRecord.name };
        if (passwordHash) updateData.passwordHash = passwordHash;
        await tx.user.update({
          where: { id: userRecord.id },
          data: updateData,
        });
      }

      await tx.otpToken.updateMany({
        where: { userId: userRecord.id, used: false },
        data: { used: true },
      });

      await tx.otpToken.create({
        data: {
          id: uuidv4(),
          email,
          otp,
          expiresAt,
          userId: userRecord.id,
        },
      });

      return userRecord;
    });

    let emailDeliveryFailed = false;
    try {
      await sendOtpEmail(email, otp, name);
    } catch (mailError) {
      emailDeliveryFailed = true;
      console.error("Registration OTP email error:", mailError);
    }

    const isDev = process.env.NODE_ENV !== "production";

    return Response.json({
      ok: true,
      message: emailDeliveryFailed
        ? "Account created, but OTP email failed. Use dev OTP fallback."
        : "Verification code sent to your email",
      userId: user.id,
      ...(isDev ? { devOtp: otp } : {}),
      emailDeliveryFailed,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
