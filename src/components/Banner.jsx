import { useEffect, useState } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";

export default function Banner() {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.trending);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }

    fetchData();
  }, []);

  return (
    <header
      className="h-[500px] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }}
    >
      <div className="pt-40 px-10 bg-black/50 h-full">
        
        <h1 className="text-5xl font-bold mb-4">
          {movie?.title || movie?.name}
        </h1>

        <p className="max-w-xl text-lg">
          {movie?.overview}
        </p>
      </div>
    </header>
  );
}