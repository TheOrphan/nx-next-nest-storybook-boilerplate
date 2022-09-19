import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReleaseService } from './release.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';

@ApiTags('Release')
@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a release' })
  create(@Body() createReleaseDto: CreateReleaseDto) {
    return this.releaseService.create(createReleaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all releases' })
  findAll() {
    return this.releaseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one release by id' })
  findOne(@Param('id') id: string) {
    return this.releaseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a release by id' })
  update(@Param('id') id: string, @Body() updateReleaseDto: UpdateReleaseDto) {
    return this.releaseService.update(+id, updateReleaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a release by id' })
  remove(@Param('id') id: string) {
    return this.releaseService.remove(+id);
  }
}
