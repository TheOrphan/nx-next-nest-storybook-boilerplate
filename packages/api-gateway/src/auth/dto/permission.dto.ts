import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty({ default: 'dashboard' })
  page: string;

  @ApiProperty({ default: true })
  list: boolean;
}
