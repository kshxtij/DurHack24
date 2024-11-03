-- CreateTable
CREATE TABLE "Alert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "contains" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "cron" TEXT NOT NULL
);
