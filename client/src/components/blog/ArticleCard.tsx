import { Link } from "wouter";
import { formatDate, truncateText } from "@/lib/utils";
import { Article } from "@shared/schema";
import { useLanguage } from "@/lib/languageContext";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { t, language } = useLanguage();
  
  // If article is undefined or missing critical properties, show a placeholder
  if (!article || !article.id) {
    return (
      <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="h-20 bg-gray-100 mb-4"></div>
        </div>
      </article>
    );
  }
  
  // Get the title and excerpt based on the current language or fallback
  const title = article.translations && article.translations[language]?.title 
    ? article.translations[language].title 
    : (article.title || 'Untitled Article');
    
  const excerpt = article.translations && article.translations[language]?.excerpt 
    ? article.translations[language].excerpt 
    : (article.excerpt || 'No excerpt available');
    
  // Ensure we have a date to format
  const publishDate = article.publishedAt ? formatDate(article.publishedAt) : '';
  
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img 
        src={article.coverImage || '/images/default-cover.svg'} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          <span className="text-xs font-medium px-3 py-1 tracking-wider rounded-md bg-purple-700 text-white shadow-sm">
            {article.category || 'Uncategorized'}
          </span>
          {publishDate && (
            <span className="ml-2 text-xs text-slate-500">
              {publishDate}
            </span>
          )}
        </div>
        <Link href={`/blog/${article.id}`}>
          <h3 className="text-xl font-bold mb-2 text-purple-900 hover:text-purple-700 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-slate-800 mb-4 line-clamp-3 font-medium">
          {truncateText(excerpt, 150)}
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