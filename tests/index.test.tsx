import { describe, expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  test('renders the main page with hero section', async () => {
    render(<App />);
    // Wait for typing animation to complete or just check for terminal window
    await waitFor(
      () => {
        expect(screen.getByText('welcome.sh')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test('renders navigation links', () => {
    render(<App />);
    // Use getAllByText since text appears in both navbar and section titles
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  test('renders footer with copyright', () => {
    render(<App />);
    // Name appears multiple times, use getAllByText
    expect(screen.getAllByText(/Phisanurat W./).length).toBeGreaterThan(0);
  });
});
