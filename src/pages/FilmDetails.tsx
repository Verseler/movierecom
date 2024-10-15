import FilmCarousel from "@/features/film/FilmCarousel";
import { useSearchParams, useParams } from "react-router-dom";
import { useGetRelatedFilmsQuery } from "@/features/film/filmApi";
import { FilmType } from "@/features/film/film.types";
import FilmHeroSection from "@/features/film/FilmHeroSection";
import AlignContainer from "@/components/AlignContainer/AlignContainer";
import useInitialScrollPosition from "@/hooks/useInitialScrollPosition";

export default function FilmDetails() {
  const { id } = useParams();
  const filmId: number = Number(id);
  const [searchParams] = useSearchParams();
  const {} = useInitialScrollPosition(); //in first load position of scroll to top
  const filmType: FilmType = (searchParams.get("type") as FilmType) || "movie";

  const { data: similarFilms, isLoading: similarFilmsIsLoading } =
    useGetRelatedFilmsQuery({ id: filmId, filmType, relatedType: "similar" });
  const { data: recommendedFilms, isLoading: recommendedFilmsIsLoading } =
    useGetRelatedFilmsQuery({
      id: filmId,
      filmType,
      relatedType: "recommendations",
    });

  return (
    <>
      <FilmHeroSection id={filmId} disableInfoButton showPoster />
      <AlignContainer className="py-4 space-y-6 md:space-y-10 md:py-10">
        <FilmCarousel
          label="Similar"
          data={similarFilms?.results}
          isLoading={similarFilmsIsLoading}
        />
        <FilmCarousel
          label="Recommended"
          data={recommendedFilms?.results}
          isLoading={recommendedFilmsIsLoading}
        />
      </AlignContainer>
    </>
  );
}
