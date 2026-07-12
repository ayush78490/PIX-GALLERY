import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string, name?: string) {
  const subject = "Your pixGallery verification code";
  const text = `Hi ${name || "there"},\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.\n\npixGallery Team`;
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
      <h2 style="font-size: 20px; margin-bottom: 16px;">Verify your email</h2>
      <p style="color: #444; line-height: 1.5;">Hi ${name || "there"},</p>
      <p style="color: #444; line-height: 1.5;">Use the code below to verify your email address:</p>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1a1c1b;">${otp}</span>
      </div>
      <p style="color: #666; font-size: 13px;">This code expires in 10 minutes.</p>
      <p style="color: #666; font-size: 13px; margin-top: 24px;">If you didn't request this, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="color: #999; font-size: 12px;">pixGallery</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}
