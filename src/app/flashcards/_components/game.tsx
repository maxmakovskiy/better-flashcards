"use client"

import { MouseEvent } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import QuestionGameCard from "./question-game-card"
import { useStudyStore } from "../_providers/study-store-provider"
import { StudyStore } from "../_stores/study-store"
import { Rating, Grade } from 'ts-fsrs'


export default function Game() {
    const isCurrentCardAnswered = useStudyStore((s: StudyStore) => s.isCurrentCardAnswered)
    const cards = useStudyStore((s: StudyStore) => s.cards)
    const answerCard = useStudyStore((s: StudyStore) => s.answerCard)
    const revealCard = useStudyStore((s: StudyStore) => s.revealCard)

    const answer = (event: MouseEvent<HTMLElement>, grade: Grade) => {
        event.stopPropagation()
        if (isCurrentCardAnswered) {
            answerCard(grade)
        } else {
            throw new Error('Card should be revealed first')
        }
    }

    return (
        <Stack sx={{ alignItems:'center', pt:'2em', px:'1em'}} spacing={3}>
            <QuestionGameCard
                height='13em'
                width='20em'
            >
                <Typography variant="body1">
                    {cards?.at(0)?.frontText}
                </Typography>
            </QuestionGameCard>

            <Button variant="contained" onClick={revealCard}>Reveal</Button>

            <QuestionGameCard
                height='13em'
                width='20em'
                isBlurred={!isCurrentCardAnswered}
            >
                <Typography variant="body1">
                    {cards?.at(0)?.backText}
                </Typography>
            </QuestionGameCard>


            <Grid container spacing={2} columns={8}>
                <Grid size={2} onClick={e => answer(e, Rating.Again)}>
                    {/*<Button variant="contained" color="error">I have no ideas at all</Button>*/}
                    <Button variant="contained" color="error">AGAIN</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, Rating.Hard)}>
                    {/*<Button variant="contained" sx={{bgcolor:'#f48c06' }}>Incorrect, but I&#39;ll remember</Button>*/}
                    <Button variant="contained" sx={{bgcolor:'#f48c06' }}>HARD</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, Rating.Good)}>
                    {/*<Button variant="contained" color="success">Incorrect, but easy to recall</Button>*/}
                    <Button variant="contained" color="success">GOOD</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, Rating.Easy)}>
                    {/*<Button variant="contained" sx={{bgcolor:'#00afb9'}}>Serious hesitation</Button>*/}
                    <Button variant="contained" sx={{bgcolor:'#00afb9'}}>EASY</Button>
                </Grid>
            </Grid>
        </Stack>
    );
}
