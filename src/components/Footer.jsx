import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍳</span>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Recipe Finder
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover delicious recipes with what you have
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
              Powered by TheMealDB API
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {currentYear} Recipe Finder. Made with ❤️ for food lovers.
            </p>
          </div>
        </div>

        {/* Additional footer links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6">
              <a
                href="https://www.themealdb.com/api.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                API Documentation
              </a>
              <a
                href="https://www.themealdb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                TheMealDB
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Back to Top
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Built with React.js & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer