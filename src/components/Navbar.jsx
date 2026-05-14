import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if(query.trim()){
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full flex justify-between items-center px-8 py-4 bg-black">
      
      <h1 className="text-red-600 text-3xl font-bold">
        NETFLIX
      </h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 outline-none"
        />
      </form>
    </div>
  );
}