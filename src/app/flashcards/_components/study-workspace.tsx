'use client'

import { useSession } from "next-auth/react"
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import BrainIcon from '@/app/_components/BrainIcon'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import DeckCard from '@/app/flashcards/_components/deck-card'
import Game from '@/app/flashcards/_components/game'
import LinearProgress from '@mui/material/LinearProgress'
import { StudyStore } from "@/app/flashcards/stores/study-store"
import { useStudyStore } from "@/app/flashcards/providers/study-store-provider"
import DeckStatGadget from "@/app/flashcards/decks/_components/deck-stat-gadget"
import SchoolIcon from '@mui/icons-material/School'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import GamePlaceholder from '@/app/flashcards/_components/game-placeholder'
import { StudySessionStatusEnum } from '@/../prisma/generated/prisma/enums'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'

export default function StudyWorkspace() {
    const { data: session } = useSession()
    const loadDecks = useStudyStore((s: StudyStore) => s.loadDecks)
    const selectDeck = useStudyStore((s: StudyStore) => s.selectDeck)
    const decks = useStudyStore((s: StudyStore) => s.decks)
    const studySession = useStudyStore((s: StudyStore) => s.session)
    const selectedDeck = useStudyStore((s: StudyStore) => s.selectedDeck)
    const reviewedCount = useStudyStore((s: StudyStore) => s.reviewedCount)
    const startSession = useStudyStore((s: StudyStore) => s.startSession)
    const pauseSession = useStudyStore((s: StudyStore) => s.pauseSession)
    const resumeSession = useStudyStore((s: StudyStore) => s.resumeSession)
    const completeSession = useStudyStore((s: StudyStore) => s.completeSession)
    const numOfCardsToReview = useStudyStore((s: StudyStore) => s.numOfCardsToReview)
    const numOfCardsLearned = useStudyStore((s: StudyStore) => s.numOfCardsLearned)
    const daysStreak = useStudyStore((s: StudyStore) => s.daysStreak)

    useEffect(() => {
        loadDecks()
    }, [])

    return (
        <Grid container>
            <Grid size={6}
                  sx={{
                      borderRight:4,
                      borderRightColor: 'secondary.main',
                      borderRightStyle: 'dashed',
                  }}
            >
                <Stack spacing={2} sx={{ py:'3em', px:'1em', overflow:'scroll', height:'100vh' }}>
                    <Box sx={{ display:'flex', alignItems:'center'}}>
                        <BrainIcon color="primary" fontSize="large" />
                        <Typography variant="h5">Better Flashcards</Typography>
                    </Box>
                    <Divider />

                    {/*<Typography variant="h5">Welcome back, {session ? `${session?.user?.name} !` : <Skeleton animation="wave" />}</Typography>*/}
                    <Stack direction="row">
                        <Typography variant="h5">
                            Welcome back, {session && `${session?.user?.name} !`}
                        </Typography>
                        {!session && <Skeleton sx={{width:'200px'}} animation="wave" />}
                    </Stack>
                    <Divider />

                    <Grid container spacing={1}  sx={{ alignItems:'stretch'}}>
                        <Grid size={4}>
                            <DeckStatGadget
                                icon={<SchoolIcon fontSize="large" />}
                                title={
                                    (!decks
                                        ? <Skeleton animation="wave" />
                                        : `${numOfCardsToReview} Card(s)`
                                    )
                                }
                                description='To review' />
                        </Grid>
                        <Grid size={4}>
                            <DeckStatGadget
                                icon={<LocalFireDepartmentIcon fontSize="large" />}
                                title={
                                    (daysStreak === null
                                            ? <Skeleton animation="wave" />
                                            : `${daysStreak} Day(s)`
                                    )
                                }
                                description='Study streak' />
                        </Grid>
                        <Grid size={4}>
                            <DeckStatGadget
                                icon={<DoneAllIcon fontSize="large" />}
                                title={
                                    (!decks
                                            ? <Skeleton animation="wave" />
                                            : `${numOfCardsLearned} Card(s)`
                                    )
                                }
                                description='Learned' />
                        </Grid>
                    </Grid>

                    <Typography variant="h6">Your Decks to review today</Typography>
                    <Divider />

                    <Grid container spacing={2}>
                        {!decks && [1,2,3].map(key => (
                            <Grid key={key} size={4} spacing={2}>
                                <Skeleton animation="wave" sx={{ height: '120px'}} />
                            </Grid>
                        ))}

                        {(decks !== null) && decks.map(deck => (
                            <Grid
                                key={deck.deckId}
                                size={4}
                                spacing={2}
                                onClick={() => selectDeck(deck.deckId)}
                            >
                                <DeckCard deck={deck} />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Grid>

            <Grid size={6}>
                {(selectedDeck === null) ? <GamePlaceholder />
                    :
                    <Stack sx={{height: '100%'}}>
                        <Grid spacing={2} container sx={{p:'1em'}}>
                            <Grid size={8}>
                                <Stack spacing={1}>
                                    <Grid container>
                                        <Grid size={10}>
                                            <Typography variant="h6">
                                                {selectedDeck.title}
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography variant="h6">
                                                {`${reviewedCount}/${selectedDeck.flashcards.length}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                        <LinearProgress
                                            variant="determinate"
                                            value={reviewedCount/selectedDeck.flashcards.length * 100}
                                        />
                                </Stack>
                            </Grid>
                            <Grid size={4} sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                                {(!studySession || studySession.status === StudySessionStatusEnum.FINISHED) &&
                                    <Button onClick={startSession} variant="contained">
                                        <PlayArrowIcon />
                                    </Button>
                                }
                                {(studySession && studySession.status === StudySessionStatusEnum.PAUSED) &&
                                    <Button
                                        onClick={resumeSession}
                                        variant="contained">
                                        <PlayArrowIcon />
                                    </Button>
                                }
                                {(studySession && studySession.status === StudySessionStatusEnum.STARTED) &&
                                    <Stack spacing={1} direction="row" >
                                        <Button
                                            onClick={pauseSession}
                                            variant="contained">
                                            <PauseIcon />
                                        </Button>

                                        <Button
                                            onClick={completeSession}
                                            variant="contained">
                                            <StopIcon />
                                        </Button>
                                    </Stack>
                                }
                            </Grid>
                        </Grid>
                        <Divider />

                        {(studySession && studySession.status === StudySessionStatusEnum.STARTED)
                            ? <Game />
                            : <GamePlaceholder />
                        }
                    </Stack>
                }
            </Grid>
        </Grid>
    );
}
