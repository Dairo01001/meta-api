/*
  Warnings:

  - You are about to drop the column `full_name_person` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date_profile` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `user_id_profile` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `role_id_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status_id_user` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user_status` on the `UserStatus` table. All the data in the column will be lost.
  - You are about to drop the column `name_user_status` on the `UserStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid_profile]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_userstatus]` on the table `UserStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fistname_person` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fistsurname_person` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate_profile` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid_profile` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleid_user` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusid_user` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_userstatus` to the `UserStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_userstatus` to the `UserStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_user_id_profile_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_status_id_user_fkey`;

-- DropIndex
DROP INDEX `Person_full_name_person_key` ON `Person`;

-- DropIndex
DROP INDEX `UserStatus_name_user_status_key` ON `UserStatus`;

-- AlterTable
ALTER TABLE `Faculty` ADD COLUMN `status_faculty` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Person` DROP COLUMN `full_name_person`,
    ADD COLUMN `fistname_person` VARCHAR(191) NOT NULL,
    ADD COLUMN `fistsurname_person` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondSurname_person` VARCHAR(191) NULL,
    ADD COLUMN `secondname_person` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `birth_date_profile`,
    DROP COLUMN `user_id_profile`,
    ADD COLUMN `birthdate_profile` DATETIME(3) NOT NULL,
    ADD COLUMN `userid_profile` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Program` ADD COLUMN `status_program` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `status_role` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role_id_user`,
    DROP COLUMN `status_id_user`,
    ADD COLUMN `roleid_user` INTEGER NOT NULL,
    ADD COLUMN `statusid_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserStatus` DROP PRIMARY KEY,
    DROP COLUMN `id_user_status`,
    DROP COLUMN `name_user_status`,
    ADD COLUMN `id_userstatus` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name_userstatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `status_userstatus` BOOLEAN NOT NULL DEFAULT true,
    ADD PRIMARY KEY (`id_userstatus`);

-- CreateTable
CREATE TABLE `Server` (
    `id_server` VARCHAR(191) NOT NULL,
    `processid_server` VARCHAR(191) NOT NULL,
    `port_server` INTEGER NOT NULL,
    `urlhost_server` VARCHAR(191) NOT NULL,
    `gridname_server` VARCHAR(191) NOT NULL,
    `datasource_server` VARCHAR(191) NOT NULL,
    `databasename_server` VARCHAR(191) NOT NULL,
    `databaseuser_server` VARCHAR(191) NOT NULL,
    `databasepassword_server` VARCHAR(191) NOT NULL,
    `statusid_server` INTEGER NOT NULL,

    PRIMARY KEY (`id_server`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServerFiles` (
    `id_serverfiles` INTEGER NOT NULL AUTO_INCREMENT,
    `name_serverfiles` VARCHAR(191) NOT NULL,
    `path_serverfiles` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_serverfiles`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServerStatus` (
    `id_serverstatus` INTEGER NOT NULL AUTO_INCREMENT,
    `name_serverstatus` VARCHAR(191) NOT NULL,
    `status_serverstatus` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ServerStatus_name_serverstatus_key`(`name_serverstatus`),
    PRIMARY KEY (`id_serverstatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Island` (
    `id_island` INTEGER NOT NULL AUTO_INCREMENT,
    `name_island` VARCHAR(191) NOT NULL,
    `positiony_island` INTEGER NOT NULL,
    `positionx_island` INTEGER NOT NULL,
    `sizey_island` INTEGER NOT NULL,
    `sizex_island` INTEGER NOT NULL,
    `internalport_island` INTEGER NOT NULL,

    PRIMARY KEY (`id_island`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_userid_profile_key` ON `Profile`(`userid_profile`);

-- CreateIndex
CREATE UNIQUE INDEX `UserStatus_name_userstatus_key` ON `UserStatus`(`name_userstatus`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_statusid_user_fkey` FOREIGN KEY (`statusid_user`) REFERENCES `UserStatus`(`id_userstatus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleid_user_fkey` FOREIGN KEY (`roleid_user`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userid_profile_fkey` FOREIGN KEY (`userid_profile`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Server` ADD CONSTRAINT `Server_statusid_server_fkey` FOREIGN KEY (`statusid_server`) REFERENCES `ServerStatus`(`id_serverstatus`) ON DELETE RESTRICT ON UPDATE CASCADE;
