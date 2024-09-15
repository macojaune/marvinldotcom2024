import React, { useState, useEffect } from "react";
import type { Project } from "../../db/schema";
import ProjectCard from "./ProjectCard";
import ky from "ky";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import PitchPlayer from "./PitchPlayer";

export const VoteResults = () => {
  const { data } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => await ky.post("/api/projects").json(),
  });

  return (
    <div className="">
    <p className="text-l/primary dark:text-d/primary my-2 text-center text-sm" >Merci d'avoir participé !</p>
      <h2 className="mb-4 text-2xl font-bold dark:text-d/primary">
        Classement
      </h2>
      {data
        ?.sort((a, b) => b.votes.length - a.votes.length)
        ?.map((project, index) => (
          <div
            key={`project-result-${index}`}
            className="mb-2 flex flex-row items-center gap-4 py-2 border-b dark:border-d/primary border-l/primary"
          >
            <span className="text-2xl font-bold dark:text-d/primary">
              #{index + 1}
            </span>
            <div className="flex flex-1 flex-row items-stretch justify-between">
              <div>
                <h3 className="text-xl font-bold dark:text-d/primary">
                  {project.title}
                  <span className="ml-2 px-1 font-semibold dark:bg-d/tertiary dark:text-d/secondary">
                    {project.votes.length} votes
                  </span>
                </h3>
                <p className="dark:text-d/primary">{project.description}</p>
              </div>
              <PitchPlayer project={project} isResults />
            </div>
          </div>
        ))}
    </div>
  );
};

const queryClient = new QueryClient();

export const ProjectBracket: React.FC<{ projects: Project[], activeProjectId:number }> = ({
  projects: initialProjects,
  activeProjectId
}) => {
  const [projects, setProjects] = useState(initialProjects);
  const [currentPair, setCurrentPair] = useState([0, 1]);
  const [votingHistory, setVotingHistory] = useState([]);
  const [votingComplete, setVotingComplete] = useState(false);
  const [comparedPairs, setComparedPairs] = useState(new Set());
  const [showResults, toggleResults] = useState(false);

  useEffect(() => {
    if (comparedPairs.size === (projects.length * (projects.length - 1)) / 2 || localStorage.getItem('voteDone')===activeProjectId.toString()) {
      setVotingComplete(true);
      localStorage.setItem("voteDone", activeProjectId.toString())
      toggleResults(true)
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
    localStorage.setItem("voteDone", activeProjectId.toString())
    toggleResults(true)
  };

  // const restartVoting = () => {
  //   const shuffledProjects = shuffleArray([...initialProjects]);
  //   setProjects(shuffledProjects);
  //   setCurrentPair([shuffledProjects[0].id, shuffledProjects[1].id]);
  //   setVotingHistory([]);
  //   setComparedPairs(new Set());
  //   setVotingComplete(false);
  // };

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

   

  const project1 = projects[currentPair[0]];
  const project2 = projects[currentPair[1]];

  return (
    <QueryClientProvider client={queryClient}>
     <>
       {showResults ? (
        <VoteResults />
      ) : (
        <div className="mx-auto my-4">
          <h2 className="mb-2 text-2xl font-bold px-2 w-fit dark:bg-d/secondary dark:text-d/primary text-l/primary">
            Vote pour le prochain projet
          </h2>
          <p className="mb-4 dark:text-d/primary text-l/primary">
            Une fois celui en cours mis en route, on enchaine sur celui que vous aurez
            sélectionné:
          </p>
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between space-x-4">
            <ProjectCard
              project={project1}
              onVote={() => vote(currentPair[0])}
            />
            <div className="my-4 sm:my-0 text-xl font-bold dark:text-d/primary text-l/primary">vs.</div>
            <ProjectCard
              project={project2}
              onVote={() => vote(currentPair[1])}
            />
          </div>
          <p className="text-right text-xs text-l/primary dark:text-d/primary">
            Vote {comparedPairs.size + 1} sur{" "}
            {(projects.length * (projects.length - 1)) / 2}
          </p>
        </div>
      )}
        {!votingComplete&&<div className="w-full flex justify-center">
          <button onClick={() => toggleResults(prev=>!prev)} className=" underline underline-offset-8 hover:no-underline focus-visible:text-l/primary active:text-l/primary dark:text-d/primary text-l/tertiary dark:hover:bg-d/tertiary dark:hover:text-d/secondary dark:focus:text-d/primary dark:focus-visible:text-d/primary dark:active:text-d/primary hover:bg-l/tertiary hover:text-l/bg focus:text-l/primary text-xs">{votingComplete? 'Retour au vote':'Flemme… montre les résultats'}</button>
      </div>}
      </>
    </QueryClientProvider>
  );
};
