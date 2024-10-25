/*
  Warnings:

  - Added the required column `serverId` to the `Island` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serverId` to the `ServerFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `island` ADD COLUMN `serverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `serverfiles` ADD COLUMN `serverId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ServerFiles` ADD CONSTRAINT `ServerFiles_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id_server`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Island` ADD CONSTRAINT `Island_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id_server`) ON DELETE RESTRICT ON UPDATE CASCADE;
