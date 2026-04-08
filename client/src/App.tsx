import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import AnalyticsScript from "./components/AnalyticsScript";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LiveViewerPage } from "./live/LiveViewerPage";
import Home from "./pages/Home";

const LIVE_VIEWER_MODE = import.meta.env.VITE_LIVE_VIEWER_MODE === "true";
const DEFAULT_EVENT_ID = import.meta.env.VITE_DEFAULT_EVENT_ID?.trim() ?? "";

function LiveViewerRoot() {
  if (!DEFAULT_EVENT_ID) {
    return (
      <main className="live-page live-shell">
        <section className="live-hero-card">
          <p className="live-eyebrow">Lets Play For Peace</p>
          <h1>Live Viewer is not mapped to an event yet.</h1>
          <p className="live-hero-copy">
            Set <code>VITE_DEFAULT_EVENT_ID</code> for the root path, or open{" "}
            <code>/events/&lt;eventId&gt;</code> directly.
          </p>
          <div>
            <a className="live-button-link" href="/events/concert-2026-04-04">
              Open sample event
            </a>
          </div>
        </section>
      </main>
    );
  }

  return <LiveViewerPage eventId={DEFAULT_EVENT_ID} />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/events/:eventId"}>
        {(params) => <LiveViewerPage eventId={params.eventId} />}
      </Route>
      <Route path={"/"}>{LIVE_VIEWER_MODE ? <LiveViewerRoot /> : <Home />}</Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/*
 * DESIGN SYSTEM: "Hiroshima Dawn" - Poetic Naturalism
 * 
 * Light theme with warm cream background and rich charcoal text.
 * Dawn gradient accents (pink to blue) symbolizing hope.
 * Gold accents for warmth and the eternal flame.
 */

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <AnalyticsScript />
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
