import FilmHeroSection from "@/features/film/FilmHeroSection";
import FilmCarousel from "@/features/film/FilmCarousel";
import {
  useGetFilmsQuery,
  useGetTrendingFilmsQuery,
} from "@/features/film/filmApi";
import { getFilmId } from "@/features/film/film.helper";
import AlignContainer from "@/components/AlignContainer/AlignContainer";
import FilmCatalog from "@/features/film/FilmCatalog";
import { useState } from "react";

export default function Home() {
  const { data: popularMovies, isLoading: popularMoviesIsLoading } =
    useGetFilmsQuery({ filmType: "movie", category: "popular" });
  const { data: popularSeries, isLoading: popularSeriesIsLoading } =
    useGetFilmsQuery({ filmType: "tv", category: "popular" });

  const featuredMovieId: number = getFilmId(popularMovies?.results[0]);

  const [page, setPage] = useState(1);
  const { data: trendingMovies, isLoading: trendingMoviesIsLoading } =
    useGetTrendingFilmsQuery({ filmType: "movie", page: page });
  const loadMorePage = () => setPage(page + 1);

  return (
    <div className="overflow-y-hidden">
      <FilmHeroSection id={featuredMovieId} />
      <AlignContainer className="py-10 space-y-10">
        <FilmCarousel
          label="Popular Series"
          data={popularSeries?.results}
          isLoading={popularSeriesIsLoading}
        />
        <FilmCarousel
          label="Popular Movies"
          data={popularMovies?.results}
          isLoading={popularMoviesIsLoading}
        />
        <FilmCatalog
          label="Trending Movies"
          data={trendingMovies?.results}
          isLoading={trendingMoviesIsLoading}
          loadMorePage={loadMorePage}
        />
      </AlignContainer>
    </div>
  );
}
