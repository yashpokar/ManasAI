import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Editor {
  @Field()
  fileName: string

  @Field()
  content: string

  @Field()
  path: string
}
