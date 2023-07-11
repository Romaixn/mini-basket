import { useScoreStore } from "./stores/useGame"

const Interface = () => {
    const points = useScoreStore((state) => state.score)

    return <div className="points">
        <h1>{points} points</h1>
    </div>
}

export default Interface
