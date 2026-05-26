"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./InitiativeVideo.module.css";

function PlayIcon() {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

export default function InitiativeVideo({ videoId, thumbnail, title }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.embed}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=1`}
          title={`${title} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.thumb}
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 709px"
        className={styles.thumbImage}
      />
      <span className={styles.overlay}>
        <span className={styles.playBtn}>
          <PlayIcon />
        </span>
      </span>
    </button>
  );
}
