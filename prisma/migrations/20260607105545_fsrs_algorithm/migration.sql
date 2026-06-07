/*
  Warnings:

  - You are about to drop the column `easeFactor` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `intervalDays` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `repetitionCount` on the `Flashcard` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `ReviewHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueData` to the `ReviewHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningState` to the `ReviewHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningSteps` to the `ReviewHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDays` to the `ReviewHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stability` to the `ReviewHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flashcard" (
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "frontText" TEXT NOT NULL,
    "backText" TEXT NOT NULL,
    "nextReviewAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stability" REAL NOT NULL DEFAULT 0,
    "difficulty" REAL NOT NULL DEFAULT 0,
    "scheduledDays" INTEGER NOT NULL DEFAULT 0,
    "learningSteps" INTEGER NOT NULL DEFAULT 0,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "learningState" TEXT NOT NULL DEFAULT 'NEW',
    "lastReviewAt" DATETIME,
    "memoryStrength" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("flashcardNum", "deckId"),
    CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Flashcard" ("backText", "createdAt", "deckId", "flashcardNum", "frontText", "lastReviewAt", "memoryStrength", "nextReviewAt", "updatedAt") SELECT "backText", "createdAt", "deckId", "flashcardNum", "frontText", "lastReviewAt", "memoryStrength", "nextReviewAt", "updatedAt" FROM "Flashcard";
DROP TABLE "Flashcard";
ALTER TABLE "new_Flashcard" RENAME TO "Flashcard";
CREATE TABLE "new_ReviewHistory" (
    "sessionId" TEXT NOT NULL,
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "difficultyRating" TEXT NOT NULL,
    "learningState" TEXT NOT NULL,
    "dueData" DATETIME NOT NULL,
    "stability" REAL NOT NULL,
    "difficulty" REAL NOT NULL,
    "responseTimeMs" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "reviewedAt" DATETIME NOT NULL,
    "scheduledDays" INTEGER NOT NULL,
    "learningSteps" INTEGER NOT NULL,

    PRIMARY KEY ("sessionId", "flashcardNum", "deckId"),
    CONSTRAINT "ReviewHistory_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "StudySession" ("sessionId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewHistory_flashcardNum_deckId_fkey" FOREIGN KEY ("flashcardNum", "deckId") REFERENCES "Flashcard" ("flashcardNum", "deckId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReviewHistory" ("deckId", "difficultyRating", "flashcardNum", "isCorrect", "responseTimeMs", "reviewedAt", "sessionId") SELECT "deckId", "difficultyRating", "flashcardNum", "isCorrect", "responseTimeMs", "reviewedAt", "sessionId" FROM "ReviewHistory";
DROP TABLE "ReviewHistory";
ALTER TABLE "new_ReviewHistory" RENAME TO "ReviewHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
