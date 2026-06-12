'use client'

import { useMemo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import DeckCardMenu from '@/app/flashcards/_components/deck-card-menu'
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { useAllDecks } from '@/app/flashcards/decks/_hooks/use-all-decks'

export default function DeckCard({ deck }: { deck: EnhancedDeckModel }) {
    const progress = useMemo(() => {
        const now = new Date()
        const cardReviewed = deck.flashcards.filter(card => (now < card.nextReviewAt) && (card.lastReviewAt !== null))
        return (
            (deck.flashcards.length === 0)
                ? 0
                : Math.min(Math.ceil(cardReviewed.length / deck.flashcards.length * 100), 100)
        )
    }, [deck]);

    const {
        allDecks,
        mutateAllDecks
    } = useAllDecks()

    const deleteDeck = async () =>
        mutateAllDecks(
            async () => {
                const optimistic = allDecks?.filter(d => d.deckId !== deck.deckId);

                await fetch(`/api/decks/${deck.deckId}`, {
                    method: 'DELETE',
                }).then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to delete the deck with id=${deck.deckId}`)
                    }
                })
                return optimistic;
            },
            {
                optimisticData: allDecks?.filter(d => d.deckId !== deck.deckId),
                rollbackOnError: true,
            }
        )

    return (
        <Card
            sx={{
                height:'100%',
                whiteSpace:'nowrap',
                transition: 'transform .3s cubic-bezier(0,0,.5,1)',
                '&:hover': {
                    cursor:'pointer',
                    transform: 'scale(1.025)',
                    textDecoration: 'underline'
                }
            }}
        >
            <CardContent>
                <Stack
                    direction='row'
                    sx={{
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}
                >
                    <FolderIcon fontSize='small' />
                    <DeckCardMenu
                        deckId={deck.deckId}
                        handleDeckDeletion={deleteDeck} />
                </Stack>
                <Typography
                    variant='body1'
                    sx={{
                        color: 'text.primary',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                    gutterBottom
                >
                    {deck.title}
                </Typography>
                <Stack
                    direction='row'
                    sx={{ justifyContent: 'space-between', alignItems:'center' }}
                >
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        {deck.flashcards.length} cards
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        {progress}%
                    </Typography>
                </Stack>
                <LinearProgress
                    variant='determinate'
                    min={0}
                    max={100}
                    value={progress}
                />
            </CardContent>
        </Card>
    )
}
