import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {

    e.preventDefault();

    if(query.trim() !== ""){

      navigate(`/search/${query}`);

      setQuery("");
    }
  };

  return (
    <div className="fixed top-0 w-full bg-black flex justify-between items-center px-8 py-4 z-50">

      <h1 className="text-red-600 text-3xl font-bold">
        NETFLIX
      </h1>

      <form onSubmit={handleSearch}>

        <input
          type="text"
          placeholder="Search Movies or Series..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 outline-none w-[300px]"
        />

      </form>

    </div>
  );
}