"use client"

import { MouseEvent } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import QuestionGameCard from "./question-game-card"
import { useStudyStore } from "@/app/flashcards/providers/study-store-provider"
import { StudyStore } from "@/app/flashcards/stores/study-store"
import { SuperMemoGrade } from 'supermemo'


export default function Game() {
    const isCurrentCardAnswered = useStudyStore((s: StudyStore) => s.isCurrentCardAnswered)
    const cards = useStudyStore((s: StudyStore) => s.cards)
    const answerCard = useStudyStore((s: StudyStore) => s.answerCard)
    const revealCard = useStudyStore((s: StudyStore) => s.revealCard)

    const answer = (event: MouseEvent<HTMLElement>, grade: SuperMemoGrade) => {
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
            <QuestionGameCard
                height='13em'
                width='20em'
                isBlurred={!isCurrentCardAnswered}
            >
                <Typography variant="body1">
                    {cards?.at(0)?.backText}
                </Typography>
            </QuestionGameCard>

            <Button onClick={revealCard}>Reveal</Button>

            <Grid container spacing={1}>
                <Grid size={2} onClick={e => answer(e, 0)}>
                    {/*<Button variant="contained" color="error">I have no ideas at all</Button>*/}
                    <Button variant="contained" color="error">0</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, 1)}>
                    {/*<Button variant="contained" sx={{bgcolor:'#f48c06' }}>Incorrect, but I&#39;ll remember</Button>*/}
                    <Button variant="contained" sx={{bgcolor:'#f48c06' }}>1</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, 2)}>
                    {/*<Button variant="contained" color="success">Incorrect, but easy to recall</Button>*/}
                    <Button variant="contained" color="success">2</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, 3)}>
                    {/*<Button variant="contained" sx={{bgcolor:'#00afb9'}}>Serious hesitation</Button>*/}
                    <Button variant="contained" sx={{bgcolor:'#00afb9'}}>3</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, 4)}>
                    {/*<Button variant="contained" sx={{bgcolor:'#00afb9'}}>A little hesitation</Button>*/}
                    <Button variant="contained" sx={{bgcolor:'#00afb9'}}>4</Button>
                </Grid>
                <Grid size={2} onClick={e => answer(e, 5)}>
                    {/*<Button variant="contained" sx={{bgcolor:'#00afb9'}}>Perfect</Button>*/}
                    <Button variant="contained" sx={{bgcolor:'#00afb9'}}>5</Button>
                </Grid>
            </Grid>
        </Stack>
    );
}
