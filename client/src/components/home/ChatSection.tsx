
import { Link } from "wouter";
import { useLanguage } from "@/lib/languageContext";
import { useLanguage } from "@/lib/languageContext";
import { MessageSquare, Bot, Sparkles } from "lucide-react";

const ChatSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-600 rounded-full">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('home.chat.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('home.chat.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-200">
              <MessageSquare className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Ask About Experience</h3>
              <p className="text-sm text-slate-600">Get insights into my work experience, projects, and technical skills</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-200">
              <Sparkles className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Explore My Knowledge</h3>
              <p className="text-sm text-slate-600">Learn about my education, programming expertise, and research interests</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-200">
              <Bot className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">AI-Powered Responses</h3>
              <p className="text-sm text-slate-600">Get instant, intelligent answers powered by my comprehensive profile data</p>
            </div>
          </div>

          <Link href="/chat">
            <button className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <MessageSquare className="h-5 w-5 mr-2" />
              {t('home.chat.startChat')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
