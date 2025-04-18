import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/lib/languageContext';
import { MessageSquare, SendIcon, User2, Bot } from 'lucide-react';
import { type CV, type Article, type Education, type Experience, type Language as LanguageType } from '@shared/schema';

// Define the structure of a chat message
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage = () => {
  const { t, language } = useLanguage();
  
  // Welcome messages in different languages
  const welcomeMessages = {
    en: "Hello! I'm Mohamed's AI assistant. I can answer questions about his CV, education, skills, experience, and blog posts. How can I help you today?",
    de: "Hallo! Ich bin Mohameds KI-Assistent. Ich kann Fragen zu seinem Lebenslauf, seiner Ausbildung, seinen Fähigkeiten, seiner Erfahrung und seinen Blogbeiträgen beantworten. Wie kann ich Ihnen heute helfen?",
    fr: "Bonjour ! Je suis l'assistant IA de Mohamed. Je peux répondre à des questions sur son CV, son éducation, ses compétences, son expérience et ses articles de blog. Comment puis-je vous aider aujourd'hui ?"
  };
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en,
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch CV data with the current language
  const { data: cv, isLoading: isCVLoading } = useQuery<CV>({
    queryKey: ['/api/cv', language],
    queryFn: async () => {
      const response = await fetch(`/api/cv?language=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch CV data');
      }
      return response.json();
    }
  });

  // Fetch articles data with the current language
  const { data: articles, isLoading: isArticlesLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles', language],
    queryFn: async () => {
      const response = await fetch(`/api/articles?language=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    }
  });

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to process user input and generate a response
  const processMessage = (userInput: string) => {
    // If data is still loading, inform the user
    if (isCVLoading || isArticlesLoading || !cv || !articles) {
      const loadingResponses = {
        en: "I'm still gathering information. Please try again in a moment.",
        de: "Ich sammle noch Informationen. Bitte versuchen Sie es in einem Moment erneut.",
        fr: "Je suis encore en train de recueillir des informations. Veuillez réessayer dans un instant."
      };
      return loadingResponses[language as keyof typeof loadingResponses] || loadingResponses.en;
    }

    const normalizedInput = userInput.toLowerCase();
    
    // Helper function to detect input language and check for keywords
    const checkKeywords = (keywords: { [key: string]: string[] }): boolean => {
      return Object.entries(keywords).some(([lang, terms]) => {
        if (lang === language || language === 'en') {
          return terms.some(term => normalizedInput.includes(term));
        }
        return false;
      });
    };

    // CV-related questions
    const nameKeywords = {
      en: ['name', 'who are you'],
      de: ['name', 'wie heißt du', 'wer bist du'],
      fr: ['nom', 'qui es-tu', 'comment tu t\'appelles']
    };
    
    if (checkKeywords(nameKeywords)) {
      const responses = {
        en: `My name is ${cv.name}.`,
        de: `Mein Name ist ${cv.name}.`,
        fr: `Je m'appelle ${cv.name}.`
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const educationKeywords = {
      en: ['study', 'education', 'university', 'degree', 'school'],
      de: ['studium', 'ausbildung', 'universität', 'abschluss', 'schule'],
      fr: ['étude', 'éducation', 'université', 'diplôme', 'école']
    };
    
    if (checkKeywords(educationKeywords)) {
      if (cv.education && cv.education.length > 0) {
        const education = cv.education.map((edu: Education) => 
          `${edu.degree} ${language === 'de' ? 'an der' : language === 'fr' ? 'à' : 'at'} ${edu.institution} (${edu.startDate} - ${edu.endDate})`
        ).join('\\n');
        
        const responses = {
          en: `My educational background includes:\\n${education}`,
          de: `Meine Ausbildung umfasst:\\n${education}`,
          fr: `Mon parcours éducatif comprend:\\n${education}`
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "I don't have any education information available.",
          de: "Ich habe keine Informationen zur Ausbildung verfügbar.",
          fr: "Je n'ai pas d'informations sur l'éducation disponibles."
        };
        return noInfoResponses[language as keyof typeof noInfoResponses] || noInfoResponses.en;
      }
    }

    const skillsKeywords = {
      en: ['skills', 'what can you do', 'abilities', 'capable'],
      de: ['fähigkeiten', 'was kannst du', 'kenntnisse', 'kompetenz'],
      fr: ['compétences', 'que sais-tu faire', 'capacités', 'aptitudes']
    };
    
    if (checkKeywords(skillsKeywords)) {
      const skills = cv.skills ? cv.skills.join(', ') : '';
      const responses = {
        en: `My technical skills include: ${skills || 'No skills information available'}`,
        de: `Meine technischen Fähigkeiten umfassen: ${skills || 'Keine Informationen zu Fähigkeiten verfügbar'}`,
        fr: `Mes compétences techniques incluent: ${skills || 'Aucune information sur les compétences disponible'}`
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const languageKeywords = {
      en: ['language', 'speak', 'fluent'],
      de: ['sprache', 'sprechen', 'fließend'],
      fr: ['langue', 'parler', 'couramment']
    };
    
    if (checkKeywords(languageKeywords)) {
      const languages = cv.languages ? cv.languages.map((lang: LanguageType) => 
        `${lang.name} (${lang.proficiency})`
      ).join(', ') : '';
      
      const responses = {
        en: `I speak: ${languages || 'No language information available'}`,
        de: `Ich spreche: ${languages || 'Keine Sprachinformationen verfügbar'}`,
        fr: `Je parle: ${languages || 'Aucune information linguistique disponible'}`
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const experienceKeywords = {
      en: ['experience', 'work', 'job', 'career', 'profession'],
      de: ['erfahrung', 'arbeit', 'beruf', 'karriere', 'tätigkeit'],
      fr: ['expérience', 'travail', 'emploi', 'carrière', 'profession']
    };
    
    if (checkKeywords(experienceKeywords)) {
      if (cv.experience && cv.experience.length > 0) {
        const workExp = cv.experience.map((exp: Experience) => 
          `${exp.position} ${language === 'de' ? 'bei' : language === 'fr' ? 'chez' : 'at'} ${exp.company} (${exp.startDate} - ${exp.endDate || (language === 'de' ? 'Heute' : language === 'fr' ? 'Présent' : 'Present')})`
        ).join('\\n');
        
        const responses = {
          en: `My work experience includes:\\n${workExp}`,
          de: `Meine Arbeitserfahrung umfasst:\\n${workExp}`,
          fr: `Mon expérience professionnelle comprend:\\n${workExp}`
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "I don't have any work experience information available.",
          de: "Ich habe keine Informationen zur Arbeitserfahrung verfügbar.",
          fr: "Je n'ai pas d'informations sur l'expérience professionnelle disponibles."
        };
        return noInfoResponses[language as keyof typeof noInfoResponses] || noInfoResponses.en;
      }
    }

    const locationKeywords = {
      en: ['location', 'where', 'city', 'country', 'live'],
      de: ['standort', 'wo', 'stadt', 'land', 'wohnen', 'leben'],
      fr: ['localisation', 'où', 'ville', 'pays', 'habiter', 'vivre']
    };
    
    if (checkKeywords(locationKeywords)) {
      if (cv.location) {
        const responses = {
          en: `I'm located in ${cv.location}.`,
          de: `Ich befinde mich in ${cv.location}.`,
          fr: `Je suis situé à ${cv.location}.`
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "My location information is not available.",
          de: "Meine Standortinformationen sind nicht verfügbar.",
          fr: "Mes informations de localisation ne sont pas disponibles."
        };
        return noInfoResponses[language as keyof typeof noInfoResponses] || noInfoResponses.en;
      }
    }

    const contactKeywords = {
      en: ['contact', 'email', 'phone', 'reach'],
      de: ['kontakt', 'email', 'telefon', 'erreichen'],
      fr: ['contact', 'email', 'téléphone', 'joindre']
    };
    
    if (checkKeywords(contactKeywords)) {
      const email = cv.email || (language === 'de' ? "E-Mail nicht verfügbar" : language === 'fr' ? "Email non disponible" : "Email not available");
      const phone = cv.phone || (language === 'de' ? "Telefon nicht verfügbar" : language === 'fr' ? "Téléphone non disponible" : "Phone not available");
      
      const responses = {
        en: `You can contact me at:\nEmail: ${email}\nPhone: ${phone}`,
        de: `Sie können mich kontaktieren unter:\nE-Mail: ${email}\nTelefon: ${phone}`,
        fr: `Vous pouvez me contacter à:\nEmail: ${email}\nTéléphone: ${phone}`
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const summaryKeywords = {
      en: ['summary', 'about you', 'tell me about yourself', 'profile'],
      de: ['zusammenfassung', 'über dich', 'erzähl mir von dir', 'profil'],
      fr: ['résumé', 'à propos de toi', 'parle-moi de toi', 'profil']
    };
    
    if (checkKeywords(summaryKeywords)) {
      if (cv.summary) {
        return cv.summary;
      } else {
        const noInfoResponses = {
          en: "I don't have a summary available yet.",
          de: "Ich habe noch keine Zusammenfassung verfügbar.",
          fr: "Je n'ai pas encore de résumé disponible."
        };
        return noInfoResponses[language as keyof typeof noInfoResponses] || noInfoResponses.en;
      }
    }

    // Blog-related questions
    const blogKeywords = {
      en: ['blog', 'article', 'post', 'write', 'written'],
      de: ['blog', 'artikel', 'beitrag', 'schreiben', 'geschrieben'],
      fr: ['blog', 'article', 'publication', 'écrire', 'écrit']
    };
    
    if (checkKeywords(blogKeywords)) {
      if (articles && articles.length > 0) {
        const articlesList = articles.map((article: Article) => 
          `- ${article.title}`
        ).join('\n');
        
        const responses = {
          en: `I've written the following articles:\n${articlesList}`,
          de: `Ich habe die folgenden Artikel geschrieben:\n${articlesList}`,
          fr: `J'ai écrit les articles suivants:\n${articlesList}`
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "I don't have any blog posts yet.",
          de: "Ich habe noch keine Blogbeiträge.",
          fr: "Je n'ai pas encore d'articles de blog."
        };
        return noInfoResponses[language as keyof typeof noInfoResponses] || noInfoResponses.en;
      }
    }

    // Search for specific topics in blog posts
    const searchTerms = [
      'custom domain', 'domain', 'dns', 'github pages', 'deploy', 'website',
      'sql', 'database', 'query', 'window functions'
    ];
    
    for (const term of searchTerms) {
      if (normalizedInput.includes(term) && articles) {
        const matchingArticles = articles.filter((article: Article) => 
          article.title.toLowerCase().includes(term) || 
          article.excerpt.toLowerCase().includes(term)
        );
        
        if (matchingArticles.length > 0) {
          const articlesList = matchingArticles.map((article: Article) => 
            `- ${article.title}`
          ).join('\n');
          
          const responses = {
            en: `I have written about "${term}". Here are some relevant articles:\n${articlesList}`,
            de: `Ich habe über "${term}" geschrieben. Hier sind einige relevante Artikel:\n${articlesList}`,
            fr: `J'ai écrit sur "${term}". Voici quelques articles pertinents:\n${articlesList}`
          };
          return responses[language as keyof typeof responses] || responses.en;
        }
      }
    }

    // Default responses for common phrases
    const greetingKeywords = {
      en: ['hello', 'hi', 'hey', 'morning', 'afternoon', 'evening'],
      de: ['hallo', 'hi', 'hey', 'morgen', 'tag', 'abend', 'servus', 'moin'],
      fr: ['bonjour', 'salut', 'coucou', 'bonsoir']
    };
    
    if (checkKeywords(greetingKeywords)) {
      const responses = {
        en: 'Hello! How can I help you learn more about Mohamed?',
        de: 'Hallo! Wie kann ich Ihnen helfen, mehr über Mohamed zu erfahren?',
        fr: 'Bonjour! Comment puis-je vous aider à en savoir plus sur Mohamed?'
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const thankKeywords = {
      en: ['thank', 'thanks', 'appreciate'],
      de: ['danke', 'dank', 'schätze'],
      fr: ['merci', 'remercie', 'apprécie']
    };
    
    if (checkKeywords(thankKeywords)) {
      const responses = {
        en: "You're welcome! Is there anything else you'd like to know?",
        de: "Gerne! Gibt es noch etwas, das Sie wissen möchten?",
        fr: "Je vous en prie! Y a-t-il autre chose que vous aimeriez savoir?"
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const byeKeywords = {
      en: ['bye', 'goodbye', 'see you', 'farewell'],
      de: ['tschüss', 'auf wiedersehen', 'bis später', 'ciao'],
      fr: ['au revoir', 'adieu', 'à bientôt', 'salut']
    };
    
    if (checkKeywords(byeKeywords)) {
      const responses = {
        en: 'Goodbye! Feel free to return if you have more questions.',
        de: 'Auf Wiedersehen! Kommen Sie gerne wieder, wenn Sie weitere Fragen haben.',
        fr: 'Au revoir! N\'hésitez pas à revenir si vous avez d\'autres questions.'
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Default fallback response
    const fallbackResponses = {
      en: "I don't have specific information about that. You can ask me about my education, work experience, skills, blog posts, or contact information.",
      de: "Ich habe keine spezifischen Informationen darüber. Sie können mich nach meiner Ausbildung, Arbeitserfahrung, Fähigkeiten, Blogbeiträgen oder Kontaktinformationen fragen.",
      fr: "Je n'ai pas d'informations spécifiques à ce sujet. Vous pouvez me poser des questions sur mon éducation, mon expérience professionnelle, mes compétences, mes articles de blog ou mes coordonnées."
    };
    return fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.en;
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = processMessage(input);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold">{t('chat.title')}</h1>
        <p className="text-slate-600">
          {t('chat.subtitle')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Chat Section */}
        <div className="flex-1">
          <Card className="flex flex-col h-[600px]">
            <div className="flex items-center justify-between px-6 py-3 border-b shrink-0">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/images/mohamed-ayadi-photo.png" alt="Mohamed" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{t('chat.assistantName')}</p>
                  <p className="text-xs text-slate-500">{t('chat.assistantDescription')}</p>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{t('chat.badge')}</span>
              </Badge>
            </div>

            <ScrollArea className="flex-grow p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'bot' ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User2 className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.sender === 'user' ? t('chat.you') : t('chat.assistantName')}
                        </span>
                      </div>
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {t('chat.assistantName')}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t shrink-0">
              <div className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t('chat.messagePlaceholder')}
                  className="flex-grow resize-none"
                  rows={2}
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  aria-label="Send message"
                  disabled={input.trim() === ''}
                >
                  <SendIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Suggested Questions Section */}
        <div className="md:w-96">
          <Card className="p-5 h-[600px] flex flex-col">
            <h3 className="font-medium mb-3">{t('chat.suggestedQuestions')}</h3>
            <Separator className="mb-3" />
            <div className="space-y-3 flex-grow">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t('chat.questions.education'));
                  handleSendMessage();
                }}
              >
                {t('chat.questions.education')}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t('chat.questions.programming'));
                  handleSendMessage();
                }}
              >
                {t('chat.questions.programming')}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t('chat.questions.experience'));
                  handleSendMessage();
                }}
              >
                {t('chat.questions.experience')}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t('chat.questions.blog'));
                  handleSendMessage();
                }}
              >
                {t('chat.questions.blog')}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t('chat.questions.languages'));
                  handleSendMessage();
                }}
              >
                {t('chat.questions.languages')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;