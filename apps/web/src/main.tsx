import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

import './index.css'
import { WorkspaceProvider } from './providers/ProjectProvider.tsx'
import { DeviceInfoProvider } from './providers/DeviceInfoProvider.tsx'
import { HistoryProvider } from './providers/HistoryProvider.tsx'

const client = new ApolloClient({
  uri: import.meta.env.API_URL,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <DeviceInfoProvider>
      <HistoryProvider>
        <ThemeProvider>
          <WorkspaceProvider>
            <App />
          </WorkspaceProvider>
        </ThemeProvider>
      </HistoryProvider>
    </DeviceInfoProvider>
  </ApolloProvider>
)
