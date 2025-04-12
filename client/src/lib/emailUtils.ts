/**
 * Email utility functions for simulating email sending functionality
 * This will be replaced with actual SendGrid integration when API key is available
 */

import { toast } from "@/hooks/use-toast";

type EmailType = 'contact' | 'newsletter';

interface ContactEmail {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface NewsletterEmail {
  email: string;
}

/**
 * Simulates sending an email notification to the site owner
 */
export const simulateNotificationToOwner = (
  type: EmailType,
  data: ContactEmail | NewsletterEmail
) => {
  console.log(`Simulated email notification to owner for ${type}:`, data);
  
  // This function would actually send an email to the site owner
  // when SendGrid API is configured
  
  return Promise.resolve(true);
};

/**
 * Simulates sending a confirmation email to the user
 */
export const simulateConfirmationToUser = (
  type: EmailType,
  data: ContactEmail | NewsletterEmail
) => {
  console.log(`Simulated confirmation email to user for ${type}:`, data);
  
  // Show a toast to simulate the confirmation email being sent
  if (type === 'contact') {
    const contactData = data as ContactEmail;
    toast({
      title: "Confirmation Email Sent",
      description: `A confirmation email has been sent to ${contactData.email}. Thank you for your message!`,
      variant: "default",
    });
  } else if (type === 'newsletter') {
    const newsletterData = data as NewsletterEmail;
    toast({
      title: "Newsletter Confirmation",
      description: `A confirmation email has been sent to ${newsletterData.email}. Thank you for subscribing!`,
      variant: "default",
    });
  }
  
  return Promise.resolve(true);
};

/**
 * Main function to handle email sending simulation
 * This will be replaced with actual SendGrid integration when API key is available
 */
export const simulateEmailSending = async (
  type: EmailType,
  data: ContactEmail | NewsletterEmail
): Promise<boolean> => {
  try {
    // Simulate sending notification to owner
    await simulateNotificationToOwner(type, data);
    
    // Simulate sending confirmation to user
    await simulateConfirmationToUser(type, data);
    
    return true;
  } catch (error) {
    console.error('Error simulating email sending:', error);
    toast({
      title: "Email Sending Failed",
      description: "An error occurred while sending emails. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
};