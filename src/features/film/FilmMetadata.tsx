type FilmMetadataProps = {
  rating: string | null;
  duration: number | null;
  releasedYear: string | null;
  categories: Array<string>;
};

export default function FilmMetadata({
  categories,
  duration,
  rating,
  releasedYear,
}: FilmMetadataProps) {
  return (
    <div
      aria-label="film metadata"
      className="hidden md:flex items-center text-sm font-semibold gap-x-3.5"
    >
      {rating && (
        <>
          <span className="text-sm material-symbols-outlined">star</span>
          <span aria-label="Rating" className="w-max">{rating}</span>
          <span>&#x2022;</span>
        </>
      )}
      {duration && (
        <>
          <span aria-label="Duration" className="w-max">{duration} mins</span>
          <span>&#x2022;</span>
        </>
      )}
      {releasedYear && (
        <>
          <span aria-label="Release year" className="w-max">{releasedYear}</span>
          <span>&#x2022;</span>
        </>
      )}
      <span
        aria-label="categories"
        className="max-w-80 text-nowrap overflow-clip text-ellipsis"
      >
        {categories?.map((category, index) => {
          if (index === 0) return category;
          return ", " + category;
        })}
      </span>
    </div>
  );
}
