import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Browser {
  @Field()
  url: string

  @Field()
  content: string
}
