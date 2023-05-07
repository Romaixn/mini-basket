import Ball from "./Components/Ball"
import Table from "./Components/Table"

const Level: React.FC = () => {
    return <>
        <Ball position={{ x: 0, y: 1.5, z: 0 }} />
        <Table />
    </>
}

export default Level
