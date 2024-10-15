import Title from "@/components/Typography/Title";
import { Button } from "@/components/ui/button";
import FilmMetadata from "./FilmMetadata";
import { useNavigate, useSearchParams } from "react-router-dom";
import AlignContainer from "@/components/AlignContainer/AlignContainer";
import FilmPoster from "./FilmPoster";
import { useGetFilmDetailsQuery } from "./filmApi";
import {
  getReleasedDate,
  formatDecimals,
  getFilmDuration,
  getFilmName,
  getFilmId,
} from "./film.helper";
import { FilmType } from "./film.types";
import { Skeleton } from "@/components/ui/skeleton";
import ReadMore from "@/components/ReadMore/ReadMore";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "@/components/ui/searchBar";
import { motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

type FilmHeroSectionProps = {
  disableInfoButton?: boolean;
  id: number;
  showPoster?: boolean;
};

export default function FilmHeroSection({
  id: featuredFilmId,
  disableInfoButton = false,
  showPoster = false,
}: FilmHeroSectionProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filmType: FilmType = (searchParams.get("type") as FilmType) || "movie";
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const {
    data: filmDetails,
    isLoading,
    isError,
  } = useGetFilmDetailsQuery({
    id: featuredFilmId,
    filmType: filmType,
  });

  if (isLoading) {
    return <Skeleton className="h-[65vh] md:h-screen" />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center font-bold h-[65vh] md:h-screen text-neutral-300 bg-black">
        Not Found
      </div>
    );
  }

  const id: number = getFilmId(filmDetails);
  const releasedYear: string | null = getReleasedDate(filmDetails);
  const rating: string | null = formatDecimals(filmDetails?.vote_average, 1);
  const duration: number | null = getFilmDuration(filmDetails);
  const posterImageSrc: string = filmDetails?.poster_path || "";
  const title: string = getFilmName(filmDetails);
  const categories: Array<string> =
    filmDetails?.genres.map((genre) => genre.name) || [];
  const imageSrc: string = filmDetails?.backdrop_path
    ? `${process.env.REACT_APP_TMDB_IMAGE_PATH}${filmDetails?.backdrop_path}`
    : "";
  const trailerVideoSrc: string = filmDetails?.videos?.results[0]?.key || "";

  const heroBackgroundStyle = {
    backgroundImage: `
          linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),
          url('${imageSrc}')`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    boxShadow: "80px -20px 180px rgba(0,0,0,0.6) inset",
  };

  return (
    <div
      className="relative flex items-end md:items-center p-2 h-[60vh] md:h-screen text-neutral-300"
      style={heroBackgroundStyle}
    >
      <SearchBar />
      <AlignContainer className="w-full ms-0">
        <div className="flex flex-col-reverse items-center ms-0 md:flex-row">
          <div
            aria-label="film hero section"
            className="space-y-4 w-full md:max-w-[70vh]"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Title
                aria-label="film title"
                className="text-center md:text-start"
              >
                {title}
              </Title>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FilmMetadata
                rating={rating}
                duration={duration}
                releasedYear={releasedYear}
                categories={categories}
              />
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <ReadMore
                aria-label="film description"
                text={filmDetails?.overview}
                id={id}
                className="hidden md:block"
              />
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: isMobileScreen ? 0.2 : 0.6 }}
              className="flex items-center justify-center pb-2 md:justify-normal md:pb-0 md:pt-6 gap-x-3"
            >
              <Dialog>
                <DialogTrigger
                  aria-label="watch trailer button"
                  className="flex items-center justify-center w-full px-6 py-2 rounded-3xl gap-x-2 md:w-auto bg-primary-500 hover:bg-primary-500/85"
                >
                  <span
                    aria-hidden
                    className="text-sm material-symbols-outlined"
                  >
                    play_arrow
                  </span>
                  <span>Watch</span>
                </DialogTrigger>

                <DialogContent className="p-0 max-w-max">
                  <VideoPlayer
                    url={`https://www.youtube.com/embed/${trailerVideoSrc}`}
                  />
                </DialogContent>
              </Dialog>

              {disableInfoButton != true && (
                <Button
                  onClick={() => navigate(`${id}`)}
                  aria-label="more info button"
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  More Info
                </Button>
              )}
            </motion.div>
          </div>

          <div className="flex justify-center w-full mb-4 md:mb-0">
            {posterImageSrc && showPoster && (
              <FilmPoster imageSrc={posterImageSrc} />
            )}
          </div>
        </div>
      </AlignContainer>
    </div>
  );
}
