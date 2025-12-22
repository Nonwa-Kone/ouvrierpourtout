import React from 'react'
import ReactDOM from 'react-dom/client'

// import App from './App'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'react-phone-number-input/style.css'
import 'react-toastify/dist/ReactToastify.css'

import { App } from './App'

import './assets/css/styles.css'
import './components/shared/Loader/index.css'
import './style/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
