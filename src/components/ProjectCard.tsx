import { twMerge } from "tailwind-merge"
import type { Project } from "../db/schema"
import { type FC } from "react"
import PitchPlayer from "./PitchPlayer"

const ProjectCard: FC<{
  project: Project
  isCurrent?: boolean
  onVote?: () => void
  className?: string
  isPlaying?: boolean
  onPlayToggle?: () => void
  audioProgress?: number
  updateAudioProgress?: (progress: number) => void
}> = ({
  project,
  onVote = () => {},
  isPlaying = false,
  onPlayToggle = () => {},
  isCurrent = false,
  className = "",
  audioProgress = 0,
  updateAudioProgress = () => {}
}) => {
  if (!project) return null

  return (
    <div
      className={twMerge(
        "my-2 flex w-full flex-col justify-stretch gap-4 border border-l/primary p-4 dark:border-d/primary",
        isCurrent && "w-full sm:mx-auto sm:w-5/6",
        className
      )}
    >
      <div
        className={twMerge(
          "flex items-center justify-between",
          isCurrent ? "flex-row" : "flex-col gap-2"
        )}
      >
        {isCurrent && (
          <>
            <div className='flex flex-col'>
              <h3 className='text-2xl font-semibold text-l/primary dark:text-d/primary md:text-3xl'>
                {project.title}
              </h3>
              <p className='text-base text-l/primary dark:text-d/primary'>
                {project.description}
              </p>
            </div>
            <a
              href={"/projets/" + project.slug}
              className='px-1 py-1 text-sm text-l/tertiary underline underline-offset-8 hover:bg-l/tertiary hover:text-l/bg hover:no-underline focus:text-l/primary focus-visible:text-l/primary active:text-l/primary dark:text-d/primary dark:hover:bg-d/tertiary dark:hover:text-d/secondary dark:focus:text-d/primary dark:focus-visible:text-d/primary dark:active:text-d/primary md:px-2'
            >
              Voir l'avancée
            </a>
          </>
        )}
        {!isCurrent && (
          <>
            <h3 className='mb-2 text-3xl font-semibold dark:text-d/primary'>
              {project.title}
            </h3>
            <p className='text-base dark:text-d/primary'>
              {project.description}
            </p>
            <PitchPlayer
              project={project}
              isPlaying={isPlaying}
              onPlayToggle={onPlayToggle}
              updateAudioProgress={updateAudioProgress}
            />
          </>
        )}
      </div>
      {!isCurrent && (
        <button
          onClick={() => {
            if (onVote) onVote()
          }}
          className='relative mt-auto w-full overflow-hidden rounded border border-l/primary bg-l/primary px-4 py-2 text-l/bg transition-all hover:border-l/tertiary hover:bg-l/tertiary dark:border-d/primary dark:bg-transparent dark:text-d/primary dark:hover:border-d/tertiary dark:hover:bg-d/tertiary'
        >
          <span className='relative z-10'>Voter</span>
          <div
            className='absolute left-0 top-0 h-full bg-l/tertiary transition-all duration-300 ease-in-out dark:bg-d/tertiary'
            style={{ width: `${audioProgress * 100}%` }}
          ></div>
        </button>
      )}
    </div>
  )
}
export default ProjectCard
