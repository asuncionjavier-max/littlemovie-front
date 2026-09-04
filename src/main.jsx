import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider.jsx'
import './index.css'
import App from './App.jsx'
import Header from "./components/header/Header.jsx"
import Footer from './components/Footer/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
  </AuthProvider>
  </StrictMode>,
);
