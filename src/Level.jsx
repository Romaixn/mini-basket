import Ball from "./Components/Ball"
import Table from "./Components/Table"

const Level = () => {
    return <>
        <Ball position={{ x: 0.25, y: 1.5, z: 0 }} />
        <Table />
    </>
}

export default Level
