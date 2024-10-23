import H2 from "@/components/Typography/H2";
import FilmCard from "./FilmCard";
import { Movie, MovieSearch, TvSeries, TvSeriesSearch } from "./film.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type FilmCatalogProps = {
  label: string;
  isLoading: boolean;
  data: Array<Movie | TvSeries | MovieSearch | TvSeriesSearch> | undefined;
  loadMorePage?: () => void;
};

export default function FilmCatalog({
  label,
  data,
  isLoading,
  loadMorePage,
}: FilmCatalogProps) {
  const catalogItemsEmptyPlaceholder = Array.from({ length: 20 }).map(
    (_, index) => <Skeleton key={index} className="w-full h-72" />
  );

  const catalogItems = data?.map((film) => {
    //movie has title while tv has name prop in the fetched data
    const filmType = film.hasOwnProperty("title") ? "movie" : "tv";

    const title =
      filmType === "movie" ? (film as Movie).title : (film as TvSeries).name;

    return (
      <FilmCard
        key={film.id}
        id={film.id}
        imageSrc={film.poster_path}
        title={title}
        type={filmType}
        className="aspect-auto"
      />
    );
  });

  return (
    <div className="w-full space-y-4 pe-2 md:pe-4">
      <H2 aria-label="section title">{isLoading ? <Skeleton /> : label}</H2>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 3xl:grid-cols-10s">
        {isLoading ? catalogItemsEmptyPlaceholder : catalogItems}
      </div>

      {loadMorePage && (
        <div className="flex items-center justify-center pt-10">
          <Button onClick={loadMorePage} disabled={isLoading}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
