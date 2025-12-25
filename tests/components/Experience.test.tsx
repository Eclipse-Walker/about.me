import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Experience } from '../../src/components/Experience';

describe('Experience', () => {
  test('renders experience section with title', () => {
    render(<Experience />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  test('renders section number', () => {
    render(<Experience />);
    expect(screen.getByText('02.')).toBeInTheDocument();
  });

  test('renders LSEG experience', () => {
    render(<Experience />);
    expect(screen.getAllByText(/LSEG/).length).toBeGreaterThan(0);
  });

  test('renders Refinitiv experience', () => {
    render(<Experience />);
    expect(screen.getAllByText(/Refinitiv/).length).toBeGreaterThan(0);
  });

  test('renders Lifestyle Technologies experience', () => {
    render(<Experience />);
    expect(
      screen.getAllByText(/Lifestyle Technologies/).length,
    ).toBeGreaterThan(0);
  });
});
