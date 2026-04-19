import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Etnia } from '../etnias/entities/etnia.entity';
import { Sexo } from '../sexos/entities/sexo.entity';
import { Cargo } from '../cargos/entities/cargo.entity';
import { DocentesController } from './controllers/docentes.controller';
import { DocentesService } from './services/docentes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Docente, Etnia, Sexo, Cargo])],
  controllers: [DocentesController],
  providers: [DocentesService],
  exports: [DocentesModule, TypeOrmModule],
})
export class DocentesModule {}
