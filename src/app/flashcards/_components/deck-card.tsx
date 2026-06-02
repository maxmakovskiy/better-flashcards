'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import DeckCardMenu from '@/app/flashcards/_components/deck-card-menu'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'

export interface DeckCardProps {
    deck: DeckModel & { flashcards: FlashcardModel[] };
}

export default function DeckCard({ deck }: DeckCardProps) {
    const [progress, _] = useState<number>(() => {
        const now = new Date()
        return (
            (deck.flashcards.length === 0)
                ? 0
                : deck.flashcards.filter(card => now < card.nextReviewAt).length / deck.flashcards.length
        )
    })

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
                    direction="row"
                    sx={{
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}
                >
                    <FolderIcon fontSize="small" />
                    <DeckCardMenu />
                </Stack>
                <Typography
                    variant="body1"
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
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems:'center' }}
                >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {deck.flashcards.length} cards
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {progress}%
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                />
            </CardContent>
        </Card>
    );
}
