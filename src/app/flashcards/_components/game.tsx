"use client"

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import AnswerGameCard from './answer-game-card'
import QuestionGameCard, { QuestionGameCardProps } from "./question-game-card"

interface GameProps {
    cards: [object];
}

export default function Game({cards}: GameProps) {
    return (
        <Stack sx={{ alignItems:'center', pt:'2em'}} spacing={3}>
            <QuestionGameCard
                height='13em'
                width='20em'
            >
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit ?
                </Typography>
            </QuestionGameCard>
            <AnswerGameCard
                height='13em'
                width='20em'
                answerRevealedHandler={() => console.log("card is revealed")}
            >
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
            </AnswerGameCard>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Button variant="contained" color="error">Again</Button>
                </Grid>
                <Grid size={3}><Button variant="contained" sx={{bgcolor:'#f48c06' }}>Hard</Button></Grid>
                <Grid size={3}><Button variant="contained" color="success">Good</Button></Grid>
                <Grid size={3}><Button variant="contained" sx={{bgcolor:'#00afb9'}}>Easy</Button></Grid>
            </Grid>
        </Stack>
    );
}
