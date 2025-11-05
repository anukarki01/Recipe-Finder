import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="card p-4">
          <div className="skeleton w-full h-48 rounded-lg mb-4"></div>
          <div className="skeleton h-6 rounded mb-2"></div>
          <div className="skeleton h-4 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader