-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('ACTIVE', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameOfEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "guide" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "GameOfEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameOfEvent" ADD CONSTRAINT "GameOfEvent_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
