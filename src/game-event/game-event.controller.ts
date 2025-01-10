import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameEventService } from './game-event.service';
import { CreateGameOfEventParam, DeleteGamesOfEventParam, QueryGameOfEventParam, UpdateGameOfEventParam } from './dto/param';

@Controller('game-event')
export class GameEventController {
    constructor(
        private readonly gameEventService: GameEventService
    ) { }

    @Post('createmany')
    async createGamesOfEvent(@Body() body: CreateGameOfEventParam[]): Promise<{ ids: string[] }> {
        return await this.gameEventService.createGamesOfEvent(body);
    }

    @Post('update')
    async updateGameOfEvent(@Body() body: UpdateGameOfEventParam): Promise<void> {
        return await this.gameEventService.updateGameOfEvent(body);
    }

    @Post('deletemany')
    async deleteGamesOfEvent(@Body() body: DeleteGamesOfEventParam): Promise<void> {
        return await this.gameEventService.deleteGamesOfEvent(body);
    }

    @Get('query')
    async queryGamesOfEvent(@Param() queryParam: QueryGameOfEventParam) {
        return await this.gameEventService.queryGamesOfEvent(queryParam);
    }
}
