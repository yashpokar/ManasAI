import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const apiURL = process.env.API_URL ?? 'http://localhost:6287'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${apiURL}/graphql`,
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql'
      }
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
