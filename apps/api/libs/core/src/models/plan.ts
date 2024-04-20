import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Plan {
  @Field(() => [String])
  steps: string[]
}
