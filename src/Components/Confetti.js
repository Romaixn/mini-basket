import React, { useRef, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const Confetti = ({ position }) => {
    const particleGeometry = new THREE.Geometry();
    for (let i = 0; i < 500; i++) {
        const particle = new THREE.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        particleGeometry.vertices.push(particle);
    }

    const particleMaterial = new THREE.PointsMaterial({
        color: 'random',
        size: 0.1,
        map: new THREE.TextureLoader().load('/confetti.png'),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    const particleSystem = useRef();
    useEffect(() => {
        particleSystem.current.sortParticles = true;
    }, []);

    useFrame(() => {
        particleSystem.current.rotation.y += 0.01;
    });

    return (
        <points
            ref={particleSystem}
            position={position}
            geometry={particleGeometry}
            material={particleMaterial}
        />
    );
};

export default Confetti;