import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CargosService } from '../services/cargos.service';

@Controller('cargos')
export class CargosController {
  constructor(private cargosService: CargosService) {}

  @Get()
  getAll() {
    return this.cargosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.cargosService.getOne(id);
  }
}
