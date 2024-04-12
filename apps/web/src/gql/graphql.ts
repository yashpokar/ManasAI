/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any }
}

export type CreateMessageInput = {
  author: Scalars['String']['input']
  content: Scalars['String']['input']
}

export type Message = {
  __typename?: 'Message'
  author: Scalars['String']['output']
  content: Scalars['String']['output']
  id: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  changeActiveProject: Project
  createMessage: Message
  createProject: Project
  generateDeviceId: Scalars['String']['output']
}

export type MutationChangeActiveProjectArgs = {
  projectId: Scalars['String']['input']
}

export type MutationCreateMessageArgs = {
  input: CreateMessageInput
}

export type MutationCreateProjectArgs = {
  name: Scalars['String']['input']
}

export type Project = {
  __typename?: 'Project'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  isActive: Scalars['Boolean']['output']
  name: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  isProjectNameTaken: Scalars['Boolean']['output']
  listProjects: Array<Project>
}

export type QueryIsProjectNameTakenArgs = {
  name: Scalars['String']['input']
}

export type Subscription = {
  __typename?: 'Subscription'
  onMessage: Message
}

export type GenerateDeviceIdMutationVariables = Exact<{ [key: string]: never }>

export type GenerateDeviceIdMutation = {
  __typename?: 'Mutation'
  generateDeviceId: string
}

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CreateProjectMutation = {
  __typename?: 'Mutation'
  createProject: {
    __typename?: 'Project'
    id: string
    name: string
    isActive: boolean
    createdAt: any
  }
}

export type ChangeActiveProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type ChangeActiveProjectMutation = {
  __typename?: 'Mutation'
  changeActiveProject: {
    __typename?: 'Project'
    id: string
    name: string
    isActive: boolean
    createdAt: any
  }
}

export type ListProjectsQueryVariables = Exact<{ [key: string]: never }>

export type ListProjectsQuery = {
  __typename?: 'Query'
  listProjects: Array<{
    __typename?: 'Project'
    id: string
    name: string
    isActive: boolean
    createdAt: any
  }>
}

export type IsProjectNameTakenQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type IsProjectNameTakenQuery = {
  __typename?: 'Query'
  isProjectNameTaken: boolean
}

export const GenerateDeviceIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'generateDeviceId' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'generateDeviceId' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GenerateDeviceIdMutation,
  GenerateDeviceIdMutationVariables
>
export const CreateProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  CreateProjectMutation,
  CreateProjectMutationVariables
>
export const ChangeActiveProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeActiveProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeActiveProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  ChangeActiveProjectMutation,
  ChangeActiveProjectMutationVariables
>
export const ListProjectsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ListProjects' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listProjects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ListProjectsQuery, ListProjectsQueryVariables>
export const IsProjectNameTakenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'IsProjectNameTaken' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'isProjectNameTaken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' }
                }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  IsProjectNameTakenQuery,
  IsProjectNameTakenQueryVariables
>
