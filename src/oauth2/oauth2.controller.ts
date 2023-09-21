// src/oauth2/oauth2.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { OAuth2Service } from './oauth2.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { AuthorizationCodeEntity } from './entities/authorize_code.entity';
import { AuthorizeDto } from './dto/authorize.dto';
import { AuthorizationCodeDto } from './dto/authorize_code.dto';
import { TokenEntity } from './entities/token.entity';

@Controller('oauth2')
@ApiTags('oauth2')
export class OAuth2Controller {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Post('authorize')
  @ApiOkResponse({ type: AuthorizationCodeEntity })
  async authorize(
    @Query() query: AuthorizeDto,
    @Body() { email, password }: LoginDto,
    // @Req() req: Request,
    // @Res() res: Response,
  ) {
    // Xử lý quá trình xác thực và hiển thị trang xác thực OAuth2
    // Trả về trang xác thực cho người dùng
    // const fullUrl =
    //   `${req.protocol}://${req.get('host')}/authorize` +
    //   `?response_type=${query.response_type}` +
    //   `&client_id=${query.client_id}` +
    //   `&redirect_uri=${query.redirect_uri}` +
    //   `&scope=${query.scope}` +
    //   `&state=${query.state}`;

    // In ra URL đầy đủ
    //console.log('Full URL:', fullUrl);
    console.log(email);
    console.log(password);

    const user = await this.oauth2Service.authenticate(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.oauth2Service.generateAuthorizationCode();
  }

  // @Get('callback')
  // @ApiOkResponse({ type: AuthorizationCodeEntity })
  // async callback(
  //   @Query() query: AuthorizeDto,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   // const authorizationCode =
  //   //   await this.oauth2Service.generateAuthorizationCode();
  //   // // Xử lý sau khi người dùng đã xác thực và cấp quyền ứng dụng khách
  //   // const fullUrlCallback =
  //   //   `${req.protocol}://${req.get('host')}/callback` +
  //   //   `?state=${query.state}` +
  //   //   `&authorrization_code=${authorizationCode}`;
  //   // console.log(fullUrlCallback);

  //   return this.oauth2Service.generateAuthorizationCode();
  // }

  @Post('getToken')
  @ApiOkResponse({ type: TokenEntity })
  async token(@Body() { email, AuthorizationCode }: AuthorizationCodeDto) {
    const clientCredentials = {
      client_ID: 'iwqepwqipoipwiq',
      client_secret: 'jhoj12jjiqowejqwoe',
    };
    return this.oauth2Service.getToken(
      clientCredentials,
      email,
      AuthorizationCode,
    );
  }
}
