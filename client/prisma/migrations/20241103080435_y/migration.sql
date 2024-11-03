/*
  Warnings:

  - You are about to drop the column `contains` on the `Alert` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "cron" TEXT NOT NULL
);
INSERT INTO "new_Alert" ("appName", "cron", "id", "severity") SELECT "appName", "cron", "id", "severity" FROM "Alert";
DROP TABLE "Alert";
ALTER TABLE "new_Alert" RENAME TO "Alert";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
