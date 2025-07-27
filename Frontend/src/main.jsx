import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ApiContext from './context/ApiContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <ApiContext>
  <StrictMode>
    <App />
  </StrictMode>,
  </ApiContext>
  </BrowserRouter>
)
