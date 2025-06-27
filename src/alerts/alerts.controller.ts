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
import { AlertsService } from './alerts.service'
import { CreateAlertDto } from './dto/create-alert.dto'
import { UpdateAlertDto } from './dto/update-alert.dto'
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger'
import { Alert } from './entities/alert.entity'

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new alert' })
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'Alert created successfully.',
    type: Alert,
  })
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto)
  }

  @Get()
  @ApiOperation({ summary: 'List all alerts' })
  @ApiResponse({ status: 200, description: 'List all alerts.', type: [Alert] })
  findAll() {
    return this.alertsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an alert by ID' })
  @ApiResponse({ status: 200, description: 'Get an alert by ID.', type: Alert })
  @ApiResponse({ status: 404, description: 'Alert not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alertsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an alert' })
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'Update an alert.', type: Alert })
  @ApiResponse({ status: 404, description: 'Alert not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlertDto: UpdateAlertDto,
  ) {
    return this.alertsService.update(id, updateAlertDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an alert' })
  @ApiResponse({ status: 200, description: 'Delete an alert.' })
  @ApiResponse({ status: 404, description: 'Alert not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alertsService.remove(id)
  }
}
