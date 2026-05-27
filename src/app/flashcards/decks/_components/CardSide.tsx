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
import {Deck} from "@/app/flashcards/stores/study-store";
import EditIcon from '@mui/icons-material/Edit';

export interface CardSideProps {
    isFront?: boolean;
    content: string;
}

export default function CardSide({ isFront = false, content }: CardSideProps) {
    return (
        <Paper elevation={3} sx={{p: '1em'}}>
            <Stack spacing={1}>
                <Grid container>
                    <Grid size={10}>
                        <Typography variant="h6">{isFront ? 'Front' : 'Back'}</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Button>
                            <EditIcon/>
                        </Button>
                    </Grid>
                </Grid>
                <Divider/>
                <Typography variant="body1">
                    {content}
                </Typography>
            </Stack>
        </Paper>
    )
}