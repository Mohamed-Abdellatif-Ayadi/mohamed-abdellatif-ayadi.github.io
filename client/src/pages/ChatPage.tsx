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

  // Function to process user input and generate a response using OpenAI API
  const processMessage = async (userInput: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          language: language
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || (language === 'de' ? 
        "Entschuldigung, ich konnte gerade keine Antwort generieren." : 
        "I apologize, but I couldn't generate a response at the moment.");
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Fallback response
      const fallbackResponses = {
        en: "I'm having trouble connecting to my AI assistant right now. Please try again in a moment.",
        de: "Ich habe gerade Probleme, eine Verbindung zu meinem KI-Assistenten herzustellen. Bitte versuchen Sie es in einem Moment erneut.",
      };
      return fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.en;
    }
  };

  
  const handleSendMessage = async () => {
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

    try {
      const response = await processMessage(currentInput);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: language === 'de' ? 
          "Entschuldigung, es gab ein Problem bei der Verarbeitung Ihrer Nachricht." :
          "Sorry, there was an issue processing your message.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
                onClick={async () => {
                  setInput(t("chat.questions.education"));
                  await handleSendMessage();
                }}
              >
                {t("chat.questions.education")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={async () => {
                  setInput(t("chat.questions.programming"));
                  await handleSendMessage();
                }}
              >
                {t("chat.questions.programming")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={async () => {
                  setInput(t("chat.questions.experience"));
                  await handleSendMessage();
                }}
              >
                {t("chat.questions.experience")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={async () => {
                  setInput(t("chat.questions.blog"));
                  await handleSendMessage();
                }}
              >
                {t("chat.questions.blog")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={async () => {
                  setInput(t("chat.questions.languages"));
                  await handleSendMessage();
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
