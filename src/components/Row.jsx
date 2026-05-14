import { useEffect, useState } from "react";
import axios from "../utils/axios";
import YouTube from "react-youtube";

export default function Row({ title, fetchUrl }) {

  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {

    const res = await axios.get(
      `/movie/${movie.id}/videos?api_key=YOUR_API_KEY`
    );

    if(res.data.results.length > 0){
      setTrailer(res.data.results[0].key);
    }
  };

  return (
    <div className="ml-5 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <div className="flex overflow-x-scroll gap-4 scrollbar-hide">

        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[200px]">

            <img
              onClick={()=>handleClick(movie)}
              className="rounded cursor-pointer hover:scale-105 transition"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />

            <button
              onClick={()=>handleClick(movie)}
              className="bg-red-600 px-4 py-2 mt-2 rounded w-full"
            >
              Watch Now
            </button>
          </div>
        ))}
      </div>

      {trailer && <YouTube videoId={trailer} opts={opts} />}
    </div>
  );
}