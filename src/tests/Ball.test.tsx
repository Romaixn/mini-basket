import React from 'react';
import { render, screen } from '@testing-library/react';
import Ball from '../Components/Ball';

test('renders without crashing', () => {
  render(<Ball />);
  const ballElement = screen.getByText(/Ball/i);
  expect(ballElement).toBeInTheDocument();
});