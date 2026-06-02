'use client'
import { use, useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import DeckStatGadget from "@/app/flashcards/decks/_components/DeckStatGadget";
import CardsTable from '@/app/flashcards/decks/_components/CardsTable'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import useSWR from 'swr'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NextLink from '@/app/_components/Link'

export default function DeckPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const fetcher = (...args: any[]) => fetch(...args).then(res => res.json()).then(data => data.data)
    const { data, error, isLoading } = useSWR(`/flashcards/decks/${id}/cards`, fetcher)

    return (
        <Stack sx={{ p:'3em' }} spacing={2}>
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
                <Typography variant="body2">DecknameHere</Typography>
            </Breadcrumbs>
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
            <Grid container>
                <Grid size={6} spacing={3}>
                    <TextField fullWidth
                        // sx={{ width:'60%'}}
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
                <Grid size={3}>
                    {/* TODO: filter cards based on tags chosen via multiselect */}
                </Grid>
                <Grid size={3}>
                    <FormControl fullWidth>
                        <InputLabel id="select-sort-label">Sort by</InputLabel>
                        <Select
                            labelId="select-sort-label"
                            id="select-sort"
                            // value={"Newest"}
                            label="Sort by"
                            onChange={() => console.log("Changing sorting order")}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {error && !isLoading && <Box><Typography variant="body1">Something went wrong...</Typography></Box>}
            {(!error && isLoading)
                ? <Skeleton variant="rectangular" height={200} />
                : <CardsTable cards={data}/>
            }

        </Stack>
    )
}
