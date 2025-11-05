import React from 'react'
import { useApp } from '../context/AppContext'

const RecipeCard = ({ recipe, onViewDetails }) => {
  const { addFavorite, removeFavorite, isFavorite } = useApp()
  const favorite = isFavorite(recipe.idMeal)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (favorite) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite(recipe)
    }
  }

  return (
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
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {recipe.strMeal}
      </h3>
      
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span className="capitalize">{recipe.strCategory || 'Unknown'}</span>
        <span>{recipe.strArea || 'Unknown'}</span>
      </div>
    </div>
  )
}

export default RecipeCard