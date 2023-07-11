import { render, screen } from '@testing-library/react';
import Level from '../src/Level';

test('renders Level component without crashing', () => {
  render(<Level />);
  const levelElement = screen.getByTestId('level');
  expect(levelElement).toBeInTheDocument();
});