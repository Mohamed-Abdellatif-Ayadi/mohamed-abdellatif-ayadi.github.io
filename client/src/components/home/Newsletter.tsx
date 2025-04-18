import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { simulateEmailSending } from "@/lib/emailUtils";
import { useLanguage } from "@/lib/languageContext";

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: NewsletterFormValues) => {
      // Save newsletter subscription
      const response = await apiRequest('POST', '/api/newsletter/subscribe', values);
      
      // Simulate sending email notifications (to owner and confirmation to subscriber)
      await simulateEmailSending('newsletter', values);
      
      return response;
    },
    onSuccess: () => {
      toast({
        title: t('home.newsletter.successTitle'),
        description: t('home.newsletter.successDescription'),
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('home.newsletter.errorTitle'),
        description: error.message || t('home.newsletter.errorDescription'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: NewsletterFormValues) => {
    mutation.mutate(values);
  };

  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('home.newsletter.title')}</h2>
          <p className="text-slate-600 mb-8">
            {t('home.newsletter.subtitle')}
          </p>
          
          {isSubmitted ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg">
              <p className="font-medium">{t('home.newsletter.thankYou')}</p>
              <p className="text-sm mt-1">{t('home.newsletter.confirmationMessage')}</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          placeholder={t('home.newsletter.emailPlaceholder')} 
                          type="email" 
                          className="px-4 py-3 rounded-lg" 
                          {...field} 
                          disabled={mutation.isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="px-6 py-3 whitespace-nowrap"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? t('home.newsletter.subscribing') : t('home.newsletter.subscribe')}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="text-xs text-slate-500 mt-4">
            {t('home.newsletter.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
