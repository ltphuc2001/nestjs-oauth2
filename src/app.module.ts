import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './auth/client.module';
import { PassportModule } from '@nestjs/passport';
import { ClientController } from './auth/client.controller';
import { ClientService } from './auth/client.service';
import { PrismaService } from './auth/prisma.service';

@Module({
  imports: [ClientModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
