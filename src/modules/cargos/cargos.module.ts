import { Module } from '@nestjs/common';
import { CargosController } from './controllers/cargos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { CargosService } from './services/cargos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])],
  controllers: [CargosController],
  providers: [CargosService],
  exports: [],
})
export class CargosModule {}
