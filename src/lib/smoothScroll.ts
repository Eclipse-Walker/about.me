// Smooth-scroll helpers that fall back to an instant jump when the user has
// requested reduced motion (CSS media queries don't affect programmatic
// window.scrollTo, so we check the preference here).

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function scrollToY(top: number) {
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

export function scrollToElementId(id: string, offset = 80) {
  const element = document.getElementById(id);
  if (element) {
    scrollToY(element.offsetTop - offset);
  }
}
