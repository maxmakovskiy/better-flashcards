#### `User`

user(**id**, name, email, emailVerified, image, createdAt, updatedAt)

#### `Tag`

tag(**name**, description)

#### `Deck`

deck(**deckId**, title, description, createdAt, updatedAt, userId)

deck.userId NOT NULL <br />
deck.userId references user.id

#### `DeckTag`

deckTag(**deckId, tagName**)

deckTag.deckId references deck.deckId <br/>
deckTag.tagName references tag.name

#### `Flashcard`

flashcard(**flashcardNum, deckId**, frontText, backText, easeFactor, intervalDays, repetitionCount, nextReviewAt, lastReviewedAt, memoryStrength, createdAt, updatedAt)

flashcard.deckId references deck.deckId

#### `StudySession`

studySession(**sessionId**, startedAt, endedAt, totalReviews, correctAnswers, avgResponseTimeMs, deckId)

studySession.deckId NOT NULL <br />
studySession.deckId references deck.deckId

#### `ReviewHistory`

reviewHistory(**sessionId, flashcardNum, deckId,** difficultyRating, responseTimeMs, isCorrect, reviewedAt)

reviewHistory.sessionId refences studySession.sessionId <br/>
reviewHistory.flashcardNum refences flashcard.flashcardNum <br/>
reviewHistory.deckId refences flashcard.deckId
