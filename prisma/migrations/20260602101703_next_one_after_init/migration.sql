-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Deck" (
    "deckId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeckTag" (
    "deckId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    PRIMARY KEY ("deckId", "tagName"),
    CONSTRAINT "DeckTag_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeckTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "frontText" TEXT NOT NULL,
    "backText" TEXT NOT NULL,
    "easeFactor" REAL NOT NULL,
    "intervalDays" INTEGER NOT NULL,
    "repetitionCount" INTEGER NOT NULL,
    "nextReviewAt" DATETIME NOT NULL,
    "lastReviewedAt" DATETIME NOT NULL,
    "memoryStrength" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("flashcardNum", "deckId"),
    CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudySession" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "avgResponseTimeMs" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    CONSTRAINT "StudySession_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewHistory" (
    "sessionId" TEXT NOT NULL,
    "flashcardNum" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "difficultyRating" TEXT NOT NULL,
    "responseTimeMs" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "reviewedAt" DATETIME NOT NULL,

    PRIMARY KEY ("sessionId", "flashcardNum", "deckId"),
    CONSTRAINT "ReviewHistory_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "StudySession" ("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReviewHistory_flashcardNum_deckId_fkey" FOREIGN KEY ("flashcardNum", "deckId") REFERENCES "Flashcard" ("flashcardNum", "deckId") ON DELETE RESTRICT ON UPDATE CASCADE
);
