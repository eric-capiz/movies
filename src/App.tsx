import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

import { WatchlistProvider } from "./hooks/WatchlistContext";

import { GlobalStyle } from "./GlobalStyle";

const App = () => (
  <Router>
    <WatchlistProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </WatchlistProvider>
    <GlobalStyle />
  </Router>
);

export default App;
