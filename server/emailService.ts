import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure SMTP for Gmail
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.GMAIL_USER || "mohamed.ayadi.data@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
      },
    });

    // Verify connection on startup
    this.verifyTransport();
  }

  private async verifyTransport() {
    try {
      await this.transporter.verify();
      console.log("[MAIL] ✅ Email service initialized successfully");
    } catch (error) {
      console.error("[MAIL] ❌ Failed to initialize email service:", error);
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: `"Portfolio Website" <${process.env.GMAIL_USER}>`, // always your Gmail
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        replyTo: options.replyTo, // optional reply-to
      });

      console.log("[MAIL] ✅ Email sent:", info.messageId);
      return true;
    } catch (error) {
      console.error("[MAIL] ❌ Failed to send email:", error);
      return false;
    }
  }

  async sendContactNotification(
    contactData: ContactFormData,
  ): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #1f2937; margin-bottom: 20px; font-size: 20px;">📩 New Contact Form Submission</h1>
          <p><b>Name:</b> ${contactData.name}</p>
          <p><b>Email:</b> ${contactData.email}</p>
          <p><b>Subject:</b> ${contactData.subject}</p>
          <p><b>Message:</b></p>
          <p>${contactData.message}</p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}
    `;

    return await this.sendEmail({
      to: process.env.GMAIL_USER || "mohamed.ayadi.data@gmail.com",
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: htmlContent,
      text: textContent,
      replyTo: contactData.email, // so replies go to the visitor
    });
  }

  async sendConfirmationEmail(contactData: ContactFormData): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #1f2937; font-size: 22px;">Thank you for contacting me!</h1>
          <p>Hi ${contactData.name},</p>
          <p>I’ve received your message and will get back to you soon.</p>
          <p><b>Subject:</b> ${contactData.subject}</p>
          <p>Best regards,<br>Mohamed Abdellatif Ayadi</p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: contactData.email,
      subject: "Thank you for contacting me - Mohamed Ayadi",
      html: htmlContent,
    });
  }
}

export const emailService = new EmailService();
