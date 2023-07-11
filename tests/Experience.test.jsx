import { render, screen } from '@testing-library/react';
import Experience from '../src/Experience';

test('renders Experience component without crashing', () => {
  render(<Experience />);
  const experienceElement = screen.getByTestId('experience');
  expect(experienceElement).toBeInTheDocument();
});