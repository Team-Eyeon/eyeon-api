import { Injectable } from '@nestjs/common'
import { GetDashboardResponseDto } from './dto/get-dashboard-response.dto'
import { AlertsService } from '../alerts/alerts.service'
import { CamerasService } from '../cameras/cameras.service'
import { HistoryEventsService } from '../history-events/history-events.service'

@Injectable()
export class DashboardService {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly camerasService: CamerasService,
    private readonly historyEventsService: HistoryEventsService,
  ) {}

  async getDashboard(): Promise<GetDashboardResponseDto> {
    const [alerts, cameras, history, highestThreatAlert] = await Promise.all([
      this.alertsService.findAll(),
      this.camerasService.findAll(),
      this.historyEventsService.findAll(),
      this.alertsService.getHighestThreatAlert(),
    ])
    const threatLevel = highestThreatAlert?.threatScore ?? 0

    return {
      alerts,
      cameras,
      history,
      threatLevel,
    }
  }
}
