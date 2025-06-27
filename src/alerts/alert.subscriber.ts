import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm'
import { Alert } from './entities/alert.entity'
import {
  HistoryEventAction,
  HistoryEventEntity,
} from '../history-events/entities/history-event.entity'
import { HistoryEventsService } from '../history-events/history-events.service'

@EventSubscriber()
export class AlertSubscriber implements EntitySubscriberInterface<Alert> {
  constructor(
    dataSource: DataSource,
    private readonly historyEventsService: HistoryEventsService,
  ) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return Alert
  }

  async afterInsert(event: InsertEvent<Alert>) {
    await this.historyEventsService.create({
      action: HistoryEventAction.CREATE,
      entity: HistoryEventEntity.ALERT,
      data: event.entity,
    })
  }

  async afterUpdate(event: UpdateEvent<Alert>) {
    if (event.entity) {
      await this.historyEventsService.create({
        action: HistoryEventAction.UPDATE,
        entity: HistoryEventEntity.ALERT,
        data: event.entity,
      })
    }
  }

  async beforeRemove(event: RemoveEvent<Alert>) {
    if (event.entity) {
      await this.historyEventsService.create({
        action: HistoryEventAction.DELETE,
        entity: HistoryEventEntity.ALERT,
        data: event.entity,
      })
    }
  }
}
