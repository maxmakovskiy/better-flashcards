'use client'

import { MouseEvent, useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import QuestionGameCard from './question-game-card'
import { useStudyStore } from '../_providers/study-store-provider'
import { StudyStore } from '../_stores/study-store'
import { Rating, Grade } from 'ts-fsrs'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'

export default function Game() {
    const isCurrentCardAnswered = useStudyStore((s: StudyStore) => s.isCurrentCardAnswered)
    const cards = useStudyStore((s: StudyStore) => s.cards)
    const answerCard = useStudyStore((s: StudyStore) => s.answerCard)
    const revealCard = useStudyStore((s: StudyStore) => s.revealCard)
    const isSessionFinishing = useStudyStore((s: StudyStore) => s.isSessionFinishing)
    const [isAlertOpen, setAlertOpen] = useState(false)

    const answer = (event: MouseEvent<HTMLElement>, grade: Grade) => {
        event.stopPropagation()
        if (isCurrentCardAnswered) {
            answerCard(grade)
        } else {
            setAlertOpen(true)
        }
    }

    const handleAlertClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setAlertOpen(false)
    }

    if (isSessionFinishing) {
        return (
            <Stack sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TransitionGroup>
                    <Fade>
                        <CircularProgress aria-label="Loading…" />
                    </Fade>
                </TransitionGroup>
            </Stack>
        )
    }

    return (
        <Stack sx={{ alignItems:'center', pt:'2em', px:'1em'}} spacing={3}>
            <QuestionGameCard
                height='13em'
                width='20em'
                content={cards?.at(0)?.frontText ?? ''}
            />

            <Button variant='contained' onClick={revealCard}>Reveal</Button>

            <QuestionGameCard
                height='13em'
                width='20em'
                isBlurred={!isCurrentCardAnswered}
                content={cards?.at(0)?.backText ?? ''}
            />

            <Grid container spacing={2} columns={8}>
                <Grid size={2} onClick={e => answer(e, Rating.Again)}>
                    <Button variant='contained' color='error'>AGAIN</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, Rating.Hard)}>
                    <Button variant='contained' sx={{bgcolor:'#f48c06' }}>HARD</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, Rating.Good)}>
                    <Button variant='contained' color='success'>GOOD</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, Rating.Easy)}>
                    <Button variant='contained' sx={{bgcolor:'#00afb9'}}>EASY</Button>
                </Grid>
            </Grid>

            <Snackbar
                open={isAlertOpen}
                autoHideDuration={3000}
                onClose={handleAlertClose}>
                <Alert
                    onClose={handleAlertClose}
                    severity='warning'
                    variant='filled'
                    sx={{ width: '100%' }}
                >
                    Card should be revealed first
                </Alert>
            </Snackbar>
        </Stack>
    )
}
