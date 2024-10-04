/*
  Warnings:

  - You are about to drop the column `fistsurname_person` on the `Person` table. All the data in the column will be lost.
  - Added the required column `firstsurname_person` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Person` DROP COLUMN `fistsurname_person`,
    ADD COLUMN `firstsurname_person` VARCHAR(191) NOT NULL;
