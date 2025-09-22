import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { simulateEmailSending } from "@/lib/emailUtils";
import { useLanguage } from "@/lib/languageContext";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  file: z.instanceof(FileList).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      // Save contact message
      const response = await apiRequest('POST', '/api/contact', values);

      // Simulate sending email notifications (to owner and confirmation to sender)
      await simulateEmailSending('contact', values);

      return response;
    },
    onSuccess: () => {
      toast({
        title: t('contact.toast.successTitle'),
        description: t('contact.toast.successMessage'),
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.toast.errorTitle'),
        description: error.message || t('contact.toast.errorMessage'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} - Mohamed Abdellatif Ayadi</title>
        <meta name="description" content={t('contact.metaDescription')} />
      </Helmet>
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.heading')}</h1>
            <p className="text-lg opacity-90 mb-0">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Your Email</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border">
                <a 
                  href="mailto:mohamed.ayadi.data@gmail.com" 
                  className="text-slate-700 hover:text-primary-700 font-medium text-sm break-all"
                >
                  mohamed.ayadi.data@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Phone Number</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border">
                <p className="text-slate-700 font-medium">+49 152 5230 1739</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Location</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border">
                <p className="text-slate-700 font-medium">Dortmund, Germany</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Get In Touch With Me</h2>

            {isSubmitted ? (
              <div className="p-8 bg-green-100 border-2 border-green-400 text-green-800 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Thank You for Your Message!</h3>
                <p className="text-lg font-medium">I will reply to you soon</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-semibold text-base">Your Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name"
                              className="h-12 border-2 border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg text-slate-900 placeholder:text-slate-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-semibold text-base">Your Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="Enter your email address"
                              className="h-12 border-2 border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg text-slate-900 placeholder:text-slate-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-semibold text-base">Message Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter the subject of your message"
                            className="h-12 border-2 border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg text-slate-900 placeholder:text-slate-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-semibold text-base">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message here..."
                            className="min-h-[140px] resize-none border-2 border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg text-slate-900 placeholder:text-slate-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-semibold text-base">Attach Your Resume (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="file" 
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const files = e.target.files;
                                onChange(files);
                              }}
                              className="h-12 border-2 border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200 cursor-pointer"
                              {...field}
                              value=""
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5" 
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.sending')}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          {t('contact.form.submit')}
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;