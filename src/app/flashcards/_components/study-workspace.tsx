'use client'

import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import BrainIcon from '@/app/_components/BrainIcon'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Skeleton from '@mui/material/Skeleton';
import DeckCard from '@/app/flashcards/_components/deck-card'
import ExtensionIcon from '@mui/icons-material/Extension'
import Game from '@/app/flashcards/_components/game'
import LinearProgress from '@mui/material/LinearProgress'
import {Deck, Card, StudySession, StudyStore} from "../stores/study-store"
import { useStudyStore } from "../providers/study-store-provider"
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import DeckStatGadget from "@/app/flashcards/decks/_components/deck-stat-gadget"
import SchoolIcon from '@mui/icons-material/School'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import DoneAllIcon from '@mui/icons-material/DoneAll'

export interface StudyWorkspaceProps {
    decks: DeckModel[]
    activeStudySession?: StudySession;
}

export default function StudyWorkspace({ decks, activeStudySession }: StudyWorkspaceProps) {
    const initializeSession = useStudyStore((s: StudyStore) => s.initializeSession)
    const selectDeck = useStudyStore((s: StudyStore) => s.selectDeck)
    const selectedDeckId = useStudyStore((s: StudyStore) => s.selectedDeckId)
    //TODO: Is reviewedCount the number of card inside the deck that were
    // rescheduled for the next time and won't be available today nonetheless ?
    const reviewedCount = useStudyStore((s: StudyStore) => s.reviewedCount)
    const setCards = useStudyStore((s: StudyStore) => s.setCards)


    useEffect(() => {
        if (activeStudySession) {
            initializeSession(activeStudySession)
        }
    }, [])

    const pickDeckHandler = (id: string) => {
        console.log('selecting the deck with ', id)
        selectDeck(id)
        fetch(`/flashcards/decks/${id}/cards`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Cannot fetch deck with id ${id}`);
                }
                return res.json();
            })
            .then(data => {
                setCards(data.data)
            })
            // .catch(_ => setError(true));
    }

    return (
        <Grid container>
            <Grid size={7}
                  sx={{
                      borderRight:4,
                      borderRightColor: 'secondary.main',
                      borderRightStyle: 'dashed',
                  }}
            >
                <Stack spacing={2} sx={{ py:'3em', px:'1em', overflow:'scroll', height:'100vh' }}>
                    <Box sx={{ display:'flex', alignItems:'center'}}>
                        <BrainIcon color="primary" fontSize="large" />
                        <Typography variant="h5">BrainPulse</Typography>
                    </Box>
                    <Divider />

                    <Typography variant="h5">Welcome back, "name" !</Typography>
                    <Divider />

                    <Grid container spacing={1}  sx={{ alignItems:'stretch'}}>
                        <Grid size={4}>

                            <DeckStatGadget
                                icon={<SchoolIcon />}
                                title={'42 Cards'} description='To review today' />
                        </Grid>
                        <Grid size={4}>
                            <DeckStatGadget
                                icon={<LocalFireDepartmentIcon />}
                                title='15 Days'
                                description='Study streak' />
                        </Grid>
                        <Grid size={4}>
                            <DeckStatGadget
                                icon={<DoneAllIcon />}
                                title={'118 Cards'}
                                description={'Learned'} />
                        </Grid>
                    </Grid>

                    <Typography variant="h6">Your Decks to review today</Typography>

                    <Grid container spacing={2}>
                        {decks.map(deck => (
                            <Grid
                                key={deck.deckId}
                                size={4}
                                spacing={2}
                                onClick={() => pickDeckHandler(deck.deckId)}
                            >
                                <DeckCard deck={deck} />
                            </Grid>

                        ))}
                    </Grid>


                </Stack>
            </Grid>
            <Grid size={5}>
                {(selectedDeckId === null) ?
                    <Stack sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <ExtensionIcon sx={{ color: 'secondary.main', fontSize: '164px'}}/>
                    </Stack>
                    :
                    <Stack sx={{height: '100%'}}>
                        <Grid spacing={2} container sx={{p:'1em'}}>
                            <Grid size={9}>
                                <Stack spacing={1}>
                                    <Grid container>
                                        <Grid size={10}>
                                            <Typography variant="h6">
                                                {decks.get(selectedDeckId).title}
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography variant="h6">
                                                {`${reviewedCount}/${decks.get(selectedDeckId).numOfCards}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                        <LinearProgress
                                            variant="determinate"
                                            value={reviewedCount/decks.get(selectedDeckId).numOfCards * 100}
                                        />
                                </Stack>
                            </Grid>
                            <Grid size={3}>
                                <Button variant="contained">Pause Session</Button>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Game />
                    </Stack>
                }
            </Grid>
        </Grid>
    );
}
