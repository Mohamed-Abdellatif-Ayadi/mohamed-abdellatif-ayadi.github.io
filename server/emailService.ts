
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    try {
      // Gmail SMTP configuration
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER || 'mohamed.ayadi.data@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD, // App-specific password from Gmail
        },
      });

      // Verify connection
      if (this.transporter) {
        await this.transporter.verify();
        console.log('Email service initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize email service:', error);
      console.log('Email notifications will be disabled. Please check your Gmail configuration.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email service not available. Simulating email send...');
      return false;
    }

    try {
      const info = await this.transporter.sendMail({
        from: options.from || `"Portfolio Website" <${process.env.GMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async sendContactNotification(contactData: ContactFormData): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">From your portfolio website</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Subject:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">Message:</h3>
            <p style="color: #1f2937; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Reply directly to this email to respond to ${contactData.name}
            </p>
          </div>
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

Reply to: ${contactData.email}
    `;

    return await this.sendEmail({
      to: 'mohamed.ayadi.data@gmail.com',
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: htmlContent,
      text: textContent,
      from: `"${contactData.name}" <${contactData.email}>`,
    });
  }

  async sendConfirmationEmail(contactData: ContactFormData): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0; font-size: 24px;">Thank you for contacting me!</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">I've received your message and will get back to you soon.</p>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px;">
            <h2 style="color: #047857; margin: 0 0 10px 0; font-size: 16px;">Your message has been received</h2>
            <p style="color: #065f46; margin: 0;">Subject: ${contactData.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="color: #374151; line-height: 1.6;">Hi ${contactData.name},</p>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for reaching out! I appreciate you taking the time to contact me through my portfolio website. 
              I've received your message and will review it carefully.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              I typically respond to all inquiries within 24-48 hours. If your message is urgent, 
              please feel free to reach out to me directly at mohamed.ayadi.data@gmail.com.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Best regards,<br>
              Mohamed Abdellatif Ayadi
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: contactData.email,
      subject: 'Thank you for contacting me - Mohamed Ayadi',
      html: htmlContent,
    });
  }
}

export const emailService = new EmailService();
