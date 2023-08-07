// CONFETTI COMPONENT BY ANDERSON MANCINI AND ROMAIN HERAULT
// Based on: https://github.com/JamesChan21/threejs-confetti
// Based on: https://github.com/daniel-lundin/dom-confetti

import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * @param {Object} options
 * @param {Boolean | undefined} options.isExploding Enable exploding
 * @param {Number | undefined} options.amount The amount of particles
 * @param {Number | undefined} options.rate Increases or decreases the frequency for particles. Don't set it too high.
 * @param {Number | undefined} options.radius The radius of each explosion.
 * @param {Number | undefined} options.areaWidth The qrea width for explosion.
 * @param {Number | undefined} options.areaHeight The qrea height for explosion.
 * @param {Number | undefined} options.fallingHeight Height for the particles to fall from
 * @param {Number | undefined} options.fallingSpeed The speed of particles
 * @param {(Number)[] | undefined} options.colors Array of Hex color codes for particles. Example: [0x0000ff, 0xff0000, 0xffff00]
 * @param {Number | String | undefined} options.duration Duration of the particles in Milliseconds. Set as 'forever' string for infinity explosion
 * @param {Boolean | undefined} options.enableShadows Enable particle shadows. Set false for better performance.
 *
 */

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
  const [isDestroyed, setIsDestroyed] = useState(false) // Add a new state variable isDestroyed and initialize it to false

  rate = rate / 100
  const geometry = new THREE.PlaneGeometry(0.03, 0.03, 1, 1)

  function explode() {
    setIsDestroyed(false) // Modify the explode function to set isDestroyed to false

    const boom = new THREE.Object3D()
    boom.life = Math.random() * 5 + 5
    boom.position.x = -(areaWidth / 2) + areaWidth * Math.random()
    boom.position.y = fallingHeight + areaHeight - fallingSpeed
    boom.position.z = -(areaWidth / 2) + areaWidth * Math.random()
    groupRef.current.add(boom)
    booms.push(boom)

    for (let i = 0; i < amount; i++) {
      const material = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]) },
            time: { value: 0 }
          },
          vertexShader: `
            uniform float time;
            void main() {
              vec3 pos = position;
              // Update this code to implement the intended movement of the particles
              pos.y -= time;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            uniform float opacity;
            void main() {
              // Update this code to use the opacity uniform
              gl_FragColor = vec4(color, opacity);
            }
          `,
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

  useEffect(() => {
    if (!isExploding && !isDestroyed) { // Add a new useEffect hook to listen for changes in isExploding and isDestroyed
      destroy() // Call the destroy function when isExploding is false and isDestroyed is false
    }
  }, [isExploding, isDestroyed])

  function destroy() {
    for (let i = 0; i < booms.length; i++) {
      const boom = booms[i]
      boom.dispose()
    }
    setBooms([])
    setIsDestroyed(true) // Implement the destroy function to remove the confetti particles and set isDestroyed to true
  }

  useFrame((state, delta) => {
    if (isExploding && Math.random() < rate) explode()
  
    let particleAmount = 0
  
    for (let i = 0; i < booms.length; i++) {
      const boom = booms[i]
  
      for (let k = 0; k < boom.children.length; k++) {
        let particle = boom.children[k]
  
        particle.material.uniforms.time.value += delta;
        
        if (particle.position.y < -fallingHeight) {
          particle.material.dispose()
          particle.geometry.dispose()
          boom.remove(particle)
          particle = null
        } else if (particle.position.y > areaHeight + fallingHeight) {
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
        
        if (isExploding && Date.now() - startTime > duration) {
        destroy()
        }
        })
        
        return <mesh ref={groupRef} position={[0, 2, -8]} />
        }