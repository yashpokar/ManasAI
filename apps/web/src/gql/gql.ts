/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation generateDeviceId {\n    generateDeviceId\n  }\n':
    types.GenerateDeviceIdDocument,
  '\n  mutation CreateProject($name: String!) {\n    createProject(name: $name) {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n':
    types.CreateProjectDocument,
  '\n  mutation ChangeActiveProject($projectId: String!) {\n    changeActiveProject(projectId: $projectId) {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n':
    types.ChangeActiveProjectDocument,
  '\n  query ListProjects {\n    listProjects {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n':
    types.ListProjectsDocument,
  '\n  query IsProjectNameTaken($name: String!) {\n    isProjectNameTaken(name: $name)\n  }\n':
    types.IsProjectNameTakenDocument
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation generateDeviceId {\n    generateDeviceId\n  }\n'
): (typeof documents)['\n  mutation generateDeviceId {\n    generateDeviceId\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateProject($name: String!) {\n    createProject(name: $name) {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateProject($name: String!) {\n    createProject(name: $name) {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ChangeActiveProject($projectId: String!) {\n    changeActiveProject(projectId: $projectId) {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  mutation ChangeActiveProject($projectId: String!) {\n    changeActiveProject(projectId: $projectId) {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ListProjects {\n    listProjects {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  query ListProjects {\n    listProjects {\n      id\n      name\n      isActive\n      createdAt\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query IsProjectNameTaken($name: String!) {\n    isProjectNameTaken(name: $name)\n  }\n'
): (typeof documents)['\n  query IsProjectNameTaken($name: String!) {\n    isProjectNameTaken(name: $name)\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
