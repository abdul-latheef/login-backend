-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `isActive` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;
