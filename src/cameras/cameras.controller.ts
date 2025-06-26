import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { CamerasService } from './cameras.service'
import { CreateCameraDto } from './dto/create-camera.dto'
import { UpdateCameraDto } from './dto/update-camera.dto'
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { Camera } from './entities/camera.entity'

@ApiTags('Cameras')
@ApiBearerAuth()
@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'Camera created successfully.',
    type: Camera,
  })
  create(@Body() createCameraDto: CreateCameraDto) {
    return this.camerasService.create(createCameraDto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all cameras.',
    type: [Camera],
  })
  findAll() {
    return this.camerasService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a camera by ID.',
    type: Camera,
  })
  @ApiResponse({ status: 404, description: 'Camera not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.camerasService.findOne(id)
  }

  @Patch(':id')
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'Update a camera.', type: Camera })
  @ApiResponse({ status: 404, description: 'Camera not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCameraDto: UpdateCameraDto,
  ) {
    return this.camerasService.update(id, updateCameraDto)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a camera.' })
  @ApiResponse({ status: 404, description: 'Camera not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.camerasService.remove(id)
  }
}
