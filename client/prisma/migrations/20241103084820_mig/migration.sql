/*
  Warnings:

  - You are about to drop the column `appName` on the `Alert` table. All the data in the column will be lost.
  - Added the required column `service` to the `Alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "cron" TEXT NOT NULL
);
INSERT INTO "new_Alert" ("cron", "id", "severity") SELECT "cron", "id", "severity" FROM "Alert";
DROP TABLE "Alert";
ALTER TABLE "new_Alert" RENAME TO "Alert";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
