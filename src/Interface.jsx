import useGame from "./stores/useGame"

const Interface = () => {
    const points = useGame((state) => state.score)

    return <div className="points">
        <h1>{points} points</h1>
    </div>
}

export default Interface
