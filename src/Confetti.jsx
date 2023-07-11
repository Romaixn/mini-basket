import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Confetti = ({ isActive }) => {
    const particleGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const particles = useRef();

    useEffect(() => {
        if (isActive) {
            for (let i = 0; i < 100; i++) {
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                particle.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                particle.velocity = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                particles.current.add(particle);
            }
        }
    }, [isActive]);

    useFrame(() => {
        if (isActive) {
            particles.current.children.forEach((particle) => {
                particle.position.add(particle.velocity);
            });
        }
    });

    return <group ref={particles} />;
};

export default Confetti;
</new_file>