import { Route, Switch } from "wouter";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <RootLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/cv" component={CV} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </RootLayout>
      <Toaster />
    </>
  );
}

export default App;
