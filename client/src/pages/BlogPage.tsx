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

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", language],
    queryFn: async () => {
      const response = await fetch(`/api/articles?language=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    }
  });

  const filteredArticles = articles?.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
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
        <title>{t('blog.title')} - Mohamed Abdellatif Ayadi</title>
        <meta name="description" content={t('blog.subtitle')} />
      </Helmet>
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog.title')}</h1>
            <p className="text-lg opacity-90 mb-0" 
               dangerouslySetInnerHTML={{ __html: t('blog.subtitle') }}>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="w-full md:w-2/3">
            <Input
              type="text"
              placeholder={t('blog.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-slate-800 font-medium"
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 font-medium"
            >
              <option value="">{t('blog.allCategories')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-5 w-20 rounded" />
                    <Skeleton className="h-5 w-32 ml-2 rounded" />
                  </div>
                  <Skeleton className="h-7 w-full mb-2" />
                  <Skeleton className="h-5 w-full mb-1" />
                  <Skeleton className="h-5 w-full mb-1" />
                  <Skeleton className="h-5 w-2/3 mb-4" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{t('blog.noArticlesFoundTitle')}</h3>
            <p className="text-slate-600">
              {t('blog.noArticlesFoundMessage')}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
