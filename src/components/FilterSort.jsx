import React, { useState, useEffect } from 'react'
import { mealDB } from '../api/mealdb'
import { useApp } from '../context/AppContext'

const FilterSort = () => {
  const { filters, setFilters } = useApp()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await mealDB.getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort by
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => setFilters({ sortBy: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => setFilters({ category: '', sortBy: 'name' })}
        className="btn-secondary text-sm"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FilterSort