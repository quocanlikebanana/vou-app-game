import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { UpdateGameParam, CreateGameParam, DeleteGameParam } from './dto/param';
import { GamePresenter } from './dto/presenter';

@Injectable()
export class GameService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createGame(createGameParam: CreateGameParam): Promise<{ id: string }> {
        const res = await this.prismaService.game.create({
            data: {
                name: createGameParam.name,
                description: createGameParam.description,
                status: createGameParam.status,
            },
        });
        return { id: res.id };
    }

    async updateGame(updateGameParam: UpdateGameParam): Promise<void> {
        await this.prismaService.game.update({
            where: { id: updateGameParam.id },
            data: {
                name: updateGameParam.name,
                description: updateGameParam.description,
                status: updateGameParam.status,
            },
        });
    }

    async deleteGame(deleteGameParam: DeleteGameParam): Promise<void> {
        await this.prismaService.game.delete({
            where: { id: deleteGameParam.id },
        });
    }


    async getById(id: string): Promise<GamePresenter> {
        return await this.prismaService.game.findUnique({
            where: {
                id
            }
        });
    }

    async getAll(): Promise<GamePresenter[]> {
        return await this.prismaService.game.findMany();
    }
}
