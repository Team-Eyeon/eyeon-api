import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsObject, IsOptional } from 'class-validator'
import {
  HistoryEventAction,
  HistoryEventEntity,
} from '../entities/history-event.entity'
import { Camera } from 'src/cameras/entities/camera.entity'
import { User } from 'src/users/entities/user.entity'
import { Alert } from 'src/alerts/entities/alert.entity'

export class CreateHistoryEventDto {
  @ApiProperty({
    enum: HistoryEventAction,
    description: 'The action that occurred',
  })
  @IsEnum(HistoryEventAction)
  action: HistoryEventAction

  @ApiProperty({
    enum: HistoryEventEntity,
    description: 'The entity that was affected',
  })
  @IsEnum(HistoryEventEntity)
  entity: HistoryEventEntity

  @ApiProperty({
    description: 'The data that was affected',
    type: Object,
    required: false,
  })
  @IsOptional()
  @IsObject()
  data?: Partial<Alert> | Partial<Camera> | Partial<User>
}
