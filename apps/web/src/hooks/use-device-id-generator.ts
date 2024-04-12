import { ApolloError, gql, useMutation } from '@apollo/client'

const GENERATE_DEIVICE_ID_MUTATION = gql`
  mutation generateDeviceId {
    generateDeviceId
  }
`

interface UseDeviceIdGenerator {
  generateDeviceId: () => void
  deviceId: string | undefined
  loading: boolean
  error: ApolloError | undefined
}

const useDeviceIdGenerator = (): UseDeviceIdGenerator => {
  const [generateDeviceId, { data, error, loading }] = useMutation(
    GENERATE_DEIVICE_ID_MUTATION
  )

  return {
    generateDeviceId,
    deviceId: data?.generateDeviceId,
    loading,
    error
  }
}

export default useDeviceIdGenerator
