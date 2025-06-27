import { Injectable } from '@nestjs/common'
import { CreateHistoryEventDto } from './dto/create-history-event.dto'
import { Repository } from 'typeorm'
import { HistoryEvent } from './entities/history-event.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class HistoryEventsService {
  constructor(
    @InjectRepository(HistoryEvent)
    private readonly historyEventsRepository: Repository<HistoryEvent>,
  ) {}

  create(createHistoryEventDto: CreateHistoryEventDto) {
    const historyEvent = this.historyEventsRepository.create(
      createHistoryEventDto,
    )
    return this.historyEventsRepository.save(historyEvent)
  }

  findAll() {
    return this.historyEventsRepository.find()
  }

  findOne(id: number) {
    return this.historyEventsRepository.findOne({ where: { id } })
  }
}
