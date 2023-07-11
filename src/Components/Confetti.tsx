import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ConfettiProps {
    show: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ show }) => {
    const particleGeometry = useRef(new THREE.Geometry());
    const particleMaterial = useRef(new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));

    useEffect(() => {
        if (show) {
            for (let i = 0; i < 1000; i++) {
                const particle = new THREE.Vector3(
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1
                );
                particleGeometry.current.vertices.push(particle);
            }
        }
    }, [show]);

    useFrame(() => {
        if (show) {
            particleGeometry.current.vertices.forEach((particle) => {
                particle.y -= 0.01;
                if (particle.y < -1) {
                    particle.y = 1;
                }
                particleGeometry.current.verticesNeedUpdate = true;
            });
        }
    });

    return show ? <points geometry={particleGeometry.current} material={particleMaterial.current} /> : null;
};

export default Confetti;