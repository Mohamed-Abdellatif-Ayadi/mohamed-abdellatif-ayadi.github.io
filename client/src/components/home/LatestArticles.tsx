import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../blog/ArticleCard";
import { Button } from "@/components/ui/button";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const LatestArticles = () => {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles?limit=3"],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Latest Articles</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Explore my recent posts on various topics including technology, design, and professional growth.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button size="lg" className="inline-flex items-center">
              View all articles
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
