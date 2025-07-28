import type { FC } from "react";
import type { MovieItem } from "@/types/interfaces";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: MovieItem;
  onClick: (movie: MovieItem) => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => onClick(movie)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(movie);
        }
      }}
    >
      <img
        src={`/images/${movie.CoverImage}`}
        alt={movie.Title}
        className={styles.cover}
      />
    </div>
  );
};

export default MovieCard;
