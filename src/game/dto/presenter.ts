import { GameStatus } from "@prisma/client";

export type GamePresenter = {
    id: string;
    name: string;
    description: string;
    status: GameStatus;
};