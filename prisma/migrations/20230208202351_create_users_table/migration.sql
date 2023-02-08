-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `user_tag` VARCHAR(70) NOT NULL,
    `wallet` BIGINT NOT NULL DEFAULT 0,
    `bank` BIGINT NOT NULL DEFAULT 0,
    `last_daily` DATETIME(3) NULL,
    `last_weekly` DATETIME(3) NULL,
    `last_monthly` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
