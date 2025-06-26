import { Module } from '@nestjs/common'
import { AnalyticsController } from './analytics.controller'
import { AnalyticsService } from './analytics.service'
import { AlertsModule } from 'src/alerts/alerts.module'
import { CamerasModule } from 'src/cameras/cameras.module'

@Module({
  imports: [AlertsModule, CamerasModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
