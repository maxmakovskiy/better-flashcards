import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import DeckCard from '@/app/flashcards/_components/deck-card'
import NextLink from '@/app/_components/Link'
import {Deck} from "@/app/flashcards/stores/study-store";

const mockDecks: Map<string, Deck> = new Map([
    ['1', {id: '1', title:'Spanish Vocabulary', numOfCards: 150}],
    ['2', {id: '2', title:'React Basics', numOfCards: 250}],
    ['3', {id: '3', title:'Networks exam', numOfCards: 200}],
    ['4', {id: '4', title:'Data Structures', numOfCards: 300}],
])

export default function DecksPage() {
    return (
        <Stack sx={{ p:'3em'}} spacing={3}>
            <Grid container sx={{ alignItems:'stretch'}}>
                <Grid size={7}>
                    <Typography variant="h5">All Your Decks</Typography>
                </Grid>
                <Grid size={5}>
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
            </Grid>
            <Grid container spacing={2}>
                {[...mockDecks].map(([_, deck]) => (
                    <Grid
                        key={deck.id}
                        size={3}
                        spacing={2}
                        component={NextLink}
                        href={`/flashcards/decks/${deck.id}`}
                    >
                        <DeckCard
                            {...deck} />
                    </Grid>

                ))}
            </Grid>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    right: 32
                }}
            >
                <AddIcon />
            </Fab>
        </Stack>
    );
}
