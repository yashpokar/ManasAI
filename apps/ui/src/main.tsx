import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

import './index.css'
import { WorkspaceProvider } from './providers/WorkspaceProvider.tsx'
import { SocketProvider } from './providers/SocketProvider.tsx'

const socket = new WebSocket(import.meta.env.UI_WEB_SOCKET_URL)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider client={socket}>
      <ThemeProvider>
        <WorkspaceProvider>
          <App />
        </WorkspaceProvider>
      </ThemeProvider>
    </SocketProvider>
  </React.StrictMode>
)
