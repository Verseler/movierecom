import Image from "@/components/Image/Image";
import { motion } from "framer-motion";

type FilmPosterProps = {
  imageSrc: string;
};

export default function FilmPoster({ imageSrc }: FilmPosterProps) {
  const src = `${process.env.REACT_APP_TMDB_IMAGE_PATH}${imageSrc}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        className="object-cover w-40 h-56 border rounded shadow-2xl md:w-64 md:h-96 border-neutral-400"
        src={src}
        alt="film poster"
        effect="zoomIn"
      />
    </motion.div>
  );
}
