import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { 
  getFilmDetailsProps, 
  getFilmProps, 
  getFilmsProps, 
  getRelatedFilmsProps, 
  GetAllApiResponse,
  MovieDetails,
  TvSeriesDetails,
  getSearchFilmProps,
  MovieSearch,
  TvSeriesSearch,
  Movie,
  TvSeries,
  getTrendingFilmsProps
} from "./film.types";

export const filmApi = createApi({
  reducerPath: "films",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TMDB_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilms: builder.query<GetAllApiResponse<Movie | TvSeries>, getFilmsProps>({
      query: ({ filmType, category, page = 1 }) =>
        `${filmType}/${category}?language=en-US&page=${page}`,
    }),
    getFilm: builder.query<GetAllApiResponse<Movie | TvSeries>, getFilmProps>({
      query: ({ id, filmType, page = 1 }) => `${filmType}/${id}/similar?language=en-US&page=${page}`,
    }),
    getFilmDetails: builder.query<MovieDetails | TvSeriesDetails, getFilmDetailsProps>({
      query: ({ id, filmType }) => `${filmType}/${id}?append_to_response=videos,language=en-US`,
    }),
    getRelatedFilms: builder.query<GetAllApiResponse<Movie | TvSeries>, getRelatedFilmsProps>({
      query: ({ id, filmType, relatedType, page = 1 }: getRelatedFilmsProps) => `${filmType}/${id}/${relatedType}?language=en-US&page=${page}`,
    }),


    getTrendingFilms: builder.query<GetAllApiResponse<Movie | TvSeries>, getTrendingFilmsProps>({
      query: ({filmType, page = 1}) => `trending/${filmType}/week?language=en-US&page=${page}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        //so that every request has a unique cache key
        return `${endpointName}-${queryArgs.filmType}`;
      },
      merge: (currentCache, newItems) => {
          //to prevent items duplication
          const existingIds = new Set(currentCache.results.map(item => item.id)); 
          const filteredNewItems = newItems.results.filter(item => !existingIds.has(item.id)); 
          
          currentCache.results.push(...filteredNewItems); 
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),

    getSearchFilm: builder.query<GetAllApiResponse<MovieSearch | TvSeriesSearch>, getSearchFilmProps>({
      query: ({ name, page = 1 }) => `search/multi?language=en-US&query=${name}&page=${page}&include_adult=false`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        //so that every request has a unique cache key
        return `${endpointName}-${queryArgs.name}`;
      },
      merge: (currentCache, newItems) => {
        //to prevent items duplication
        const existingIds = new Set(currentCache.results.map(item => item.id)); 
        const filteredNewItems = newItems.results.filter(item => !existingIds.has(item.id)); 
        
        currentCache.results.push(...filteredNewItems); 
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      transformResponse: (response: unknown) => {
        //to filter out person type so that we only get movies and tv series
        const results = (response as GetAllApiResponse<MovieSearch | TvSeriesSearch>).results.filter(item => item.media_type !== 'person');
        return {
          results,
          page: (response as GetAllApiResponse<MovieSearch | TvSeriesSearch>).page,
          total_pages: (response as GetAllApiResponse<MovieSearch | TvSeriesSearch>).total_pages,
          total_results: (response as GetAllApiResponse<MovieSearch | TvSeriesSearch>).total_results,
        } as GetAllApiResponse<MovieSearch | TvSeriesSearch>;
      }
    })
  }),
});

export const {
  useGetTrendingFilmsQuery,
  useGetFilmsQuery,
  useGetFilmQuery,
  useGetFilmDetailsQuery,
  useGetRelatedFilmsQuery,
  useGetSearchFilmQuery
} = filmApi;



