import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { VesuvioProvider } from './context/VesuvioProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VesuvioProvider>
      <RouterProvider router={router} />
    </VesuvioProvider>

  </React.StrictMode>,
)
