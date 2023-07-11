import ReactThreeTestRenderer from '@react-three/test-renderer'
import Component4 from '../src/Components/Component4'

test('Component4 renders without crashing', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Component4 />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBeGreaterThan(0)
})
</new_file>