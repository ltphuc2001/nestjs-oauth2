import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationCodeDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  AuthorizationCode: string;
}
