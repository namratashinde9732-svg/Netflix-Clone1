import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import YouTube from "react-youtube";

export default function SearchPage() {

  const { query } = useParams();

  const [results, setResults] = useState([]);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {

    async function searchMovie() {

      const res = await axios.get(
        `/search/multi?api_key=YOUR_API_KEY&query=${query}`
      );

      setResults(res.data.results);
    }

    searchMovie();

  }, [query]);

  const handleTrailer = async(movie) => {

    const mediaType = movie.media_type || "movie";

    const res = await axios.get(
      `/${mediaType}/${movie.id}/videos?api_key=YOUR_API_KEY`
    );

    if(res.data.results.length > 0){
      setTrailer(res.data.results[0].key);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="pt-28 px-10">

        <h1 className="text-4xl mb-8">
          Search Results
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {results.map((movie)=>(

            <div key={movie.id}>

              <img
                className="rounded"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />

              <h2 className="mt-2">
                {movie.title || movie.name}
              </h2>

              <button
                onClick={()=>handleTrailer(movie)}
                className="bg-red-600 px-4 py-2 mt-2 rounded w-full"
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