import { Injectable } from '@nestjs/common';

@Injectable()
export class SexosService {
  constructor() {}

  getAll() {
    return `Endpoint para getAll`;
  }

  getOne(id: number) {
    return `Esto retorna el id ${id}`;
  }
}