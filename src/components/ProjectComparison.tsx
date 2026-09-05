import { useMemo, useState, useSyncExternalStore } from "react"
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query"
import ky from "ky"
import type { Project } from "../db/schema"
import PitchPlayer from "./PitchPlayer"
import ProjectCard from "./ProjectCard"

const VoteResults = ({
  isPlaying,
  onPlayToggle,
  updateAudioProgress
}: {
  isPlaying: number | null
  onPlayToggle: (index: number) => void
  updateAudioProgress: (progress: number) => void
}) => {
  const { data } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => await ky.post("/api/projects").json()
  })
  const sortedProjects = useMemo(
    () => (data ?? []).toSorted((a, b) => b.votes.length - a.votes.length),
    [data]
  )

  return (
    <div>
      <div className='max-w-3xl'>
        <p className='font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#f3bf86]'>
          Résultats
        </p>
        <h2 className='mt-4 font-display text-5xl leading-[0.9] tracking-[-0.04em] md:text-7xl'>
          Classement actuel.
        </h2>
      </div>

      <div className='mt-10 grid gap-3'>
        {sortedProjects.map((project, index) => {
          const rootIndex =
            data?.findIndex((item) => item.id === project.id) ?? 0

          return (
            <article
              key={project.id}
              className='grid gap-4 border-t border-[#fff4cf]/20 py-6 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-center'
            >
              <p className='font-display text-4xl text-[#f3bf86]'>
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className='font-display text-3xl leading-none md:text-4xl'>
                  {project.title}
                </h3>
                {project.description && (
                  <p className='mt-2 max-w-2xl text-sm leading-6 text-[#f0dfb6] md:text-base'>
                    {project.description}
                  </p>
                )}
              </div>
              <div className='flex items-center gap-4 md:justify-end'>
                <p className='font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#dfc59a]'>
                  {project.votes.length} vote
                  {project.votes.length > 1 ? "s" : ""}
                </p>
                {project.audioUrl && (
                  <PitchPlayer
                    project={project}
                    isPlaying={isPlaying === rootIndex}
                    onPlayToggle={() => onPlayToggle(rootIndex)}
                    updateAudioProgress={updateAudioProgress}
                    isResults
                    className='w-auto [&>div]:hidden [&_button]:text-[#fff4cf] [&_span]:sr-only'
                  />
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

const queryClient = new QueryClient()

const ProjectBracketContent = ({
  projects,
  activeProjectId
}: {
  projects: Project[]
  activeProjectId: number
}) => {
  const [currentPair, setCurrentPair] = useState([0, 1])
  const [voteCount, setVoteCount] = useState(0)
  const storageKey = `ideas-vote-${activeProjectId}`
  const hasAlreadyVoted = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange)
      return () => window.removeEventListener("storage", onStoreChange)
    },
    () => localStorage.getItem(storageKey) === "done",
    () => false
  )
  const [completedThisSession, setCompletedThisSession] = useState(false)
  const [resultsRequested, setResultsRequested] = useState(false)
  const [playingProject, setPlayingProject] = useState<number | null>(null)
  const [audioProgress, setAudioProgress] = useState(0)
  const totalVotes = Math.max(projects.length - 1, 0)
  const votingComplete = hasAlreadyVoted || completedThisSession
  const showResults = hasAlreadyVoted || resultsRequested

  const moveToNextPair = (currentIndex: number) => {
    const nextVoteCount = voteCount + 1

    if (nextVoteCount >= totalVotes) {
      setVoteCount(nextVoteCount)
      setCompletedThisSession(true)
      localStorage.setItem(storageKey, "done")
      setResultsRequested(true)
      return
    }

    setVoteCount(nextVoteCount)
    setCurrentPair([currentIndex, nextVoteCount + 1])
  }

  const vote = async (index: number) => {
    try {
      await ky.post(`/api/votes/${projects[index].id}`)
      moveToNextPair(index)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePlayToggle = (projectIndex: number) => {
    setPlayingProject((current) =>
      current === projectIndex ? null : projectIndex
    )
    setAudioProgress(0)
  }

  if (projects.length < 2) {
    return (
      <p className='text-lg leading-8 text-[#f0dfb6]'>
        Les prochaines idées arrivent bientôt.
      </p>
    )
  }

  return (
    <>
      {showResults ? (
        <VoteResults
          isPlaying={playingProject}
          onPlayToggle={handlePlayToggle}
          updateAudioProgress={setAudioProgress}
        />
      ) : (
        <div>
          <div className='max-w-3xl'>
            <p className='font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#f3bf86]'>
              Face-à-face
            </p>
            <h2 className='mt-4 font-display text-5xl leading-[0.9] tracking-[-0.04em] md:text-7xl'>
              Tu préfères laquelle ?
            </h2>
            <p className='mt-5 text-base leading-8 text-[#f0dfb6] md:text-lg'>
              Écoute les pitchs si tu veux, puis choisis.
            </p>
          </div>

          <div className='relative mt-10 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-20'>
            <ProjectCard
              project={projects[currentPair[0]]}
              label='Idée A'
              onVote={() => vote(currentPair[0])}
              isPlaying={playingProject === currentPair[0]}
              onPlayToggle={() => handlePlayToggle(currentPair[0])}
              audioProgress={
                playingProject === currentPair[0] ? audioProgress : 0
              }
              updateAudioProgress={setAudioProgress}
            />
            <span
              aria-hidden='true'
              className='absolute left-1/2 top-1/2 z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fff4cf] font-display text-lg text-[#2a0d3e] max-lg:hidden'
            >
              ou
            </span>
            <ProjectCard
              project={projects[currentPair[1]]}
              label='Idée B'
              onVote={() => vote(currentPair[1])}
              isPlaying={playingProject === currentPair[1]}
              onPlayToggle={() => handlePlayToggle(currentPair[1])}
              audioProgress={
                playingProject === currentPair[1] ? audioProgress : 0
              }
              updateAudioProgress={setAudioProgress}
            />
          </div>

          <p className='mt-5 text-right font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#dfc59a]'>
            Choix {Math.min(voteCount + 1, totalVotes)} sur {totalVotes}
          </p>
        </div>
      )}

      {!votingComplete && (
        <div className='mt-8 flex justify-center'>
          <button
            type='button'
            onClick={() => setResultsRequested((current) => !current)}
            className='font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#f3bf86] underline decoration-[#f3bf86]/40 underline-offset-8 outline-none transition hover:text-[#fff4cf] focus-visible:text-[#fff4cf]'
          >
            {showResults ? "Revenir au vote" : "Voir le classement"}
          </button>
        </div>
      )}
    </>
  )
}

export const ProjectBracket = ({
  projects,
  activeProjectId
}: {
  projects: Project[]
  activeProjectId: number
}) => (
  <QueryClientProvider client={queryClient}>
    <ProjectBracketContent
      projects={projects}
      activeProjectId={activeProjectId}
    />
  </QueryClientProvider>
)
