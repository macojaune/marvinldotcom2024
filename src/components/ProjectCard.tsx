import { type FC } from "react"
import { twMerge } from "tailwind-merge"
import type { Project } from "../db/schema"
import PitchPlayer from "./PitchPlayer"

const ProjectCard: FC<{
  project: Project
  label?: string
  onVote?: () => void
  className?: string
  isPlaying?: boolean
  onPlayToggle?: () => void
  audioProgress?: number
  updateAudioProgress?: (progress: number) => void
}> = ({
  project,
  label,
  onVote,
  isPlaying = false,
  onPlayToggle = () => {},
  className = "",
  audioProgress = 0,
  updateAudioProgress = () => {}
}) => {
  if (!project) return null

  return (
    <article
      className={twMerge(
        "flex min-h-full w-full flex-col rounded-xl border border-[#fff4cf]/25 bg-[#fff4cf]/[0.04] p-5 text-[#fff4cf] md:p-7",
        className
      )}
    >
      {label && (
        <p className='font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#dfc59a]'>
          {label}
        </p>
      )}

      <div className='mt-5 lg:min-h-28'>
        <h3 className='font-display text-4xl leading-[0.92] tracking-[-0.03em] md:text-5xl'>
          {project.title}
        </h3>

        {project.description && (
          <p className='mt-4 text-base leading-7 text-[#f0dfb6]'>
            {project.description}
          </p>
        )}
      </div>

      {project.audioUrl && (
        <PitchPlayer
          project={project}
          isPlaying={isPlaying}
          onPlayToggle={onPlayToggle}
          updateAudioProgress={updateAudioProgress}
          className='mt-7 text-[#fff4cf] [&_button]:text-[#fff4cf] [&_span]:text-[#f3bf86]'
        />
      )}

      <button
        type='button'
        onClick={onVote}
        className='relative mt-auto min-h-12 w-full overflow-hidden rounded-full bg-[#df5e37] px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#fff4cf] outline-none transition hover:bg-[#fff4cf] hover:text-[#2a0d3e] focus-visible:ring-2 focus-visible:ring-[#fff4cf] focus-visible:ring-offset-4 focus-visible:ring-offset-[#2a0d3e]'
      >
        <span
          aria-hidden='true'
          className='absolute inset-y-0 left-0 bg-[#f3bf86]/35 transition-[width] duration-300'
          style={{ width: `${audioProgress * 100}%` }}
        />
        <span className='relative'>Voter pour cette idée</span>
      </button>
    </article>
  )
}

export default ProjectCard
