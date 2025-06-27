import { Injectable } from '@nestjs/common'
import { CreateAlertDto } from './dto/create-alert.dto'
import { UpdateAlertDto } from './dto/update-alert.dto'
import { Alert, AlertStatus } from './entities/alert.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    const { cameraId, ...rest } = createAlertDto
    return this.alertRepository.save({
      camera: { id: cameraId },
      ...rest,
    })
  }

  findAll() {
    return this.alertRepository.find()
  }

  findOne(id: number) {
    return this.alertRepository.findOne({ where: { id } })
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    const { cameraId, ...rest } = updateAlertDto
    return this.alertRepository.update(id, {
      camera: { id: cameraId },
      ...rest,
    })
  }

  remove(id: number) {
    return this.alertRepository.delete(id)
  }

  getTotalAlerts() {
    return this.alertRepository.count()
  }

  getTotalResolvedAlerts() {
    return this.alertRepository.count({
      where: { status: AlertStatus.RESOLVED },
    })
  }

  getHighestThreatAlert() {
    return this.alertRepository
      .find({
        order: { threatScore: 'DESC' },
        take: 1,
      })
      .then((alerts) => alerts[0])
  }
}
