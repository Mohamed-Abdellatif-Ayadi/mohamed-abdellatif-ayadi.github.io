import { Link } from "wouter";
import { formatDate, truncateText } from "@/lib/utils";
import { Article } from "@shared/schema";
import { useLanguage } from "@/lib/languageContext";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { t, language } = useLanguage();
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={article.coverImage} 
        alt={article.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary-100 text-primary-800">
            {article.category}
          </span>
          <span className="ml-2 text-xs text-slate-500">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-900">
          {article.translations && article.translations[language] 
            ? article.translations[language].title 
            : article.title}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3">
          {article.translations && article.translations[language] 
            ? truncateText(article.translations[language].excerpt, 150) 
            : truncateText(article.excerpt, 150)}
        </p>
        <Link 
          href={`/blog/${article.id}`} 
          className="inline-flex items-center font-medium bg-primary-700 text-white px-3 py-1 rounded-md hover:bg-primary-800 transition-colors"
        >
          {t('blog.readMore')}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
