import React, { useEffect, useState } from "react";
import type { Project } from "../db/schema";
import ProjectCard from "./ProjectCard";
import ky from "ky";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import PitchPlayer from "./PitchPlayer";

export const VoteResults = ({
  isPlaying,
  onPlayToggle,
}: {
  isPlaying: number | null;
  onPlayToggle: (index: number) => void;
}) => {
  const { data } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => await ky.post("/api/projects").json(),
  });

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold dark:text-d/primary">
        Classement
      </h2>
      {data
        ?.sort((a, b) => b.votes.length - a.votes.length)
        ?.map((project, index) => {
          const rootIndex = data.findIndex((p) => p.id === project.id);
          return (
            <div
              key={`project-result-${index}`}
              className="mb-2 flex flex-row flex-wrap items-center gap-4 border-b border-l/primary py-2 dark:border-d/primary"
            >
              <div className="text-2xl font-bold dark:text-d/primary">
                #{index + 1}
              </div>
              <div className="flex flex-col">
                <h3 className="text-nowrap text-xl font-bold dark:text-d/primary">
                  {project.title}
                  <span className="ml-2 px-1 font-semibold dark:bg-d/tertiary dark:text-d/secondary">
                    {project.votes.length} votes
                  </span>
                </h3>
                <p className="text-base dark:text-d/primary">
                  {project.description}
                </p>
              </div>
              <PitchPlayer
                project={project}
                isPlaying={isPlaying === rootIndex}
                onPlayToggle={() => onPlayToggle(rootIndex)}
                isResults
              />
            </div>
          );
        })}
    </div>
  );
};

const queryClient = new QueryClient();

export const ProjectBracket: React.FC<{
  projects: Project[];
  activeProjectId: number;
}> = ({ projects: initialProjects, activeProjectId }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [currentPair, setCurrentPair] = useState([0, 1]);
  const [votingHistory, setVotingHistory] = useState([]);
  const [votingComplete, setVotingComplete] = useState(false);
  const [comparedPairs, setComparedPairs] = useState(new Set());
  const [showResults, toggleResults] = useState(false);
  const [playingProject, setPlayingProject] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    if (
      comparedPairs.size === (projects.length * (projects.length - 1)) / 2 ||
      localStorage.getItem("voteDone") === activeProjectId.toString()
    ) {
      setVotingComplete(true);
      localStorage.setItem("voteDone", activeProjectId.toString());
      toggleResults(true);
    }
  }, [comparedPairs, projects?.length]);

  const vote = async (index: number) => {
    try {
      await ky.post(`/api/votes/${projects[index].id}`);
      setVotingHistory([...votingHistory, index]);
      moveToNextPair(index);
    } catch (e) {
      console.error(e.message);
    }
  };

  const moveToNextPair = (currentIndex: number) => {
    let nextIndex = (currentIndex + 1) % projects.length;

    while (nextIndex !== currentIndex) {
      const pairKey = [currentIndex, nextIndex].sort().join("-");
      if (!comparedPairs.has(pairKey)) {
        setCurrentPair([currentIndex, nextIndex]);
        setComparedPairs(new Set(comparedPairs).add(pairKey));
        return;
      }
      nextIndex = (nextIndex + 1) % projects.length;
    }

    // If we've reached here, all pairs with the selected project have been compared
    setVotingComplete(true);
    localStorage.setItem("voteDone", activeProjectId.toString());
    toggleResults(true);
  };
  const handlePlayToggle = (projectIndex: number) => {
    setPlayingProject((prev) => (prev === projectIndex ? null : projectIndex));
    setAudioProgress(0); // Reset progress when toggling
  };

  const updateAudioProgress = (progress: number) => {
    setAudioProgress(progress);
  };
  const project1 = projects[currentPair[0]];
  const project2 = projects[currentPair[1]];

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {showResults ? (
          <VoteResults
            isPlaying={playingProject}
            onPlayToggle={handlePlayToggle}
          />
        ) : (
          <div className="mx-auto my-4">
            <h2 className="my-2 w-fit px-2 text-2xl font-bold text-l/primary dark:bg-d/secondary dark:text-d/primary">
              Vote pour le prochain projet
            </h2>
            <p className="mb-8 text-l/primary dark:text-d/primary">
              Une fois celui en cours mis en route, on enchaine sur celui que
              vous aurez sélectionné:
            </p>
            <div className="mb-8 flex flex-col items-stretch justify-between sm:flex-row sm:space-x-4">
              <ProjectCard
                project={project1}
                onVote={() => vote(currentPair[0])}
                isPlaying={playingProject === currentPair[0]}
                onPlayToggle={() => handlePlayToggle(currentPair[0])}
                audioProgress={
                  playingProject === currentPair[0] ? audioProgress : 0
                }
                updateAudioProgress={updateAudioProgress}
              />
              <div className="my-4 self-center text-xl font-bold text-l/primary dark:text-d/primary sm:my-0">
                vs.
              </div>
              <ProjectCard
                project={project2}
                onVote={() => vote(currentPair[1])}
                isPlaying={playingProject === currentPair[1]}
                onPlayToggle={() => handlePlayToggle(currentPair[1])}
                audioProgress={
                  playingProject === currentPair[1] ? audioProgress : 0
                }
                updateAudioProgress={updateAudioProgress}
              />
            </div>
            <p className="text-right text-xs text-l/primary dark:text-d/primary">
              Vote {comparedPairs.size + 1} sur{" "}
              {(projects.length * (projects.length - 1)) / 2}
            </p>
          </div>
        )}
        {!votingComplete &&(<div className="flex w-full justify-center">
          <button
            onClick={() => toggleResults((prev) => !prev)}
            className=" text-xs text-l/tertiary underline underline-offset-8 hover:bg-l/tertiary hover:text-l/bg hover:no-underline focus:text-l/primary focus-visible:text-l/primary active:text-l/primary dark:text-d/primary dark:hover:bg-d/tertiary dark:hover:text-d/secondary dark:focus:text-d/primary dark:focus-visible:text-d/primary dark:active:text-d/primary"
          >
            {showResults ? "Retour au vote" : "Flemme… montre les résultats"}
          </button>
        </div>)}
      </>
    </QueryClientProvider>
  );
};
