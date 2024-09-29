/*
  Warnings:

  - Added the required column `role_id_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `role_id_user` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `name_role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_role_key`(`name_role`),
    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_user_fkey` FOREIGN KEY (`role_id_user`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;
