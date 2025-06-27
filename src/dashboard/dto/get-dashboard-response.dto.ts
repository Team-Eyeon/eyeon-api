import { ApiProperty } from '@nestjs/swagger'
import { Alert } from 'src/alerts/entities/alert.entity'
import { Camera } from 'src/cameras/entities/camera.entity'
import { HistoryEvent } from 'src/history-events/entities/history-event.entity'

export class GetDashboardResponseDto {
  @ApiProperty({
    description: 'Alerts',
    type: [Alert],
  })
  alerts: Alert[]

  @ApiProperty({
    description: 'Cameras',
    type: [Camera],
  })
  cameras: Camera[]

  @ApiProperty({
    description: 'History events',
    type: [HistoryEvent],
  })
  history: HistoryEvent[]

  @ApiProperty({
    description: 'Highest threat level',
    type: Number,
  })
  threatLevel: number
}
