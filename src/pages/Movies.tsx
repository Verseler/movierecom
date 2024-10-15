import AlignContainer from "@/components/AlignContainer/AlignContainer";
import FilmCarousel from "@/features/film/FilmCarousel";
import FilmCatalog from "@/features/film/FilmCatalog";
import {
  useGetFilmsQuery,
  useGetTrendingFilmsQuery,
} from "@/features/film/filmApi";
import { useState } from "react";
import H1 from "@/components/Typography/H1";

export default function Movies() {
  const { data: topRatedMovies, isLoading: topRatedMoviesIsLoading } =
    useGetFilmsQuery({ filmType: "movie", category: "top_rated" });
  const { data: upcomingMovies, isLoading: upcomingMoviesIsLoading } =
    useGetFilmsQuery({ filmType: "movie", category: "upcoming" });

  const [page, setPage] = useState(1);
  const { data: trendingMovies, isLoading: trendingMoviesIsLoading } =
    useGetTrendingFilmsQuery({ filmType: "movie", page: page });
  const loadMorePage = () => setPage(page + 1);

  return (
    <AlignContainer className="py-4 space-y-6 md:space-y-10 md:py-10">
      <H1>Movies</H1>
      <FilmCarousel
        label="Top Rated"
        data={topRatedMovies?.results}
        isLoading={topRatedMoviesIsLoading}
      />
      <FilmCarousel
        label="Upcoming"
        data={upcomingMovies?.results}
        isLoading={upcomingMoviesIsLoading}
      />
      <FilmCatalog
        label="Trending"
        data={trendingMovies?.results}
        isLoading={trendingMoviesIsLoading}
        loadMorePage={loadMorePage}
      />
    </AlignContainer>
  );
}
