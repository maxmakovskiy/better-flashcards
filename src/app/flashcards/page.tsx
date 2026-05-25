import { Deck, Card } from "./stores/study-store"
import StudyWorkspace from "@/app/flashcards/_components/study-workspace"
import { StudyStoreProvider } from "@/app/flashcards/providers/study-store-provider";

const mockDecks: Map<string, Deck> = new Map([
    ['1', {id: '1', title:'Spanish Vocabulary', numOfCards: 150}],
    ['2', {id: '2', title:'React Basics', numOfCards: 250}],
    ['3', {id: '3', title:'Networks exam', numOfCards: 200}],
    ['4', {id: '4', title:'Data Structures', numOfCards: 300}],
])

export default function HomePage() {
    return (
        <StudyStoreProvider>
            <StudyWorkspace
                decks={mockDecks}
                activeSession={null}
            />
        </StudyStoreProvider>
    )
}
