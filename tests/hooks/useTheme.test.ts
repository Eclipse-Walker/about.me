import { describe, expect, test } from '@rstest/core';
import { act, renderHook } from '@testing-library/react';
import { useTheme } from '../../src/hooks/useTheme';

describe('useTheme', () => {
  test('returns dark theme by default when system prefers dark', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('dark');
  });

  test('toggleTheme switches from dark to light', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1](); // toggleTheme
    });

    expect(result.current[0]).toBe('light');
  });

  test('setTheme sets specific theme', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[2]('light'); // setTheme
    });

    expect(result.current[0]).toBe('light');
  });
});
