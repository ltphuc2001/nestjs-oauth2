import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OAuth2Repository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return this.prisma.userTest.findUnique({
      where: { email },
    });
  }

  async validatePassword(user, password: string) {
    if (!user) {
      throw new NotFoundException('No user found for email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async getRoleAndPermissionByUserId(userId: number) {
    const userRolePermissions = await this.prisma.userRole.findMany({
      where: {
        userId: userId,
      },
      include: {
        role: {
          select: {
            roleName: true,
            role_permission: {
              select: {
                permission: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const rolePermissions = userRolePermissions.map((userRolePermissions) => ({
      roleName: userRolePermissions.role.roleName,
      permissions: userRolePermissions.role.role_permission.map(
        (rp) => rp.permission.title,
      ),
    }));
    return rolePermissions;
  }

  async createToken(userId: number) {
    const roleNames = await this.getRoleAndPermissionByUserId(userId);
    const payload = {
      userId: userId,
      roles: roleNames,
    };
    return this.jwtService.sign(payload);
  }

  async createRefreshToken(userId: number): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '7d' },
    );
    return refreshToken;
  }
}
