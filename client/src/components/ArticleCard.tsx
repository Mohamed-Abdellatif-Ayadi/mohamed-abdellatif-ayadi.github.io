import React from "react";
import { Link } from "wouter";
import { Blog } from "@shared/schema";
import { format } from "date-fns";

interface ArticleCardProps {
  blog: Blog;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ blog }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={blog.image}
          alt={blog.title}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-600">
            <Link href={`/blog/category/${blog.category}`} className="hover:underline">
              {blog.category}
            </Link>
          </p>
          <Link href={`/blog/${blog.id}`} className="mt-2 block">
            <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
            <p className="mt-3 text-base text-gray-500">{blog.summary}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">John Doe</span>
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Profile picture"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={blog.publishedAt.toString()}>
                {format(new Date(blog.publishedAt), "MMM d, yyyy")}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{blog.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
