import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import CursorGlow from "./components/effects/CursorGlow";

import { WatchlistProvider } from "./hooks/WatchlistContext";

import { GlobalStyle } from "./GlobalStyle";

const App = () => (
  <Router>
    <WatchlistProvider>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <div className="film-grain" aria-hidden="true" />
      <CursorGlow />
    </WatchlistProvider>
    <GlobalStyle />
  </Router>
);

export default App;
