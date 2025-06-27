import { Injectable } from '@nestjs/common'
import { CreateAlertDto } from './dto/create-alert.dto'
import { UpdateAlertDto } from './dto/update-alert.dto'
import { Alert, AlertStatus } from './entities/alert.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CamerasService } from 'src/cameras/cameras.service'

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly cameraService: CamerasService,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    const { cameraId: cameraIdInput, ...rest } = createAlertDto
    const cameraId = await this.generateCameraId(cameraIdInput)

    return this.alertRepository.save({
      camera: { id: cameraId },
      ...rest,
    })
  }

  private async generateCameraId(cameraIdInput: string | number) {
    let cameraId: number
    if (typeof cameraIdInput === 'string') {
      const existingCamera = await this.cameraService.findByName(cameraIdInput)
      if (existingCamera) {
        cameraId = existingCamera.id
      } else {
        const newCameraData = {
          name: cameraIdInput,
          location: 'unknown',
        }
        console.log('Alert creating a new camera', newCameraData)
        const newCamera = await this.cameraService.create(newCameraData)
        cameraId = newCamera.id
      }
    } else {
      cameraId = cameraIdInput
    }
    return cameraId
  }

  findAll() {
    return this.alertRepository.find()
  }

  findOne(id: number) {
    return this.alertRepository.findOne({ where: { id } })
  }

  async update(id: number, updateAlertDto: UpdateAlertDto) {
    const { cameraId: cameraIdInput, ...rest } = updateAlertDto
    const cameraId =
      cameraIdInput && (await this.generateCameraId(cameraIdInput))
    return this.alertRepository.update(id, {
      camera: cameraId ? { id: cameraId } : undefined,
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
