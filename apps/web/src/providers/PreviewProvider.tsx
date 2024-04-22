import { DEVICE_ID, PROJECT_ID } from '@/constants'
import { IPreviewContext, ProviderProps } from '@/types'
import { gql, useSubscription } from '@apollo/client'
import { createContext, useState } from 'react'

const PLAN_PREVIEW_SUBSCRIPTION = gql`
  subscription PlanPreviewSubscription(
    $projectId: String!
    $deviceId: String!
  ) {
    onPlanPreview(projectId: $projectId, deviceId: $deviceId) {
      steps
    }
  }
`

const EDITOR_PREVIEW_SUBSCRIPTION = gql`
  subscription EditorPreviewSubscription(
    $projectId: String!
    $deviceId: String!
  ) {
    onEditorPreview(projectId: $projectId, deviceId: $deviceId) {
      content
    }
  }
`

const BROWSER_PREVIEW_SUBSCRIPTION = gql`
  subscription BrowserPreviewSubscription(
    $projectId: String!
    $deviceId: String!
  ) {
    onBrowserPreview(projectId: $projectId, deviceId: $deviceId) {
      url
      content
    }
  }
`

const TERMINAL_PREVIEW_SUBSCRIPTION = gql`
  subscription TerminalPreviewSubscription(
    $projectId: String!
    $deviceId: String!
  ) {
    onTerminalPreview(projectId: $projectId, deviceId: $deviceId) {
      command
      output
    }
  }
`

export const PreviewContext = createContext<IPreviewContext>({
  plan: {
    steps: []
  },
  editor: {
    content: null,
    fileName: null,
    path: null
  },
  browser: {
    url: null,
    content: null
  },
  terminal: []
})

export const PreviewProvider: React.FC<ProviderProps> = ({ children }) => {
  const [steps, setSteps] = useState<string[]>([])
  const [editor, setEditor] = useState<IPreviewContext['editor']>({
    content: null,
    fileName: null,
    path: null
  })
  const [browser, setBrowser] = useState<IPreviewContext['browser']>({
    url: null,
    content: null
  })
  const [commands, setCommands] = useState<IPreviewContext['terminal']>([])

  useSubscription(PLAN_PREVIEW_SUBSCRIPTION, {
    variables: {
      projectId: localStorage.getItem(PROJECT_ID),
      deviceId: localStorage.getItem(DEVICE_ID)
    },
    onData: ({
      data: {
        data: { onPlanPreview }
      }
    }) => {
      setSteps(onPlanPreview.steps)
    }
  })

  useSubscription(EDITOR_PREVIEW_SUBSCRIPTION, {
    variables: {
      projectId: localStorage.getItem(PROJECT_ID),
      deviceId: localStorage.getItem(DEVICE_ID)
    },
    onData: ({
      data: {
        data: { onEditorPreview }
      }
    }) => {
      setEditor(onEditorPreview)
    }
  })

  useSubscription(BROWSER_PREVIEW_SUBSCRIPTION, {
    variables: {
      projectId: localStorage.getItem(PROJECT_ID),
      deviceId: localStorage.getItem(DEVICE_ID)
    },
    onData: ({
      data: {
        data: { onBrowserPreview }
      }
    }) => {
      setBrowser(onBrowserPreview)
    }
  })

  useSubscription(TERMINAL_PREVIEW_SUBSCRIPTION, {
    variables: {
      projectId: localStorage.getItem(PROJECT_ID),
      deviceId: localStorage.getItem(DEVICE_ID)
    },
    onData: ({
      data: {
        data: { onTerminalPreview }
      }
    }) => {
      setCommands(commands => [...commands, onTerminalPreview])
    }
  })

  return (
    <PreviewContext.Provider
      value={{ plan: { steps }, editor, browser, terminal: commands }}
    >
      {children}
    </PreviewContext.Provider>
  )
}
