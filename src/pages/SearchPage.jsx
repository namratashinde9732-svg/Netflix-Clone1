import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import YouTube from "react-youtube";

export default function SearchPage() {

  const { query } = useParams();

  const [results, setResults] = useState([]);
  const [trailer, setTrailer] = useState("");

  const API_KEY = "3398714664b643ab5c534a9226e1f472";

  useEffect(() => {

    async function fetchSearch() {

      try {

        const response = await axios.get(
          `/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        console.log(response.data.results);

        setResults(response.data.results);

      } catch (error) {
        console.log(error);
      }
    }

    fetchSearch();

  }, [query]);

  const handleTrailer = async (movie) => {

    try {

      const mediaType =
        movie.media_type === "tv" ? "tv" : "movie";

      const response = await axios.get(
        `/${mediaType}/${movie.id}/videos?api_key=${API_KEY}`
      );

      if (response.data.results.length > 0) {
        setTrailer(response.data.results[0].key);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="pt-28 px-8">

        <h1 className="text-4xl font-bold mb-8">
          Search Results for "{query}"
        </h1>

        {results.length === 0 && (
          <h2 className="text-xl text-gray-400">
            No Results Found
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {results
            .filter((movie) => movie.poster_path)
            .map((movie) => (

            <div
              key={movie.id}
              className="hover:scale-105 transition duration-300"
            >

              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
              />

              <h2 className="mt-2 text-center font-semibold">
                {movie.title || movie.name}
              </h2>

              <button
                onClick={() => handleTrailer(movie)}
                className="bg-red-600 hover:bg-red-700 w-full py-2 mt-2 rounded"
              >
                Watch Now
              </button>

            </div>
          ))}
        </div>

        {trailer && (
          <div className="mt-10">

            <YouTube
              videoId={trailer}
              opts={{
                width: "100%",
                height: "500",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />

          </div>
        )}

      </div>
    </div>
  );
}