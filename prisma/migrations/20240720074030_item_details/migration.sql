-- CreateTable
CREATE TABLE `ItemDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemUom` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `itemHeaderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemDetails` ADD CONSTRAINT `ItemDetails_itemHeaderId_fkey` FOREIGN KEY (`itemHeaderId`) REFERENCES `ItemHeader`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
