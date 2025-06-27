import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserSubscriber } from './user.subscriber'
import { HistoryEventsModule } from '../history-events/history-events.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), HistoryEventsModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
