import React from 'react'
import { useApp } from '../context/AppContext'

const RecipeDetail = ({ recipe, onClose }) => {
  const { addFavorite, removeFavorite, isFavorite } = useApp()
  const favorite = isFavorite(recipe.idMeal)

  if (!recipe) return null

  // Extract ingredients and measurements
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure })
    }
  }

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite(recipe)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
              {recipe.strMeal}
            </h2>
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                favorite
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{favorite ? '❤️' : '🤍'}</span>
              <span>{favorite ? 'Remove Favorite' : 'Add to Favorites'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>
                      <strong>{item.measure}</strong> {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructions
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                {recipe.strInstructions?.split('\n').map((step, index) => (
                  step.trim() && (
                    <p key={index} className="mb-3 text-gray-700 dark:text-gray-300">
                      {step}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Video Tutorial
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                  className="w-full h-64 rounded-lg"
                  allowFullScreen
                  title={`${recipe.strMeal} video tutorial`}
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span><strong>Category:</strong> {recipe.strCategory}</span>
            <span><strong>Cuisine:</strong> {recipe.strArea}</span>
            {recipe.strTags && (
              <span><strong>Tags:</strong> {recipe.strTags}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail