import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { About } from '../../src/components/About';

describe('About', () => {
  test('renders about section with title', () => {
    render(<About />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  test('renders section number', () => {
    render(<About />);
    expect(screen.getByText('01.')).toBeInTheDocument();
  });

  test('renders social links', () => {
    render(<About />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  test('renders education information', () => {
    render(<About />);
    expect(screen.getByText(/Mahasarakham University/)).toBeInTheDocument();
  });
});
