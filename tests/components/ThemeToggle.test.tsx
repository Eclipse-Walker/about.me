import { describe, expect, test } from '@rstest/core';
import { fireEvent, render } from '@testing-library/react';
import { ThemeToggle } from '../../src/components/ThemeToggle';

describe('ThemeToggle', () => {
  test('renders with dark theme and has correct aria-label', () => {
    const onToggle = () => {};
    const { container } = render(
      <ThemeToggle theme="dark" onToggle={onToggle} />,
    );

    const button = container.querySelector('.theme-toggle');
    expect(button).toBeInTheDocument();
    expect(button?.getAttribute('aria-label')).toBe('Switch to light mode');
  });

  test('renders with light theme and has correct aria-label', () => {
    const onToggle = () => {};
    const { container } = render(
      <ThemeToggle theme="light" onToggle={onToggle} />,
    );

    const button = container.querySelector('.theme-toggle');
    expect(button).toBeInTheDocument();
    expect(button?.getAttribute('aria-label')).toBe('Switch to dark mode');
  });

  test('calls onToggle when clicked', () => {
    let called = false;
    const onToggle = () => {
      called = true;
    };
    const { container } = render(
      <ThemeToggle theme="dark" onToggle={onToggle} />,
    );

    const button = container.querySelector('.theme-toggle');
    if (button) {
      fireEvent.click(button);
    }

    expect(called).toBe(true);
  });
});
