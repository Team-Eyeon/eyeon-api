import { Alert } from 'src/alerts/entities/alert.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { HistoryEvent } from 'src/history-events/entities/history-event.entity'

@Entity()
export class Camera {
  @ApiProperty({ description: 'Camera ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    description: 'Name of the camera',
    example: 'Front Gate Camera',
  })
  @Column({ nullable: true })
  name?: string

  @ApiProperty({
    description: 'Location of the camera',
    example: 'Main Entrance',
  })
  @Column()
  location: string

  @ApiProperty({ description: 'Whether the camera is active', example: true })
  @Column({ default: true })
  isActive: boolean

  @ApiProperty({
    description: 'Alerts associated with the camera',
    type: () => [Alert],
  })
  @OneToMany(() => Alert, (alert) => alert.camera, { cascade: true })
  alerts: Alert[]

  @OneToMany(() => HistoryEvent, (historyEvent) => historyEvent.camera, {
    cascade: true,
  })
  historyEvents: HistoryEvent[]
}
