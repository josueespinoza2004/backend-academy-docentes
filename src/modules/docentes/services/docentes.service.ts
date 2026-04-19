import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from '../entities/docente.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateDocenteDto } from '../dto/docente.dto';
import { Etnia } from 'src/modules/etnias/entities/etnia.entity';
import { Sexo } from 'src/modules/sexos/entities/sexo.entity';
import { UpdateDocenteDto } from '../dto/docente.dto';
import {
  // BadRequestException,
  // InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Cargo } from 'src/modules/cargos/entities/cargo.entity';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepo: Repository<Docente>,
    private readonly dataSource: DataSource,
    @InjectRepository(Etnia)
    private readonly etniaRepo: Repository<Etnia>,
    @InjectRepository(Sexo)
    private readonly sexoRepo: Repository<Sexo>,
    @InjectRepository(Cargo)
    private readonly cargoRepo: Repository<Cargo>,
  ) {}

  async getAll() {
    const rows = this.dataSource
      .getRepository(Docente)
      .createQueryBuilder('docentes')
      .where('docentes.id is not null');

    return await rows.getMany();
  }

  async getOne(id: number) {
    const row = await this.docenteRepo.findOne({ where: { id: id } });

    if (!row) {
      throw new NotFoundException(`No se encuentra el registro ${id}`);
    }

    return row;
  }

  async create(docenteDto: CreateDocenteDto) {
    try {
      const docente = this.docenteRepo.create(docenteDto);

      return await this.docenteRepo.save(docente);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, docenteDto: UpdateDocenteDto) {
    const row = await this.getOne(id);

    const mergeData = this.docenteRepo.merge(row, docenteDto);

    const updateData = await this.docenteRepo.save(mergeData);

    return updateData;
  }

  async delete(id: number, payload: CreateDocenteDto) {
    const row = await this.getOne(id);

    const mergeData = this.docenteRepo.merge(row, payload);

    const updateData = await this.docenteRepo.save(mergeData);

    await this.docenteRepo.remove(updateData);

    return row;
  }

  // private handleDBException(error: any) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   if (error.code === '23505') throw new BadRequestException(error.detail);

  //   console.error(error);

  //   throw new InternalServerErrorException(
  //     'Error inesperado, verifique los registros del servidor',
  //   );
  // }
}
