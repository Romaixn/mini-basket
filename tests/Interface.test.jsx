import { render, screen } from '@testing-library/react';
import Interface from '../src/Interface';

test('renders Interface component without crashing', () => {
  render(<Interface />);
  const interfaceElement = screen.getByTestId('interface');
  expect(interfaceElement).toBeInTheDocument();
});

test('displays initial score of 0 points', () => {
  render(<Interface />);
  const scoreElement = screen.getByText('0 points');
  expect(scoreElement).toBeInTheDocument();
});