import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const apiURL = process.env.API_URL ?? 'http://localhost:6287'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${apiURL}/graphql`,
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      presetConfig: {
        gqlTagName: 'gql'
      },
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false
      }
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  },
  ignoreNoDocuments: true
}

export default config
