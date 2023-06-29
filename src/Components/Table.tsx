import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshTransmissionMaterial } from "@react-three/drei"
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier'
import { RefObject, useEffect, useRef } from "react";
import { useControlsStore } from '../stores/useGame'

type GLTFResult = GLTF & {
    nodes: {
        Table: THREE.Mesh;
        Glass: THREE.Mesh;
        Controls: THREE.Mesh;
        Control_A: THREE.Mesh;
        Control_B: THREE.Mesh;
        Thruster_A: THREE.Mesh;
        Thruster_B: THREE.Mesh;
    };
    materials: {
        Wood: THREE.MeshStandardMaterial;
        Red: THREE.MeshStandardMaterial;
        Green: THREE.MeshStandardMaterial;
        Glass: THREE.MeshStandardMaterial;
        Black: THREE.MeshStandardMaterial;
    };
};

export default function Table(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/models/table.gltf") as GLTFResult;
    const controlA = useRef<THREE.Mesh>(null)
    const controlB = useRef<THREE.Mesh>(null)
    const thrusterA = useRef<RapierRigidBody>(null)
    const thrusterB = useRef<RapierRigidBody>(null)

    const clickUp = (control: RefObject<THREE.Mesh>) => {
        if (control.current) {
            if(control === controlA) {
                useControlsStore.setState({isControlAPushed: false})
            } else {
                useControlsStore.setState({isControlBPushed: false})
            }

            control.current.position.y = -0.117
        }
    }

    const clickDown = (control: RefObject<THREE.Mesh>) => {
        if (control.current) {
            if(control === controlA) {
                useControlsStore.setState({isControlAPushed: true})
            } else {
                useControlsStore.setState({isControlBPushed: true})
            }

            control.current.position.y = -0.117 - 0.1
        }
    }

    useEffect(() => {
        const upY = 0.3

        const unsuscribeA = useControlsStore.subscribe(
            (state) => state.isControlAPushed,
            (isControlAPushed) => {
                if (thrusterA.current) {
                    const position = vec3(thrusterA.current.translation())

                    if (isControlAPushed) {
                        thrusterA.current.setNextKinematicTranslation({x: position.x, y: position.y + upY, z: position.z})
                    } else {
                        thrusterA.current.setNextKinematicTranslation({x: position.x, y: position.y - upY, z: position.z})
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
                        thrusterB.current.setNextKinematicTranslation({x: position.x, y: position.y + upY, z: position.z})
                    } else {
                        thrusterB.current.setNextKinematicTranslation({x: position.x, y: position.y - upY, z: position.z})
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
            <RigidBody type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Table.geometry}
                    material={materials.Wood}
                    position={[0, 0.07, 0]}
                />
            </RigidBody>
            <RigidBody type="fixed" colliders="trimesh">
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Glass.geometry}
                    position={[0, 0.86, 0]}
                    >
                        <MeshTransmissionMaterial anisotropy={0.1} chromaticAberration={0.04} distortionScale={0} temporalDistortion={0} />
                </mesh>
            </RigidBody>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Controls.geometry}
                material={materials.Wood}
                position={[4.183, 0.092, -0.003]}
            />
            <mesh
                ref={controlA}
                castShadow
                receiveShadow
                geometry={nodes.Control_A.geometry}
                material={materials.Red}
                position={[4.311, -0.117, 0.688]}
                onPointerUp={() => clickUp(controlA)}
                onPointerDown={() => clickDown(controlA)}
            />
            <mesh
                ref={controlB}
                castShadow
                receiveShadow
                geometry={nodes.Control_B.geometry}
                material={materials.Green}
                position={[4.311, -0.117, -0.811]}
                onPointerUp={() => clickUp(controlB)}
                onPointerDown={() => clickDown(controlB)}
            />
            <RigidBody
                ref={thrusterA}
                type="kinematicPosition"
                colliders="trimesh"
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Thruster_A.geometry}
                    material={materials.Black}
                    position={[2.259, -0.11, 0.765]}
                />
            </RigidBody>
            <RigidBody
                ref={thrusterB}
                type="kinematicPosition"
                colliders="trimesh"
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Thruster_B.geometry}
                    material={materials.Black}
                    position={[2.259, -0.11, -0.764]}
                />
            </RigidBody>
        </group>
    );
}

useGLTF.preload("/models/table.gltf");
