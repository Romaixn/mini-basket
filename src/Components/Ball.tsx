import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RigidBody } from "@react-three/rapier";
import { useControls } from 'leva'

interface BallProps {
    position: {
        x: number,
        y: number,
        z: number
    },
    color?: string
}

type GLTFResult = GLTF & {
    nodes: {
        Sphere: THREE.Mesh;
    };
    materials: {
        ["Material.001"]: THREE.MeshStandardMaterial;
    };
};

const Ball: React.FC<BallProps> = ({ position }) => {
    const { ballRestitution, ballFriction } = useControls('ball', {
        ballRestitution: { label: 'Restitution', value: 1, min: 0, max: 10 },
        ballFriction: { label: 'Friction', value: 0.2, min: 0, max: 10 },
    }, { collapsed: true })

    const { nodes, materials } = useGLTF("/models/basketball.glb") as GLTFResult;
    return (
        <group position={[position.x, position.y, position.z]} scale={0.5} dispose={null}>
            <RigidBody colliders="ball" restitution={ballRestitution} friction={ballFriction}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere.geometry}
                    material={materials["Material.001"]}
                    />
            </RigidBody>
        </group>
    );
}

useGLTF.preload("/models/basketball.glb");

export default Ball
