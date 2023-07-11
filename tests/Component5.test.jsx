import ReactThreeTestRenderer from '@react-three/test-renderer'
import Component5 from '../src/Components/Component5'

test('Component5 renders without crashing', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Component5 />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBeGreaterThan(0)
})
</new_file>