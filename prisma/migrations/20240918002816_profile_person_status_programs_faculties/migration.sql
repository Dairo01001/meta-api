/*
  Warnings:

  - Added the required column `status_id_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `status_id_user` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserStatus` (
    `id_user_status` INTEGER NOT NULL AUTO_INCREMENT,
    `name_user_status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserStatus_name_user_status_key`(`name_user_status`),
    PRIMARY KEY (`id_user_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id_profile` INTEGER NOT NULL AUTO_INCREMENT,
    `birth_date_profile` DATETIME(3) NOT NULL,
    `phone_profile` VARCHAR(191) NOT NULL,
    `photo_profile` VARCHAR(191) NOT NULL,
    `user_id_profile` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_user_id_profile_key`(`user_id_profile`),
    PRIMARY KEY (`id_profile`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Person` (
    `id_person` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name_person` VARCHAR(191) NOT NULL,
    `email_person` VARCHAR(191) NOT NULL,
    `program_id_person` INTEGER NOT NULL,
    `user_id_person` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Person_full_name_person_key`(`full_name_person`),
    UNIQUE INDEX `Person_email_person_key`(`email_person`),
    UNIQUE INDEX `Person_user_id_person_key`(`user_id_person`),
    PRIMARY KEY (`id_person`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `id_faculty` INTEGER NOT NULL AUTO_INCREMENT,
    `name_faculty` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Faculty_name_faculty_key`(`name_faculty`),
    PRIMARY KEY (`id_faculty`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Program` (
    `id_program` INTEGER NOT NULL AUTO_INCREMENT,
    `name_program` VARCHAR(191) NOT NULL,
    `faculty_id_program` INTEGER NOT NULL,

    UNIQUE INDEX `Program_name_program_key`(`name_program`),
    PRIMARY KEY (`id_program`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_status_id_user_fkey` FOREIGN KEY (`status_id_user`) REFERENCES `UserStatus`(`id_user_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_profile_fkey` FOREIGN KEY (`user_id_profile`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_program_id_person_fkey` FOREIGN KEY (`program_id_person`) REFERENCES `Program`(`id_program`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_user_id_person_fkey` FOREIGN KEY (`user_id_person`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_faculty_id_program_fkey` FOREIGN KEY (`faculty_id_program`) REFERENCES `Faculty`(`id_faculty`) ON DELETE RESTRICT ON UPDATE CASCADE;
