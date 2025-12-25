import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Hero } from '../../src/components/Hero';

describe('Hero', () => {
  test('renders hero section with terminal window', () => {
    render(<Hero />);
    expect(screen.getByText('welcome.sh')).toBeInTheDocument();
  });

  test('renders action buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('View GitHub')).toBeInTheDocument();
  });

  test('renders scroll indicator', () => {
    render(<Hero />);
    expect(screen.getByText('scroll down')).toBeInTheDocument();
  });

  test('displays role information', () => {
    render(<Hero />);
    expect(screen.getByText(/"Software Engineer"/)).toBeInTheDocument();
  });
});
