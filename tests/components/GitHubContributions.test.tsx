import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { GitHubContributions } from '../../src/components/GitHubContributions';

describe('GitHubContributions', () => {
  test('renders github section with title', () => {
    render(<GitHubContributions />);
    expect(screen.getByText('GitHub Activity')).toBeInTheDocument();
  });

  test('renders section number', () => {
    render(<GitHubContributions />);
    expect(screen.getByText('04.')).toBeInTheDocument();
  });

  test('renders profile link', () => {
    render(<GitHubContributions />);
    const link = screen.getByRole('link', { name: /@eclipse-walker/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/eclipse-walker');
  });

  test('renders loading hint before section becomes visible', () => {
    render(<GitHubContributions />);
    expect(
      screen.getByText('// Scroll to load contribution graph'),
    ).toBeInTheDocument();
  });
});
