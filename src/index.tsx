import React from 'react'
import ReactDOM from 'react-dom'

// Fetch polyfill
import 'whatwg-fetch'

import './index.scss'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
