import {type FC, useEffect, useRef, useState} from "react";
import {twMerge} from "tailwind-merge";
import type {Project} from "../db/schema";

const PitchPlayer: FC<{
	project: Project; isResults?: boolean; isPlaying: boolean;
	onPlayToggle: () => void; className?: string;
}> = ({
	      project,
	      isResults = false,
	      isPlaying, onPlayToggle, className = ""
      }) => {
	const [subtitles, setSubtitles] = useState(['', '']);
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
			const subtitle = subtitlesData.find(
			  sub => currentTime >= sub.start && currentTime <= sub.end
			);
			const newSubtitle = subtitle ? subtitle.text : '';
			if (newSubtitle !== subtitles[activeIndex]) {
				setSubtitles(prev => {
					const newSubtitles = [...prev];
					newSubtitles[1 - activeIndex] = newSubtitle;
					return newSubtitles;
				});
				setActiveIndex(1 - activeIndex);
			}
		};

		audio.addEventListener('timeupdate', updateSubtitle);
		return () => audio.removeEventListener('timeupdate', updateSubtitle);
	}, [subtitlesData, activeIndex, subtitles]);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current?.play();
		} else {
			audioRef.current?.pause();
		}
	}, [isPlaying]);
	return (
	  <div
		className={twMerge("group flex gap-1 items-center", isResults ? " flex-row w-full h-18 sm:h-24" : "flex-col" +
		  " w-full justify-between", className)}>
		  {isResults &&
			<div className="text-center items-center flex-auto flex w-full h-full text-xs sm:text-sm relative">
				{isPlaying && subtitles.map((subtitle, index) => (
				  <div
					key={index}
					className={`absolute w-full transition-all duration-300 ease-in-out text-l/primary dark:text-d/primary ${
					  index === activeIndex
						? 'opacity-100 transform translate-y-0'
						: 'opacity-0 transform -translate-y-2'
					}`}
				  >
					  {subtitle}
				  </div>
				))}
			</div>}
		  <button
			onClick={onPlayToggle}
			className="flex flex-col flex-1 items-center justify-center aspect-square rounded-full text-center transition-all group-hover:scale-105 dark:text-d/primary text-l/primary group-hover:text-l/tertiary  group-hover:dark:text-d/tertiary"
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
				className={twMerge("text-xs sm:text-sm dark:text-d/tertiary text-l/tertiary" +
				  " group-hover:text-l/primary" +
				  " group-hover:dark:text-d/primary", isResults && "text-nowrap")}>
			  			  {isPlaying ? "Pause" : "Écouter le pitch"}
			  		  </span>
		  </button>
		  {(!isResults && isPlaying) && <div className=" text-center text-sm h-10 sm:h-8 relative w-full">
			  {subtitles.map((subtitle, index) => (
				<div
				  key={index}
				  className={`absolute w-full transition-all duration-300 ease-in-out text-l/primary dark:text-d/primary ${
					index === activeIndex
					  ? 'opacity-100 transform translate-y-0'
					  : 'opacity-0 transform -translate-y-2'
				  }`}
				>
					{subtitle}
				</div>
			  ))}
		  </div>}
		  {project.audioUrl && (
			<audio
			  ref={audioRef}
			  src={project.audioUrl}
			  onEnded={onPlayToggle}
			/>
		  )}
	  </div>
	);
};

export default PitchPlayer;
