'use client'

import { useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import FolderIcon from '@mui/icons-material/Folder'
import Paper from '@mui/material/Paper'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import Skeleton from '@mui/material/Skeleton'
import DeckStatGadget from '@/app/flashcards/decks/_components/deck-stat-gadget'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import SchoolIcon from '@mui/icons-material/School'
import { PieChart, pieClasses } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { useAnalytics } from '../_hooks/use-analytics'
import { intervalToDuration, formatDuration, format } from 'date-fns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LearningStateEnum } from '@/../prisma/generated/prisma/enums'

export default function DashboardWorkspace() {
    const { endDate, setEndDate, analyticsData, isAnalyticsLoading, isAnalyticsError } = useAnalytics()

    const cardsByStatus = useMemo(() => {
        if (isAnalyticsLoading || isAnalyticsError || !analyticsData) {
            return {
                new: 0,
                learning: 0,
                review: 0,
                relearning: 0
            }
        }

        const total = analyticsData?.latestReviews.length
        const counter = (desiredState: LearningStateEnum) => (analyticsData?.latestReviews
            .filter(review => review.learningState === desiredState).length)

        const obj = {
            new: counter(LearningStateEnum.NEW) / total * 100,
            learning:  counter(LearningStateEnum.LEARNING) / total * 100,
            review:  counter(LearningStateEnum.REVIEW) / total * 100,
            relearning:  counter(LearningStateEnum.RELEARNING) / total * 100
        }
        console.log(JSON.stringify(obj))
        return obj
    }, [analyticsData, isAnalyticsLoading, isAnalyticsError])

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack sx={{ p:'3em' }} spacing={3}>

                <Grid container>

                    <Grid size={6}>
                        <Stack spacing={1}>
                            <Typography gutterBottom variant="h5">Analytics</Typography>
                            <Typography variant="body2">
                                Track your learning progress and study insights
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Paper sx={{ p:'1em' }}>
                            <Grid container spacing={3}>
                                <Grid size={6}>
                                    <Stack >
                                        <Typography gutterBottom variant="body2">From (optional):</Typography>
                                        <DateTimePicker
                                            // value={startDate}
                                            // onChange={(newValue, context) => {
                                            //     if (context.validationError) { return }
                                            //     setStartDate(newValue!)
                                            // }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid size={6}>
                                    <Stack >
                                        <Typography gutterBottom variant="body2">To (required):</Typography>
                                        <DateTimePicker
                                            value={endDate}
                                            onChange={(newValue, context) => {
                                                if (context.validationError) { return }
                                                setEndDate(newValue!)
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>

                <Grid container columns={10} spacing={2}>
                    <Grid size={2}>
                        <DeckStatGadget
                            icon={<FolderIcon fontSize="large" />}
                            title={(
                                (isAnalyticsError || isAnalyticsLoading)
                                    ? <Skeleton animation="wave" />
                                    : `+ ${analyticsData?.numDeckAdded}`
                            )}
                            description={'Deck(s) Added'} />
                    </Grid>
                    <Grid size={2}>
                        <DeckStatGadget
                            icon={<ViewAgendaIcon fontSize="large" />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation="wave" />
                                        : `+ ${analyticsData?.numCardsAdded}`
                                )
                            }
                            description={'Card(s) Added'} />
                    </Grid>
                    <Grid size={2}>
                        <DeckStatGadget
                            icon={<MoreTimeIcon fontSize="large" />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation="wave" />
                                        : formatDuration(intervalToDuration({ start:0, end: analyticsData!.studyTimeMs })) || '0 seconds'
                                )
                            }
                            description={'Study Time'} />
                    </Grid>
                    <Grid size={2}>
                        {/*TODO: cards learned during given period */}
                        <DeckStatGadget
                            icon={<DoneAllIcon fontSize="large" />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation="wave" />
                                        : (new Set(analyticsData?.studySessions
                                            .map(s => s.reviewedCards.map(review => `${review.deckId}$${review.flashcardNum}`))
                                            .flat().flat())).size
                                )
                            }
                            description={'Card(s) Studied'} />
                    </Grid>
                    <Grid size={2}>
                        {/*TODO: learning sessions initiated given period */}
                        <DeckStatGadget
                            icon={<SchoolIcon fontSize="large" />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation="wave" />
                                        : analyticsData?.studySessions.length
                                )
                            }
                            description={'Study Session(s)'} />
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ alignItems:'stretch'}}>

                    <Grid size={8}>
                        <Paper sx={{ p:'1em', height:'100%' }}>
                            <Stack spacing={1}>
                                <Typography variant="h6">Study activity</Typography>
                                {(isAnalyticsError || isAnalyticsLoading || !analyticsData)
                                    ?
                                        <Skeleton animation="wave" height={300} width='100%'/>
                                    :
                                        <BarChart
                                            height={300}
                                            dataset={
                                                analyticsData.studySessions.map(s => {
                                                        return {
                                                            studiedCards: s.reviewedCards.length,
                                                            day: format(s.startedAt, 'dd MMM')
                                                        }
                                                    })
                                                }
                                            series={[
                                                { dataKey: 'studiedCards', label: 'card studied' },
                                            ]}
                                            xAxis={[{ dataKey: 'day' }]}
                                        />
                                }
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

                                {(isAnalyticsError || isAnalyticsLoading || !analyticsData)
                                    ? <Skeleton variant="rounded" animation="wave" sx={{ height:'100%' }} />
                                    :
                                    <PieChart
                                        sx={{
                                            [`& .${pieClasses.arcLabel}`]: {
                                                fontWeight: 'bold',
                                            },
                                        }}
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        label: 'learning',
                                                        value: cardsByStatus.learning,
                                                        color: 'orange'
                                                    },
                                                    {
                                                        label: 'new',
                                                        value: cardsByStatus.new,
                                                        color: 'red'
                                                    },
                                                    {
                                                        label: 'review',
                                                        value: cardsByStatus.review,
                                                        color: 'green'
                                                    },
                                                    {
                                                        label: 'relearning',
                                                        value: cardsByStatus.relearning,
                                                        color: 'blue'
                                                    },
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
                                }

                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={2}>
                    </Grid>

                </Grid>

            </Stack>
        </LocalizationProvider>
    )
}
