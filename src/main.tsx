import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Experience from './Experience'
import './index.css'

const debug = /[?&]debug=/.test(window.location.search)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Leva hidden={!debug} />
    <Canvas
        dpr={[1, 2]}
        camera={{ position: [-10, 15, 15], fov: 30 }}
    >
        <Experience />
    </Canvas>
  </React.StrictMode>,
)
