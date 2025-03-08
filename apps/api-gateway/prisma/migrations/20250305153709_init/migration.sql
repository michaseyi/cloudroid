-- CreateEnum
CREATE TYPE "AndroidInstanceStatus" AS ENUM ('UNALLOCATED', 'INITIALIZING', 'RUNNING', 'STOPPED', 'DELETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AndroidInstance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "AndroidInstanceStatus" NOT NULL DEFAULT 'UNALLOCATED',

    CONSTRAINT "AndroidInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AndroidInstanceTemplate" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AndroidInstanceTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AndroidInstance" ADD CONSTRAINT "AndroidInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
