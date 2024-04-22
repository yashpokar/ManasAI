import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProjectEntity } from '@/models/project'

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

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  content: string

  @Column()
  author: Author

  @ManyToOne(() => ProjectEntity, project => project.messages)
  project: ProjectEntity

  @Column()
  createdAt: Date
}
