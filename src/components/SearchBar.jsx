import React, { useState } from 'react'

const SearchBar = ({ onSearch, isLoading }) => {
  const [ingredients, setIngredients] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ingredients.trim()) {
      onSearch(ingredients.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !ingredients.trim()}
            className="btn-primary px-6 py-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Find Recipes'}
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Separate multiple ingredients with commas
        </p>
      </form>
    </div>
  )
}

export default SearchBar