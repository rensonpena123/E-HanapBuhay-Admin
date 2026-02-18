import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tailwind CSS Works! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          E-HanapBuhay Admin Panel is ready to build!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
