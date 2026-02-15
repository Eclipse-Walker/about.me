import { afterEach, expect, rstest } from '@rstest/core';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { createElement, forwardRef, useImperativeHandle } from 'react';

expect.extend(jestDomMatchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock URL.createObjectURL and revokeObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: () => 'mock-url',
});

Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: () => {},
});

// Mock reCAPTCHA to avoid loading external Google scripts in test environment.
rstest.mock('react-google-recaptcha', () => {
  const MockReCAPTCHA = forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      getValue: () => 'mock-recaptcha-token',
      reset: () => {},
      execute: () => {},
      executeAsync: async () => 'mock-recaptcha-token',
      getWidgetId: () => 0,
    }));

    return createElement('div', {
      'data-testid': 'recaptcha-mock',
    });
  });

  return {
    default: MockReCAPTCHA,
  };
});
