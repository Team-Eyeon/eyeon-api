import { Module } from '@nestjs/common'
import { CamerasService } from './cameras.service'
import { CamerasController } from './cameras.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Camera } from './entities/camera.entity'
import { CameraSubscriber } from './camera.subscriber'
import { HistoryEventsModule } from '../history-events/history-events.module'

@Module({
  imports: [TypeOrmModule.forFeature([Camera]), HistoryEventsModule],
  controllers: [CamerasController],
  providers: [CamerasService, CameraSubscriber],
  exports: [CamerasService],
})
export class CamerasModule {}
