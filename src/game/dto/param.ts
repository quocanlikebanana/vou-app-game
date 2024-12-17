import { PartialType } from "@nestjs/mapped-types";
import { GameStatus } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateGameParam {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsEnum(GameStatus)
    readonly status: GameStatus;
}

export class UpdateGameParam extends PartialType(CreateGameParam) {
    @IsString()
    readonly id: string;
}

export class DeleteGameParam {
    @IsString()
    readonly id: string;
}