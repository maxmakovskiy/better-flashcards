import { Deck, Card } from "@/app/flashcards/stores/study-store"

/**
 *   flashcardNum Int
 *   deckId String
 *   frontText String
 *   backText String
 *   easeFactor Float ? move it to deck ?
 *   intervalDays Int
 *   repetitionCount Int
 *   nextReviewAt DateTime
 *   lastReviewedAt DateTime
 *   memoryStrength Int
 *   createdAt DateTime
 *   updatedAt DateTime
 * */

const NOW = 1780324262407

const mockCards = [
    {
        flashcardNum: 1,
        deckId:'1',
        frontText:'go out',
        backText:'go to an event',
        intervalDays: 10,
        repetitionCount: 3,
        nextReviewAt: new Date(NOW - 10000),
        lastReviewAt: new Date(NOW - 20000)
    },
    {flashcardNum: 2, deckId:'1', frontText:'come up with', backText:'produce an idea', intervalDays: 10, repetitionCount: 3, nextReviewAt: new Date(NOW - 10000), lastReviewAt: new Date(NOW - 20000)},
    {flashcardNum: 3, deckId:'1', frontText:'come on', backText:'say this to encourage someone', intervalDays: 10, repetitionCount: 3, nextReviewAt: new Date(NOW - 10000), lastReviewAt: new Date(NOW - 20000)},
    {flashcardNum: 4, deckId:'1', frontText:'set up', backText:'create/arrange', intervalDays: 10, repetitionCount: 3, nextReviewAt: new Date(NOW - 10000), lastReviewAt: new Date(NOW - 20000)},
    {flashcardNum: 5, deckId:'1', frontText:'make up', backText:'be the parts that form', intervalDays: 10, repetitionCount: 3, nextReviewAt: new Date(NOW - 10000), lastReviewAt: new Date(NOW - 20000)},
    {flashcardNum: 6, deckId:'1', frontText:'come back', backText:'return to a place', intervalDays: 10, repetitionCount: 3, nextReviewAt: new Date(NOW - 10000), lastReviewAt: new Date(NOW - 20000)},
]

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function GET() {
    await sleep(1000);
    return Response.json({ data: mockCards })
}
