import H2 from "@/components/Typography/H2";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FilmCard from "./FilmCard";
import { Movie, TvSeries } from "./film.types";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "usehooks-ts";

type FilmCarouselProps = {
  label: string;
  isLoading: boolean;
  data: Array<Movie | TvSeries> | undefined;
};

export default function FilmCarousel({
  label,
  data,
  isLoading,
}: FilmCarouselProps) {
  const isDesktopScreen = useMediaQuery("(min-width: 768px)");

  if (!data || data.length === 0) return;

  const carouselItemsEmptyPlaceholder = Array.from({ length: 20 }).map(
    (_, index) => <Skeleton key={index} className="h-72 aspect-[3/5]" />
  );

  const carouselItems = data?.map((film) => {
    //movie has title while tv has name prop in the fetched data
    const filmType = film.hasOwnProperty("title") ? "movie" : "tv";

    const title =
      filmType === "movie" ? (film as Movie).title : (film as TvSeries).name;

    return (
      <CarouselItem
        key={film.id}
        aria-label="carousel film item"
        className="p-0 max-w-max"
      >
        <FilmCard
          id={film.id}
          imageSrc={film.poster_path}
          title={title}
          type={filmType}
        />
      </CarouselItem>
    );
  });

  return (
    <div className="space-y-4">
      <H2 aria-label="section title">{label}</H2>
      <Carousel opts={{ align: "start", slidesToScroll: 2 }}>
        <CarouselContent className="px-4 gap-x-1.5">
          {isLoading ? carouselItemsEmptyPlaceholder : carouselItems}
        </CarouselContent>
        {isDesktopScreen && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
    </div>
  );
}
