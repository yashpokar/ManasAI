import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from '@/App.tsx'

import ThemeProvider from '@/providers/ThemeProvider.tsx'
import ProjectProvider from '@/providers/ProjectProvider.tsx'
import DeviceProvider from '@/providers/DeviceProvider.tsx'
import HistoryProvider from '@/providers/HistoryProvider.tsx'

import './index.css'

const client = new ApolloClient({
  uri: import.meta.env.API_URL,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <ApolloProvider client={client}>
      <DeviceProvider>
        <HistoryProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </HistoryProvider>
      </DeviceProvider>
    </ApolloProvider>
  </ThemeProvider>
)
