import {
  Body,
  Controller,
  // Get,
  ParseIntPipe,
  // Post,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DocentesService } from '../services/docentes.service';
import { CreateDocenteDto, UpdateDocenteDto } from '../dto/docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docenteService: DocentesService) {}

  @MessagePattern({ cmd: 'get_all_teachers' })
  async getAll() {
    const rows = await this.docenteService.getAll();

    const datos = {
      data: rows,
      count: rows.length,
    };
    return datos;
  }

  @MessagePattern({ cmd: 'get_one_teacher' })
  getOne(@Payload(ParseIntPipe) id: number) {
    return this.docenteService.getOne(id);
  }

  @MessagePattern({ cmd: 'create_teacher' })
  async create(@Payload() docenteDto: CreateDocenteDto) {
    const docente = await this.docenteService.create(docenteDto);

    const datos = {
      data: docente,
      message: 'Registro agregado con exito',
    };

    return datos;
  }

  @MessagePattern({ cmd: 'update_teacher' })
  async update(
    @Payload()
    { id, docenteDto }: { id: number; docenteDto: UpdateDocenteDto },
  ) {
    const docente = await this.docenteService.update(id, docenteDto);

    const datos = {
      data: docente,
      message: 'El registro ha sido actualizado con exito',
    };

    return datos;
  }

  @MessagePattern({ cmd: 'remove_teacher' })
  remove(@Payload(ParseIntPipe) id: number, payload: CreateDocenteDto) {
    return this.docenteService.delete(id, payload);
  }
}
