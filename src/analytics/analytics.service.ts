import { Injectable } from '@nestjs/common'
import { AlertsService } from 'src/alerts/alerts.service'
import { CamerasService } from 'src/cameras/cameras.service'

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly alertService: AlertsService,
    private readonly cameraService: CamerasService,
  ) {}

  async getAnalytics() {
    const [
      totalAlerts,
      totalResolvedAlerts,
      numberOfActiveCameras,
      highestThreatAlert,
    ] = await Promise.all([
      this.alertService.getTotalAlerts(),
      this.alertService.getTotalResolvedAlerts(),
      this.cameraService.getNumberOfActiveCameras(),
      this.alertService.getHighestThreatAlert(),
    ])

    return {
      totalAlerts,
      totalResolvedAlerts,
      numberOfActiveCameras,
      highestThreatAlert,
    }
  }
}
