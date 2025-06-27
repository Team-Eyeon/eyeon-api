import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { HistoryEventsService } from './history-events.service'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'

@Controller('history-events')
export class HistoryEventsController {
  constructor(private readonly historyEventsService: HistoryEventsService) {}

  @ApiOperation({ summary: 'Get all history events' })
  @ApiResponse({
    status: 200,
    description: 'The history events have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'No history events found.' })
  @Get()
  findAll() {
    return this.historyEventsService.findAll()
  }

  @ApiOperation({ summary: 'Get a history event by ID' })
  @ApiResponse({
    status: 200,
    description: 'The history event has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'History event not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historyEventsService.findOne(id)
  }
}
