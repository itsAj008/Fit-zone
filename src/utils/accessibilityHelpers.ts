// Accessibility helper utilities

// ARIA label generators
export const generateAriaLabel = (action: string, target: string): string => {
  return `${action} ${target}`;
};

// Focus management utilities
export const focusElement = (selector: string, delay: number = 0): void => {
  setTimeout(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  }, delay);
};

export const trapFocus = (containerElement: HTMLElement): (() => void) => {
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  containerElement.addEventListener('keydown', handleTabKey);
  
  // Return cleanup function
  return () => {
    containerElement.removeEventListener('keydown', handleTabKey);
  };
};

// Skip navigation utility
export const createSkipLink = (): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
  return skipLink;
};

// Screen reader announcements
export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Keyboard navigation utilities
export const handleKeyboardNavigation = (
  e: KeyboardEvent,
  callbacks: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
): void => {
  const { key } = e;
  
  switch (key) {
    case 'Enter':
      if (callbacks.onEnter) {
        e.preventDefault();
        callbacks.onEnter();
      }
      break;
    case ' ':
      if (callbacks.onSpace) {
        e.preventDefault();
        callbacks.onSpace();
      }
      break;
    case 'Escape':
      if (callbacks.onEscape) {
        e.preventDefault();
        callbacks.onEscape();
      }
      break;
    case 'ArrowUp':
      if (callbacks.onArrowUp) {
        e.preventDefault();
        callbacks.onArrowUp();
      }
      break;
    case 'ArrowDown':
      if (callbacks.onArrowDown) {
        e.preventDefault();
        callbacks.onArrowDown();
      }
      break;
    case 'ArrowLeft':
      if (callbacks.onArrowLeft) {
        e.preventDefault();
        callbacks.onArrowLeft();
      }
      break;
    case 'ArrowRight':
      if (callbacks.onArrowRight) {
        e.preventDefault();
        callbacks.onArrowRight();
      }
      break;
  }
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  // This is a simplified implementation
  // In production, you'd want to use a proper color contrast library
  const getLuminance = (color: string): number => {
    // Simplified luminance calculation
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
    const [r, g, b] = rgb.map(val => {
      const n = parseInt(val) / 255;
      return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// ARIA live region utility
export const createLiveRegion = (type: 'polite' | 'assertive' = 'polite'): HTMLElement => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', type);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id = `live-region-${Date.now()}`;
  
  document.body.appendChild(liveRegion);
  
  return liveRegion;
};

// Form accessibility helpers
export const associateLabelWithInput = (labelId: string, inputId: string): void => {
  const label = document.getElementById(labelId);
  const input = document.getElementById(inputId);
  
  if (label && input) {
    label.setAttribute('for', inputId);
    input.setAttribute('aria-labelledby', labelId);
  }
};

export const addErrorToInput = (inputId: string, errorMessage: string): void => {
  const input = document.getElementById(inputId);
  const errorId = `${inputId}-error`;
  
  if (input) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorId);
    
    // Create or update error message element
    let errorElement = document.getElementById(errorId);
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = errorId;
      errorElement.className = 'text-red-600 text-sm mt-1';
      errorElement.setAttribute('role', 'alert');
      input.parentNode?.appendChild(errorElement);
    }
    
    errorElement.textContent = errorMessage;
  }
};

export const removeErrorFromInput = (inputId: string): void => {
  const input = document.getElementById(inputId);
  const errorId = `${inputId}-error`;
  const errorElement = document.getElementById(errorId);
  
  if (input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  }
  
  if (errorElement) {
    errorElement.remove();
  }
};
