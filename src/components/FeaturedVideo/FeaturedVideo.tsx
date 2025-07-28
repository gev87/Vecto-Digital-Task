import { useEffect, useMemo, useState, type FC } from "react";
import styles from "./FeaturedVideo.module.css";
import { DB } from "@/database"; 

import { FeaturedCoverImage, FeaturedTitleImage } from "@/assets"; 
import { formatDuration } from "@/utils/helpers.ts";
import ReactPlayer from "react-player";
import type { MovieItem } from "@/types/interfaces";

const featured = DB.Featured;

interface FeaturedVideoProps {
  selectedMovie: MovieItem | null; 
}

const FeaturedVideo: FC<FeaturedVideoProps> = ({ selectedMovie }) => {

  const [playVideo, setPlayVideo] = useState(false);
  

  const movieDetails = useMemo(() => {
    const source = selectedMovie || featured;

    return {
      releaseYear: source.ReleaseYear,
      MPARating: source.MpaRating,
      duration: formatDuration(+source.Duration),
      category: source.Category,
      description: source.Description,
    };
  }, [selectedMovie]);




  useEffect(() => {
    if (selectedMovie) {
      setPlayVideo(false);
      const timeout = setTimeout(() => {
        setPlayVideo(true);
      }, 2000); 
      return () => clearTimeout(timeout);
    }

  }, [selectedMovie]);


  return (
    <section className={styles.featuredSection}>
      <div className={styles.coverWrapper}>
        {playVideo && selectedMovie ? (
          <ReactPlayer
            src={selectedMovie.VideoUrl}
            controls
            playing
            width="100%"
            height="100%"
            onEnded={() => setPlayVideo(false)}
            key={selectedMovie.Id}
          />
        ) : (
          <img
            src={FeaturedCoverImage}
            alt={featured.Title}
            className={styles.coverImage}
          />
        )}
        {/* <div className={styles.overlay} /> */}
      </div>

      <div className={styles.content}>
        <span className={styles.category}> {movieDetails.category}</span>
        {selectedMovie ? (
          <span className={styles.title}>{selectedMovie.Title}</span>
        ) : (
          <img
            src={FeaturedTitleImage}
            alt={featured.Title}
            className={styles.titleImage}
          />
        )}

        <div className={styles.meta}>
          <span> {movieDetails.releaseYear}</span>
          <span>{movieDetails.MPARating}</span>
          <span>{movieDetails.duration}</span>
        </div>

        <p className={styles.description}>{movieDetails.description}</p>

        <div className={styles.buttons}>
          <button className={styles.playButton}>▶ Play</button>
          <button className={styles.infoButton}>More Info</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
