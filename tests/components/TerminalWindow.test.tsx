import { describe, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { TerminalWindow } from '../../src/components/TerminalWindow';

describe('TerminalWindow', () => {
  test('renders with default title', () => {
    render(
      <TerminalWindow>
        <p>Test content</p>
      </TerminalWindow>,
    );
    expect(screen.getByText('phisanurat@portfolio:~$')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    render(
      <TerminalWindow title="custom-title.sh">
        <p>Content</p>
      </TerminalWindow>,
    );
    expect(screen.getByText('custom-title.sh')).toBeInTheDocument();
  });

  test('renders terminal dots', () => {
    const { container } = render(
      <TerminalWindow>
        <p>Content</p>
      </TerminalWindow>,
    );
    const dots = container.querySelectorAll('.terminal-dot');
    expect(dots.length).toBe(3);
  });

  test('applies custom className', () => {
    const { container } = render(
      <TerminalWindow className="custom-class">
        <p>Content</p>
      </TerminalWindow>,
    );
    const window = container.querySelector('.terminal-window');
    expect(window?.classList.contains('custom-class')).toBe(true);
  });
});
