import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from 'leva'
import { useFrame } from "@react-three/fiber";

const Ball = ({ position }) => {
    const ball = useRef(null)

    const { ballRestitution, ballFriction } = useControls('ball', {
        ballRestitution: { label: 'Restitution', value: 1, min: 0, max: 10 },
        ballFriction: { label: 'Friction', value: 0.2, min: 0, max: 10 },
    }, { collapsed: true })

    const reset = () => {
        if(ball.current) {
            ball.current.setTranslation({x: position.x, y: position.y, z: position.z}, true)
            ball.current.setLinvel({x: 0, y: 0, z: 0}, true)
            ball.current.setAngvel({x: 0, y: 0, z: 0}, true)
        }
    }

    useFrame(() => {
        const ballPosition = ball.current?.translation()

        if(ballPosition && (ballPosition.y < - 4 || ballPosition.y > 4)) {
            reset()
        }
    })

    const { nodes, materials } = useGLTF("/models/basketball.glb");
    return (
        <group position={[position.x, position.y, position.z]} scale={0.7} dispose={null}>
            <RigidBody ref={ball} colliders="ball" restitution={ballRestitution} friction={ballFriction} gravityScale={3.5}>
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
