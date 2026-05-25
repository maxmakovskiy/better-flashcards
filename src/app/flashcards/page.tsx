import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import BrainIcon from '@/app/_components/BrainIcon'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeckCard from '@/app/flashcards/_components/deck-card'
import ExtensionIcon from '@mui/icons-material/Extension'
import Game from '@/app/flashcards/_components/game'
import LinearProgress from '@mui/material/LinearProgress'

import { Deck, Card } from "./stores/study-store"
import StudyWorkspace from "@/app/flashcards/_components/study-workspace"
import { StudyStoreProvider } from "@/app/flashcards/providers/study-store-provider";

const mockDecks: Array<Deck> = [
    {id: '1', title:'Spanish Vocabulary', numOfCards: 150},
    {id: '2', title:'React Basics', numOfCards: 250},
    {id: '3', title:'Networks exam', numOfCards: 200},
    {id: '4', title:'Data Structures', numOfCards: 300},
]

const mockCards: Array<Card> = [
    {id: '1', front:'go out', back:'go to an event'},
    {id: '2', front:'come up with', back:'produce an idea'},
    {id: '3', front:'come on', back:'say this to encourage someone'},
    {id: '4', front:'set up', back:'create/arrange'},
    {id: '5', front:'make up', back:'be the parts that form'},
    {id: '6', front:'come back', back:'return to a place'},
]

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
