// CONFETTI COMPONENT BY ANDERSON MANCINI AND ROMAIN HERAULT
// Based on: https://github.com/JamesChan21/threejs-confetti
// Based on: https://github.com/daniel-lundin/dom-confetti

import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  // vertex shader code here
`

const fragmentShader = `
  // fragment shader code here
`

export default function ExplosionConfetti(
  {
    isExploding = false,
    amount = 100,
    rate = 3,
    radius = 15,
    areaWidth = 3,
    areaHeight = 1,
    fallingHeight = 10,
    fallingSpeed = 8,
    colors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    duration = 10000,
    enableShadows = false
  },
  props
) {
  const groupRef = useRef()
  const [booms, setBooms] = useState([])

  rate = rate / 100
  const geometry = new THREE.PlaneGeometry(0.03, 0.03, 1, 1)

  function explode() {
    const boom = new THREE.Object3D()
    boom.life = Math.random() * 5 + 5
    boom.position.x = -(areaWidth / 2) + areaWidth * Math.random()
    boom.position.y = fallingHeight + areaHeight - fallingSpeed
    boom.position.z = -(areaWidth / 2) + areaWidth * Math.random()
    groupRef.current.add(boom)
    booms.push(boom)

    for (let i = 0; i < amount; i++) {
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          color: { value: colors[Math.floor(Math.random() * colors.length)] },
          size: { value: Math.random() * 2 + 1 },
          rotateSpeedX: { value: Math.random() * 0.8 - 0.4 },
          rotateSpeedY: { value: Math.random() * 0.8 - 0.4 },
          rotateSpeedZ: { value: Math.random() * 0.8 - 0.4 },
          opacity: { value: 1 }
        },
        side: THREE.DoubleSide
      })
      const particle = new THREE.Mesh(geometry, material)
      particle.castShadow = enableShadows
      boom.add(particle)

      particle.life = 1

      particle.destination = {}
      particle.destination.x = (Math.random() - 0.5) * (radius * 2) * Math.random()
      particle.destination.y = (Math.random() - 0.5) * (radius * 2) * Math.random()
      particle.destination.z = (Math.random() - 0.5) * (radius * 2) * Math.random()

      particle.rotation.x = Math.random() * 360
      particle.rotation.y = Math.random() * 360
      particle.rotation.z = Math.random() * 360
    }

    boom.dispose = function () {
      for (let i = 0; i < boom.children.length; i++) {
        const particle = boom.children[i]
        particle.material.dispose()
        particle.geometry.dispose()
        boom.remove(particle)
      }
      groupRef.current.remove(boom)
    }
  }

  useFrame(() => {
    if (isExploding && Math.random() < rate) explode()
  
    let particleAmount = 0
  
    for (let i = 0; i < booms.length; i++) {
      const boom = booms[i]
  
      for (let k = 0; k < boom.children.length; k++) {
        let particle = boom.children[k]
  
        particle.destination.y -= THREE.MathUtils.randFloat(0.1, 0.3)
        particle.life -= THREE.MathUtils.randFloat(0.005, 0.01)
  
        const speedX = (particle.destination.x - particle.position.x) / 200
        const speedY = (particle.destination.y - particle.position.y) / 200
        const speedZ = (particle.destination.z - particle.position.z) / 200
  
        particle.position.x += speedX
        particle.position.y += speedY
        particle.position.z += speedZ
  
        particle.rotation.y += particle.rotateSpeedY
        particle.rotation.x += particle.rotateSpeedX
        particle.rotation.z += particle.rotateSpeedZ
  
        particle.material.uniforms.opacity.value -= THREE.MathUtils.randFloat(0.005, 0.01)
  
        if (particle.position.y < -fallingHeight) {
          particle.material.dispose()
          particle.geometry.dispose()
          boom.remove(particle)
          particle = null
        }
      }
  
      if (boom.children.length <= 0) {
        boom.dispose()
        setBooms(booms.filter((b) => b !== boom))
      }
      particleAmount += boom.children.length
    }
  })

  return <mesh ref={groupRef} position={[0, 2, -8]} />
}