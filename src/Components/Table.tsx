import * as THREE from "three";
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three-stdlib";
import Confetti from "./Confetti";
import {MeshTransmissionMaterial} from "@react-three/drei"
import {CuboidCollider, RapierRigidBody, RigidBody, vec3} from '@react-three/rapier'
import {RefObject, useEffect, useRef, useState} from "react";
import {useControlsStore, useScoreStore} from '../stores/useGame'
import {useControls} from "leva";

type GLTFResult = GLTF & {
    nodes: {
        Table: THREE.Mesh;
        Glass: THREE.Mesh;
        Controls: THREE.Mesh;
        Control_A: THREE.Mesh;
        Control_A_Text: THREE.Mesh;
        Control_B: THREE.Mesh;
        Control_B_Text: THREE.Mesh;
        Thruster_A: THREE.Mesh;
        Thruster_B: THREE.Mesh;
        Hide_Thruster: THREE.Mesh;
        Base: THREE.Mesh;
        Cylinder: THREE.Mesh;
        Panel: THREE.Mesh;
        Ring: THREE.Mesh;
    };
    materials: {
        Wood: THREE.MeshStandardMaterial;
        Red: THREE.MeshStandardMaterial;
        Green: THREE.MeshStandardMaterial;
        Glass: THREE.MeshStandardMaterial;
        Black: THREE.MeshStandardMaterial;
        White: THREE.MeshStandardMaterial;
    };
};

export default function Table(props: JSX.IntrinsicElements["group"]) {
    const {nodes, materials} = useGLTF("/models/table.gltf") as GLTFResult;
    const controlA = useRef<THREE.Mesh>(null)
    const controlB = useRef<THREE.Mesh>(null)
    const thrusterA = useRef<RapierRigidBody>(null)
    const thrusterB = useRef<RapierRigidBody>(null)

    const [isScored, setIsScored] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    const {tableRestitution, tableFriction, glassRestitution, glassFriction} = useControls('table', {
        tableRestitution: {label: 'Table Restitution', value: 0.6, min: 0, max: 1, step: 0.1},
        tableFriction: {label: 'Table Friction', value: 0, min: 0, max: 10},
        glassRestitution: {label: 'Glass Restitution', value: 0.2, min: 0, max: 1, step: 0.1},
        glassFriction: {label: 'Glass Friction', value: 0, min: 0, max: 10},
    }, {collapsed: true})

    const increaseScore = useScoreStore((state) => state.increment)

    const goal = () => {
        if(!isScored) {
            setIsScored(true)
            increaseScore()
            setShowConfetti(true)
        }
    }

    const clickUp = (control: RefObject<THREE.Mesh>) => {
        if (control.current) {
            if (control === controlA) {
                useControlsStore.setState({isControlAPushed: false})
            } else {
                useControlsStore.setState({isControlBPushed: false})
            }

            control.current.position.y = 0.128
        }
    }

    const clickDown = (control: RefObject<THREE.Mesh>) => {
        if (control.current) {
            if (control === controlA) {
                useControlsStore.setState({isControlAPushed: true})
            } else {
                useControlsStore.setState({isControlBPushed: true})
            }

            control.current.position.y = 0.128 - 0.1
        }
    }

    useEffect(() => {
        const upY = 0.5

        const unsuscribeA = useControlsStore.subscribe(
            (state) => state.isControlAPushed,
            (isControlAPushed) => {
                if (thrusterA.current) {
                    const position = vec3(thrusterA.current.translation())

                    if (isControlAPushed) {
                        thrusterA.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y + upY,
                            z: position.z
                        })
                    } else {
                        thrusterA.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y - upY,
                            z: position.z
                        })
                    }
                }
            }
        )

        const unsuscribeB = useControlsStore.subscribe(
            (state) => state.isControlBPushed,
            (isControlBPushed) => {
                if (thrusterB.current) {
                    const position = vec3(thrusterB.current.translation())
                    if (isControlBPushed) {
                        thrusterB.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y + upY,
                            z: position.z
                        })
                    } else {
                        thrusterB.current.setNextKinematicTranslation({
                            x: position.x,
                            y: position.y - upY,
                            z: position.z
                        })
                    }
                }
            }
        )

        return () => {
            unsuscribeA()
            unsuscribeB()
        }
    }, [])

    return (
        <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
            <RigidBody type="fixed" colliders="trimesh" restitution={tableRestitution} friction={tableFriction}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Table.geometry}
                    material={materials.Wood}
                    material-color="#DEB887"
                    material-envMapIntensity={0.5}
                    position={[0, 0.07, 0]}
                />

                <CuboidCollider
                    args={[0, 2, 1.5]}
                    position={[1.5, 1.5, 0]}
                    sensor
                    onIntersectionExit={() => {
                        setIsScored(false)
                        setShowConfetti(false)
                    }}
                />
            </RigidBody>
            <RigidBody type="fixed" colliders="trimesh" restitution={glassRestitution} friction={glassFriction}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Glass.geometry}
                    position={[0.497, 1.54, 0.005]}
                >
                    <MeshTransmissionMaterial anisotropy={0.1} chromaticAberration={0.04} distortionScale={0}
                                              temporalDistortion={0}/>
                </mesh>
            </RigidBody>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Controls.geometry}
                material={materials.Wood}
                position={[4.135, 0.092, -0.003]}
            />
            <mesh
                ref={controlA}
                castShadow
                receiveShadow
                geometry={nodes.Control_A.geometry}
                material={materials.Red}
                position={[4.184, 0.128, 0.744]}
                onPointerUp={() => clickUp(controlA)}
                onPointerDown={() => clickDown(controlA)}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Control_A_Text.geometry}
                    material={materials.White}
                    position={[0.237, 0.046, 0.21]}
                    rotation={[Math.PI / 2, 1.179, -Math.PI / 2]}
                />
            </mesh>
            <mesh
                ref={controlB}
                castShadow
                receiveShadow
                geometry={nodes.Control_B.geometry}
                material={materials.Green}
                position={[4.183, 0.128, -0.754]}
                onPointerUp={() => clickUp(controlB)}
                onPointerDown={() => clickDown(controlB)}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Control_B_Text.geometry}
                    material={materials.White}
                    position={[0.25, 0.043, 0.207]}
                    rotation={[Math.PI / 2, 1.184, -Math.PI / 2]}
                />
            </mesh>
            <RigidBody
                ref={thrusterA}
                type="kinematicPosition"
                colliders="hull"
                lockRotations={true}
                enabledTranslations={[false, true, false]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Thruster_A.geometry}
                    material={materials.Black}
                    position={[2.259, -0.189, 0.765]}
                />
            </RigidBody>
            <RigidBody
                ref={thrusterB}
                type="kinematicPosition"
                colliders="hull"
                lockRotations={true}
                enabledTranslations={[false, true, false]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Thruster_B.geometry}
                    material={materials.Black}
                    position={[2.259, -0.189, -0.764]}
                />
            </RigidBody>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hide_Thruster.geometry}
                material={materials.Black}
                position={[2.257, -0.047, 0]}
            />
            <RigidBody type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Base.geometry}
                    material={materials.Wood}
                    position={[-2.235, 0.565, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder.geometry}
                    material={materials.Red}
                    position={[-2.235, 1.177, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Panel.geometry}
                    material={materials.Wood}
                    position={[-2.234, 1.814, 0]}
                />
                <CuboidCollider
                    args={[0.35, 0, 0.35]}
                    position={[-1.686, 1.40, 0]}
                    sensor
                    onIntersectionExit={goal}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        position={[0, 0.06, 0]}
                        geometry={nodes.Ring.geometry}
                        material={materials.Red}
                    />
                </CuboidCollider>
            </RigidBody>
            <Confetti show={showConfetti} />
        </group>
    );
}

useGLTF.preload("/models/table.gltf");
