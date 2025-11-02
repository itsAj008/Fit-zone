import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingContextType {
  loading: LoadingState;
  setLoading: (key: string, isLoading: boolean) => void;
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoadingState] = useState<LoadingState>({});

  const setLoading = (key: string, isLoading: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: isLoading
    }));
  };

  const isLoading = (key: string) => {
    return loading[key] || false;
  };

  const isAnyLoading = () => {
    return Object.values(loading).some(Boolean);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading, isLoading, isAnyLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Loading spinner component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div 
      className={`${sizeClasses[size]} border-2 border-blue-600 border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Button with loading state
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${className} ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center space-x-2">
          <LoadingSpinner size="sm" />
          <span>{loadingText}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// Skeleton loader components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className = '' 
}) => {
  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-6 bg-white border border-gray-200 rounded-xl ${className}`} role="status" aria-label="Loading card">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full mb-4" />
        <div className="h-6 bg-gray-200 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
};
