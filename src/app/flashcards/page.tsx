'use client';

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
import DeckCard from '@/app/flashcards/_components/deck-card'
import ExtensionIcon from '@mui/icons-material/Extension'
import Game from '@/app/flashcards/_components/game'
import LinearProgress from '@mui/material/LinearProgress'

const mockDecks = [
    {title:'Spanish Vocabulary', numOfCards: 150},
    {title:'React Basics', numOfCards: 250},
    {title:'Networks exam', numOfCards: 200},
    {title:'Data Structures', numOfCards: 300},
    {title:'Spanish Vocabulary', numOfCards: 150},
    {title:'React Basics', numOfCards: 250},
    {title:'Networks exam', numOfCards: 200},
    {title:'Data Structures', numOfCards: 300},
    {title:'Spanish Vocabulary', numOfCards: 150},
    {title:'React Basics', numOfCards: 250},
    {title:'Networks exam', numOfCards: 200},
    {title:'Data Structures', numOfCards: 300},
];

const mockCards = [
    {front:'go out', back:'go to an event'},
    {front:'come up with', back:'produce an idea'},
    {front:'come on', back:'say this to encourage someone'},
    {front:'set up', back:'create/arrange'},
    {front:'make up', back:'be the parts that form'},
    {front:'come back', back:'return to a place'},
];

export default function HomePage() {
    return (
        <Grid container sx={{bgcolor:'secondary.light'}}>
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
                        {mockDecks.map((card, index) => (
                            <Grid
                                key={index}
                                size={4}
                                spacing={2}
                            >
                                <DeckCard
                                    onClick={() => console.log("picking a deck to review")}
                                    {...card} />
                            </Grid>

                        ))}
                    </Grid>


                </Stack>
            </Grid>
            <Grid size={5}>
                    {(1 === 2) ?
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
                                                <Typography variant="h6">Spanish Vocabulary</Typography>
                                            </Grid>
                                            <Grid size={2}>
                                                <Typography variant="h6">18/42</Typography>
                                            </Grid>
                                        </Grid>
                                        <LinearProgress
                                            variant="determinate"
                                            value={Number(18/42 * 100)}
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
