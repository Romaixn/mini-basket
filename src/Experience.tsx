import { Suspense, useRef } from "react"
import { Mesh } from 'three'
import { useFrame } from "@react-three/fiber"
import { PresentationControls, Center, Environment } from "@react-three/drei"
import { Physics } from '@react-three/rapier'
import { easing } from 'maath'
import { Perf } from "r3f-perf"
import { useControls } from 'leva'
import Lights from "./Lights"
import Level from "./Level"

const Experience: React.FC = () => {
    const { perfVisible } = useControls('debug', {
        perfVisible: false,
    })

    return <>
        <color attach="background" args={["#ddc28d"]} />
        { perfVisible && <Perf position="top-left" /> }

        <Environment preset="city" />
        <Lights />

        <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
            <group>
                <Suspense fallback={<Fallback />}>
                    <Center>
                        <Physics>
                            <Level />
                        </Physics>
                    </Center>
                    <Zoom />
                </Suspense>
            </group>
        </PresentationControls>
    </>
}


const Fallback: React.FC = () => {
    const ref = useRef<Mesh>(null!)
    useFrame((state) => (ref.current.position.x = Math.sin(state.clock.elapsedTime * 2)))

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.15, 64, 64]} />
            <meshBasicMaterial color="#556" />
        </mesh>
    )
}

const Zoom: React.FC = () => {
    useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 1, 8], 1, delta)
        state.camera.lookAt(0, 0, 0)
    })

    return <></>
}

export default Experience
