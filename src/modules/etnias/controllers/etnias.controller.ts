import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EtniasService } from '../services/etnias.service';

@Controller('etnias')
export class EtniasController {
  constructor(private etniasService: EtniasService) {}

  @Get()
  getAll() {
    return this.etniasService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.etniasService.getOne(id);
  }
}
