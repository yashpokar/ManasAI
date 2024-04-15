import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MessageEntity } from '@/models/message'

@ObjectType()
export class Project {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  isActive: boolean

  @Field()
  createdAt: Date
}

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  deviceId: string

  @Column()
  isActive: boolean

  @Column()
  createdAt: Date

  @OneToMany(() => MessageEntity, message => message.project)
  messages: MessageEntity[]
}
