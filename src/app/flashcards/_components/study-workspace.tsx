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

interface StudyWorkspaceProps {
    decks: Map<string, Deck>;
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
    const cards = useStudyStore((s: StudyStore) => s.cards)

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
        <Grid container sx={{ bgcolor:'secondary.light' }}>
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
                            <Paper elevation={3} sx={{py:'0.5em', px:'1em', height:'100%'}}>
                                <Stack >
                                    <Typography variant="body1">Cards to review today</Typography>
                                    <Stack direction="row" sx={{ justifyContent: 'space-between', mt:'0.5em' }}>
                                        <Typography variant="h4">42</Typography>
                                        <CircularProgress
                                            enableTrackSlot
                                            variant="determinate"
                                            value={70}
                                        />
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid size={4}>
                            <Paper size={3} elevation={3} sx={{py:'0.5em', px:'1em', height:'100%'}}>
                                <Stack>
                                    <Typography variant="body1">Study streak</Typography>
                                    <Typography variant="h4">15 Days</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid size={4}>
                            <Paper size={3} elevation={3} sx={{py:'0.5em', px:'1em', height:'100%'}}>
                                <Stack>
                                    <Typography variant="body1">New Cards Learned</Typography>
                                    <Typography variant="h4">118</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Stack direction="row" sx={{ justifyContent:'space-between', alignItems:'center'}}>
                        <Typography variant="h6">Your Decks to review today</Typography>
                        <Button variant="contained" startIcon={<AddIcon />}>Create New Deck</Button>
                    </Stack>

                    <Grid container spacing={2}>
                        {[...decks].map(([_, deck]) => (
                            <Grid
                                key={deck.id}
                                size={4}
                                spacing={2}
                                onClick={() => pickDeckHandler(deck.id)}
                            >
                                <DeckCard
                                    {...deck} />
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
                                                {cards
                                                    ? decks.get(selectedDeckId).title
                                                    : <Skeleton />
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography variant="h6">
                                                {cards
                                                    ? `${reviewedCount}/${cards.length}`
                                                    : <Skeleton />
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {cards
                                        ? <LinearProgress
                                            variant="determinate"
                                            value={Number(18/42 * 100)}
                                          />
                                        : <Skeleton />
                                    }
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
