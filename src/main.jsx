import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>,

  </CookiesProvider>
)
