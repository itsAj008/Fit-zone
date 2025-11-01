// Utility function for smooth scrolling that works on all devices including mobile
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Small delay to ensure DOM is ready, especially important on mobile
  setTimeout(() => {
    const navHeight = 80; // Height of fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    // Use JavaScript animation for better mobile compatibility
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 200; // Fast, almost instant scroll
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeInOutCubic = percentage < 0.5
        ? 4 * percentage * percentage * percentage
        : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    // Start the animation
    window.requestAnimationFrame(step);

    // Fallback: if requestAnimationFrame doesn't work, use scrollTo directly after a delay
    setTimeout(() => {
      // Ensure we reached the target (fallback for mobile browsers)
      const currentPosition = window.pageYOffset;
      const targetReached = Math.abs(currentPosition - offsetPosition) < 50;
      if (!targetReached) {
        window.scrollTo(0, offsetPosition);
      }
    }, duration + 50);
  }, 10); // Minimal delay to ensure click handlers finish
};

