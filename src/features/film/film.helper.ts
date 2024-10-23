import { Movie, MovieDetails, TvSeries, TvSeriesDetails } from "./film.types";

//return Output: "2024" from "2024-01-01"
export function getYearFromDate(dateString: string): string {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  return year;
}


export function getReleasedDate(filmDetails: MovieDetails | TvSeriesDetails | undefined): string | null {
  if(!filmDetails) {
    return null;
  }
  else if(isMovie(filmDetails)) {
    const releasedDate = getYearFromDate(filmDetails.release_date)
    return releasedDate;
  }
  else if(isTvSeries(filmDetails)) {
    const releasedDate = getYearFromDate(filmDetails.first_air_date)
    return releasedDate;
  }

  return null
}


export function formatDecimals(value: number | undefined | null, limit: number): string | null {
  if(!value) {
    return null;
  }

 return Number(value).toFixed(limit);
}


export function getFilmDuration(filmDetails: MovieDetails | TvSeriesDetails | undefined): number | null {
  if(!filmDetails) {
    return null;
  }

  else if(isMovie(filmDetails)) {
    return filmDetails.runtime
  }

  else if(isTvSeries(filmDetails)) {
    const totalRuntime = filmDetails.episode_run_time.reduce((total, curr) => total + curr, 0);
    return totalRuntime;
  }

  return null
}

export function getFilmName(filmDetails: MovieDetails | TvSeriesDetails | undefined): string {
  if(!filmDetails) {
    return "Not Found"
  }
  else if(isMovie(filmDetails)) {
    return filmDetails.title
  }
  else if(isTvSeries(filmDetails)) {
    return filmDetails.name
  }

  return "Not Found"
}



export function isMovie(film: Movie | MovieDetails | TvSeries | TvSeriesDetails): film is Movie | MovieDetails {
  return (film as Movie).title !== undefined;
}

export function isTvSeries(film: Movie | MovieDetails | TvSeries | TvSeriesDetails): film is TvSeries | TvSeriesDetails {
  return (film as TvSeries).name !== undefined
}


export function getFilmId(film: Movie | MovieDetails | TvSeries | TvSeriesDetails  | undefined): number {
  const fallbackFilmId = 1622; //default fallback id is supernatural film

  if(!film || !film.id) {
    return fallbackFilmId
  }
  else if(typeof film.id === 'object') {
   return fallbackFilmId
  }
  else if(typeof film.id === 'string') {
    return Number(film.id);
  }

  return film.id
}