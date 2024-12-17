import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GameEventModule } from './game-event/game-event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		GameModule,
		GameEventModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
