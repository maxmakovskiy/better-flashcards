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
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import FolderIcon from '@mui/icons-material/Folder'
import Paper from '@mui/material/Paper'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useAllDecks } from "@/app/flashcards/decks/_hooks/use-all-decks"
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import DeckStatGadget from '@/app/flashcards/decks/_components/deck-stat-gadget'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import SchoolIcon from '@mui/icons-material/School'
import { PieChart, pieClasses } from '@mui/x-charts/PieChart'
import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'


export default function DashboardWorkspace() {
    const [period, setPeriod] = useState('all time');

    const handlePeriodChange = (event: SelectChangeEvent) => {
        setPeriod(event.target.value as string);
    };

    return (
        <Stack sx={{ p:'3em' }} spacing={3}>

            <Grid container>
                <Grid size={9}>
                    <Stack spacing={1}>
                        <Typography gutterBottom variant="h5">Analytics</Typography>
                        <Typography variant="body2">
                            Track your learning progress and study insights
                        </Typography>
                    </Stack>
                </Grid>
                <Grid size={3}>
                    <FormControl fullWidth variant="filled">
                        <InputLabel id="period-select-label">Period</InputLabel>
                        <Select
                            labelId="period-select-label"
                            value={period}
                            label="Age"
                            onChange={handlePeriodChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container columns={10} spacing={2}>
                <Grid size={2}>
                     {/*TODO: decks added during given period */}
                    <DeckStatGadget
                        icon={<FolderIcon fontSize="large" />}
                        title={'18'}
                        description={'Deck(s) Added'} />
                </Grid>
                <Grid size={2}>
                    {/*TODO: cards added during given period */}
                    <DeckStatGadget
                        icon={<ViewAgendaIcon fontSize="large" />}
                        title={'358'}
                        description={'Card(s) Added'} />
                </Grid>
                <Grid size={2}>
                    {/*TODO: study time during given period */}
                    <DeckStatGadget
                        icon={<MoreTimeIcon fontSize="large" />}
                        title={'7h 42m'}
                        description={'Study Time'} />
                </Grid>
                <Grid size={2}>
                    {/*TODO: cards learned during given period */}
                    <DeckStatGadget
                        icon={<DoneAllIcon fontSize="large" />}
                        title={'358'}
                        description={'Card(s) Studied'} />
                </Grid>
                <Grid size={2}>
                    {/*TODO: learning sessions initiated given period */}
                    <DeckStatGadget
                        icon={<SchoolIcon fontSize="large" />}
                        title={'358'}
                        description={'Study Session(s)'} />
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ alignItems:'stretch'}}>

                <Grid size={8}>
                    <Paper sx={{ p:'1em', height:'100%' }}>
                        <Stack spacing={1}>
                            <Typography variant="h6">Study activity</Typography>
                            <BarChart
                                height={300}
                                dataset={[
                                    {date: '1 Juin', cardsStudied: 20, label:'spanish dictionary' },
                                    {date: '1 Juin', cardsStudied: 120, label:'english dictionary' },
                                    {date: '2 Juin', cardsStudied: 30, label:'react basics 1' },
                                    {date: '3 Juin', cardsStudied: 40, label:'react basics 2' },
                                    {date: '4 Juin', cardsStudied: 20, label:'networks' },
                                    {date: '5 Juin', cardsStudied: 20, label:'networks' },
                                    {date: '6 Juin', cardsStudied: 20, label:'networks' },
                                    {date: '7 Juin', cardsStudied: 20, label:'networks' },
                                    {date: '8 Juin', cardsStudied: 20, label:'networks' },
                                    {date: '9 Juin', cardsStudied: 20, label:'networks' },
                                    {date: '10 Juin', cardsStudied: 20, label:'networks' },
                                ]}
                                series={[
                                    { dataKey: 'cardsStudied', label: 'card studied' },
                                ]}
                                xAxis={[{ dataKey: 'date' }]}
                            />
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={4}>
                        <Paper sx={{ p:'1em', height:'100%' }}>
                            <Stack>
                                <Typography variant="h6">
                                    Session average
                                </Typography>
                                <Grid container>
                                    <Grid size={6}>
                                       <Typography variant="body1">
                                           Response time
                                       </Typography>
                                    </Grid>
                                    <Grid size={6}></Grid>
                                </Grid>
                            </Stack>
                        </Paper>
                </Grid>

            </Grid>

            <Grid container spacing={3} sx={{ minHeight:'300px', alignItems:'stretch'}}>

                <Grid size={5}>
                    <Paper sx={{ p:'1em', height:'100%' }}>
                        <Stack spacing={1} sx={{ height: '100%'}}>
                            <Typography variant="h6">Cards by Status</Typography>
                            <PieChart
                                sx={{
                                    [`& .${pieClasses.arcLabel}`]: {
                                        fontWeight: 'bold',
                                    },
                                }}
                                series={[
                                    {
                                        data: [
                                            { label: 'correct', value: 82, color: 'green' },
                                            { label: 'incorrect', value: 18, color: 'red' },
                                        ],
                                        outerRadius: 110,
                                        innerRadius: 10,
                                        highlightScope: { fade: 'global', highlight: 'item' },
                                        faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
                                        valueFormatter: (item: { value: number }) => (`${item.value}%`),
                                        arcLabel: (item) => (`${item.value}%`),
                                        arcLabelMinAngle: 40
                                    },
                                ]}
                            />
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={5}>
                    <Paper sx={{ p:'1em', height:'100%' }}>
                        <Stack spacing={1} sx={{ height: '100%'}}>
                            <Typography variant="h6">Cards by Status</Typography>
                            <PieChart
                                sx={{
                                    [`& .${pieClasses.arcLabel}`]: {
                                        fontWeight: 'bold',
                                    },
                                }}
                                series={[
                                    {
                                        data: [
                                            { label: 'learned', value: 52, color: 'green' },
                                            { label: 'in progress', value: 34, color: 'orange' },
                                            { label: 'new', value: 14, color: 'red' },
                                        ],
                                        outerRadius: 110,
                                        innerRadius: 10,
                                        highlightScope: { fade: 'global', highlight: 'item' },
                                        faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
                                        valueFormatter: (item: { value: number }) => (`${item.value}%`),
                                        arcLabel: (item) => (`${item.value}%`),
                                        arcLabelMinAngle: 40
                                    },
                                ]}
                            />
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={2}>
                </Grid>

            </Grid>

        </Stack>
    )
}
