import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateGameOfEventParam, DeleteGamesOfEventParam, QueryGameOfEventParam, UpdateGameOfEventParam } from './dto/param';
import { DomainError } from 'src/common/error/domain.error';
import { GameOfEventPresenter } from './dto/presenter';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class GameEventService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly httpService: HttpService
    ) { }

    async createGamesOfEvent(createGameOfEventParams: CreateGameOfEventParam[]): Promise<{ ids: string[] }> {
        if (createGameOfEventParams.length === 0) {
            throw new DomainError('No games provided for event');
        }
        const res = await this.prismaService.gameOfEvent.createManyAndReturn({
            data: createGameOfEventParams.map(param => ({
                eventId: param.eventId,
                gameId: param.gameId,
                name: param.name,
                description: param.description,
                guide: param.guide,
                image: param.image,
            })),
        });
        return { ids: res.map(r => r.id) };
    }

    async updateGameOfEvent(updateGameOfEventParam: UpdateGameOfEventParam) {
        await this.prismaService.gameOfEvent.update({
            where: {
                id: updateGameOfEventParam.id,
            },
            data: {
                name: updateGameOfEventParam.name || undefined,
                description: updateGameOfEventParam.description || undefined,
                guide: updateGameOfEventParam.guide || undefined,
                image: updateGameOfEventParam.image || undefined,
            },
        });
    }

    async deleteGamesOfEvent(deleteGamesOfEventParam: DeleteGamesOfEventParam) {
        await this.prismaService.gameOfEvent.deleteMany({
            where: {
                eventId: deleteGamesOfEventParam.eventId,
            },
        });
    }

    async queryGamesOfEvent({ eventId, filterGame, searchName }: QueryGameOfEventParam) {
        const res = await this.prismaService.gameOfEvent.findMany({
            where: {
                eventId: eventId || undefined,
                gameId: filterGame && (filterGame.length === 0 || filterGame == null) ? undefined : {
                    in: filterGame,
                },
                name: (searchName === '' || searchName == null) ? undefined : {
                    contains: searchName,
                },
            },
        });
        console.log(eventId);
        console.log(filterGame);
        console.log(searchName);
        console.log(res);
        return res;
    }

    async getGameDetail(gameOfEventId: string): Promise<GameOfEventPresenter> {
        const res = await this.prismaService.gameOfEvent.findUnique({
            where: {
                id: gameOfEventId,
            },
        });
        console.log(gameOfEventId);
        console.log(res);
        if (!res) {
            throw new DomainError('Game of event not found');
        }
        return res;
    }

    async reduceTurn(data: { userId: string; gameOfEventId: string; turn: number; }) {
        const { userId, gameOfEventId } = data;
        const gameOfEvent = await this.prismaService.gameOfEvent.findFirst({ where: { id: gameOfEventId } });
        if (!gameOfEvent) {
            throw new DomainError('Game of event not found');
        }
        const eventId = gameOfEvent.eventId;
        const body = {
            userId,
            eventId,
            turn: data.turn,
        }
        const eventUrl = process.env.EVENT_URL;
        if (!eventUrl) {
            throw new DomainError('Is not connected to event');
        }
        const endpoint = `${eventUrl}/system/reduce-turn`;
        console.log(`Send request: `, endpoint, data);
        try {
            await this.httpService.axiosRef.post(endpoint, body);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new DomainError(error.response.data.message);
            }
        }
    }
}
