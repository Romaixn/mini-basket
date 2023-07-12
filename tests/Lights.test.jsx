import { describe, expect, test } from 'vitest'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import Lights from '../src/Lights'

describe("Lights test", () => {
    test("render without crashing", async () => {
        const renderer = await ReactThreeTestRenderer.create(<Lights />)
        const mesh = renderer.scene.children[0].allChildren
        expect(mesh.length).toBe(0)
    })
})