-- CreateTable
CREATE TABLE `urls` (
    `id` VARCHAR(100) NOT NULL,
    `original_url` VARCHAR(2048) NOT NULL,
    `short_code` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_on` TIMESTAMP(0) NULL,
    `urlclicks` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `short_code`(`short_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
