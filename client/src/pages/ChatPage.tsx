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
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m Mohamed\'s AI assistant. I can answer questions about his CV, education, skills, experience, and blog posts. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch CV data
  const { data: cv, isLoading: isCVLoading } = useQuery<CV>({
    queryKey: ['/api/cv'],
  });

  // Fetch articles data
  const { data: articles, isLoading: isArticlesLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to process user input and generate a response
  const processMessage = (userInput: string) => {
    // If data is still loading, inform the user
    if (isCVLoading || isArticlesLoading || !cv || !articles) {
      return "I'm still gathering information. Please try again in a moment.";
    }

    const normalizedInput = userInput.toLowerCase();

    // CV-related questions
    if (normalizedInput.includes('name') || normalizedInput.includes('who are you')) {
      return `My name is ${cv.name}.`;
    }

    if (normalizedInput.includes('study') || normalizedInput.includes('education') || 
        normalizedInput.includes('university') || normalizedInput.includes('degree')) {
      if (cv.education && cv.education.length > 0) {
        const education = cv.education.map((edu: Education) => 
          `${edu.degree} at ${edu.institution} (${edu.startDate} - ${edu.endDate})`
        ).join('\\n');
        return `My educational background includes:\\n${education}`;
      } else {
        return "I don't have any education information available.";
      }
    }

    if (normalizedInput.includes('skills') || normalizedInput.includes('what can you do')) {
      return `My technical skills include: ${cv.skills ? cv.skills.join(', ') : 'No skills information available'}`;
    }

    if (normalizedInput.includes('language') || normalizedInput.includes('speak')) {
      const languages = cv.languages ? cv.languages.map((lang: LanguageType) => 
        `${lang.name} (${lang.proficiency})`
      ).join(', ') : 'No language information available';
      return `I speak: ${languages}`;
    }

    if (normalizedInput.includes('experience') || normalizedInput.includes('work') || 
        normalizedInput.includes('job')) {
      if (cv.experience && cv.experience.length > 0) {
        const workExp = cv.experience.map((exp: Experience) => 
          `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`
        ).join('\\n');
        return `My work experience includes:\\n${workExp}`;
      } else {
        return "I don't have any work experience information available.";
      }
    }

    if (normalizedInput.includes('location') || normalizedInput.includes('where') || 
        normalizedInput.includes('city') || normalizedInput.includes('country') || 
        normalizedInput.includes('live')) {
      return cv.location ? `I'm located in ${cv.location}.` : "My location information is not available.";
    }

    if (normalizedInput.includes('contact') || normalizedInput.includes('email') || 
        normalizedInput.includes('phone')) {
      const email = cv.email || "Email not available";
      const phone = cv.phone || "Phone not available";
      return `You can contact me at:\\nEmail: ${email}\\nPhone: ${phone}`;
    }

    if (normalizedInput.includes('summary') || normalizedInput.includes('about you') || 
        normalizedInput.includes('tell me about yourself')) {
      return cv.summary || "I don't have a summary available yet.";
    }

    // Blog-related questions
    if (normalizedInput.includes('blog') || normalizedInput.includes('article') || 
        normalizedInput.includes('post') || normalizedInput.includes('write')) {
      if (articles && articles.length > 0) {
        const articlesList = articles.map((article: Article) => 
          `- ${article.title}`
        ).join('\\n');
        return `I've written the following articles:\\n${articlesList}`;
      } else {
        return "I don't have any blog posts yet.";
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
          ).join('\\n');
          return `I have written about "${term}". Here are some relevant articles:\\n${articlesList}`;
        }
      }
    }

    // Default responses for common phrases
    if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || 
        normalizedInput.includes('hey')) {
      return 'Hello! How can I help you learn more about Mohamed?';
    }

    if (normalizedInput.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know?";
    }

    if (normalizedInput.includes('bye') || normalizedInput.includes('goodbye')) {
      return 'Goodbye! Feel free to return if you have more questions.';
    }

    // Default fallback response
    return "I don't have specific information about that. You can ask me about my education, work experience, skills, blog posts, or contact information.";
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
        <h1 className="text-3xl font-bold">Chat with Mohamed's Assistant</h1>
        <p className="text-slate-600">
          Ask questions about Mohamed's CV, work experience, skills, education, and blog posts.
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
                  <p className="font-medium">Mohamed's Assistant</p>
                  <p className="text-xs text-slate-500">Ask me anything about Mohamed</p>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>Chat</span>
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
                          {message.sender === 'user' ? 'You' : "Mohamed's Assistant"}
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
                          Mohamed's Assistant
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
                  placeholder="Type your message here..."
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
        <div className="md:w-72">
          <Card className="p-5 h-[600px] flex flex-col">
            <h3 className="font-medium mb-3">Suggested Questions</h3>
            <Separator className="mb-3" />
            <div className="space-y-3 flex-grow overflow-y-auto">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput("What is your educational background?");
                  handleSendMessage();
                }}
              >
                What is your educational background?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput("What programming languages do you know?");
                  handleSendMessage();
                }}
              >
                What programming languages do you know?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput("Tell me about your work experience.");
                  handleSendMessage();
                }}
              >
                Tell me about your work experience.
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput("What blog posts have you written?");
                  handleSendMessage();
                }}
              >
                What blog posts have you written?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  setInput("What languages do you speak?");
                  handleSendMessage();
                }}
              >
                What languages do you speak?
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;