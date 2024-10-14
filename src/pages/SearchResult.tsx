import AlignContainer from "@/components/AlignContainer/AlignContainer";
import SearchBar from "@/components/ui/searchBar";
import { useGetSearchFilmQuery } from "@/features/film/filmApi";
import FilmCatalog from "@/features/film/FilmCatalog";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSearchFilmQuery({ page: page, name: name });
  const loadMorePage = () => setPage(page + 1);

  return (
    <>
      <SearchBar />
      <AlignContainer className="py-10 space-y-10">
        <FilmCatalog
          label={`Search Result for "${name}"`}
          data={data?.results}
          isLoading={isLoading}
          loadMorePage={loadMorePage}
        />
      </AlignContainer>
    </>
  );
}
