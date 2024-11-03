/*
  Warnings:

  - Added the required column `trigger` to the `Automation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Automation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "cron" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "trigger" TEXT NOT NULL
);
INSERT INTO "new_Automation" ("cron", "email", "id", "service", "severity", "title") SELECT "cron", "email", "id", "service", "severity", "title" FROM "Automation";
DROP TABLE "Automation";
ALTER TABLE "new_Automation" RENAME TO "Automation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
