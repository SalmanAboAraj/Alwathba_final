import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  service: "hotmail",
  host: "smtp-mail.outlook.com",
  port: 587,
  pool: true,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "salman.aboaraj@outlook.com",
    pass: "Mirnaaboaraj93",
  },
  tls: {
    // do not fail on invalid certs
    //rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  console.log("sss");
  const verificationUrl = `https://alwathba.vercel.app/api/verification/${token}`; // Nowy format URL
  await transporter.sendMail({
    from: '"AlWathba" <salman.aboaraj@outlook.com>',
    to: email,
    subject: "Verify Your Email",
    html: `Please click on the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetPasswordUrl = `https://alwathba.vercel.app/api/resetpass/${encodeURIComponent(
    token
  )}`;
  await transporter.sendMail({
    from: '"AlWathba" <salman.aboaraj@outlook.com>',
    to: email,
    subject: "Password Reset Request",
    html: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`,
  });
}

// export async function sendNewPasswordEmail(email: string, newPassword: string) {
//   await transporter.sendMail({
//     from: '"Your App Name" <salman5577@hotmail.com>',
//     to: email,
//     subject: "Your New Password",
//     html: `Your password has been reset. Here is your new password: <strong>${newPassword}</strong>. It is recommended to change this password after logging in.`,
//   });
// }
