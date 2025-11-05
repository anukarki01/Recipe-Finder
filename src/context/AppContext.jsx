import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  favorites: [],
  theme: 'light',
  filters: {
    category: '',
    sortBy: 'name'
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.find(fav => fav.idMeal === action.payload.idMeal)) {
        return state
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(recipe => recipe.idMeal !== action.payload)
      }
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      }
    
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload
      }
    
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('recipe-theme')
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('recipe-favorites')
    if (savedFavorites) {
      dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(savedFavorites) })
    }
  }, [])

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem('recipe-favorites', JSON.stringify(state.favorites))
  }, [state.favorites])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
    localStorage.setItem('recipe-theme', state.theme)
  }, [state.theme])

  const addFavorite = (recipe) => {
    dispatch({ type: 'ADD_FAVORITE', payload: recipe })
  }

  const removeFavorite = (recipeId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: recipeId })
  }

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' })
  }

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  const isFavorite = (recipeId) => {
    return state.favorites.some(fav => fav.idMeal === recipeId)
  }

  const value = {
    ...state,
    addFavorite,
    removeFavorite,
    toggleTheme,
    setFilters,
    isFavorite
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}