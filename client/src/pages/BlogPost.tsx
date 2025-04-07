import React from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "@shared/schema";
import { format } from "date-fns";

const BlogPost: React.FC = () => {
  const [, params] = useRoute("/blog/:id");
  const id = params?.id ? parseInt(params.id) : null;

  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: [`/api/blogs/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">The article you're looking for could not be found.</p>
        <Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Blog
      </Link>
      
      <header className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">
          <Link href={`/blog/category/${blog.category}`} className="hover:underline">
            {blog.category}
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
          {blog.title}
        </h1>
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full mr-3"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="John Doe"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={blog.publishedAt.toString()}>
                {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{blog.readTime} min read</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="mb-8">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
      
      <div className="prose prose-lg prose-blue max-w-none">
        <p className="text-lg text-gray-500 leading-relaxed mb-6">
          {blog.summary}
        </p>
        
        {blog.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-800 mb-6">
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="mt-12 pt-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Share this article
        </h3>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-500">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
