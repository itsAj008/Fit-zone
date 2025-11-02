// Error handling utilities
export interface AppError {
  message: string;
  code?: string;
  status?: number;
  type: 'network' | 'validation' | 'server' | 'unknown';
}

export class AppErrorHandler {
  static createError(
    message: string,
    type: AppError['type'] = 'unknown',
    code?: string,
    status?: number
  ): AppError {
    return {
      message,
      type,
      code,
      status,
    };
  }

  static handleNetworkError(error: unknown): AppError {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return this.createError(
        'Network connection failed. Please check your internet connection.',
        'network',
        'NETWORK_ERROR'
      );
    }
    
    if (error instanceof Error) {
      return this.createError(error.message, 'network');
    }
    
    return this.createError(
      'An unexpected network error occurred.',
      'network'
    );
  }

  static handleFormError(error: unknown): AppError {
    if (error instanceof Error) {
      return this.createError(error.message, 'validation');
    }
    
    return this.createError(
      'Form validation failed. Please check your inputs.',
      'validation'
    );
  }

  static handleServerError(status: number, message?: string): AppError {
    const defaultMessages: Record<number, string> = {
      400: 'Bad request. Please check your input.',
      401: 'Unauthorized. Please log in again.',
      403: 'Forbidden. You don\'t have permission to perform this action.',
      404: 'Resource not found.',
      500: 'Internal server error. Please try again later.',
      502: 'Service temporarily unavailable.',
      503: 'Service unavailable. Please try again later.',
    };

    return this.createError(
      message || defaultMessages[status] || 'Server error occurred.',
      'server',
      `HTTP_${status}`,
      status
    );
  }

  static getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case 'network':
        return 'Connection problem. Please check your internet and try again.';
      case 'validation':
        return 'Please check your form inputs and try again.';
      case 'server':
        return error.status && error.status >= 500
          ? 'Our servers are experiencing issues. Please try again in a few minutes.'
          : error.message;
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}

// Form validation utilities
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phone.trim()) return 'Phone number is required';
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (name.trim().length > 50) return 'Name must be less than 50 characters';
  return null;
};

export const validateMessage = (message: string): string | null => {
  if (!message.trim()) return 'Message is required';
  if (message.trim().length < 10) return 'Message must be at least 10 characters';
  if (message.trim().length > 1000) return 'Message must be less than 1000 characters';
  return null;
};

// Retry mechanism for failed operations
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};
