import ReactThreeTestRenderer from '@react-three/test-renderer'
import Table from '../src/Components/Table'

test('render without crashing', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Table />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBe(1)
})
