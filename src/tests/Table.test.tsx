import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Components/Table';

test('renders without crashing', () => {
  render(<Table />);
  const scoreElement = screen.getByText(/Score/i);
  expect(scoreElement).toBeInTheDocument();
});