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
    const movieDetails = filmDetails as MovieDetails;

    if(!movieDetails.release_date) return null;
    return getYearFromDate(movieDetails.release_date)
  }

  const tvSeriesDetails = filmDetails as TvSeriesDetails
  if(!tvSeriesDetails.first_air_date) return null;
  return getYearFromDate(tvSeriesDetails.first_air_date)
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
    const movieDetails = filmDetails as MovieDetails;
    return movieDetails?.runtime
  }

  const tvSeriesDetails = filmDetails as TvSeriesDetails
  if(tvSeriesDetails?.episode_run_time) return null;
  return tvSeriesDetails.episode_run_time.reduce((acc, curr) => acc + curr, 0);
}

export function getFilmName(filmDetails: MovieDetails | TvSeriesDetails | undefined): string {
 
  if(!filmDetails) {
    return "Not Founda"
  }

  else if(isMovie(filmDetails)) {
    const movieDetails = filmDetails as MovieDetails;

    if(!movieDetails.title) return "Not Foundb"
    return getYearFromDate(movieDetails.title)
  }

  const tvSeriesDetails = filmDetails as TvSeriesDetails
  if(!tvSeriesDetails.name) return "Not Foundc";
  return getYearFromDate(tvSeriesDetails.name)
}



export function isMovie(value: unknown): value is Movie {
  if (!value) {
    return false;
  }
  else if(typeof value === 'object' && 'title' in value && typeof (value as Movie).title === 'string') {
    return true;
  }

  return value.hasOwnProperty("title")
}

export function isTvSeries(value: unknown): value is TvSeries {
  if (!value) {
    return false;
  }
  else if(typeof value === 'object' && 'name' in value && typeof (value as TvSeries).name === 'string') {
    return true;
  }

  return value.hasOwnProperty("name")
}


export function getFilmId(value: unknown): number {
  const fallbackFilmId = 1;

  if(!isMovie(value) && !isTvSeries(value)) {
    return fallbackFilmId;
  }

  const movie = value as Movie;
  if(!movie.id) {
    return fallbackFilmId
  } 
  else if(typeof movie.id === 'object') {
   return fallbackFilmId
  }
  else if(typeof movie.id === 'string') {
    return Number(movie.id);
  }

  return movie.id
}