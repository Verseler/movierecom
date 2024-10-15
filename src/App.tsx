import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "@/layouts/MainLayout";
const Home = lazy(() => import("@/pages/Home"));
const Movies = lazy(() => import("@/pages/Movies"));
const TvShows = lazy(() => import("@/pages/TvShows"));
const FilmDetails = lazy(() => import("@/pages/FilmDetails"));
const SearchResult = lazy(() => import("@/pages/SearchResult"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader/Loader";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tv-shows" element={<TvShows />} />
            <Route
              path=":id"
              element={<FilmDetails key={location.pathname} />}
            />
            <Route path="search-result" element={<SearchResult />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
