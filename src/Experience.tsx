import { Suspense, useRef } from "react"
import Confetti from './Components/Confetti';
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
    const { perfVisible, debugPhysics } = useControls('debug', {
        perfVisible: { label: 'Performance', value: false },
        debugPhysics: { label: 'Physics', value: false },
    })

    return <>
        <color attach="background" args={["#ddc28d"]} />
        { perfVisible && <Perf position="top-left" /> }

        <Environment preset="city" />
        <Lights />

        <PresentationControls
            global
            cursor={false}
            // rotation={[0, -Math.PI / 8, 0]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
            <group>
                <Suspense fallback={<Fallback />}>
                    <Physics debug={debugPhysics}>
                        <Center>
                            <Level />
                            <Confetti />
                        </Center>
                    </Physics>
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
