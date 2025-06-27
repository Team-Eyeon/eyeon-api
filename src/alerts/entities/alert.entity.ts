import { Max, Min, IsInt } from 'class-validator'
import { Camera } from 'src/cameras/entities/camera.entity'
import {
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { HistoryEvent } from 'src/history-events/entities/history-event.entity'

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
  @ApiProperty({ description: 'Alert ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({
    description: 'Alert message',
    example: 'Suspicious activity detected',
  })
  @Column()
  message: string

  @ApiProperty({
    description: 'Alert status',
    enum: AlertStatus,
    example: AlertStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.PENDING,
  })
  status: AlertStatus

  @ApiProperty({
    description: 'Threat score (0-100)',
    minimum: 0,
    maximum: 100,
    example: 75,
  })
  @Column()
  @IsInt()
  @Min(0)
  @Max(100)
  threatScore: number

  @ApiProperty({
    description: 'Types of the alert',
    enum: AlertType,
    isArray: true,
  })
  @Column({
    type: 'enum',
    enum: AlertType,
    array: true,
    default: [],
  })
  types: AlertType[]

  @ApiPropertyOptional({
    description: 'Screenshot URL',
    example: 'http://example.com/screenshot.jpg',
  })
  @Column({ nullable: true })
  screenshotUrl?: string

  @ApiProperty({
    description: 'Camera associated with the alert',
    type: () => Camera,
  })
  @ManyToOne(() => Camera, (camera) => camera.alerts, {
    cascade: ['insert', 'update', 'recover'],
  })
  camera: Camera

  @OneToMany(() => HistoryEvent, (historyEvent) => historyEvent.alert, {
    cascade: true,
  })
  historyEvents: HistoryEvent[]
}
