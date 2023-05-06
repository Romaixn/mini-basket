import { RoundedBox, MeshTransmissionMaterial } from "@react-three/drei"
import Ball from "./Components/Ball"
import Table from "./Components/Table"

export default function Level() {
    return <>
        <Ball position={{ x: 0, y: 1, z: 1 }} />
        <Table />
        <RoundedBox scale={[2, 2, 3]} castShadow position={[0, 0.87, 0]}>
            <MeshTransmissionMaterial anisotropy={0.1} chromaticAberration={0.04} distortionScale={0} temporalDistortion={0} />
        </RoundedBox>
    </>
}
