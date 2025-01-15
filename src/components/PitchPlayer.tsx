import { type FC, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { Project } from "../db/schema";

const PitchPlayer: FC<{
  project: Project;
  isResults?: boolean;
  isPlaying: boolean;
  onPlayToggle: () => void;
  className?: string;
  updateAudioProgress: (progress: number) => void;
}> = ({
  project,
  isResults = false,
  isPlaying,
  onPlayToggle,
  updateAudioProgress,
  className = "",
}) => {
  const [subtitles, setSubtitles] = useState(["", ""]);
  const [activeIndex, setActiveIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  // Assume subtitles are in the format: [{ start: number, end: number, text: string }]
  const subtitlesData = project?.transcript?.segments || [];

  const size = isResults ? 30 : 50;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateSubtitle = () => {
      const currentTime = audio.currentTime;
      //update audio progress
      const progress = currentTime / audio.duration;
      updateAudioProgress(progress);

      const subtitle = subtitlesData.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end,
      );
      const newSubtitle = subtitle ? subtitle.text : "";
      if (newSubtitle !== subtitles[activeIndex]) {
        setSubtitles((prev) => {
          const newSubtitles = [...prev];
          newSubtitles[1 - activeIndex] = newSubtitle;
          return newSubtitles;
        });
        setActiveIndex(1 - activeIndex);
      }
    };

    audio.addEventListener("timeupdate", updateSubtitle);
    return () => audio.removeEventListener("timeupdate", updateSubtitle);
  }, [subtitlesData, activeIndex, subtitles]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      // audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);
  return (
    <div
      className={twMerge(
        "group flex items-center gap-1",
        isResults
          ? " h-18 w-full flex-row sm:h-24"
          : "flex-col" + " w-full justify-between",
        className,
      )}
    >
      {isResults && (
        <div className="relative flex h-full w-full flex-auto items-center text-center text-xs sm:text-sm">
          {isPlaying &&
            subtitles.map((subtitle, index) => (
              <div
                key={index}
                className={`absolute w-full text-l/primary transition-all duration-300 ease-in-out dark:text-d/primary  ${
                  index === activeIndex
                    ? "translate-y-0 transform opacity-100"
                    : "-translate-y-2 transform opacity-0"
                }`}
              >
                {subtitle}
              </div>
            ))}
        </div>
      )}
      <button
        onClick={onPlayToggle}
        className="flex aspect-square flex-1 flex-col items-center justify-center rounded-full text-center text-l/primary transition-all group-hover:scale-105 group-hover:text-l/tertiary dark:text-d/primary  group-hover:dark:text-d/tertiary"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="group-hover:scale-110"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 6h4v12H6V6Zm8 0h4v12h-4V6Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="group-hover:scale-110"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z"
            />
          </svg>
        )}
        <span
          className={twMerge(
            "text-xs text-l/tertiary dark:text-d/tertiary sm:text-sm" +
              " group-hover:text-l/primary" +
              " group-hover:dark:text-d/primary",
            isResults && "text-nowrap",
          )}
        >
          {isPlaying ? "Pause" : "Écouter le pitch"}
        </span>
      </button>
      {!isResults && isPlaying && (
        <div className="relative w-full text-center text-sm min-h-[4rem] my-2">
          {subtitles.map((subtitle, index) => (
            <div
              key={index}
              className={`absolute w-full text-l/primary transition-all duration-300 ease-in-out dark:text-d/primary overflow-auto ${
                index === activeIndex
                  ? "translate-y-0 transform opacity-100"
                  : "-translate-y-2 transform opacity-0"
              }`}
            >
              {subtitle}
            </div>
          ))}
        </div>
      )}
      {project.audioUrl && (
        <audio ref={audioRef} src={project.audioUrl} onEnded={onPlayToggle} />
      )}
    </div>
  );
};

export default PitchPlayer;
