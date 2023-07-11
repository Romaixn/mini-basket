import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ScoreState {
    score: number
    goalScored: boolean
    increment: () => void
    scoreGoal: () => void
}

export const useScoreStore = create<ScoreState>()(
    devtools(
        persist(
            (set) => ({
                score: 0,
                goalScored: false,
                increment: () => set((state) => ({ score: state.score + 1, goalScored: false })),
                scoreGoal: () => set((state) => ({ goalScored: true }))
            }),
            { name: 'score' }
        )
    )
)

export const useControlsStore = create(() => ({
    isControlAPushed: false,
    isControlBPushed: false,
}))
