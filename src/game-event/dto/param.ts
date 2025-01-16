import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";

export class CreateGameOfEventParam {
    @IsString()
    readonly eventId: string;

    @IsString()
    readonly gameId: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly guide: string;

    @IsString()
    readonly image: string;
}

export class UpdateGameOfEventParam extends PartialType(OmitType(CreateGameOfEventParam, ['eventId', 'gameId'])) {
    @IsString()
    readonly id: string;
}

export class DeleteGamesOfEventParam {
    @IsString()
    readonly eventId: string;
}

export class QueryGameOfEventParam {
    @IsOptional()
    @IsString()
    readonly eventId?: string;

    @IsOptional()
    @IsString({ each: true })
    readonly filterGame?: string[];

    @IsOptional()
    @IsString()
    readonly searchName?: string;
}