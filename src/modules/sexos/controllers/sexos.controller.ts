import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SexosService } from '../services/sexos.service';

@Controller('sexos')
export class SexosController {
  constructor(private sexosService: SexosService) {}

  @Get()
  getAll() {
    return this.sexosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.sexosService.getOne(id);
  }
}
