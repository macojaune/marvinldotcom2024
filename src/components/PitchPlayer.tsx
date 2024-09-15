import { type FC, useState, useRef,useEffect } from "react";
import { twMerge } from "tailwind-merge";
import type { Project } from "../../db/schema";

const PitchPlayer: FC<{ project: Project; isResults?: boolean }> = ({
  project,
  isResults = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  // Assume subtitles are in the format: [{ start: number, end: number, text: string }]
  const subtitles = project.transcript || [];
  
   const size = isResults ? 30 : 50;
   useEffect(() => {
       const audio = audioRef.current;
       if (!audio) return;
   
       const updateSubtitle = () => {
         const currentTime = audio.currentTime;
         const subtitle = subtitles.find(
           sub => currentTime >= sub.start && currentTime <= sub.end
         );
         setCurrentSubtitle(subtitle ? subtitle.text : '');
       };
   
       audio.addEventListener('timeupdate', updateSubtitle);
       return () => audio.removeEventListener('timeupdate', updateSubtitle);
     }, [subtitles]);

  
  const togglePlay = () => {
    if (isPlaying) {
      // audioRef.current.pause();
    } else {
      // audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="group flex flex-col items-center gap-1">
      <button
        onClick={togglePlay}
        className="aspect-square rounded-full text-center transition-all group-hover:scale-105 dark:text-d/primary text-l/primary group-hover:text-l/tertiary  group-hover:dark:text-d/tertiary "
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
      </button>
      <span className="text-sm dark:text-d/tertiary text-l/tertiary group-hover:text-l/primary group-hover:dark:text-d/primary">
        {isPlaying ? "Pause" : "Écouter le pitch"}
      </span>
        <div className="mt-2 text-center text-sm">
          {isPlaying &&currentSubtitle}
        </div>
      {project.audioUrl && (
        <audio
          ref={audioRef}
          src={project.audioUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default PitchPlayer;
