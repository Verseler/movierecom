import AlignContainer from "@/components/AlignContainer/AlignContainer";
import {
  useGetFilmsQuery,
  useGetTrendingFilmsQuery,
} from "@/features/film/filmApi";
import FilmCarousel from "@/features/film/FilmCarousel";
import FilmCatalog from "@/features/film/FilmCatalog";
import { useState } from "react";

export default function TvShows() {
  const { data: topRatedSeries, isLoading: topRatedSeriesIsLoading } =
    useGetFilmsQuery({ filmType: "tv", category: "top_rated" });
  const { data: onTheAirSeries, isLoading: onTheAirSeriesIsLoading } =
    useGetFilmsQuery({ filmType: "tv", category: "on_the_air" });

  const [page, setPage] = useState(1);
  const { data: trendingSeries, isLoading: trendingSeriesIsLoading } =
    useGetTrendingFilmsQuery({ filmType: "tv", page: page });
  const loadMorePage = () => setPage(page + 1);

  return (
    <AlignContainer className="py-10 space-y-10">
      <FilmCarousel
        label="Top Rated"
        data={topRatedSeries?.results}
        isLoading={topRatedSeriesIsLoading}
      />
      <FilmCarousel
        label="On The Air"
        data={onTheAirSeries?.results}
        isLoading={onTheAirSeriesIsLoading}
      />
      <FilmCatalog
        label="Trending"
        data={trendingSeries?.results}
        isLoading={trendingSeriesIsLoading}
        loadMorePage={loadMorePage}
      />
    </AlignContainer>
  );
}
