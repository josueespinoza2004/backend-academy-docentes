import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DocentesModule } from './modules/docentes/docentes.module';
import { SexosModule } from './modules/sexos/sexos.module';
import { EtniasModule } from './modules/etnias/etnias.module';
import { CargosModule } from './modules/cargos/cargos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    DatabaseModule,
    DocentesModule,
    SexosModule,
    EtniasModule,
    CargosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
