import { Module } from '@nestjs/common';
import { GameEventService } from './game-event.service';
import { GameEventController } from './game-event.controller';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [GameEventService],
  controllers: [GameEventController]
})
export class GameEventModule { }
