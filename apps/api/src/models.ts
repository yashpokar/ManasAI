import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class WorkspaceEntity {
  @PrimaryColumn()
  id: string

  @Column({ nullable: false })
  deviceToken: string

  @Column({ unique: true, nullable: false })
  name: string

  @CreateDateColumn()
  createdAt: Date
}

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ type: 'datetime', nullable: false, name: 'started_at' })
  startedDate: Date

  @Column({ type: 'datetime', nullable: false, name: 'completed_at' })
  completedAt: Date

  @Column({ default: 'scheduled' })
  status:
    | 'scheduled'
    | 'pending'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'in_progress'

  @CreateDateColumn()
  createdAt: Date
}
