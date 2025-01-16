import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GameEventService } from './game-event.service';
import { CreateGameOfEventParam, DeleteGamesOfEventParam, QueryGameOfEventParam, UpdateGameOfEventParam } from './dto/param';

@Controller('game-event')
export class GameEventController {
    constructor(
        private readonly gameEventService: GameEventService
    ) { }

    @Post('/partner/createmany')
    async createGamesOfEvent(@Body() body: CreateGameOfEventParam[]): Promise<{ ids: string[] }> {
        return await this.gameEventService.createGamesOfEvent(body);
    }

    @Post('/partner/update')
    async updateGameOfEvent(@Body() body: UpdateGameOfEventParam): Promise<void> {
        return await this.gameEventService.updateGameOfEvent(body);
    }

    @Post('/partner/deletemany')
    async deleteGamesOfEvent(@Body() body: DeleteGamesOfEventParam): Promise<void> {
        return await this.gameEventService.deleteGamesOfEvent(body);
    }

    @Get('/unauth/query')
    async queryGamesOfEvent(@Query() queryParam: QueryGameOfEventParam) {
        return await this.gameEventService.queryGamesOfEvent(queryParam);
    }

    @Get('/unauth/detail/:gameOfEventId')
    async getGameOfEvent(@Param('gameOfEventId') gameOfEventId: string) {
        return await this.gameEventService.getGameDetail(gameOfEventId);
    }

    @Post('/system/reduce-turn')
    async reduceTurn(@Body() body: { userId: string; gameOfEventId: string; turn: number }) {
        return await this.gameEventService.reduceTurn(body);
    }
}
