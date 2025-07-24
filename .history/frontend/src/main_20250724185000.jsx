import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {userProvider} from './context/userContect.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <userProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</userProvider>
    

)
