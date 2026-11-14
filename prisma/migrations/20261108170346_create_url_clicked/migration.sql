-- CreateTable
CREATE TABLE `urlClicked` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url_id` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `os` VARCHAR(100) NULL,
    `device` VARCHAR(50) NULL,
    `browser` VARCHAR(100) NULL,
    `clicked_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `urlClicked_url_id_idx`(`url_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `urlClicked` ADD CONSTRAINT `urlClicked_url_id_fkey` FOREIGN KEY (`url_id`) REFERENCES `urls`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
