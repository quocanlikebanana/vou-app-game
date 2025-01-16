import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameParam, DeleteGameParam, UpdateGameParam } from './dto/param';
import { GamePresenter } from './dto/presenter';

@Controller('/')
export class GameController {
    constructor(
        private readonly gameService: GameService
    ) { }

    @Post('/admin/create')
    async createGame(@Body() body: CreateGameParam): Promise<{ id: string }> {
        return await this.gameService.createGame(body);
    }

    @Post('/admin/update')
    async updateGame(@Body() body: UpdateGameParam): Promise<void> {
        return await this.gameService.updateGame(body);
    }

    @Post('/admin/delete')
    async deleteGame(@Body() body: DeleteGameParam): Promise<void> {
        return await this.gameService.deleteGame(body);
    }

    @Get('/unauth/all')
    async getAll(): Promise<GamePresenter[]> {
        return await this.gameService.getAll();
    }

    @Get('/unauth/:id')
    async getById(@Param('id') id: string): Promise<GamePresenter> {
        return await this.gameService.getById(id);
    }
}
