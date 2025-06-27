import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common'
import * as net from 'net'
import { AlertsService } from '../alerts/alerts.service'
import { AlertType } from '../alerts/entities/alert.entity'

@Injectable()
export class AiSocketService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AiSocketService.name)
  private client: net.Socket | null = null
  private reconnectTimeout: NodeJS.Timeout | null = null
  private buffer = Buffer.alloc(0)
  private readonly host = process.env.AI_SOCKET_HOST || 'localhost'
  private readonly port = Number(process.env.AI_SOCKET_PORT) || 8080
  private readonly reconnectDelay = 5000

  constructor(private readonly alertsService: AlertsService) {}

  onModuleInit() {
    this.connect()
  }

  onModuleDestroy() {
    this.disconnect()
  }

  private connect() {
    this.logger.log(`Connecting to AI module at ${this.host}:${this.port}`)
    this.client = net.createConnection(
      { host: this.host, port: this.port },
      () => {
        this.logger.log('Connected to AI module')
      },
    )

    this.client.on('data', (data) => this.handleData(data))
    this.client.on('end', () => {
      this.logger.warn('Disconnected from AI module')
      this.scheduleReconnect()
    })
    this.client.on('error', (err) => {
      this.logger.error(`Socket error: ${err.message}`)
      this.scheduleReconnect()
    })
  }

  private disconnect() {
    if (this.client) {
      this.client.destroy()
      this.client = null
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return
    this.logger.log(`Reconnecting in ${this.reconnectDelay / 1000}s...`)
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null
      this.connect()
    }, this.reconnectDelay)
  }

  private handleData(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data])
    // Try to parse as newline-delimited JSON
    let newlineIndex: number
    while ((newlineIndex = this.buffer.indexOf(0x0a)) !== -1) {
      // 0x0a = '\n'
      const line = this.buffer.slice(0, newlineIndex).toString('utf8').trim()
      this.buffer = this.buffer.slice(newlineIndex + 1)
      if (line.length === 0) continue
      try {
        const message = JSON.parse(line)
        this.handleMessage(message)
      } catch (err) {
        this.logger.error('Failed to parse message: ' + err.message)
      }
    }
  }

  private async handleMessage(message: any) {
    switch (message.type) {
      case 'welcome':
        this.logger.log(`AI module: ${message.message}`)
        break
      case 'detection_result':
        this.logger.debug(`Detection result: ${JSON.stringify(message)}`)
        // TODO: Emit event or process detection result
        break
      case 'alert':
        this.logger.warn(`Alert: ${message.message}`)
        await this.saveAlertFromAI(message)
        break
      default:
        this.logger.debug(`Unknown message type: ${JSON.stringify(message)}`)
    }
  }

  private async saveAlertFromAI(message: any) {
    try {
      // Map AI alert payload to CreateAlertDto
      const createAlertDto: any = {
        cameraId: message.camera_id || 1, // fallback if not present
        message: message.message,
        types: Array.isArray(message.threat_types)
          ? message.threat_types
              .map((t: string) => t.toUpperCase())
              .filter((t: string) =>
                Object.values(AlertType).includes(t as AlertType),
              )
          : [],
        threatScore: Math.round((message.confidence || 0) * 100),
        screenshotUrl: undefined, // If you have a screenshot URL, map it here
      }
      await this.alertsService.create(createAlertDto)
      this.logger.log('Alert saved to database')
    } catch (err) {
      this.logger.error('Failed to save alert: ' + err.message)
    }
  }
}
