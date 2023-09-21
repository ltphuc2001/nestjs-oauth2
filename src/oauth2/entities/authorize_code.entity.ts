import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationCodeEntity {
  @ApiProperty()
  AuthorizationCode: string;

}
