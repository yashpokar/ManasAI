import { Field, InputType, ObjectType } from '@nestjs/graphql'

export enum Author {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM'
}

@ObjectType()
export class Message {
  @Field()
  id: string

  @Field()
  content: string

  @Field()
  author: Author
}

@InputType()
export class CreateMessageInput {
  @Field()
  content: string

  @Field()
  author: Author
}
