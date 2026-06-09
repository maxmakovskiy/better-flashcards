'use client'

import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import DeckCard from '@/app/flashcards/_components/deck-card'
import NextLink from '@/app/_components/Link'
import Button from '@mui/material/Button'
import NewDeckDialog from './new-deck-dialog'
import FolderIcon from '@mui/icons-material/Folder'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useAllDecks } from "@/app/flashcards/decks/_hooks/use-all-decks"
import { EnhancedDeckModel } from "@/app/flashcards/types"
import { EnhancedFlashcardsDeckSchema } from "@/app/flashcards/_schemas/types/deck-schema"
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import DeckStatGadget from '@/app/flashcards/decks/_components/deck-stat-gadget'


export default function AllDecksWorkspace() {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const {
        allDecks,
        isAllDecksLoading,
        isAllDecksError,
        isAllDecksValidating,
        mutateAllDecks
    } = useAllDecks()

    const createNewDeck = (title: string, description: string) => {
        fetch(`/api/decks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Failed to create new deck with title=${title}`)
            }
            return res.json()
        }).then(newDeck => {
            return EnhancedFlashcardsDeckSchema.parse(newDeck)
        }).then((newDeck: EnhancedDeckModel) => {
            mutateAllDecks([...allDecks || [], newDeck])
        }).catch(e => console.log(e))
    }

    return (
        <Stack sx={{ p:'3em'}} spacing={3}>
            <Stack>
                <Typography variant="h5">All Your Decks</Typography>
                <Stack direction="row" sx={{ justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant="body2">Create, organize and study your flashcard decks</Typography>
                        <Button
                            sx={{ height:'100%' }}
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setDialogOpen(true)}
                        >
                            Add new deck
                        </Button>
                </Stack>
            </Stack>
            <Grid container spacing={3} sx={{ alignItems:'stretch' }}>
                <Grid size={3}>
                    <DeckStatGadget
                        icon={<FolderIcon fontSize="large" />}
                        title={isAllDecksLoading ? <Skeleton animation="wave" /> : allDecks?.length}
                        description='Total Decks' />
                </Grid>
                <Grid size={3}>
                    {/* TODO: compute from study session how many decks have been studied today */}
                    <DeckStatGadget
                        icon={<DoneAllIcon fontSize="large" />}
                        title={isAllDecksLoading ? <Skeleton animation="wave" /> : 0}
                        description='Decks Studied Today' />
                </Grid>
                <Grid size={3}>
                    <DeckStatGadget
                        icon={<ViewDayIcon fontSize="large" />}
                        title={
                            isAllDecksLoading
                                ? <Skeleton animation="wave" />
                                : allDecks?.map(d => d.flashcards.length).reduce((curr, acc) => curr + acc, 0)}
                        description='Total Cards' />
                </Grid>
                <Grid size={3}>
                    {/* TODO: compute study streak */}
                    <DeckStatGadget
                        icon={<TrendingUpIcon fontSize="large" />}
                        title={isAllDecksLoading ? <Skeleton animation="wave" /> : 0}
                        description='Day Study Streak' />
                </Grid>
            </Grid>


            {/*<TextField*/}
            {/*    sx={{ width:'40%'}}*/}
            {/*    // id={`${textFieldId}-input`}*/}
            {/*    label="Search"*/}
            {/*    slotProps={{*/}
            {/*        input: {*/}
            {/*            startAdornment: (*/}
            {/*                <InputAdornment position="start">*/}
            {/*                    <SearchIcon />*/}
            {/*                </InputAdornment>*/}
            {/*            ),*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    variant="filled"*/}
            {/*/>*/}

            <TransitionGroup>
                {(!isAllDecksLoading && isAllDecksValidating) &&
                    <Fade>
                        <LinearProgress aria-label="Loading…" variant="query" />
                    </Fade>
                }
            </TransitionGroup>

            {!isAllDecksLoading
                ? (
                    (isAllDecksError || allDecks?.length === 0)
                        ?
                            <Typography variant="body2">
                                You have 0 decks. Please add some
                            </Typography>
                        :
                            <Grid container spacing={2}>
                                {allDecks?.map(deck => (
                                    <Grid
                                        key={deck.deckId}
                                        size={3}
                                        spacing={2}
                                        component={NextLink}
                                        href={`/flashcards/decks/${deck.deckId}`}
                                    >
                                        <DeckCard deck={deck} />
                                    </Grid>
                                ))}
                            </Grid>
                ) :
                    <Grid container spacing={2}>
                        {[1,2,3,4].map(k => (
                            <Grid
                                key={k}
                                size={3}
                                spacing={2}
                            >
                                <Skeleton animation="wave" sx={{ height: '120px' }} />
                            </Grid>
                        ))}
                    </Grid>

            }

            <NewDeckDialog
                isOpen={isDialogOpen}
                setClose={() => setDialogOpen(false)}
                handleSubmit={createNewDeck}
            />
        </Stack>
    );
}
