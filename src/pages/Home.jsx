import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import requests from "../utils/requests";

export default function Home() {

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <Banner />

      <Row title="Trending Now" fetchUrl={requests.trending} />

      <Row title="Top Rated" fetchUrl={requests.topRated} />

      <Row title="Action Movies" fetchUrl={requests.actionMovies} />

      <Row title="Comedy Movies" fetchUrl={requests.comedyMovies} />

      <Row title="Horror Movies" fetchUrl={requests.horrorMovies} />

      <Row title="Romance Movies" fetchUrl={requests.romanceMovies} />

    </div>
  );
}