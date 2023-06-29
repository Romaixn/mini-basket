import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshTransmissionMaterial } from "@react-three/drei"
import { RigidBody } from '@react-three/rapier'
import { RefObject, useRef } from "react";

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

  const clickUp = (control: RefObject<THREE.Mesh>) => {
    console.log('UP');

    control.current.position.y = -0.117
  }

  const clickDown = (control: RefObject<THREE.Mesh>) => {
    console.log('DOWN');

    control.current.position.y = -0.117 - 0.1
  }

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
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Thruster_A.geometry}
            material={materials.Black}
            position={[2.259, -0.11, 0.765]}
            scale={0.573}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Thruster_B.geometry}
            material={materials.Black}
            position={[2.259, -0.11, -0.764]}
            scale={0.573}
        />
    </group>
  );
}

useGLTF.preload("/models/table.gltf");
