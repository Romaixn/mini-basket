import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshTransmissionMaterial } from "@react-three/drei"

type GLTFResult = GLTF & {
  nodes: {
    Table: THREE.Mesh;
    Glass: THREE.Mesh;
  };
  materials: {
    Wood: THREE.MeshStandardMaterial;
  };
};

export default function Table(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/table.gltf") as GLTFResult;
  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Table.geometry}
            material={materials.Wood}
            position={[0, 0.07, 0]}
            />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass.geometry}
            position={[0, 0.86, 0]}
            >
                <MeshTransmissionMaterial anisotropy={0.1} chromaticAberration={0.04} distortionScale={0} temporalDistortion={0} />
        </mesh>
    </group>
  );
}

useGLTF.preload("/models/table.gltf");
