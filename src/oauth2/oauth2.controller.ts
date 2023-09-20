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
import { OAuth2Strategy } from './oauth2.strategy';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { OAuth2AuthorizeCodeDto } from './dto/authorize_code.dto';
import { ApiHideProperty } from '@nestjs/swagger';
import { AuthorizeDto } from './dto/authorize.dto';

@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly oauth2Service: OAuth2Service,
    private readonly oauth2Strategy: OAuth2Strategy,
  ) {}

  @Post('authorize')
  async authorize(
    @Query() query: AuthorizeDto,
    @Body() { email, password }: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Xử lý quá trình xác thực và hiển thị trang xác thực OAuth2
    // Trả về trang xác thực cho người dùng
    const fullUrl =
      `${req.protocol}://${req.get('host')}/authorize` +
      `?response_type=${query.response_type}` +
      `&client_id=${query.client_id}` +
      `&redirect_uri=${query.redirect_uri}` +
      `&scope=${query.scope}` +
      `&state=${query.state}`;

    // In ra URL đầy đủ
    //console.log('Full URL:', fullUrl);
    console.log(email);
    console.log(password);

    const user = await this.oauth2Service.authenticate(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //this.oauth2Strategy.setAuthorizationCode(authorizationCode);
    //console.log('OAuth2Strategy after update:', this.oauth2Strategy);
    return res.redirect(query.redirect_uri);
  }

  @Get('callback')
  async callback(
    @Query() query: AuthorizeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authorizationCode =
      await this.oauth2Service.generateAuthorizationCode();
    // Xử lý sau khi người dùng đã xác thực và cấp quyền ứng dụng khách
    const fullUrlCallback =
      `${req.protocol}://${req.get('host')}/callback` +
      `?state=${query.state}` +
      `&authorrization_code=${authorizationCode}`;
    console.log(fullUrlCallback);

    return fullUrlCallback;
  }
  // @Post('token')
  // @UseGuards(OAuth2Strategy)
  // async token(@Req() req: Request, @Res() res: Response) {}
  // // @Post('authorize')
  // // @UseGuards(AuthGuard('oauth2'))
  // // async authorizePost(@Req() req: Request, @Res() res: Response) {
  // //   // Xử lý quá trình xác thực OAuth2 sau khi người dùng xác thực
  // //   // Chuyển hướng hoặc cấp phân quyền cho ứng dụng khách
  // //   return res.redirect(req.body.redirect_uri + '?code=authorization_code');
  // // }
}
