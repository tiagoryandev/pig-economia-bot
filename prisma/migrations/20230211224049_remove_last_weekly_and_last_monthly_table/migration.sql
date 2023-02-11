/*
  Warnings:

  - You are about to drop the column `last_monthly` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_weekly` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `last_monthly`,
    DROP COLUMN `last_weekly`;
