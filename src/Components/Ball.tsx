interface BallProps {
    position: {
        x: number,
        y: number,
        z: number
    },
    color?: string
}

const Ball: React.FC<BallProps> = ({ position, color = 'orangered' }) => {
    return <mesh castShadow position={[position.x, position.y, position.z]} scale={0.2} >
            <sphereGeometry args={[1, 32, 32]}/>
            <meshStandardMaterial flatShading color={color} />
        </mesh>
};

export default Ball
