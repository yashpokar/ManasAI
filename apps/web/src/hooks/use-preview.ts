import { PreviewContext } from '@/providers/PreviewProvider'
import { IPreviewContext } from '@/types'
import { useContext } from 'react'

const usePreview = (): IPreviewContext => {
  const context = useContext(PreviewContext)

  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider')
  }

  return context
}

export default usePreview
