// Create a DTO for the request body
import { ApiProperty } from '@nestjs/swagger';

export class OAuth2AuthorizeCodeDto {
  @ApiProperty()
  urlAuthorizationCode: string;
}
