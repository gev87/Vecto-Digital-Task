
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";
import FeaturedVideo from "./components/FeaturedVideo";
import TrendingCarousel from "./components/TrendingCarousel";
import { useState } from "react";
import type { MovieItem } from "./types/interfaces";

function App() {
  const [selected, setSelected] = useState<MovieItem| null>(null);


  const handleMovieSelect = (movie: MovieItem): void => {
    setSelected(movie);

    const recentlySelectedMovies = sessionStorage.getItem("movieIds");
    if (recentlySelectedMovies) {
      const movieIds = JSON.parse(recentlySelectedMovies);
      if (movieIds.includes(movie.Id)) {
        const index = movieIds.indexOf(movie.Id);
        movieIds.splice(index, 1);
      }
      movieIds.unshift(movie.Id);
      sessionStorage.setItem("movieIds", JSON.stringify(movieIds));
    } else {
      sessionStorage.setItem("movieIds", JSON.stringify([movie.Id]));
    }
    
  };
  return (
    <div
      className={styles.appWrapper}
    >
      <Sidebar />
      <FeaturedVideo selectedMovie={selected} />
      <TrendingCarousel onMovieSelect={handleMovieSelect} />
    </div>
  );
}

export default App;
