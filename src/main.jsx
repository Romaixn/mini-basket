import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Experience from './Experience'
import Interface from './Interface'
import '/fonts/Basketball.otf'
import './index.css'

const debug = /[?&]debug=/.test(window.location.search)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Leva hidden={!debug} />
    <Interface />
    <Canvas
        dpr={[1, 2]}
        camera={{ position: [-15, 15, 15], fov: 55 }}
    >
        <Experience />
    </Canvas>
  </React.StrictMode>,
)
