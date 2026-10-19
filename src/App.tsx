import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import CursorGlow from "./components/effects/CursorGlow";

import { WatchlistProvider } from "./hooks/WatchlistContext";

import { GlobalStyle } from "./GlobalStyle";

/* Fast page transition: orients the user during navigation without lingering */
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.main
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
  >
    {children}
  </motion.main>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/:movieId"
          element={
            <PageTransition>
              <Movie />
            </PageTransition>
          }
        />
        <Route
          path="/*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <MotionConfig reducedMotion="user">
      <WatchlistProvider>
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Header />
        <AnimatedRoutes />
        <div className="film-grain" aria-hidden="true" />
        <CursorGlow />
      </WatchlistProvider>
      <GlobalStyle />
    </MotionConfig>
  </Router>
);

export default App;
