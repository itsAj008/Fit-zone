import { memo } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = memo(() => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative w-14 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out
        ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}
        hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${isDarkMode ? 'focus:ring-blue-500' : 'focus:ring-gray-400'}
      `}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        className={`
          flex items-center justify-center w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
          ${isDarkMode ? 'translate-x-7 bg-gray-100' : 'translate-x-0 bg-white'}
        `}
      >
        {isDarkMode ? (
          <FaMoon className="w-3 h-3 text-blue-600" />
        ) : (
          <FaSun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
    </button>
  );
});

DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
