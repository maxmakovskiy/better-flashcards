'use client'

import { useState, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import DeckStatGadget from '@/app/flashcards/decks/_components/deck-stat-gadget'
import CardsTable from './cards-table'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NextLink from '@/app/_components/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CachedIcon from '@mui/icons-material/Cached'
import Skeleton from '@mui/material/Skeleton'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CardDialog from '@/app/flashcards/decks/[id]/_components/card-dialog'
import { useDeck } from '../_hooks/use-deck'
import { useCards } from '../_hooks/use-cards'
import { format } from 'date-fns'
import DeckModificationDialog from '@/app/flashcards/decks/[id]/_components/deck-modification-dialog'
import EditIcon from '@mui/icons-material/Edit'
import { useCreateCard } from '@/app/flashcards/decks/[id]/_hooks/use-create-card'

export default function SingleDeckWorkspace({ deckId }: { deckId: string }) {
    const [isNewCardDialogOpen, setNewCardDialogOpen] = useState(false)
    const [isEditDeckDialogOpen, setEditDeckDialogOpen] = useState(false)
    const { deck, isDeckLoading, isDeckError, isDeckValidating } = useDeck(deckId)
    const { cards, isCardsLoading, isCardsError } = useCards(deckId)
    const { createNewCard, isCardCreationOngoing } = useCreateCard(deckId)
    const [newCardFrontText, setNewCardFronText] = useState<string>('')
    const [newCardBackText, setNewCardBackText] = useState<string>('')

    const stats = useMemo(() => {
        const now = new Date()
        if (isCardsLoading || isCardsError || !cards) {
            return {
                learned: 0,
                inProgress: 0,
                new: 0
            }
        }
        const newNumber = cards?.filter(c => !c.lastReviewAt).length
        const learnedNumber = cards?.filter(c => c.nextReviewAt > now).length

        return {
            learned: learnedNumber,
            inProgress: cards?.length - (learnedNumber + newNumber),
            new: newNumber
        }
    }, [cards, isCardsLoading, isCardsError])

    return (
        <Stack sx={{ p:'3em' }} spacing={3}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize='small' />}
                aria-label='breadcrumb'
            >
                <Link
                    component={NextLink}
                    href='/flashcards/decks'
                    color='inherit'
                    underline='hover'
                >
                    <Typography variant='body2'>Decks</Typography>
                </Link>
                <Typography variant='body2'>
                    {(isDeckLoading || isDeckError) ?
                        <Skeleton animation='wave' sx={{ width:'50px' }} />
                        : deck?.title
                    }
                </Typography>
            </Breadcrumbs>
            <Stack direction='row' sx={{alignItems:'center', justifyContent:'space-between'}}>
                <Stack>
                    <Typography gutterBottom variant='h5'>
                        Deck:
                        {isDeckLoading || isDeckError ?
                            <Skeleton animation='wave' />
                            : ' ' + deck?.title
                        }
                    </Typography>
                    <Typography gutterBottom variant='body2'>
                        Description:
                        {isDeckLoading || isDeckError ?
                            <Skeleton animation='wave' />
                            : ' ' + deck?.description
                        }
                    </Typography>
                </Stack>
                <Box>
                    <Button onClick={() => setEditDeckDialogOpen(true)}>
                        <EditIcon />
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
                    {isCardsLoading || isCardsError
                        ? <Skeleton animation='wave' />
                        : <DeckStatGadget
                            icon={<ViewAgendaIcon fontSize='large' />}
                            title={cards?.length || 0}
                            description='Total cards' />
                    }
                </Grid>
                <Grid size={2}>
                    {isCardsLoading || isCardsError
                        ? <Skeleton animation='wave' />
                        : <DeckStatGadget
                            icon={<DoneAllIcon fontSize='large' />}
                            title={stats.learned}
                            description='Learned' />
                    }
                </Grid>
                <Grid size={2}>
                    {isCardsLoading || isCardsError
                        ? <Skeleton animation='wave' />
                        : <DeckStatGadget
                            icon={<CachedIcon fontSize='large' />}
                            title={stats.inProgress}
                            description='In progress' />
                    }
                </Grid>
                <Grid size={2}>
                    {isCardsLoading || isCardsError
                        ? <Skeleton animation='wave' />
                        : <DeckStatGadget
                            icon={<NewReleasesIcon fontSize='large' />}
                            title={stats.new}
                            description='New' />
                    }
                </Grid>
                <Grid size={2}>
                    {isDeckLoading || isDeckError
                        ? <Skeleton animation='wave' />
                        : <DeckStatGadget
                            icon={<CalendarMonthIcon fontSize='large' />}
                            title='Created'
                            description={format(deck!.createdAt, 'MMM d, y')} />
                    }
                </Grid>
            </Grid>
            <Divider />

            {isCardsLoading || isCardsError 
                ? <Skeleton animation='wave' sx={{ height:'10em' }}/>
                : (
                    (cards?.length === 0)
                        ? <Typography variant='body2'>
                            You have not added any cards yet
                            </Typography>
                        : <CardsTable deckId={deckId} />
                    )
            }

            <CardDialog
                dialogTitle='New card'
                dialogDescription='To create new card please fill front and back sides with data'
                frontText={newCardFrontText}
                backText={newCardBackText}
                setFrontText={setNewCardFronText}
                setBackText={setNewCardBackText}
                isOpen={isNewCardDialogOpen}
                isMutating={isCardCreationOngoing}
                setClose={() => setNewCardDialogOpen(false)}
                onComplete={() => {
                    createNewCard({
                        frontText: newCardFrontText,
                        backText: newCardBackText,
                        closeDialog: () => setNewCardDialogOpen(false)
                    })
                }}
            />

            {(!isDeckLoading && !isDeckError && !isDeckValidating && deck) &&
                <DeckModificationDialog
                    deck={deck}
                    isDialogOpen={isEditDeckDialogOpen}
                    setDialogClose={() => setEditDeckDialogOpen(false)}
                />
            }
        </Stack>
    )
}
