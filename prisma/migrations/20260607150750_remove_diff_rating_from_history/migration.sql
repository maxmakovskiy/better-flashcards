/*
  Warnings:

  - You are about to drop the column `difficultyRating` on the `ReviewHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReviewHistory" (
    "sessionId" TEXT NOT NULL,
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
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
INSERT INTO "new_ReviewHistory" ("deckId", "difficulty", "dueData", "flashcardNum", "isCorrect", "learningState", "learningSteps", "responseTimeMs", "reviewedAt", "scheduledDays", "sessionId", "stability") SELECT "deckId", "difficulty", "dueData", "flashcardNum", "isCorrect", "learningState", "learningSteps", "responseTimeMs", "reviewedAt", "scheduledDays", "sessionId", "stability" FROM "ReviewHistory";
DROP TABLE "ReviewHistory";
ALTER TABLE "new_ReviewHistory" RENAME TO "ReviewHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
