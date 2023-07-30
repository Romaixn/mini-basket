import { Suspense, useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { PresentationControls, Center, Environment } from "@react-three/drei"
import { Physics } from '@react-three/rapier'
import { easing } from 'maath'
import { Perf } from "r3f-perf"
import { useControls } from 'leva'
import Lights from "./Lights"
import Level from "./Level"
import Confetti from "./Components/Confetti.jsx";
import useGame from "./stores/useGame.js";

const Experience = () => {
    const { perfVisible, debugPhysics } = useControls('debug', {
        perfVisible: { label: 'Performance', value: false },
        debugPhysics: { label: 'Physics', value: false },
    })

    const [isScored, setIsScored] = useState(true)

    useEffect(() => {
        const unsuscribeIsScored = useGame.subscribe(
            (state) => state.isScored,
            (isScored) => {
                if(isScored) {
                    setIsScored(isScored)
                }
            }
        )

        return () => {
            unsuscribeIsScored()
        }
    }, [])

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
                    { isScored && <Confetti dash={0.95} count={10} radius={5} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff']} /> }
                    <Physics debug={debugPhysics}>
                        <Center>
                            <Level />
                        </Center>
                    </Physics>
                    <Zoom />
                </Suspense>
            </group>
        </PresentationControls>
    </>
}


const Fallback = () => {
    const ref = useRef(null)
    useFrame((state) => (ref.current.position.x = Math.sin(state.clock.elapsedTime * 2)))

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.15, 64, 64]} />
            <meshBasicMaterial color="#556" />
        </mesh>
    )
}

const Zoom = () => {
    useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 1, 8], 1, delta)
        state.camera.lookAt(0, 0, 0)
    })

    return <></>
}

export default Experience
