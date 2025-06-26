import { Max, Min, IsInt } from 'class-validator'
import { Camera } from 'src/cameras/entities/camera.entity'
import {
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum AlertStatus {
  PENDING = 'pending',
  ACKNOWLEDGED = 'acknowledged',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved',
  IGNORED = 'ignored',
}

export enum AlertType {
  WEAPON = 'weapon',
  LOITERING = 'loitering',
  MASKED_FACE = 'masked_face',
  AGGRESSION = 'aggression',
}

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  message: string

  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.PENDING,
  })
  status: AlertStatus

  @Column()
  @IsInt()
  @Min(0)
  @Max(100)
  threatScore: number

  @Column({
    type: 'enum',
    enum: AlertType,
    array: true,
    default: [],
  })
  types: AlertType[]

  @Column({ nullable: true })
  screenshotUrl?: string

  @ManyToOne(() => Camera, (camera) => camera.alerts, {
    cascade: ['insert', 'update', 'recover'],
  })
  camera: Camera
}
