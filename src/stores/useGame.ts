import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

interface ScoreState {
    score: number
    increment: () => void
}

export const useScoreStore = create<ScoreState>()(
    devtools(
        persist(
            (set) => ({
                score: 0,
                increment: () => set((state) => ({ score: state.score + 1 })),
            }),
            { name: 'score' }
        )
    )
)

export const useControlsStore = create(subscribeWithSelector(() => {
    return {
        isControlAPushed: false,
        isControlBPushed: false,
    }
}))
