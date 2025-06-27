import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { AlertsModule } from 'src/alerts/alerts.module'
import { CamerasModule } from 'src/cameras/cameras.module'
import { HistoryEventsModule } from 'src/history-events/history-events.module'

@Module({
  imports: [AlertsModule, CamerasModule, HistoryEventsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
