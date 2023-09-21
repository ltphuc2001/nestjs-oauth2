// src/oauth2/oauth2.module.ts

import { Module } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { OAuth2Controller } from './oauth2.controller';
import { JwtModule } from '@nestjs/jwt';
import { OAuth2Repository } from './oauth2.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserTestRepository } from 'src/user-test/user-test.repository';
import { UserTestService } from 'src/user-test/user-test.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserTestModule } from 'src/user-test/user-test.module';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' },
    }), // Chỉnh sửa theo nhu cầu của bạn
    UserTestModule,
  ],
  controllers: [OAuth2Controller],
  providers: [
    OAuth2Service,
    OAuth2Repository,
    JwtStrategy,
    UserTestService,
    UserTestRepository,
  ],
})
export class OAuth2Module {}
