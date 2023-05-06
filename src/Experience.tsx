import { PresentationControls, Center } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useControls } from 'leva'
import Lights from "./Lights"

export default function Experience() {
    const { perfVisible } = useControls('debug', {
        perfVisible: false,
    })

    return <>
        <color attach="background" args={["#ddc28d"]} />
        { perfVisible && <Perf position="top-left" /> }

        <Lights />

        <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
            <Center>
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial color="hotpink" />
                </mesh>
            </Center>
        </PresentationControls>
    </>
}
