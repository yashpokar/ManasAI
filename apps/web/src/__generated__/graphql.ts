/* eslint-disable */
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
  createMessage: Message
  createProject: Project
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
  listProjects: Array<Project>
}

export type Subscription = {
  __typename?: 'Subscription'
  onMessage: Message
}
