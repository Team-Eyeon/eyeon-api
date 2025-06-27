import { Alert } from 'src/alerts/entities/alert.entity'
import { Camera } from 'src/cameras/entities/camera.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum HistoryEventAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum HistoryEventEntity {
  ALERT = 'alert',
  CAMERA = 'camera',
  USER = 'user',
}

@Entity()
export class HistoryEvent {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column({
    type: 'enum',
    enum: HistoryEventAction,
  })
  action: HistoryEventAction

  @Column({
    type: 'enum',
    enum: HistoryEventEntity,
  })
  entity: HistoryEventEntity

  @ManyToOne(() => User, (user) => user.historyEvents, {
    cascade: ['insert', 'update', 'recover'],
    nullable: true,
  })
  user?: User

  @ManyToOne(() => Camera, (camera) => camera.historyEvents, {
    cascade: ['insert', 'update', 'recover'],
    nullable: true,
  })
  camera?: Camera

  @ManyToOne(() => Alert, (alert) => alert.historyEvents, {
    cascade: ['insert', 'update', 'recover'],
    nullable: true,
  })
  alert?: Alert

  @Column({
    type: 'json',
    nullable: true,
  })
  data?: Partial<Alert> | Partial<Camera> | Partial<User>
}
