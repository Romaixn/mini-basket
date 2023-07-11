import ReactThreeTestRenderer from '@react-three/test-renderer'
import Component1 from '../src/Components/Component1'

test('Component1 renders without crashing', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Component1 />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBeGreaterThan(0)
})
</new_file>