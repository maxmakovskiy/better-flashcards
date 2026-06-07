-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeckTag" (
    "deckId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    PRIMARY KEY ("deckId", "tagName"),
    CONSTRAINT "DeckTag_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("deckId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DeckTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeckTag" ("deckId", "tagName") SELECT "deckId", "tagName" FROM "DeckTag";
DROP TABLE "DeckTag";
ALTER TABLE "new_DeckTag" RENAME TO "DeckTag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
