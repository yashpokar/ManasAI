import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

import './index.css'
import { WorkspaceProvider } from './providers/WorkspaceProvider.tsx'
import { SocketProvider } from './providers/SocketProvider.tsx'
import { AlertProvider } from './providers/AlertProvider.tsx'
import { DeviceInfoProvider } from './providers/DeviceInfoProvider.tsx'
import { HistoryProvider } from './providers/HistoryProvider.tsx'

const socket = new WebSocket(import.meta.env.UI_WEB_SOCKET_URL)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AlertProvider>
    <DeviceInfoProvider>
      <SocketProvider client={socket}>
        <HistoryProvider>
          <ThemeProvider>
            <WorkspaceProvider>
              <App />
            </WorkspaceProvider>
          </ThemeProvider>
        </HistoryProvider>
      </SocketProvider>
    </DeviceInfoProvider>
  </AlertProvider>
)
