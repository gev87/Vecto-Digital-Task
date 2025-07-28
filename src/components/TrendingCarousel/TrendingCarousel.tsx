import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./TrendingCarousel.module.css";
import { DB } from "@/database";
import type { MovieItem } from "@/types/interfaces";
import { SWIPER_BREAKPOINTS } from "./contants";
import MovieCard from "../MovieCard";

interface TrendingCarouselProps {
  onMovieSelect: (movie: MovieItem) => void;
}

const TrendingCarousel: FC<TrendingCarouselProps> = ({ onMovieSelect }) => {
  const recentlyStoredMovieIds = sessionStorage.getItem("movieIds");
  const { TendingNow: trending } = DB;

  let trendingMovies: MovieItem[] = [];
  const lastSelectedMovies: MovieItem[] = [];
  if (recentlyStoredMovieIds) {
    const recentlySelectedMovieIds = JSON.parse(recentlyStoredMovieIds);
    const otherMovies = trending
      .filter((movie) => {
        if (recentlySelectedMovieIds.includes(movie.Id)) {
          const index = recentlySelectedMovieIds.indexOf(movie.Id);
          lastSelectedMovies[index] = movie;
          return false;
        } else return true;
      })
      .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

    trendingMovies = [...lastSelectedMovies, ...otherMovies];
  } else {
    trendingMovies = [...trending].sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
    );
  }

  return (
    <div className={styles.carouselWrapper}>
      <h2 className={styles.heading}>Trending Now</h2>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={20}
        navigation
        scrollbar={{ draggable: true }}
        breakpoints={SWIPER_BREAKPOINTS}
      >
        {trendingMovies.slice(0, 50).map((movie) => (
          <SwiperSlide key={movie.Id}>
            <MovieCard movie={movie} onClick={onMovieSelect} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
