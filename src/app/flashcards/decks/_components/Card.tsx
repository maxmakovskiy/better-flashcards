import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import DeckCard from '@/app/flashcards/_components/deck-card'
import NextLink from '@/app/_components/Link'
import {Deck} from "@/app/flashcards/stores/study-store"
import EditIcon from '@mui/icons-material/Edit'
import CardSide, { CardSideProps } from '@/app/flashcards/decks/_components/CardSide'

export interface CardProps {
    frontContent: string;
    backContent: string;
}

export default function Card({ frontContent, backContent }: CardProps) {
    return (
        <Paper variant="outlined" sx={{ bgcolor:'inherit'}}>
            <Stack>
                <Stack direction="row" sx={{ justifyContent:'flex-end' }}>
                    <Button>
                        <EditIcon />
                    </Button>
                </Stack>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <CardSide isFront content={frontContent} />
                    </Grid>
                    <Grid size={6}>
                        <CardSide content={backContent} />
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
}