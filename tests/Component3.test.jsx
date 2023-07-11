import ReactThreeTestRenderer from '@react-three/test-renderer'
import Component3 from '../src/Components/Component3'

test('Component3 renders without crashing', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Component3 />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBeGreaterThan(0)
})
</new_file>