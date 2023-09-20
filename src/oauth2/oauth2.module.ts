// src/oauth2/oauth2.module.ts

import { Module } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { OAuth2Controller } from './oauth2.controller';
import { PassportModule } from '@nestjs/passport';
import { OAuth2Strategy } from './oauth2.strategy';
import { JwtModule } from '@nestjs/jwt';
import { OAuth2Repository } from './oauth2.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'oauth2' }),
    JwtModule.register({ secret: 'your-secret-key' }), // Thay thế bằng khóa bí mật thực tế
  ],
  controllers: [OAuth2Controller],
  providers: [OAuth2Service, OAuth2Strategy, OAuth2Repository],
})
export class OAuth2Module {}
