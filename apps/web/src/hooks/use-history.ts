import { HistoryContext } from '@/providers/HistoryProvider'
import { IHistoryContext } from '@/types'
import { useContext } from 'react'

const useHistory = (): IHistoryContext => {
  const context = useContext(HistoryContext)

  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }

  return context
}

export default useHistory
