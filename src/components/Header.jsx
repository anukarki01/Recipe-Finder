import React from 'react'
import { useApp } from '../context/AppContext'

const Header = ({ currentPage, onPageChange }) => {
  const { theme, toggleTheme } = useApp()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer"
              onClick={() => onPageChange('home')}
            >
              🍳 Recipe Finder
            </h1>
            
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => onPageChange('home')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Search Recipes
              </button>
              <button
                onClick={() => onPageChange('favorites')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'favorites'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Favorites ({useApp().favorites.length})
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden space-x-4 mt-4">
          <button
            onClick={() => onPageChange('home')}
            className={`flex-1 px-3 py-2 text-center rounded-lg font-medium transition-colors ${
              currentPage === 'home'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => onPageChange('favorites')}
            className={`flex-1 px-3 py-2 text-center rounded-lg font-medium transition-colors ${
              currentPage === 'favorites'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Favorites ({useApp().favorites.length})
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header