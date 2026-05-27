'use client'
import { use } from 'react'

import Fab from '@mui/material/Fab'
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import DeckStatGadget from "@/app/flashcards/decks/_components/DeckStatGadget";
import CardsTable from '@/app/flashcards/decks/_components/CardsTable'

export default function DeckPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return (
        <Stack sx={{ p:'3em' }} spacing={2}>
            <Grid container sx={{alignItems:'center'}}>
                <Grid size={9}>
                    <Stack>
                        <Typography gutterBottom variant='h5'>Deck management English Vocabulary</Typography>
                        <Typography gutterBottom variant='body2'>Decription</Typography>
                    </Stack>
                </Grid>
                <Grid size={1}>
                    <Button>
                        <MoreHorizIcon />
                    </Button>
                </Grid>
                <Grid size={2}>
                    <Button variant='contained' startIcon={<AddIcon />}>Add Card</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} columns={10}>
                <Grid size={2}>
                    <DeckStatGadget
                        icon={<ViewAgendaIcon sx={{fontSize:'32px'}}/>}
                        title='150'
                        description='Total cards' />
                </Grid>
                <Grid size={2}>
                    <DeckStatGadget
                        icon={<ViewAgendaIcon sx={{fontSize:'32px'}}/>}
                        title='150'
                        description='Total cards' />
                </Grid>
                <Grid size={2}>
                    <DeckStatGadget
                        icon={<ViewAgendaIcon sx={{fontSize:'32px'}}/>}
                        title='150'
                        description='Total cards' />
                </Grid>
                <Grid size={2}>
                    <DeckStatGadget
                        icon={<ViewAgendaIcon sx={{fontSize:'32px'}}/>}
                        title='150'
                        description='Total cards' />
                </Grid>
                <Grid size={2}>
                    <DeckStatGadget
                        icon={<ViewAgendaIcon sx={{fontSize:'32px'}}/>}
                        title='150'
                        description='Total cards' />
                </Grid>
            </Grid>
            <TextField
                sx={{ width:'60%'}}
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

            <CardsTable />

        </Stack>
    )
}
