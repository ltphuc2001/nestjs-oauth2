import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from './prisma.service';

@Module({
  providers: [ClientService, PrismaService],
  exports: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
