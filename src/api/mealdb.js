import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const mealDB = {
  // Search by ingredient
  searchByIngredient: async (ingredient) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error searching by ingredient:', error)
      throw error
    }
  },

  // Search by name
  searchByName: async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${name}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error searching by name:', error)
      throw error
    }
  },

  // Get recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
      return response.data.meals ? response.data.meals[0] : null
    } catch (error) {
      console.error('Error fetching recipe:', error)
      throw error
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?c=list`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Filter by category
  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error filtering by category:', error)
      throw error
    }
  }
}