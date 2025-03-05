/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AndroidInstanceStatus" AS ENUM ('INITIALIZING', 'RUNNING', 'STOPPED', 'DELETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AndroidInstance" (
    "id" TEXT NOT NULL,
    "status" "AndroidInstanceStatus" NOT NULL,

    CONSTRAINT "AndroidInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AndroidInstanceTemplate" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AndroidInstanceTemplate_pkey" PRIMARY KEY ("id")
);
