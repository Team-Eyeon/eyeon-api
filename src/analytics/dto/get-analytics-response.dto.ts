import { ApiProperty } from '@nestjs/swagger'
import { Alert } from 'src/alerts/entities/alert.entity'

export class GetAnalyticsResponseDto {
  @ApiProperty({ description: 'Total number of alerts', example: 100 })
  totalAlerts: number

  @ApiProperty({ description: 'Total number of resolved alerts', example: 80 })
  totalResolvedAlerts: number

  @ApiProperty({ description: 'Number of active cameras', example: 5 })
  numberOfActiveCameras: number

  @ApiProperty({
    description: 'Alert with the highest threat score',
    type: () => Alert,
    nullable: true,
  })
  highestThreatAlert: Alert | null
}
