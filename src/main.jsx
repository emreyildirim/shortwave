import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/board.css'
import './styles/tools.css'

const el = document.getElementById('root')
const tree = <React.StrictMode><App /></React.StrictMode>

// Content routes ship prerendered markup; the console ships an empty root.
if (el.firstElementChild) hydrateRoot(el, tree)
else createRoot(el).render(tree)
