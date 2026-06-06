'use client'

import { use, useState, useMemo, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import DeckStatGadget from "@/app/flashcards/decks/_components/deck-stat-gadget"
import CardsTable from './cards-table'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NextLink from '@/app/_components/Link'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import Box from "@mui/material/Box"
import Divider from '@mui/material/Divider'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CachedIcon from '@mui/icons-material/Cached'
import Skeleton from '@mui/material/Skeleton'
import dayjs from 'dayjs'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CardDialog from '@/app/flashcards/decks/[id]/_components/card-dialog'
import { useDeck } from '../_hooks/use-deck'
import { useCards } from '../_hooks/use-cards'


export default function SingleDeckWorkspace({ deckId }: { deckId: string }) {
    const [isNewCardDialogOpen, setNewCardDialogOpen] = useState(false)
    const { deck, isDeckLoading, isDeckError, deckMutate } = useDeck(deckId)
    const { cards, isCardsLoading, isCardsError, cardsMutate } = useCards(deckId)

    const stats = useMemo(() => {
        const now = new Date()
        if (isCardsLoading || isCardsError || !cards) {
            return {
                "learned": 0,
                "inprogress": 0,
                "new": 0
            }
        }
        const newNumber = cards?.filter(c => !c.lastReviewAt).length
        const learnedNumber = cards?.filter(c => c.nextReviewAt > now).length

        return {
            "learned": learnedNumber,
            "inprogress": cards?.length - (learnedNumber + newNumber),
            "new": newNumber
        }
    }, [cards]);

    const handleCardCreation = (frontText: string, backText: string) => {
        const body = { frontText, backText };
        fetch(`/api/cards/${deckId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Failed to create new flashcard (front=${frontText}; back=${backText}) in deck with id=${deckId}`)
            }
            return res.json()
        }).then((newCard: FlashcardModel) => cardsMutate([...cards!, newCard]))
    }

    return (
        <Stack sx={{ p:'3em' }} spacing={3}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    component={NextLink}
                    href="/flashcards/decks"
                    color="inherit"
                    underline="hover"
                >
                    <Typography variant="body2">Decks</Typography>
                </Link>
                <Typography variant="body2">
                    {isDeckLoading ?
                        <Skeleton animation="wave" />
                        : deck?.title
                    }
                </Typography>
            </Breadcrumbs>
            <Stack direction="row" sx={{alignItems:'center', justifyContent:'space-between'}}>
                <Stack>
                    <Typography gutterBottom variant='h5'>
                        Deck:
                        {isDeckLoading ?
                            <Skeleton animation="wave" />
                            : " " + deck?.title
                        }
                    </Typography>
                    <Typography gutterBottom variant='body2'>
                        Description:
                        {isDeckLoading ?
                            <Skeleton animation="wave" />
                            : " " + deck?.description
                        }
                    </Typography>
                </Stack>
                <Box>
                    <Button>
                        <MoreHorizIcon />
                    </Button>
                    <Button
                        onClick={() => setNewCardDialogOpen(true)}
                        variant='contained'
                        startIcon={<AddIcon />}
                    >
                        Add Card
                    </Button>
                </Box>
            </Stack>
            <Grid container spacing={2} columns={10} sx={{ alignItems:'stretch'}}>
                <Grid size={2}>
                    {isCardsLoading
                        ? <Skeleton animation="wave" />
                        : <DeckStatGadget
                            icon={<ViewAgendaIcon fontSize="large" />}
                            title={cards?.length || 0}
                            description='Total cards' />
                    }
                </Grid>
                <Grid size={2}>
                    {isCardsLoading
                        ? <Skeleton animation="wave" />
                        : <DeckStatGadget
                            icon={<DoneAllIcon fontSize="large" />}
                            title={stats['learned']}
                            description='Learned' />
                    }
                </Grid>
                <Grid size={2}>
                    {isCardsLoading
                        ? <Skeleton animation="wave" />
                        : <DeckStatGadget
                            icon={<CachedIcon fontSize="large" />}
                            title={stats['inprogress']}
                            description='In progress' />
                    }
                </Grid>
                <Grid size={2}>
                    {isCardsLoading
                        ? <Skeleton animation="wave" />
                        : <DeckStatGadget
                            icon={<NewReleasesIcon fontSize="large" />}
                            title={stats['new']}
                            description='New' />
                    }
                </Grid>
                <Grid size={2}>
                    {isDeckLoading
                        ? <Skeleton animation="wave" />
                        : <DeckStatGadget
                            icon={<CalendarMonthIcon fontSize="large" />}
                            title='Created'
                            description={dayjs(deck?.createdAt).format('MMM DD, YYYY')} />
                    }
                </Grid>
            </Grid>
            <Divider />

            {isCardsLoading ? <Skeleton animation="wave" sx={{ height:'10em' }}/>
                : (
                    (cards?.length === 0)
                        ? <Typography variant="body2">
                            You have not added any cards yet
                            </Typography>
                        : <CardsTable deckId={deckId} />)
            }
            <CardDialog
                dialogTitle='New card'
                dialogDescription='To create new card please fill front and back sides with data'
                isOpen={isNewCardDialogOpen}
                setClose={() => setNewCardDialogOpen(false)}
                handleData={handleCardCreation} />

        </Stack>
    )
}
