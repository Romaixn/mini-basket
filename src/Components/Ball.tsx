import { RigidBody } from '@react-three/rapier'

interface BallProps {
    position: {
        x: number,
        y: number,
        z: number
    },
    color?: string
}

const Ball: React.FC<BallProps> = ({ position, color = 'orangered' }) => {
    return <RigidBody
            colliders="ball"
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            position={[position.x, position.y, position.z]}
            scale={0.2}
        >
        <mesh castShadow>
            <sphereGeometry args={[1, 32, 32]}/>
            <meshStandardMaterial flatShading color={color} />
        </mesh>
    </RigidBody>
};

export default Ball
