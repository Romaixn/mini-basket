import { RoundedBox } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

interface TableProps {
    scale?: [number, number, number],
    color?: string
}

const Table: React.FC<TableProps> = ({ scale = [2.1, 0.2, 3.1], color = 'burlywood' }) => {
    return <RigidBody type="fixed">
        <RoundedBox scale={scale} castShadow receiveShadow>
            <meshStandardMaterial color={color} />
        </RoundedBox>
    </RigidBody>
}

export default Table
