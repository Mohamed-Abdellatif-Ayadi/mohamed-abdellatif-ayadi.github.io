import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/blog/ArticleCard";
import { Input } from "@/components/ui/input";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/languageContext";

const BlogPage = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ["/api/articles", language],
    retry: 3,
    queryFn: async () => {
      const response = await fetch(`/api/articles?language=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    }
  });
  
  const filteredArticles = articles?.filter((article) => {
    const translation = article.translations?.[language];

    const title = translation?.title || article.title;
    const excerpt = translation?.excerpt || article.excerpt;

    const matchesSearch = 
      title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === "" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = articles 
    ? [...new Set(articles.map(article => article.category))]
    : [];

  return (
    <>
      <Helmet>
        <title>{t('blog.title')} | Mohamed Ayadi</title>
        <meta name="description" content={t('blog.subtitle')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
          <p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t('blog.subtitle') }}
          />
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="w-full md:w-1/3">
            <Input
              type="search"
              placeholder={t('blog.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedCategory === ""
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {t('blog.allCategories')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {t(`blog.category.${category.toLowerCase()}`) || category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 text-xl">Failed to load articles. Please try again later.</p>
          </div>
        ) : filteredArticles?.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">{t('blog.noArticlesFoundTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('blog.noArticlesFoundMessage')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;