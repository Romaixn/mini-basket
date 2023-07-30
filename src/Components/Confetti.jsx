// CONFETTI COMPONENT BY ANDERSON MANCINI
// Thanks <3

import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useGame from '../stores/useGame'

export default function ExplosionConfetti() {
  const groupRef = useRef()
  const [isExploding, setIsExploding] = useState()
  const [explodingTimeout, setExplodingTimeout] = useState()
  const setIsScored = (isScored) => useGame.setState({ isScored: isScored })

  const options = {
    amount: 100,
    rate: 3,
    radius: 15,
    areaWidth: 4,
    areaHeight: 2,
    fallingHeight: 5,
    fallingSpeed: 8,
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  }

  let booms = []
  options.rate = options.rate / 100
  const geometry = new THREE.PlaneGeometry(0.03, 0.03, 1, 1)

  function explode() {
    const boom = new THREE.Object3D()
    boom.life = Math.random() * 5 + 5
    boom.position.x = -(options.areaWidth / 2) + options.areaWidth * Math.random()
    boom.position.y = options.fallingHeight + Math.random() * 5 - options.fallingSpeed
    boom.position.z = -(options.areaWidth / 2) + options.areaWidth * Math.random()
    groupRef.current.add(boom)
    booms.push(boom)

    for (let i = 0; i < options.amount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: options.colors[Math.floor(Math.random() * options.colors.length)],
        side: THREE.DoubleSide
      })
      const particle = new THREE.Mesh(geometry, material)
      particle.castShadow = true
      boom.add(particle)

      particle.life = 1

      particle.destination = {}
      particle.destination.x = (Math.random() - 0.5) * (options.radius * 2) * Math.random()
      particle.destination.y = (Math.random() - 0.5) * (options.radius * 2) * Math.random()
      particle.destination.z = (Math.random() - 0.5) * (options.radius * 2) * Math.random()

      particle.rotation.x = Math.random() * 360
      particle.rotation.y = Math.random() * 360
      particle.rotation.z = Math.random() * 360

      const size = Math.random() * 2 + 1
      particle.scale.set(size, size, size)

      particle.rotateSpeedX = Math.random() * 0.8 - 0.4
      particle.rotateSpeedY = Math.random() * 0.8 - 0.4
      particle.rotateSpeedZ = Math.random() * 0.8 - 0.4
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
    if (isExploding) {
      if (Math.random() < options.rate) explode()

      let particleAmount = 0

      for (var i = 0; i < booms.length; i++) {
        var boom = booms[i]

        for (var k = 0; k < boom.children.length; k++) {
          var particle = boom.children[k]

          particle.destination.y -= THREE.MathUtils.randFloat(0.1, 0.3)
          particle.life -= THREE.MathUtils.randFloat(0.005, 0.01)

          var speedX = (particle.destination.x - particle.position.x) / 200
          var speedY = (particle.destination.y - particle.position.y) / 80
          var speedZ = (particle.destination.z - particle.position.z) / 200

          particle.position.x += speedX
          particle.position.y += speedY
          particle.position.z += speedZ

          particle.rotation.y += particle.rotateSpeedY
          particle.rotation.x += particle.rotateSpeedX
          particle.rotation.z += particle.rotateSpeedZ

          particle.material.opacity -= THREE.MathUtils.randFloat(0.005, 0.01)

          if (particle.position.y < -options.fallingHeight) {
            particle.material.dispose()
            particle.geometry.dispose()
            boom.remove(particle)
            particle = null
          }
        }

        if (boom.children.length <= 0) {
          boom.dispose()
          booms = booms.filter((b) => b !== boom)
        }
        particleAmount += boom.children.length
      }
    }
  })

  useEffect(() => {
    if (explodingTimeout) {
      clearTimeout(explodingTimeout)
    }
    setIsExploding(true)
    const timeout = setTimeout(() => {
      setIsExploding(false)
      setIsScored(false)
    }, 35000)
    setExplodingTimeout(timeout)

    return () => clearTimeout(explodingTimeout)
  }, [])

  return <mesh ref={groupRef} position={[0, 2, -8]} />
}
