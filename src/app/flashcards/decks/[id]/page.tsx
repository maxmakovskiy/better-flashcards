'use client'
import { use } from 'react'

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
import Card, { CardProps } from '@/app/flashcards/decks/_components/Card'

const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum'

export default function DeckPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return (
        <Grid container spacing={3} sx={{ p:'3em'}}>
            <Grid size={9}>
                <Stack spacing={2}>
                    <Grid container>
                        <Grid size={8}>
                            <Typography variant="h5">Deck management English Vocabulary</Typography>
                        </Grid>
                        <Grid size={4}>
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
                    <Card frontContent={content} backContent={content} />
                </Stack>
            </Grid>
            <Grid size={3}>
                <Paper elevation={3} sx={{ p:'1em'}}>
                    <Stack spacing={1}>
                        <Typography variant="body1">Total cards</Typography>
                        <Typography variant="h6">250 cards</Typography>
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid size={1} sx={{ bgcolor: 'success.light'}}/>
                            <Grid size={8}>Learned</Grid>
                            <Grid size={3}>128</Grid>
                            <Grid size={1} sx={{ bgcolor: 'warning.light'}} />
                            <Grid size={8}>In progress</Grid>
                            <Grid size={3}>64</Grid>
                            <Grid size={1} sx={{ bgcolor: 'info.light'}} />
                            <Grid size={8}>New</Grid>
                            <Grid size={3}>32</Grid>
                        </Grid>
                    </Stack>
                </Paper>
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
        </Grid>
    )
}
