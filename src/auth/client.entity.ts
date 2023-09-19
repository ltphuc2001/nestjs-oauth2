import { PrismaClient, Grant } from '@prisma/client';

export class ClientOauth {
  id: string;
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  grants: Grant[];
}

export class ClientDto {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  grants: Grant[];
}
