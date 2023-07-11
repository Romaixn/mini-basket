import ReactThreeTestRenderer from '@react-three/test-renderer'
import Component2 from '../src/Components/Component2'

test('Component2 renders without crashing', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Component2 />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBeGreaterThan(0)
})
</new_file>