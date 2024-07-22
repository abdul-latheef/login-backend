-- CreateTable
CREATE TABLE `ItemHeader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemNumber` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `itemDescription` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ItemHeader_itemNumber_key`(`itemNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
