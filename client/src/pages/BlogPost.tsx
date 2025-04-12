import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import ArticleContent from "@/components/blog/ArticleContent";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import NotFound from "./not-found";

const BlogPost = () => {
  const [, params] = useRoute<{ id: string }>("/blog/:id");
  const articleId = params?.id ? parseInt(params.id) : null;

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: [`/api/articles/${articleId}`],
    enabled: !!articleId,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <div className="flex items-center mb-6">
            <Skeleton className="h-5 w-32 mr-4" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-80 w-full rounded-lg mb-8" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - John Doe</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.coverImage} />
        <meta property="og:type" content="article" />
      </Helmet>
      <ArticleContent article={article} />
    </>
  );
};

export default BlogPost;
