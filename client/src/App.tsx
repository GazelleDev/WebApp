import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect } from "react";

// Layout & UI
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import NotFound from "@/pages/not-found";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Location from "./pages/Location";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence initial={false} mode="wait">
      <Switch location={location} key={location}>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/location" component={Location} />
        <Route path="/about" component={About} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-dvh flex-col">
          <ScrollToTop />
          {!isAdminRoute ? <Navbar /> : null}
          <main className="flex-1">
            <Router />
          </main>
          {!isAdminRoute ? <Footer /> : null}
        </div>
        <Toaster />
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
