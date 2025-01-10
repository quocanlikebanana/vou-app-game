import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateGameOfEventParam, DeleteGamesOfEventParam, QueryGameOfEventParam, UpdateGameOfEventParam } from './dto/param';
import { DomainError } from 'src/common/error/domain.error';

@Injectable()
export class GameEventService {
    constructor(
        private readonly prismaService: PrismaService,
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
                description: param.descritpion,
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
                description: updateGameOfEventParam.descritpion || undefined,
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
        return this.prismaService.gameOfEvent.findMany({
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
    }
}
