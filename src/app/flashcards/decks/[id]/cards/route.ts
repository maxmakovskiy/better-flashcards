import { Deck, Card } from "@/app/flashcards/stores/study-store"

const mockCards: Array<Card> = [
    {id: '1', front:'go out', back:'go to an event'},
    {id: '2', front:'come up with', back:'produce an idea'},
    {id: '3', front:'come on', back:'say this to encourage someone'},
    {id: '4', front:'set up', back:'create/arrange'},
    {id: '5', front:'make up', back:'be the parts that form'},
    {id: '6', front:'come back', back:'return to a place'},
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
