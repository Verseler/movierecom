import FilmHeroSection from "@/features/film/FilmHeroSection";
import FilmCarousel from "@/features/film/FilmCarousel";
import { useGetFilmsQuery } from "@/features/film/filmApi";
import { getFilmId } from "@/features/film/film.helper";
import AlignContainer from "@/components/AlignContainer/AlignContainer";

export default function Home() {
  const { data: popularMovies, isLoading: popularMoviesIsLoading } =
    useGetFilmsQuery({ filmType: "movie", category: "popular" });
  const { data: popularSeries, isLoading: popularSeriesIsLoading } =
    useGetFilmsQuery({ filmType: "tv", category: "popular" });

  const featuredMovieId: number = getFilmId(popularMovies?.results[0]);

  return (
    <div className="overflow-y-hidden">
      <FilmHeroSection id={featuredMovieId} />
      <AlignContainer className="py-10 space-y-10">
        <FilmCarousel
          label="Popular Movies"
          data={popularMovies?.results}
          isLoading={popularMoviesIsLoading}
        />
        <FilmCarousel
          label="Popular Series"
          data={popularSeries?.results}
          isLoading={popularSeriesIsLoading}
        />
      </AlignContainer>
    </div>
  );
}
