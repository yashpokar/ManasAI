import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  split
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

import App from '@/App.tsx'

import { DEVICE_ID } from '@/constants'
import ThemeProvider from '@/providers/ThemeProvider.tsx'
import ProjectProvider from '@/providers/ProjectProvider.tsx'
import DeviceProvider from '@/providers/DeviceProvider.tsx'
import ChatProvider from '@/providers/ChatProvider'

import './index.css'
import { createClient } from 'graphql-ws'

const inDevelopment = import.meta.env.MODE === 'development'

if (inDevelopment) {
  loadDevMessages()
  loadErrorMessages()
}

const httpLink = new HttpLink({ uri: `${import.meta.env.API_URL}/graphql` })

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.API_WS_URL}/graphql`
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const deviceLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-device-id': localStorage.getItem(DEVICE_ID)
    }
  }))

  return forward(operation)
})

const link = ApolloLink.from([deviceLink, splitLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <DeviceProvider>
          <ChatProvider>
            <ProjectProvider>
              <App />
            </ProjectProvider>
          </ChatProvider>
        </DeviceProvider>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
)
