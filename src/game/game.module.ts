import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { InfraModule } from 'src/infra/infra.module';

@Module({
    imports: [InfraModule],
    providers: [GameService],
    controllers: [GameController]
})
export class GameModule { }
