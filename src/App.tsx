import { Routes, Route, useLocation } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Movies from "@/pages/Movies";
import TvShows from "@/pages/TvShows";
import Settings from "@/pages/Settings";
import FilmDetails from "@/pages/FilmDetails";
import SearchResult from "@/pages/SearchResult";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-shows" element={<TvShows />} />
          <Route path=":id" element={<FilmDetails />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
