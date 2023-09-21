//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository';
import { UserTestModule } from 'src/user-test/user-test.module';
import { UserTestService } from 'src/user-test/user-test.service';
import { UserTestRepository } from 'src/user-test/user-test.repository';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 7d, 24h
    }),
    UserTestModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthRepository,
    UserTestService,
    UserTestRepository,
  ],
})
export class AuthModule {}
