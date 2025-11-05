import React, { useState, useEffect } from 'react'
import { mealDB } from '../api/mealdb'
import { useApp } from '../context/AppContext'
import SearchBar from '../components/SearchBar'
import FilterSort from '../components/FilterSort'
import RecipeCard from '../components/RecipeCard'
import RecipeDetail from '../components/RecipeDetail'
import SkeletonLoader from '../components/SkeletonLoader'
import Toast from '../components/Toast'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeDetail, setRecipeDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)

  const { filters } = useApp()

  // Filter and sort recipes
  useEffect(() => {
    let filtered = [...recipes]

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(recipe => 
        recipe.strCategory?.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Sort recipes
    filtered.sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.strMeal.localeCompare(b.strMeal)
      } else if (filters.sortBy === 'category') {
        return (a.strCategory || '').localeCompare(b.strCategory || '')
      }
      return 0
    })

    setFilteredRecipes(filtered)
  }, [recipes, filters])

  const handleSearch = async (ingredients) => {
    setIsLoading(true)
    setError('')
    setRecipes([])

    try {
      // Split ingredients and search for each
      const ingredientList = ingredients.split(',').map(ing => ing.trim())
      let allRecipes = []

      for (const ingredient of ingredientList) {
        const results = await mealDB.searchByIngredient(ingredient)
        allRecipes = [...allRecipes, ...results]
      }

      // Remove duplicates
      const uniqueRecipes = allRecipes.filter((recipe, index, self) =>
        index === self.findIndex(r => r.idMeal === recipe.idMeal)
      )

      setRecipes(uniqueRecipes)
      
      if (uniqueRecipes.length === 0) {
        setError('No recipes found with those ingredients. Try different ingredients!')
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = async (recipeId) => {
    setIsLoading(true)
    try {
      const recipe = await mealDB.getRecipeById(recipeId)
      setRecipeDetail(recipe)
      setSelectedRecipe(recipe)
    } catch (err) {
      setToast({ message: 'Failed to load recipe details', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Find Your Perfect Recipe
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Enter ingredients you have, and discover delicious recipes you can make right now!
        </p>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </section>

      {/* Filters */}
      {(recipes.length > 0 || isLoading) && (
        <FilterSort />
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center py-8">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        </div>
      )}

      {/* Results */}
      <section>
        {isLoading && recipes.length === 0 ? (
          <SkeletonLoader />
        ) : filteredRecipes.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Found {filteredRecipes.length} Recipes
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🍳</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No recipes yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Enter some ingredients above to find delicious recipes!
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No recipes match your current filters. Try changing them!
            </p>
          </div>
        )}
      </section>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={recipeDetail}
          onClose={() => {
            setSelectedRecipe(null)
            setRecipeDetail(null)
          }}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default Home