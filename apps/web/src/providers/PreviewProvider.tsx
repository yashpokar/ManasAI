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

export const PreviewContext = createContext<IPreviewContext>({
  plan: {
    steps: []
  }
})

export const PreviewProvider: React.FC<ProviderProps> = ({ children }) => {
  const [steps, setSteps] = useState<string[]>([])

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
      console.log({ onPlanPreview })
      setSteps(onPlanPreview.steps)
    }
  })

  return (
    <PreviewContext.Provider value={{ plan: { steps } }}>
      {children}
    </PreviewContext.Provider>
  )
}
