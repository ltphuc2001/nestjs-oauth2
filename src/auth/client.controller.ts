import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './client.entity';

@Controller('auth')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('token')
  getToken(@Body() dto: ClientDto) {
    return this.clientService.validateUserAndGetToken(dto);
  }
}
