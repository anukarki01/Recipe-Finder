import React from 'react'
import { useApp } from '../context/AppContext'

const Favorites = ({ onViewDetails }) => {
  const { favorites, removeFavorite } = useApp()

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">❤️</div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Start saving your favorite recipes by clicking the heart icon on recipe cards!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Favorite Recipes
        </h2>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="relative">
            <div 
              className="card p-4 cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => onViewDetails(recipe.idMeal)}
            >
              <div className="relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {recipe.strMeal}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="capitalize">{recipe.strCategory || 'Unknown'}</span>
                <span>{recipe.strArea || 'Unknown'}</span>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeFavorite(recipe.idMeal)
              }}
              className="absolute top-2 left-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow text-red-500 hover:text-red-600"
              aria-label="Remove from favorites"
              title="Remove from favorites"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Manage Your Favorites
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Your favorites are saved locally in your browser
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all favorites?')) {
                favorites.forEach(recipe => removeFavorite(recipe.idMeal))
              }
            }}
            className="mt-2 sm:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
            disabled={favorites.length === 0}
          >
            Clear All Favorites
          </button>
        </div>
      </div>
    </div>
  )
}

export default Favorites