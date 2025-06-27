import { Module } from '@nestjs/common'
import { AiSocketService } from './ai-socket.service'
import { AlertsModule } from '../alerts/alerts.module'

@Module({
  imports: [AlertsModule],
  providers: [AiSocketService],
  exports: [AiSocketService],
})
export class AiSocketModule {}
