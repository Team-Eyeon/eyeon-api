import { Alert } from 'src/alerts/entities/alert.entity'

export class GetAnalyticsResponseDto {
  totalAlerts: number
  totalResolvedAlerts: number
  numberOfActiveCameras: number
  highestThreatAlert: Alert | null
}
