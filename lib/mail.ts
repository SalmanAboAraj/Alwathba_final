import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `https://alwathba.vercel.app/api/verification/${token}`;

  try {
    const response = await resend.emails.send({
      from: "alwathba <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email",
      html: `Please click on the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
    });
    console.log("Verification email sent:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetPasswordUrl = `https://alwathba.vercel.app/api/resetpass/${encodeURIComponent(
    token
  )}`;

  try {
    const response = await resend.emails.send({
      from: "alwathba <onboarding@resend.dev>",
      to: email,
      subject: "Password Reset Request",
      html: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`,
    });
    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}
