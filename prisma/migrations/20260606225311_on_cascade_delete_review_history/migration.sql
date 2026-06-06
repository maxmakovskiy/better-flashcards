-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReviewHistory" (
    "sessionId" TEXT NOT NULL,
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "difficultyRating" TEXT NOT NULL,
    "responseTimeMs" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "reviewedAt" DATETIME NOT NULL,

    PRIMARY KEY ("sessionId", "flashcardNum", "deckId"),
    CONSTRAINT "ReviewHistory_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "StudySession" ("sessionId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewHistory_flashcardNum_deckId_fkey" FOREIGN KEY ("flashcardNum", "deckId") REFERENCES "Flashcard" ("flashcardNum", "deckId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReviewHistory" ("deckId", "difficultyRating", "flashcardNum", "isCorrect", "responseTimeMs", "reviewedAt", "sessionId") SELECT "deckId", "difficultyRating", "flashcardNum", "isCorrect", "responseTimeMs", "reviewedAt", "sessionId" FROM "ReviewHistory";
DROP TABLE "ReviewHistory";
ALTER TABLE "new_ReviewHistory" RENAME TO "ReviewHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
