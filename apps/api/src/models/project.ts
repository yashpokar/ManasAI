import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
