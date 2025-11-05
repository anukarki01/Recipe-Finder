import React, { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'favorites':
        return <FavoritesPage />
      default:
        return <Home />
    }
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 container mx-auto px-4 py-8">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App