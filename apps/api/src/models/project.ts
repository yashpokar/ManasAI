import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Project {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  createdAt: Date
}
