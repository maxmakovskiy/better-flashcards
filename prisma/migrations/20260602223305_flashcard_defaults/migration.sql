/*
  Warnings:

  - Added the required column `updatedAt` to the `StudySession` table without a default value. This is not possible if the table is not empty.

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
    "lastReviewedAt" DATETIME,
    "memoryStrength" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("flashcardNum", "deckId"),
    CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Flashcard" ("backText", "createdAt", "deckId", "easeFactor", "flashcardNum", "frontText", "intervalDays", "lastReviewedAt", "memoryStrength", "nextReviewAt", "repetitionCount", "updatedAt") SELECT "backText", "createdAt", "deckId", "easeFactor", "flashcardNum", "frontText", "intervalDays", "lastReviewedAt", "memoryStrength", "nextReviewAt", "repetitionCount", "updatedAt" FROM "Flashcard";
DROP TABLE "Flashcard";
ALTER TABLE "new_Flashcard" RENAME TO "Flashcard";
CREATE TABLE "new_StudySession" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "avgResponseTimeMs" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudySession_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudySession" ("avgResponseTimeMs", "correctAnswers", "deckId", "endedAt", "sessionId", "startedAt", "totalReviews") SELECT "avgResponseTimeMs", "correctAnswers", "deckId", "endedAt", "sessionId", "startedAt", "totalReviews" FROM "StudySession";
DROP TABLE "StudySession";
ALTER TABLE "new_StudySession" RENAME TO "StudySession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
