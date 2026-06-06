'use client'

import { useState, ReactNode } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import DeckCard from '@/app/flashcards/_components/deck-card'
import NextLink from '@/app/_components/Link'
import Button from '@mui/material/Button'
import NewDeckDialog from './new-deck-dialog'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import FolderIcon from '@mui/icons-material/Folder'
import Paper from '@mui/material/Paper'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useAllDecks } from "@/app/flashcards/decks/_hooks/use-all-decks"

type StatChip = {
    icon: ReactNode;
    title: number;
    description: string;
}

const statChips: StatChip[] = [
    {icon: <FolderIcon />, title: 18, description: 'Total Decks'},
    {icon: <DoneAllIcon />, title: 6, description: 'Decks Studied Today'},
    {icon: <ViewDayIcon />, title: 2540, description: 'Total Cards'},
    {icon: <TrendingUpIcon />, title: 15, description: 'Day Study Streak'},
]

export default function DecksWorkspace() {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const { allDecks, isAllDecksLoading, isAllDecksError, isAllDecksValidating } = useAllDecks()

    const createNewDeck = async (title: string, description: string) => {
        // try {
        //     const body = { title, description };
        //     const newDeckJSON = await fetch(`/api/decks`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(body),
        //     });
        //     const newDeck = await newDeckJSON.json();
        //     console.log(`DecksWorkspace updating decks collection on client: ${JSON.stringify(newDeck)}`)
        //     setDecks([...decks, newDeck])
        // } catch (error) {
        //     console.error(error);
        // }
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
                {/* TODO: should use the same deck-stat-gadget */}
                {statChips.map(chip =>
                    <Grid key={chip.title} size={3}>
                        <Paper sx={{ p:'1em', height:'100%' }}>
                           <Grid container spacing={2}>
                               <Grid size={3}
                                     sx={{
                                         display:'flex',
                                         justifyContent:'center',
                                         alignItems:'center'
                                     }}
                               >
                                   {chip.icon as ReactNode}
                               </Grid>
                               <Grid size={9}>
                                   <Stack>
                                       <Typography variant="h6">{chip.title}</Typography>
                                       <Typography variant="body2">{chip.description}</Typography>
                                   </Stack>
                               </Grid>
                           </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>
            <TextField
                sx={{ width:'40%'}}
                // id={`${textFieldId}-input`}
                label="Search"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                variant="filled"
            />
            <NewDeckDialog
                isOpen={isDialogOpen}
                setClose={() => setDialogOpen(false)}
                handleSubmit={createNewDeck}
            />
            <Grid container spacing={2}>
                {!(isAllDecksError || isAllDecksLoading) && allDecks?.map(deck => (
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
        </Stack>
    );
}
