import { blogs, type Blog, type InsertBlog, users, type User, type InsertUser, contact, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog operations
  getAllBlogs(): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | undefined>;
  getBlogsByCategory(category: string): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: number): Promise<boolean>;
  
  // Contact operations
  saveContactMessage(message: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogs: Map<number, Blog>;
  private contacts: Map<number, Contact>;
  private userId: number;
  private blogId: number;
  private contactId: number;

  constructor() {
    this.users = new Map();
    this.blogs = new Map();
    this.contacts = new Map();
    this.userId = 1;
    this.blogId = 1;
    this.contactId = 1;
    
    // Initialize with sample blog posts
    this.initializeBlogs();
  }
  
  private initializeBlogs() {
    const sampleBlogs: InsertBlog[] = [
      {
        title: "Modern Web Development Practices",
        summary: "Exploring current trends in web development, including jamstack, serverless functions, and headless CMS solutions.",
        content: "Modern web development has evolved significantly over the past decade. With the rise of Jamstack architecture, developers can now create faster, more secure websites by pre-rendering pages and serving them directly from a CDN. Serverless functions have also revolutionized backend development, allowing developers to focus on writing code rather than managing servers. Additionally, headless CMS solutions provide a flexible way to manage content without being tied to a specific frontend implementation. These approaches, combined with modern JavaScript frameworks like React, Vue, and Angular, have made it easier than ever to build robust web applications that provide excellent user experiences.",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
        publishedAt: new Date("2023-03-16"),
        readTime: 6
      },
      {
        title: "The Psychology of User Experience",
        summary: "Understanding how cognitive biases affect user behavior and how to design interfaces that account for human psychology.",
        content: "User experience design isn't just about creating beautiful interfaces; it's about understanding how users think and behave. Cognitive biases play a significant role in how users interact with products. For example, the 'serial position effect' suggests that users tend to remember the first and last items in a list better than those in the middle. Designers can leverage this by placing important information at the beginning or end of content. Another important concept is the 'paradox of choice,' which suggests that having too many options can lead to decision paralysis. By limiting options and providing clear guidance, designers can create more effective user experiences that lead to better outcomes for both users and businesses.",
        category: "UX Design",
        image: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
        publishedAt: new Date("2023-02-12"),
        readTime: 8
      },
      {
        title: "Functional Programming Principles",
        summary: "How embracing immutability and pure functions can lead to more maintainable and testable code bases.",
        content: "Functional programming has gained popularity in recent years due to its emphasis on writing clean, predictable code. At its core are two key principles: immutability and pure functions. Immutability means that once a data structure is created, it cannot be changed. Instead of modifying existing data, functional programming creates new copies with the desired changes. This approach eliminates a whole class of bugs related to changing state. Pure functions are functions that always produce the same output for the same input and have no side effects. They don't modify external state or perform I/O operations. This makes them easier to test, reason about, and parallelize. By adopting these principles, developers can create more maintainable and robust applications, especially in complex domains where predictability is crucial.",
        category: "Programming",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        publishedAt: new Date("2023-01-24"),
        readTime: 11
      },
      {
        title: "Effective Collaboration in Remote Teams",
        summary: "Strategies for maintaining productivity and team cohesion when working remotely across different time zones.",
        content: "The shift to remote work has transformed how teams collaborate. While remote work offers flexibility and access to global talent, it also presents challenges in communication, coordination, and maintaining team spirit. Effective remote collaboration requires intentional practices. Asynchronous communication tools like shared documents and project management software enable team members in different time zones to stay aligned. Regular video meetings help maintain personal connections, while clear documentation ensures everyone has access to the information they need. It's also important to create virtual spaces for casual interaction to replace the spontaneous conversations that happen in physical offices. By embracing these practices, remote teams can achieve high levels of productivity while maintaining strong team cohesion.",
        category: "Teamwork",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        publishedAt: new Date("2022-12-18"),
        readTime: 9
      },
      {
        title: "Web Performance Optimization Techniques",
        summary: "Practical strategies to improve website loading times and enhance user experience through performance optimization.",
        content: "Website performance has a direct impact on user experience, conversion rates, and search engine rankings. Optimizing for performance involves multiple strategies across the stack. At the frontend, minimizing and compressing JavaScript and CSS files reduces download times. Lazy loading images and code splitting ensures users only download what they need initially. Server-side optimizations include implementing efficient caching strategies, using content delivery networks (CDNs), and optimizing database queries. Modern image formats like WebP and AVIF can significantly reduce image sizes without sacrificing quality. Tools like Lighthouse and WebPageTest help identify specific performance bottlenecks. By focusing on key metrics like First Contentful Paint and Time to Interactive, developers can create websites that feel instantaneous to users, leading to better engagement and business outcomes.",
        category: "Performance",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
        publishedAt: new Date("2022-11-05"),
        readTime: 7
      },
      {
        title: "Navigating a Career in Tech",
        summary: "Insights on professional growth, skill development, and finding the right opportunities in the tech industry.",
        content: "Building a successful career in tech requires more than just technical skills. It involves strategic planning, continuous learning, and effective networking. The tech industry evolves rapidly, so committing to lifelong learning is essential. This might include formal education, online courses, or contributing to open-source projects. Beyond technical skills, developing 'soft skills' like communication, problem-solving, and teamwork is increasingly important, especially as you move into leadership roles. Finding the right opportunities means aligning your work with your values and long-term goals, not just chasing the highest salary or most prestigious company. Building a professional network provides access to mentorship, job opportunities, and industry insights. Remember that career paths in tech aren't linear – lateral moves and even step-backs can sometimes lead to more fulfilling long-term growth.",
        category: "Career",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        publishedAt: new Date("2022-10-12"),
        readTime: 10
      }
    ];
    
    sampleBlogs.forEach(blog => {
      this.createBlog(blog);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Blog operations
  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
  
  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }
  
  async getBlogsByCategory(category: string): Promise<Blog[]> {
    return Array.from(this.blogs.values())
      .filter(blog => blog.category === category)
      .sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }
  
  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = this.blogId++;
    const blog: Blog = { ...insertBlog, id };
    this.blogs.set(id, blog);
    return blog;
  }
  
  async updateBlog(id: number, blogUpdate: Partial<InsertBlog>): Promise<Blog | undefined> {
    const blog = this.blogs.get(id);
    if (!blog) return undefined;
    
    const updatedBlog = { ...blog, ...blogUpdate };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }
  
  async deleteBlog(id: number): Promise<boolean> {
    return this.blogs.delete(id);
  }
  
  // Contact operations
  async saveContactMessage(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
