import { Module } from '@nestjs/common';
import { GameEventService } from './game-event.service';
import { GameEventController } from './game-event.controller';
import { InfraModule } from 'src/infra/infra.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [InfraModule, HttpModule],
  providers: [GameEventService],
  controllers: [GameEventController]
})
export class GameEventModule { }
