import AlignContainer from "@/components/AlignContainer/AlignContainer";
import H1 from "@/components/Typography/H1";
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

  const searchResultLabel = `Search Result for "${name}"`;

  return (
    <>
      <SearchBar />
      <AlignContainer className="py-10 space-y-10">
        <H1 className="mt-10 md:mt-0">{searchResultLabel}</H1>
        <FilmCatalog
          label=""
          data={data?.results}
          isLoading={isLoading}
          loadMorePage={loadMorePage}
        />
      </AlignContainer>
    </>
  );
}
