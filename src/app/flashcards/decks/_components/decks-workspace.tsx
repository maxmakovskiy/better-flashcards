'use client'

import { useState } from 'react'
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
import NewDeckDialog from '@/app/flashcards/decks/_components/NewDeckDialog'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'

interface DecksWorkspaceProps {
    initDecks: Array<DeckModel & { flashcards: FlashcardModel[]}>;
}

export default function DecksWorkspace({ initDecks }: { initDecks: DeckModel[] }) {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [decks, setDecks] = useState<DeckModel[]>(initDecks)

    const createNewDeck = async (title: string, description: string) => {
        try {
            const body = { title, description };
            const newDeckJSON = await fetch(`/api/decks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const newDeck = await newDeckJSON.json();
            console.log(`DecksWorkspace updating decks collection on client: ${JSON.stringify(newDeck)}`)
            setDecks([...decks, newDeck])
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Stack sx={{ p:'3em'}} spacing={3}>
            <Typography variant="h5">All Your Decks</Typography>
            <Grid container sx={{ alignItems:'center'}}>
                <Grid size={6}>
                    <TextField
                        sx={{ width:'100%'}}
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
                </Grid>
                <Grid size={6}
                      sx={{ display:'flex', justifyContent:'flex-end'}}
                >
                    <Button
                        sx={{ height:'100%' }}
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setDialogOpen(true)}
                    >
                        Add new deck
                    </Button>
                </Grid>
            </Grid>
            <NewDeckDialog
                isOpen={isDialogOpen}
                setClose={() => setDialogOpen(false)}
                handleSubmit={createNewDeck}
            />
            <Grid container spacing={2}>
                {decks.map((deck) => (
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
