import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

import './index.css'
import { WorkspaceProvider } from './providers/WorkspaceProvider.tsx'
import { DeviceInfoProvider } from './providers/DeviceInfoProvider.tsx'
import { HistoryProvider } from './providers/HistoryProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DeviceInfoProvider>
    <HistoryProvider>
      <ThemeProvider>
        <WorkspaceProvider>
          <App />
        </WorkspaceProvider>
      </ThemeProvider>
    </HistoryProvider>
  </DeviceInfoProvider>
)
