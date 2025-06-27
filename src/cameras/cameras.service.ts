import { Injectable } from '@nestjs/common'
import { CreateCameraDto } from './dto/create-camera.dto'
import { UpdateCameraDto } from './dto/update-camera.dto'
import { Repository } from 'typeorm'
import { Camera } from './entities/camera.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CamerasService {
  constructor(
    @InjectRepository(Camera)
    private readonly cameraRepository: Repository<Camera>,
  ) {}

  create(createCameraDto: CreateCameraDto) {
    return this.cameraRepository.save(createCameraDto)
  }

  findAll() {
    return this.cameraRepository.find()
  }

  findOne(id: number) {
    return this.cameraRepository.findOne({ where: { id } })
  }

  update(id: number, updateCameraDto: UpdateCameraDto) {
    return this.cameraRepository.update(id, updateCameraDto)
  }

  remove(id: number) {
    return this.cameraRepository.delete(id)
  }

  getNumberOfActiveCameras() {
    return this.cameraRepository.count({ where: { isActive: true } })
  }

  findByName(name: string) {
    return this.cameraRepository.findOne({ where: { name } })
  }
}
