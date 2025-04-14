import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BlogPage from "@/pages/BlogPage";
import BlogPost from "@/pages/BlogPost";
import CVPage from "@/pages/CVPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ChatPage from "@/pages/ChatPage";
import Projects from "@/pages/Projects";
import { LanguageProvider } from "@/lib/languageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/cv" component={CVPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/projects" component={Projects} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
