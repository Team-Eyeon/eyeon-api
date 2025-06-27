import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm'
import { Camera } from './entities/camera.entity'
import {
  HistoryEventAction,
  HistoryEventEntity,
} from '../history-events/entities/history-event.entity'
import { HistoryEventsService } from '../history-events/history-events.service'

@EventSubscriber()
export class CameraSubscriber implements EntitySubscriberInterface<Camera> {
  constructor(
    dataSource: DataSource,
    private readonly historyEventsService: HistoryEventsService,
  ) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return Camera
  }

  async afterInsert(event: InsertEvent<Camera>) {
    await this.historyEventsService.create({
      action: HistoryEventAction.CREATE,
      entity: HistoryEventEntity.CAMERA,
      data: event.entity,
    })
  }

  async afterUpdate(event: UpdateEvent<Camera>) {
    if (event.entity) {
      await this.historyEventsService.create({
        action: HistoryEventAction.UPDATE,
        entity: HistoryEventEntity.CAMERA,
        data: event.entity,
      })
    }
  }

  async beforeRemove(event: RemoveEvent<Camera>) {
    if (event.entity) {
      await this.historyEventsService.create({
        action: HistoryEventAction.DELETE,
        entity: HistoryEventEntity.CAMERA,
        data: event.entity,
      })
    }
  }
}
