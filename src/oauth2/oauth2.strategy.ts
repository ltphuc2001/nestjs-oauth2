import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  [x: string]: any;
  private authorizationCode: string;
  constructor() {
    super({
      authorizationURL: 'http://localhost:3000/oauth2/authorize',
      tokenURL: 'adasdsadasdadweqwewq',
      clientID: '123213123123',
      clientSecret: 'safkawrewrlwqjlkewr',
      callbackURL: 'http://localhost:3000/oauth2/callback',
      response_type: 'code',
    });
  }

  setAuthorizationCode(authorizationCode: string) {
    this.authorizationCode = authorizationCode;
  }
}
