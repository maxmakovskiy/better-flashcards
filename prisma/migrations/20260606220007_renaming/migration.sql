/*
  Warnings:

  - You are about to drop the column `lastReviewedAt` on the `Flashcard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flashcard" (
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "frontText" TEXT NOT NULL,
    "backText" TEXT NOT NULL,
    "easeFactor" REAL NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "repetitionCount" INTEGER NOT NULL DEFAULT 0,
    "nextReviewAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewAt" DATETIME,
    "memoryStrength" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("flashcardNum", "deckId"),
    CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Flashcard" ("backText", "createdAt", "deckId", "easeFactor", "flashcardNum", "frontText", "intervalDays", "memoryStrength", "nextReviewAt", "repetitionCount", "updatedAt") SELECT "backText", "createdAt", "deckId", "easeFactor", "flashcardNum", "frontText", "intervalDays", "memoryStrength", "nextReviewAt", "repetitionCount", "updatedAt" FROM "Flashcard";
DROP TABLE "Flashcard";
ALTER TABLE "new_Flashcard" RENAME TO "Flashcard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
