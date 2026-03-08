import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Derive the base path from Vite's import.meta.env.BASE_URL.
// On Manus this is "/", on GitHub Pages it is "/wrapped-stats/".
// Wouter's `base` prop strips the prefix before matching routes,
// so <Route path="/"> always matches regardless of hosting sub-path.
const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // e.g. "" or "/wrapped-stats"

function AppRouter() {
  return (
    <Router base={base}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

// Kinetic Maximalism: Dark theme with vibrant vaporwave colors
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
