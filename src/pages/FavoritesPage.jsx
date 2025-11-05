import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Favorites from '../components/Favorites'
import RecipeDetail from '../components/RecipeDetail'
import { mealDB } from '../api/mealdb'

const FavoritesPage = () => {
  const { favorites } = useApp()
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeDetail, setRecipeDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleViewDetails = async (recipeId) => {
    setIsLoading(true)
    try {
      const recipe = await mealDB.getRecipeById(recipeId)
      setRecipeDetail(recipe)
      setSelectedRecipe(recipe)
    } catch (error) {
      console.error('Error loading recipe details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {isLoading && !selectedRecipe ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <Favorites onViewDetails={handleViewDetails} />
      )}

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
    </div>
  )
}

export default FavoritesPage