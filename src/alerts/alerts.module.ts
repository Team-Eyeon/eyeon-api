import { Module } from '@nestjs/common'
import { AlertsService } from './alerts.service'
import { AlertsController } from './alerts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Alert } from './entities/alert.entity'
import { AlertSubscriber } from './alert.subscriber'
import { HistoryEventsModule } from '../history-events/history-events.module'
import { CamerasModule } from 'src/cameras/cameras.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    HistoryEventsModule,
    CamerasModule,
  ],
  controllers: [AlertsController],
  providers: [AlertsService, AlertSubscriber],
  exports: [AlertsService],
})
export class AlertsModule {}
