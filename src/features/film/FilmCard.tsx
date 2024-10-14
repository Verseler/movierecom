import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FilmType } from "./film.types";
import Image from "@/components/Image/Image";
import { cn } from "@/lib/utils";
import BottomShadowOverlay from "@/components/ui/BottomShadowOverlay";

type FilmCardProps = {
  id: string | number;
  imageSrc: string | null;
  title: string;
  type: FilmType;
  className?: React.HTMLProps<HTMLDivElement>["className"];
};

export default function FilmCard({
  id,
  imageSrc,
  title,
  type,
  className,
}: FilmCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/${id}?type=${type}`)}
      className={cn(
        "border-none cursor-pointer h-72 aspect-[3/5] overflow-hidden",
        className
      )}
    >
      <CardContent aria-label="film card" className="relative p-0 size-full">
        <Image
          className="object-cover size-full hover:scale-110"
          src={`${process.env.REACT_APP_TMDB_IMAGE_PATH}${imageSrc}`}
          alt="film poster"
          effect="zoomIn"
        />
        <BottomShadowOverlay />
        <span aria-label="title" className="absolute bottom-1.5 left-2">
          {title}
        </span>
      </CardContent>
    </Card>
  );
}
