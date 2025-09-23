import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/lib/languageContext";
import { MessageSquare, SendIcon, User2, Bot } from "lucide-react";
import {
  type CV,
  type Article,
  type Education,
  type Experience,
  type Language as LanguageType,
} from "@shared/schema";

// Define the structure of a chat message
interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatPage = () => {
  const { t, language } = useLanguage();

  const welcomeMessages = {
    en: "Hello! I'm Mohamed's AI assistant. I can help you explore his CV, academic background, technical skills, work experience, and personal projects. How can I assist you today?",
    de: "Hallo! Ich bin Mohameds KI-Assistent. Ich helfe Ihnen gerne, mehr über seinen Lebenslauf, seinen akademischen Hintergrund, seine technischen Fähigkeiten, seine Berufserfahrung und seine Projekte zu erfahren. Wie kann ich Ihnen heute behilflich sein?"
  };


  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        welcomeMessages[language as keyof typeof welcomeMessages] ||
        welcomeMessages.en,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch CV data with the current language
  const { data: cv, isLoading: isCVLoading } = useQuery<CV>({
    queryKey: ["/api/cv", language],
    queryFn: async () => {
      const response = await fetch(`/api/cv?language=${language}`);
      if (!response.ok) {
        throw new Error("Failed to fetch CV data");
      }
      return response.json();
    },
  });

  // Fetch articles data with the current language
  const { data: articles, isLoading: isArticlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", language],
    queryFn: async () => {
      const response = await fetch(`/api/articles?language=${language}`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return response.json();
    },
  });

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to process user input and generate a response
  const processMessage = (userInput: string) => {
    // If data is still loading, inform the user
    if (isCVLoading || isArticlesLoading || !cv || !articles) {
      const loadingResponses = {
        en: "I'm still gathering information. Please try again in a moment.",
        de: "Ich sammle noch Informationen. Bitte versuchen Sie es in einem Moment erneut.",
        
      };
      return (
        loadingResponses[language as keyof typeof loadingResponses] ||
        loadingResponses.en
      );
    }

    const normalizedInput = userInput.toLowerCase();

    // Helper function to detect input language and check for keywords
    const checkKeywords = (keywords: { [key: string]: string[] }): boolean => {
      return Object.entries(keywords).some(([lang, terms]) => {
        if (lang === language || language === "en") {
          return terms.some((term) => normalizedInput.includes(term));
        }
        return false;
      });
    };

    // CV-related questions
    const nameKeywords = {
      en: ["name", "who are you"],
      de: ["name", "wie heißt du", "wer bist du"],
    };

    if (checkKeywords(nameKeywords)) {
      const responses = {
        en: `My name is ${cv.name}.`,
        de: `Mein Name ist ${cv.name}.`,
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const educationKeywords = {
      en: ["study", "education", "university", "degree", "school"],
      de: ["studium", "ausbildung", "universität", "abschluss", "schule"],
    };

    if (checkKeywords(educationKeywords)) {
      if (cv.education && cv.education.length > 0) {
        const education = cv.education
          .map(
            (edu: Education) =>
              `${edu.degree} ${language === "de" ? "an der" : language === "fr" ? "à" : "at"} ${edu.institution} (${edu.startDate} - ${edu.endDate})`,
          )
          .join("\\n");

        const responses = {
          en: `My educational background includes:\\n${education}`,
          de: `Meine Ausbildung umfasst:\\n${education}`,
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "I don't have any education information available.",
          de: "Ich habe keine Informationen zur Ausbildung verfügbar.",
        };
        return (
          noInfoResponses[language as keyof typeof noInfoResponses] ||
          noInfoResponses.en
        );
      }
    }

    const skillsKeywords = {
      en: ["skills", "what can you do", "abilities", "capable"],
      de: ["fähigkeiten", "was kannst du", "kenntnisse", "kompetenz"],
    };

    if (checkKeywords(skillsKeywords)) {
      const skills = cv.skills ? cv.skills.join(", ") : "";
      const responses = {
        en: `My technical skills include: ${skills || "No skills information available"}`,
        de: `Meine technischen Fähigkeiten umfassen: ${skills || "Keine Informationen zu Fähigkeiten verfügbar"}`,
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const languageKeywords = {
      en: ["language", "speak", "fluent"],
      de: ["sprache", "sprechen", "fließend"],
    };

    if (checkKeywords(languageKeywords)) {
      const languages = cv.languages
        ? cv.languages
            .map((lang: LanguageType) => `${lang.name} (${lang.proficiency})`)
            .join(", ")
        : "";

      const responses = {
        en: `I speak: ${languages || "No language information available"}`,
        de: `Ich spreche: ${languages || "Keine Sprachinformationen verfügbar"}`,
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const experienceKeywords = {
      en: ["experience", "work", "job", "career", "profession"],
      de: ["erfahrung", "arbeit", "beruf", "karriere", "tätigkeit"],
    };

    if (checkKeywords(experienceKeywords)) {
      if (cv.experience && cv.experience.length > 0) {
        const workExp = cv.experience
          .map(
            (exp: Experience) =>
              `${exp.position} ${language === "de" ? "bei" : language === "fr" ? "chez" : "at"} ${exp.company} (${exp.startDate} - ${exp.endDate || (language === "de" ? "Heute" : language === "fr" ? "Présent" : "Present")})`,
          )
          .join("\\n");

        const responses = {
          en: `My work experience includes:\\n${workExp}`,
          de: `Meine Arbeitserfahrung umfasst:\\n${workExp}`,
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "I don't have any work experience information available.",
          de: "Ich habe keine Informationen zur Arbeitserfahrung verfügbar.",
        };
        return (
          noInfoResponses[language as keyof typeof noInfoResponses] ||
          noInfoResponses.en
        );
      }
    }

    const locationKeywords = {
      en: ["location", "where", "city", "country", "live"],
      de: ["standort", "wo", "stadt", "land", "wohnen", "leben"],
    };

    if (checkKeywords(locationKeywords)) {
      if (cv.location) {
        const responses = {
          en: `I'm located in ${cv.location}.`,
          de: `Ich befinde mich in ${cv.location}.`,
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "My location information is not available.",
          de: "Meine Standortinformationen sind nicht verfügbar.",
        };
        return (
          noInfoResponses[language as keyof typeof noInfoResponses] ||
          noInfoResponses.en
        );
      }
    }

    const contactKeywords = {
      en: ["contact", "email", "phone", "reach"],
      de: ["kontakt", "Email", "telefon", "erreichen"],
    };

    if (checkKeywords(contactKeywords)) {
      const email =
        cv.email ||
        (language === "de"
          ? "E-Mail nicht verfügbar"
          : language === "fr"
            ? "Email non disponible"
            : "Email not available");
      const phone =
        cv.phone ||
        (language === "de"
          ? "Telefon nicht verfügbar"
          : language === "fr"
            ? "Téléphone non disponible"
            : "Phone not available");

      const responses = {
        en: `You can contact me at:\nEmail: ${email}\nPhone: ${phone}`,
        de: `Sie können mich kontaktieren unter:\nE-Mail: ${email}\nTelefon: ${phone}`,
        fr: `Vous pouvez me contacter à:\nEmail: ${email}\nTéléphone: ${phone}`,
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const summaryKeywords = {
      en: ["summary", "about you", "tell me about yourself", "profile"],
      de: ["zusammenfassung", "über dich", "erzähl mir von dir", "profil"],
     
    };

    if (checkKeywords(summaryKeywords)) {
      if (cv.summary) {
        return cv.summary;
      } else {
        const noInfoResponses = {
          en: "I don't have a summary available yet.",
          de: "Ich habe noch keine Zusammenfassung verfügbar.",
        };
        return (
          noInfoResponses[language as keyof typeof noInfoResponses] ||
          noInfoResponses.en
        );
      }
    }

    // Blog-related questions
    const blogKeywords = {
      en: ["blog", "article", "post", "write", "written"],
      de: ["blog", "artikel", "beitrag", "schreiben", "geschrieben"],
      fr: ["blog", "article", "publication", "écrire", "écrit"],
    };

    if (checkKeywords(blogKeywords)) {
      if (articles && articles.length > 0) {
        const articlesList = articles
          .map((article: Article) => `- ${article.title}`)
          .join("\n");

        const responses = {
          en: `I've written the following articles:\n${articlesList}`,
          de: `Ich habe die folgenden Artikel geschrieben:\n${articlesList}`,
        };
        return responses[language as keyof typeof responses] || responses.en;
      } else {
        const noInfoResponses = {
          en: "I don't have any blog posts yet.",
          de: "Ich habe noch keine Blogbeiträge.",
        };
        return (
          noInfoResponses[language as keyof typeof noInfoResponses] ||
          noInfoResponses.en
        );
      }
    }

    // Search for specific topics in blog posts
    const searchTerms = [
      "custom domain",
      "domain",
      "dns",
      "github pages",
      "deploy",
      "website",
      "sql",
      "database",
      "query",
      "window functions",
    ];

    for (const term of searchTerms) {
      if (normalizedInput.includes(term) && articles) {
        const matchingArticles = articles.filter(
          (article: Article) =>
            article.title.toLowerCase().includes(term) ||
            article.excerpt.toLowerCase().includes(term),
        );

        if (matchingArticles.length > 0) {
          const articlesList = matchingArticles
            .map((article: Article) => `- ${article.title}`)
            .join("\n");

          const responses = {
            en: `I have written about "${term}". Here are some relevant articles:\n${articlesList}`,
            de: `Ich habe über "${term}" geschrieben. Hier sind einige relevante Artikel:\n${articlesList}`,
          };
          return responses[language as keyof typeof responses] || responses.en;
        }
      }
    }

    // Projects and portfolio keywords
    const projectKeywords = {
      en: ["project", "portfolio", "work", "built", "developed", "created", "github"],
      de: ["projekt", "portfolio", "arbeit", "gebaut", "entwickelt", "erstellt", "github"],
    };

    if (checkKeywords(projectKeywords)) {
      const responses = {
        en: "I've worked on several exciting projects including data pipelines, web applications, and AI systems. You can explore my GitHub repositories or visit the Projects section of my website to see detailed descriptions of my work.",
        de: "Ich habe an mehreren spannenden Projekten gearbeitet, darunter Datenpipelines, Webanwendungen und KI-Systeme. Sie können meine GitHub-Repositories erkunden oder den Projektbereich meiner Website besuchen, um detaillierte Beschreibungen meiner Arbeit zu sehen.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Technology stack keywords
    const techKeywords = {
      en: ["technology", "tech", "stack", "framework", "library", "tool", "software"],
      de: ["technologie", "tech", "stack", "framework", "bibliothek", "werkzeug", "software"],
    };

    if (checkKeywords(techKeywords)) {
      const techStack = "Java, Spring Boot, Python, JavaScript, React, Docker, AWS, SQL, PostgreSQL, MongoDB, Git";
      const responses = {
        en: `My technology stack includes: ${techStack}. I'm experienced in both backend and frontend development, with a focus on building scalable and efficient solutions.`,
        de: `Mein Technologie-Stack umfasst: ${techStack}. Ich habe Erfahrung sowohl in der Backend- als auch in der Frontend-Entwicklung, mit einem Fokus auf dem Aufbau skalierbarer und effizienter Lösungen.`,
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Career and goals keywords
    const careerKeywords = {
      en: ["career", "goal", "future", "plan", "aspiration", "ambition"],
      de: ["karriere", "ziel", "zukunft", "plan", "streben", "ambition"],
    };

    if (checkKeywords(careerKeywords)) {
      const responses = {
        en: "I'm passionate about software engineering and data science. My goal is to work on innovative projects that solve real-world problems using cutting-edge technology. I'm particularly interested in AI, machine learning, and scalable system architecture.",
        de: "Ich bin leidenschaftlich für Softwareentwicklung und Data Science. Mein Ziel ist es, an innovativen Projekten zu arbeiten, die reale Probleme mit modernster Technologie lösen. Ich interessiere mich besonders für KI, maschinelles Lernen und skalierbare Systemarchitektur.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Default responses for common phrases
    const greetingKeywords = {
      en: ["hello", "hi", "hey", "morning", "afternoon", "evening"],
      de: ["hallo", "hi", "hey", "morgen", "tag", "abend", "servus", "moin"],
    };

    if (checkKeywords(greetingKeywords)) {
      const responses = {
        en: "Hello! How can I help you learn more about Mohamed? You can ask me about his education, work experience, technical skills, projects, or career goals.",
        de: "Hallo! Wie kann ich Ihnen helfen, mehr über Mohamed zu erfahren? Sie können mich nach seiner Ausbildung, Arbeitserfahrung, technischen Fähigkeiten, Projekten oder Karrierezielen fragen.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const thankKeywords = {
      en: ["thank", "thanks", "appreciate"],
      de: ["danke", "dank", "schätze"],
    };

    if (checkKeywords(thankKeywords)) {
      const responses = {
        en: "You're welcome! Is there anything else you'd like to know?",
        de: "Gerne! Gibt es noch etwas, das Sie wissen möchten?",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    const byeKeywords = {
      en: ["bye", "goodbye", "see you", "farewell"],
      de: ["tschüss", "auf wiedersehen", "bis später", "ciao"],
    };

    if (checkKeywords(byeKeywords)) {
      const responses = {
        en: "Goodbye! Feel free to return if you have more questions.",
        de: "Auf Wiedersehen! Kommen Sie gerne wieder, wenn Sie weitere Fragen haben.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Personal interests and hobbies
    const hobbiesKeywords = {
      en: ["hobby", "hobbies", "interest", "interests", "free time", "leisure", "fun", "like to do", "enjoy"],
      de: ["hobby", "hobbies", "interesse", "interessen", "freizeit", "spaß", "gerne", "mag"],
    };

    if (checkKeywords(hobbiesKeywords)) {
      const responses = {
        en: "In my free time, I enjoy reading books about technology and finance, playing padel with friends, and attending tech conferences and meetups. I'm also passionate about staying updated with the latest developments in AI and software engineering. I find great satisfaction in learning new programming languages and experimenting with innovative technologies.",
        de: "In meiner Freizeit lese ich gerne Bücher über Technologie und Finanzen, spiele Padel mit Freunden und besuche Tech-Konferenzen und Meetups. Ich bin auch leidenschaftlich dabei, über die neuesten Entwicklungen in KI und Softwareentwicklung auf dem Laufenden zu bleiben. Ich finde große Zufriedenheit beim Erlernen neuer Programmiersprachen und beim Experimentieren mit innovativen Technologien.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Personality and work style
    const personalityKeywords = {
      en: ["personality", "character", "work style", "approach", "teamwork", "collaboration", "strengths"],
      de: ["persönlichkeit", "charakter", "arbeitsstil", "ansatz", "teamarbeit", "zusammenarbeit", "stärken"],
    };

    if (checkKeywords(personalityKeywords)) {
      const responses = {
        en: "I'm a detail-oriented and analytical person who thrives in collaborative environments. I approach problems systematically and enjoy breaking down complex challenges into manageable components. I'm passionate about continuous learning and sharing knowledge with team members. My work style is structured yet flexible, always focusing on delivering high-quality solutions while maintaining clear communication with stakeholders.",
        de: "Ich bin eine detailorientierte und analytische Person, die in kollaborativen Umgebungen aufblüht. Ich gehe Probleme systematisch an und zerlege gerne komplexe Herausforderungen in handhabbare Komponenten. Ich bin leidenschaftlich beim kontinuierlichen Lernen und beim Teilen von Wissen mit Teammitgliedern. Mein Arbeitsstil ist strukturiert, aber flexibel, wobei ich mich immer darauf konzentriere, qualitativ hochwertige Lösungen zu liefern und gleichzeitig eine klare Kommunikation mit Stakeholdern zu pflegen.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Motivation and inspiration
    const motivationKeywords = {
      en: ["motivation", "inspire", "inspiration", "drive", "passion", "why", "what motivates"],
      de: ["motivation", "inspirieren", "inspiration", "antrieb", "leidenschaft", "warum", "was motiviert"],
    };

    if (checkKeywords(motivationKeywords)) {
      const responses = {
        en: "I'm motivated by the opportunity to solve real-world problems through technology. What inspires me most is seeing how innovative software solutions can improve people's lives and make complex tasks simpler. The rapidly evolving tech landscape keeps me excited about learning new technologies and contributing to meaningful projects. I'm particularly driven by the potential of AI to transform industries and create more efficient systems.",
        de: "Ich bin motiviert durch die Möglichkeit, reale Probleme durch Technologie zu lösen. Was mich am meisten inspiriert, ist zu sehen, wie innovative Softwarelösungen das Leben der Menschen verbessern und komplexe Aufgaben vereinfachen können. Die sich schnell entwickelnde Tech-Landschaft hält mich begeistert beim Erlernen neuer Technologien und beim Beitrag zu bedeutungsvollen Projekten. Ich bin besonders angetrieben durch das Potenzial der KI, Branchen zu transformieren und effizientere Systeme zu schaffen.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Professional development and learning
    const learningKeywords = {
      en: ["learning", "development", "growth", "improve", "skills", "self-improvement", "courses"],
      de: ["lernen", "entwicklung", "wachstum", "verbessern", "fähigkeiten", "selbstverbesserung", "kurse"],
    };

    if (checkKeywords(learningKeywords)) {
      const responses = {
        en: "I'm committed to continuous learning and professional development. I regularly take online courses, participate in coding challenges, and contribute to open-source projects. I stay updated with industry trends through tech blogs, podcasts, and conferences. I believe in learning by doing, which is why I work on personal projects that challenge me to apply new technologies and methodologies. I'm also interested in obtaining relevant certifications to validate my expertise.",
        de: "Ich bin dem kontinuierlichen Lernen und der beruflichen Entwicklung verpflichtet. Ich nehme regelmäßig an Online-Kursen teil, beteilige mich an Programmier-Herausforderungen und trage zu Open-Source-Projekten bei. Ich bleibe über Branchentrends durch Tech-Blogs, Podcasts und Konferenzen auf dem Laufenden. Ich glaube an Learning by Doing, deshalb arbeite ich an persönlichen Projekten, die mich herausfordern, neue Technologien und Methoden anzuwenden. Ich interessiere mich auch für relevante Zertifizierungen zur Validierung meiner Expertise.",
      };
      return responses[language as keyof typeof responses] || responses.en;
    }

    // Default fallback response that's more engaging
    const fallbackResponses = {
      en: "That's an interesting question! While I might not have specific details about that particular topic, I'm always happy to discuss my technical expertise, career journey, or professional experiences. Feel free to ask me about my projects, programming skills, education, or anything related to software development and technology. What would you like to know more about?",
      de: "Das ist eine interessante Frage! Auch wenn ich möglicherweise keine spezifischen Details zu diesem bestimmten Thema habe, spreche ich gerne über meine technische Expertise, meinen Karriereweg oder meine beruflichen Erfahrungen. Fragen Sie mich gerne nach meinen Projekten, Programmierkenntnissen, Ausbildung oder allem, was mit Softwareentwicklung und Technologie zu tun hat. Worüber möchten Sie mehr erfahren?",
    };
    return (
      fallbackResponses[language as keyof typeof fallbackResponses] ||
      fallbackResponses.en
    );
  };

  
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Store current input value before clearing it
    const currentInput = input.trim();

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: currentInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = processMessage(currentInput);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold">{t("chat.title")}</h1>
        <p className="text-slate-600">{t("chat.subtitle")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Chat Section */}
        <div className="flex-1">
          <Card className="flex flex-col h-[600px]">
            <div className="flex items-center justify-between px-6 py-3 border-b shrink-0">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src="/images/mohamed-ayadi-photo.png"
                    alt="Mohamed"
                  />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{t("chat.assistantName")}</p>
                  <p className="text-xs text-slate-500">
                    {t("chat.assistantDescription")}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{t("chat.badge")}</span>
              </Badge>
            </div>

            <ScrollArea className="flex-grow p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "bot" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User2 className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.sender === "user"
                            ? t("chat.you")
                            : t("chat.assistantName")}
                        </span>
                      </div>
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
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
                          {t("chat.assistantName")}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
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
                  placeholder={t("chat.messagePlaceholder")}
                  className="flex-grow resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  aria-label="Send message"
                  disabled={input.trim() === ""}
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
            <h3 className="font-medium mb-3">{t("chat.suggestedQuestions")}</h3>
            <Separator className="mb-3" />
            <div className="space-y-3 flex-grow">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t("chat.questions.education"));
                  handleSendMessage();
                }}
              >
                {t("chat.questions.education")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t("chat.questions.programming"));
                  handleSendMessage();
                }}
              >
                {t("chat.questions.programming")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t("chat.questions.experience"));
                  handleSendMessage();
                }}
              >
                {t("chat.questions.experience")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t("chat.questions.blog"));
                  handleSendMessage();
                }}
              >
                {t("chat.questions.blog")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput(t("chat.questions.languages"));
                  handleSendMessage();
                }}
              >
                {t("chat.questions.languages")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
