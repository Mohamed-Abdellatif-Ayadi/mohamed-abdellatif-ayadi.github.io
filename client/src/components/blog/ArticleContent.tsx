import { formatDate } from "@/lib/utils";
import { Article } from "@shared/schema";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/lib/languageContext";

type ArticleContentProps = {
  article: Article;
};

const ArticleContent = ({ article }: ArticleContentProps) => {
  const { language, t } = useLanguage();
  // Keywords based on article content and category
  const getKeywords = (article: Article) => {
    if (article.category === 'Technology' && article.title.includes('SQL')) {
      return ['SQL', 'Window Functions', 'MySQL', 'Data Analysis', 'SQL Queries', 'SQL Ranking', 'Database'];
    } else if (article.category === 'Career') {
      return ['Remote Work', 'Productivity', 'Work-Life Balance', 'Career Growth'];
    } else if (article.category === 'Design') {
      return ['UX Design', 'User Experience', 'Prototyping', 'Design Process'];
    } else {
      return ['Technology', 'Programming', 'Data Science', 'Web Development'];
    }
  };

  const keywords = getKeywords(article);
  
  // Replace 2023 with 2025 in the date display
  const formattedDate = formatDate(article.publishedAt.toString()).replace("2023", "2025");

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Category Heading */}
      <div className="uppercase tracking-wider font-medium mb-2">
        <span className="bg-purple-700 text-white px-2 py-1 rounded-md shadow-md">
          {article.category}
        </span> /
      </div>
      
      {/* Article Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {article.translations && article.translations[language] 
          ? article.translations[language].title 
          : article.title}
      </h1>
      
      {/* Reading Time & Date */}
      <div className="flex items-center text-sm text-slate-800 font-medium mb-4">
        <span className="mr-4">{t('blog.readingTime')}</span>
        <span className="mr-4">•</span>
        <span>{formattedDate}</span>
      </div>
      
      {/* Keywords/Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {keywords.map((keyword, index) => (
          <span 
            key={index} 
            className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
          >
            {keyword}
          </span>
        ))}
      </div>
      
      {/* Cover Image */}
      <img 
        src={article.coverImage} 
        alt={article.title} 
        className="w-full h-auto rounded-lg shadow-md mb-8" 
      />
      
      {/* Author Section */}
      <div className="flex items-center mb-8 pb-6 border-b border-slate-200">
        <img 
          src="/images/avatar.png" 
          alt="Mohamed Abdellatif Ayadi" 
          className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-indigo-100"
        />
        <div>
          <div className="text-sm text-slate-700 font-medium mb-1">{t('blog.author')}</div>
          <div className="font-medium text-lg text-slate-900">Mohamed Abdellatif Ayadi</div>
          <div className="text-slate-800 text-sm font-medium mt-1">{t('blog.authorDescription')}</div>
          <div className="flex mt-2 space-x-3">
            <a href="https://linkedin.com/in/mohamed-abdellatif-ayadi" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-purple-700">
              <FaLinkedin size={18} />
            </a>
            <a href="https://github.com/Mayedi007" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-purple-700">
              <FaGithub size={18} />
            </a>
            <a href="mailto:mohamed.ayadi.data@gmail.com" className="text-slate-600 hover:text-purple-700">
              <FaEnvelope size={18} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div 
        className="article-content prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-800 prose-li:text-slate-800 prose-strong:text-slate-900"
        dangerouslySetInnerHTML={{ 
          __html: article.translations && article.translations[language] && article.translations[language].content
            ? article.translations[language].content
            : article.content 
        }}
      />
      
      {/* Share Section */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold mb-4 text-slate-900">{t('blog.shareArticle')}:</h3>
        <div className="flex space-x-6">
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              article.translations && article.translations[language] 
                ? article.translations[language].title 
                : article.title
            )}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;
