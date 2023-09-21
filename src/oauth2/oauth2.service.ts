// src/oauth2/oauth2.service.ts

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { OAuth2Repository } from './oauth2.repository';
import { AuthorizationCodeEntity } from './entities/authorize_code.entity';
import { TokenEntity } from './entities/token.entity';
import { ClientCredentials } from './interfaces/client_credential.interface';

@Injectable()
export class OAuth2Service {
  constructor(private oAuth2Repository: OAuth2Repository) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.oAuth2Repository.findByEmail(email);
    await this.oAuth2Repository.validatePassword(user, password);

    const accessToken = await this.oAuth2Repository.createToken(user.id);
    const refreshToken = await this.oAuth2Repository.createRefreshToken(
      user.id,
    );
    console.log(accessToken);
    return { accessToken, refreshToken };
  }

  async authenticate(email: string, password: string) {
    const user = await this.oAuth2Repository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.oAuth2Repository.validatePassword(
      user,
      password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      return user;
    }
  }

  async generateAuthorizationCode(): Promise<AuthorizationCodeEntity> {
    const AuthorizationCode =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return { AuthorizationCode };
  }

  async getToken(
    clientCredentials: ClientCredentials,
    email: string,
    AuthorizationCode: string,
  ): Promise<TokenEntity> {
    const user = await this.oAuth2Repository.findByEmail(email);
    //Verify authorizationCode and client Credentials
    console.log(clientCredentials.client_ID);
    if (
      typeof clientCredentials.client_ID == 'string' &&
      typeof clientCredentials.client_secret == 'string' &&
      typeof AuthorizationCode == 'string'
    ) {
      const accessToken = await this.oAuth2Repository.createToken(user.id);
      const refreshToken = await this.oAuth2Repository.createRefreshToken(
        user.id,
      );
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
