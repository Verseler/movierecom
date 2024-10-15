type BelongsToCollection = {
  "id": number,
  "name": string,
  "poster_path": string | null,
  "backdrop_path": string | null
}

type GenreId = number


type Genre = {
  "id": GenreId,
  "name": string
}

type ProductionCompanies = {
  "id": number,
  "logo_path": string | null,
  "name": string,
  "origin_country": string
}

type ProductionCounties = {
  "iso_3166_1": string,
  "name": string
}

type Language = {
  "english_name": string,
  "iso_639_1": string,
  "name": string
}

type Video = 
  {
    "iso_639_1": string,
    "iso_3166_1": string,
    "name": string,
    "key": string,
    "site": string,
    "size": number,
    "type": string,
    "official": boolean,
    "published_at": string,
    "id": string
  }

type Videos = {
  "results": Array<Video>
}

type CreatedByProps = {
  "id": number,
  "created_id": string,
  "name": string,
  "original_name": string,
  "gender": number,
  "profile_path": string | null,
}

export type MovieDetails = {
  "adult": boolean,
  "backdrop_path": string | null,
  "belongs_to_collection": BelongsToCollection,
  "budget": number,
  "genres": Array<Genre>,
  "homepage": string,
  "id": number,
  "imdb_id": string,
  "origin_country": Array<string>,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string | null,
  "production_companies": Array<ProductionCompanies>,
  "production_countries": Array<ProductionCounties>,
  "release_date": string,
  "revenue": number,
  "runtime": number,
  "spoken_languages": Array<Language>,
  "status": string,
  "tagline": string,
  "title": string,
  "video": boolean,
  "videos": Videos,
  "vote_average": number,
  "vote_count": number
}

type SeriesEpisode = {
  "id": number,
  "name": string,
  "overview": string,
  "vote_average": number,
  "vote_count": number,
  "air_date": string,
  "episode_number": number,
  "episode_type": string,
  "production_code": string,
  "runtime": number,
  "season_number": number,
  "show_id": number,
  "still_path": number
}

type SeriesSeason = {
  "air_date": boolean,
    "episode_count": number,
    "id": number,
    "name": string,
    "overview": string,
    "poster_path": string | null,
    "season_number": number,
    "vote_average": number
}

type Network = {
  "id": number,
  "logo_path": string | null,
  "name": string,
  "origin_country": string
}

export type TvSeriesDetails = Omit<MovieDetails, 
"belongs_to_collection" | "budget" | "imdb_id" | "original_title" | 
"release_date" | "revenue" | "runtime" | "video"> & {
  "created_by":  Array<CreatedByProps>,
  "episode_run_time": Array<number>,
  "first_air_date": string,
  "in_production": boolean,
  "languages": Array<string>,
  "last_air_date": string,
  "last_episode_to_air": SeriesEpisode,
  "name": string,
  "next_episode_to_air": SeriesEpisode,
  "networks": Array<Network>,
  "number_of_episodes": number,
  "number_of_seasons": number,
  "original_name": string,
  "seasons": Array<SeriesSeason>,
  "type": string,
}

export type TvSeries = Pick<TvSeriesDetails, 
"adult" | "backdrop_path" | "id" | "origin_country" | "original_name" | 
"original_language" | "overview" | "popularity" | "poster_path" | 
"first_air_date" | "name"> & {
  "genre_ids": Array<GenreId>,
  "vote_average": number,
  "vote_count": number
}

export type Movie = Pick<MovieDetails, 
"adult" | "backdrop_path" | "id" | "origin_country" | "original_title" |
"overview" | "popularity" | "poster_path" | "release_date" | "title" |
"vote_average" | "vote_count"> & {
  "genre_ids": Array<GenreId>,
}

export type TvSeriesSearch = TvSeries & {
  "media_type": string
  "video": boolean
}

export type MovieSearch = Movie & {
  "media_type": string
  "video": boolean
}

export type GetAllApiResponse<T> =  {
  results: Array<T>;
  page: number;
  total_pages: number;
  total_results: number;
}

export type FilmType = "movie" | "tv"

export type Category = "popular" | "top_rated" | "upcoming" | "on_the_air"

export type getFilmsProps = {
  filmType: FilmType;
  category: Category;
  page?: number;
};  

export type getTrendingFilmsProps = Omit<getFilmsProps, "category">;

export type getFilmDetailsProps = {
  id: number;
  filmType: FilmType;
};

export type getFilmProps = getFilmDetailsProps & {
  page?: number;
}

export type getRelatedFilmsProps = getFilmProps & {
  relatedType: "similar" | "recommendations";
}

export type getSearchFilmProps = {
  name: string;
  page?: number;
}
