import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserTestModule } from './user-test/user-test.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { OAuth2Module } from './oauth2/oauth2.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    AuthModule,
    UserTestModule,
    RoleModule,
    PermissionModule,
    UserRoleModule,
    PermissionModule,
    OAuth2Module,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}