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
import ViewDayIcon from '@mui/icons-material/ViewDay'
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
import HeadlessTable from './headless-table'

export default function DashboardWorkspace() {
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        analyticsData,
        isAnalyticsLoading,
        isAnalyticsError } = useAnalytics()

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

        return {
            new: Math.min(Math.round(counter(LearningStateEnum.NEW) / total * 100), 100),
            learning:  Math.min(Math.round(counter(LearningStateEnum.LEARNING) / total * 100), 100),
            review:  Math.min(Math.round(counter(LearningStateEnum.REVIEW) / total * 100), 100),
            relearning:  Math.min(Math.round(counter(LearningStateEnum.RELEARNING) / total * 100), 100)
        }
    }, [analyticsData, isAnalyticsLoading, isAnalyticsError])

    const answerAccuracy = useMemo(() => {
        if (isAnalyticsLoading || isAnalyticsError || !analyticsData) {
            return {
                correct: 0,
                inCorrect: 0
            }
        }

        const reviews = analyticsData?.studySessions.flatMap(s => s.reviewedCards).flat()
        const numCorrect = reviews.filter(rev => rev.isCorrect).length
        return {
            correct: Math.min(Math.ceil(numCorrect / reviews.length * 100), 100),
            inCorrect: Math.min(Math.floor((reviews.length - numCorrect) / reviews.length * 100), 100),
        }
    }, [analyticsData, isAnalyticsLoading, isAnalyticsError])

    const sessionAverage = useMemo(() => {
        if (isAnalyticsLoading ||
            isAnalyticsError ||
            !analyticsData ||
            !analyticsData?.studySessions.length)
        {
            return {
                avgRespTimeMs: 0,
                avgAmountReviews: 0,
                avgAccuracy: 0,
            }
        }

        let respMs = 0
        let reviewsAmount = 0
        let accuracy = 0
        for (const s of analyticsData?.studySessions) {
            if (!s.reviewedCards || s.reviewedCards.length === 0) {
                continue
            }

            respMs += (s.avgResponseTimeMs || 0)
            reviewsAmount += s.reviewedCards.length
            accuracy += (s.reviewedCards.filter(r => r.isCorrect).length / s.reviewedCards.length)
        }

        const totalSessions = analyticsData.studySessions.length

        return {
            avgRespTimeMs: Math.round(respMs / totalSessions),
            avgAmountReviews: Math.round(reviewsAmount / totalSessions),
            avgAccuracy: Math.min(Math.round((accuracy / totalSessions) * 100), 100),
        }
    }, [analyticsData, isAnalyticsLoading, isAnalyticsError])

    const mostStudiedDecks = useMemo(() => {
        if (isAnalyticsLoading || isAnalyticsError || !analyticsData) {
            return []
        }

        const counts = new Map()
        analyticsData?.studySessions
            .map(s => ({ title: s.deck.title, numReviews: s.reviewedCards.length }))
            .forEach(({title, numReviews}) => {
                if (counts.has(title)) {
                    counts.set(title, counts.get(title) + numReviews)
                } else {
                    counts.set(title, numReviews)
                }
            })
        return [...counts].slice(0, 3).map(([title, times]) => ({ key: title, value: `${times} reviews` }))

    }, [analyticsData, isAnalyticsLoading, isAnalyticsError])


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack sx={{ p:'3em' }} spacing={3}>

                <Grid container>

                    <Grid size={6}>
                        <Stack spacing={1}>
                            <Typography gutterBottom variant='h5'>Analytics</Typography>
                            <Typography variant='body2'>
                                Track your learning progress and study insights
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Paper sx={{ p:'1em' }}>
                            <Grid container spacing={3}>
                                <Grid size={6}>
                                    <Stack >
                                        <Typography gutterBottom variant='body2'>From (optional):</Typography>
                                        <DateTimePicker
                                            value={startDate}
                                            onChange={(newValue, context) => {
                                                if (context.validationError) { return }
                                                if (!newValue || (newValue > endDate)) { return }
                                                setStartDate(newValue)
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid size={6}>
                                    <Stack >
                                        <Typography gutterBottom variant='body2'>To (required):</Typography>
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
                            icon={<FolderIcon fontSize='large' />}
                            title={(
                                (isAnalyticsError || isAnalyticsLoading)
                                    ? <Skeleton animation='wave' />
                                    : `+ ${analyticsData?.numDeckAdded}`
                            )}
                            description={'Deck(s) Added'} />
                    </Grid>
                    <Grid size={2}>
                        <DeckStatGadget
                            icon={<ViewDayIcon fontSize='large' />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation='wave' />
                                        : `+ ${analyticsData?.numCardsAdded}`
                                )
                            }
                            description={'Card(s) Added'} />
                    </Grid>
                    <Grid size={2}>
                        <DeckStatGadget
                            withTooltip
                            icon={<MoreTimeIcon fontSize='large' />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation='wave' />
                                        : formatDuration(intervalToDuration({ start:0, end: analyticsData!.studyTimeMs })) || '0 seconds'
                                )
                            }
                            description={'Study Time'} />
                    </Grid>
                    <Grid size={2}>
                        <DeckStatGadget
                            icon={<DoneAllIcon fontSize='large' />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation='wave' />
                                        : (new Set(analyticsData?.studySessions
                                            .map(s => s.reviewedCards.map(review => `${review.deckId}$${review.flashcardNum}`))
                                            .flat().flat())).size
                                )
                            }
                            description={'Card(s) Studied'} />
                    </Grid>
                    <Grid size={2}>
                        <DeckStatGadget
                            icon={<SchoolIcon fontSize='large' />}
                            title={
                                (
                                    (isAnalyticsError || isAnalyticsLoading)
                                        ? <Skeleton animation='wave' />
                                        : analyticsData?.studySessions.length
                                )
                            }
                            description={'Study Session(s)'} />
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ alignItems:'stretch'}}>

                    <Grid size={7}>
                        <Paper sx={{ p:'1em', height:'100%' }}>
                            <Stack spacing={1}>
                                <Typography variant='h6'>Review activity</Typography>
                                {(isAnalyticsError || isAnalyticsLoading || !analyticsData)
                                    ?
                                        <Skeleton animation='wave' height={300} width='100%'/>
                                    :
                                        <BarChart
                                            height={300}
                                            dataset={
                                                analyticsData.studySessions.map(s => {
                                                        return {
                                                            reviewedCards: s.reviewedCards.length,
                                                            day: format(s.startedAt, 'dd MMM')
                                                        }
                                                    })
                                                }
                                            series={[
                                                { dataKey: 'reviewedCards', label: 'cards reviewed' },
                                            ]}
                                            xAxis={[{ dataKey: 'day' }]}
                                        />
                                }
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={5}>
                        <Stack spacing={2}>
                            <Paper sx={{ p:'1em', height:'100%' }}>
                                <Stack spacing={1}>
                                    <Typography variant='h6'>
                                        Session average
                                    </Typography>
                                    {(isAnalyticsLoading || !analyticsData)
                                        ?
                                            <Skeleton animation='wave' height='100px' />
                                        :
                                            <HeadlessTable data={[
                                                {
                                                    key: 'Avg response time',
                                                    value: formatDuration(
                                                        intervalToDuration({ start: 0, end: sessionAverage.avgRespTimeMs }))
                                                },
                                                {
                                                    key: 'Avg amount of reviews',
                                                    value: sessionAverage.avgAmountReviews
                                                },
                                                {
                                                    key: 'Avg accuracy',
                                                    value: `${sessionAverage.avgAccuracy}%`
                                                },
                                            ]} />
                                    }

                                </Stack>
                            </Paper>
                            <Paper sx={{ p:'1em', height:'100%' }}>
                                <Stack>
                                    <Typography variant='h6'>
                                        Most studied decks (Top 3)
                                    </Typography>
                                    <Typography variant='overline' gutterBottom>
                                        By amount of reviews:
                                    </Typography>
                                    {(isAnalyticsLoading || isAnalyticsLoading || !analyticsData)
                                        ?
                                            <Skeleton animation='wave' height='100px' />
                                        :
                                            <HeadlessTable data={mostStudiedDecks} />
                                    }
                                </Stack>
                            </Paper>

                        </Stack>

                    </Grid>

                </Grid>

                <Grid container spacing={3} sx={{ minHeight:'300px', alignItems:'stretch'}}>

                    <Grid size={5}>
                        <Paper sx={{ p:'1em', height:'100%' }}>
                            <Stack spacing={1} sx={{ height: '100%'}}>
                                <Typography variant='h6'>Answer performance</Typography>

                                {(isAnalyticsError || isAnalyticsLoading || !analyticsData)
                                    ? <Skeleton variant='rounded' animation='wave' sx={{ height:'100%' }} />
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
                                                        { label: 'correct', value: answerAccuracy.correct, color: 'green' },
                                                        { label: 'incorrect', value: answerAccuracy.inCorrect, color: 'red' },
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

                    <Grid size={5}>
                        <Paper sx={{ p:'1em', height:'100%' }}>
                            <Stack spacing={1} sx={{ height: '100%'}}>
                                <Typography variant='h6'>Cards by Status</Typography>

                                {(isAnalyticsError || isAnalyticsLoading || !analyticsData)
                                    ? <Skeleton variant='rounded' animation='wave' sx={{ height:'100%' }} />
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
                                                        color: 'brown'
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
