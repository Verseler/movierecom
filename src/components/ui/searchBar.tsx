import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.length > 0) {
      navigate(`/search-result?name=${search}`);
    }
  };

  return (
    <div className="absolute h-10 inset-x-2 md:w-72 md:left-auto top-4 md:top-7 md:right-4">
      <input
        value={search}
        type="text"
        role="search"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.code === "Enter" && handleSearch()}
        className="bg-transparent border size-full rounded-3xl border-neutral-400/40 peer focus:border-neutral-400 disabled:text-neutral-500 pe-10 ps-5 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="absolute material-symbols-outlined right-3 top-2 active:text-primary-500 peer-focus:text-white text-neutral-400 disabled:text-white/50"
      >
        search
      </button>
    </div>
  );
}
