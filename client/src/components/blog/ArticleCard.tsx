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
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img 
        src={article.coverImage} 
        alt={article.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary-100 text-primary-800">
            {article.category}
          </span>
          <span className="ml-2 text-xs text-slate-500">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <Link href={`/blog/${article.id}`}>
          <h3 className="text-xl font-bold mb-2 text-slate-900 hover:text-primary-700 transition-colors">
            {article.translations && article.translations[language] 
              ? article.translations[language].title 
              : article.title}
          </h3>
        </Link>
        <p className="text-slate-800 mb-4 line-clamp-3 font-medium">
          {article.translations && article.translations[language] 
            ? truncateText(article.translations[language].excerpt, 150) 
            : truncateText(article.excerpt, 150)}
        </p>
        <div className="mt-auto pt-2">
          <Link 
            href={`/blog/${article.id}`} 
            className="inline-flex items-center font-medium bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors shadow-md border border-purple-400"
            style={{ 
              backgroundColor: '#6d28d9', /* purple-700 */
              color: 'white',
              borderColor: '#a78bfa', /* purple-400 */
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
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
      </div>
    </article>
  );
};

export default ArticleCard;