import { IsOptional } from 'class-validator';

export class AuthorizeDto {
  @IsOptional()
  response_type?: string | undefined = 'code';

  @IsOptional()
  client_id?: string | undefined = '123213123123';

  @IsOptional()
  redirect_uri?: string | undefined = 'http://localhost:3000/oauth2/callback';

  @IsOptional()
  scope?: string | undefined = 'read';

  @IsOptional()
  state?: string | undefined = 'a4e0761e-8c21-4e20-819d-5a4daeab4ea9';
}
