import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        /**
         * Score
        */
        score: 0,
        isScored: false,
        increment: () => set((state) => ({ score: state.score + 1 })),

        /**
         * Controls
        */
        isControlAPushed: false,
        isControlBPushed: false,
    }
}))
