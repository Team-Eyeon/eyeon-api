import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm'
import { User, stripPassword } from './entities/user.entity'
import {
  HistoryEventAction,
  HistoryEventEntity,
} from '../history-events/entities/history-event.entity'
import { HistoryEventsService } from '../history-events/history-events.service'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    dataSource: DataSource,
    private readonly historyEventsService: HistoryEventsService,
  ) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return User
  }

  async afterInsert(event: InsertEvent<User>) {
    await this.historyEventsService.create({
      action: HistoryEventAction.CREATE,
      entity: HistoryEventEntity.USER,
      data: stripPassword(event.entity),
    })
  }

  async afterUpdate(event: UpdateEvent<User>) {
    let data: Partial<User>
    if (event.entity && 'passwordHash' in event.entity) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...rest } = event.entity
      data = rest as Partial<User>
    } else {
      data = event.entity as Partial<User>
    }

    if (event.entity) {
      await this.historyEventsService.create({
        action: HistoryEventAction.UPDATE,
        entity: HistoryEventEntity.USER,
        data,
      })
    }
  }

  async beforeRemove(event: RemoveEvent<User>) {
    if (event.entity) {
      await this.historyEventsService.create({
        action: HistoryEventAction.DELETE,
        entity: HistoryEventEntity.USER,
        data: stripPassword(event.entity),
      })
    }
  }
}
