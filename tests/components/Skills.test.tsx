import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Skills } from '../../src/components/Skills';

describe('Skills', () => {
  test('renders skills section with title', () => {
    render(<Skills />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  test('renders section number', () => {
    render(<Skills />);
    expect(screen.getByText('03.')).toBeInTheDocument();
  });

  test('renders JavaScript skill', () => {
    render(<Skills />);
    expect(screen.getAllByText('JavaScript').length).toBeGreaterThan(0);
  });

  test('renders TypeScript skill', () => {
    render(<Skills />);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
  });

  test('renders Office.js skill', () => {
    render(<Skills />);
    expect(screen.getAllByText('Office.js').length).toBeGreaterThan(0);
  });
});
