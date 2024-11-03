/*
  Warnings:

  - You are about to drop the column `cron` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Alert` table. All the data in the column will be lost.
  - Added the required column `email` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Automation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "cron" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service" TEXT NOT NULL,
    "severity" TEXT NOT NULL
);
INSERT INTO "new_Alert" ("id", "service", "severity") SELECT "id", "service", "severity" FROM "Alert";
DROP TABLE "Alert";
ALTER TABLE "new_Alert" RENAME TO "Alert";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
