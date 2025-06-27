import { Module } from '@nestjs/common'
import { HistoryEventsService } from './history-events.service'
import { HistoryEventsController } from './history-events.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HistoryEvent } from './entities/history-event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEvent])],
  controllers: [HistoryEventsController],
  providers: [HistoryEventsService],
  exports: [HistoryEventsService],
})
export class HistoryEventsModule {}
