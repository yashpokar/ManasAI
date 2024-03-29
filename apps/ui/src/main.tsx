import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

import './index.css'
import { WorkspaceProvider } from './providers/WorkspaceProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <WorkspaceProvider>
        <App />
      </WorkspaceProvider>
    </ThemeProvider>
  </React.StrictMode>
)
