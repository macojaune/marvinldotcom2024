import { twMerge } from "tailwind-merge";
import type { Project } from "../../db/schema";
import { type FC, useState, useRef } from "react";
import PitchPlayer from "./PitchPlayer";

const ProjectCard: FC<{
  project: Project;
  isCurrent?: boolean;
  onVote?: () => void;
  className?: string
}> = ({ project, onVote, isCurrent = false, className }) => {
  if (!project) return null;
  return (
    <div
      className={twMerge(
        "w-full my-2 flex flex-col gap-4 border border-l/primary dark:border-d/primary p-4",
        isCurrent && "w-full sm:w-5/6 sm:mx-auto",
        className
      )}
    >
      <div
        className={twMerge(
          "flex items-center",
          isCurrent ? "flex-row justify-between" : "flex-col ",
        )}
      >
        {isCurrent && (
          <>
            <div className="flex flex-col">
              <h3 className="text-3xl font-semibold dark:text-d/primary text-l/primary">
                {project.title}
              </h3>
              <p className="text-base text-l/primary dark:text-d/primary">
                {project.description}
              </p>
            </div>
            <a
              href={"/projets/" + project.slug}
              className="px-2 py-1 text-sm underline underline-offset-8 hover:no-underline focus-visible:text-l/primary active:text-l/primary dark:text-d/primary text-l/tertiary dark:hover:bg-d/tertiary dark:hover:text-d/secondary dark:focus:text-d/primary dark:focus-visible:text-d/primary dark:active:text-d/primary hover:bg-l/tertiary hover:text-l/bg focus:text-l/primary"
            >
              Voir l'avancée
            </a>
          </>
        )}
        {!isCurrent && (
          <>
            <h3 className="mb-2 text-3xl font-semibold dark:text-d/primary">
              {project.title}
            </h3>
              <p className="text-base dark:text-d/primary">
                {project.description}
              </p>
            <PitchPlayer project={project} />
          </>
        )}
      </div>
      {!isCurrent && (
        <button
          onClick={() => {
            if (onVote) onVote();
          }}
          className="mt-2 rounded border border-l/primary dark:border-d/primary px-4 py-2 text-white transition-all dark:hover:border-d/tertiary dark:hover:bg-d/tertiary hover:border-l/tertiary hover:bg-l/tertiary bg-l/primary dark:bg-transparent"
        >
          Voter
        </button>
      )}
    </div>
  );
};
export default ProjectCard;
