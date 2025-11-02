export const smoothScrollTo = (elementId: string, onComplete?: () => void) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const navHeight = 80;
  const targetY = element.getBoundingClientRect().top + window.scrollY - navHeight;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 350;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
    else if (onComplete) onComplete();
  };

  requestAnimationFrame(step);
};
