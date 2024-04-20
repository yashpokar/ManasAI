import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Terminal {
  @Field()
  command: string

  @Field()
  output: string
}
