import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink
} from '@apollo/client'

import App from '@/App.tsx'

import { DEVICE_ID } from '@/constants'
import ThemeProvider from '@/providers/ThemeProvider.tsx'
import ProjectProvider from '@/providers/ProjectProvider.tsx'
import DeviceProvider from '@/providers/DeviceProvider.tsx'
import HistoryProvider from '@/providers/HistoryProvider.tsx'

import './index.css'
import { StrictMode } from 'react'

const httpLink = new HttpLink({ uri: `${import.meta.env.API_URL}/graphql` })

const deviceLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-device-id': localStorage.getItem(DEVICE_ID)
    }
  }))

  return forward(operation)
})

const link = ApolloLink.from([deviceLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>
)
