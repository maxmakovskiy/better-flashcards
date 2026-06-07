'use client'

import * as dayjs from 'dayjs'
import { useRef, useState, MouseEvent } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import CardDialog from './card-dialog'
import { useCards } from '../_hooks/use-cards'
import Skeleton from '@mui/material/Skeleton'
import LinearProgress from '@mui/material/LinearProgress'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { FlashcardSchema } from '@/app/flashcards/types'


export default function CardsTable({ deckId }: { deckId: string }) {
    const { cards, isCardsLoading, isCardsValidating, cardsMutate } = useCards(deckId)

    const [isModifyCardDialogOpen, setModifyCardDialogOpen] = useState<boolean>(false)
    const [cardToMod, setCardToMod] = useState<FlashcardModel | null>(null)

    // const now = useRef<Date>(new Date())

    const defineStatus = (card: FlashcardModel): string => {
        const now = new Date();
        if (!card.lastReviewAt) {
            return 'New'
        }
        // if (card.nextReviewAt > now.current) {
        if (card.nextReviewAt > now) {
            return 'Learned'
        }
        return 'In progress'
    }

    const lastReview = (card: FlashcardModel): string => {
        if (!card.lastReviewAt) {
            return '-'
        }
        // const daysJsNow = dayjs(now.current)
        // TODO: why types don't get resolved here ?
        // @ts-ignore
        const daysJsNow = dayjs(new Date())
        // @ts-ignore
        const diff = dayjs(daysJsNow.diff(card!.lastReviewAt))
        return `${diff.get('day')} days ago`
    }

    const handleCardModification = (newFront: string, newBack: string) => {
        const body = { frontText: newFront, backText: newBack };
        fetch(`/api/cards/${deckId}/${cardToMod!.flashcardNum}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Failed update the flashcard with url=${`/api/cards/${deckId}/${cardToMod!.flashcardNum}`}`)
            }
            return res.json()
        }).then(card => {
            return FlashcardSchema.parse(card)
        }).then((updatedCard: FlashcardModel) => {
            return cards!.map((card: FlashcardModel) => (
                card.flashcardNum === updatedCard.flashcardNum
                    ? updatedCard
                    : card
            ))
        }).then((cardsWithUpdated: FlashcardModel[]) => {
            cardsMutate(cardsWithUpdated, { revalidate: false })
        }).catch(e => console.log(e))
    }

    const handleCardDeletion = (flashcardNum: number) => {
        fetch(`/api/cards/${deckId}/${flashcardNum}`, {
            method: "DELETE"
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Failed deleting card with flashcardNum=${flashcardNum} in deck with id=${deckId}`)
            }
            return res.json()
        }).then(() => {
            return cards!.filter((card: FlashcardModel) => card.flashcardNum !== flashcardNum)
        }).then(filteredCards => {
            return cardsMutate(filteredCards)
        }).catch(e => console.error(e))
    }

    return (
        <Stack spacing={2}>
            <Grid container>
                <Grid size={6} spacing={3}>
                    <TextField fullWidth
                        // sx={{ width:'60%'}}
                        // id={`${textFieldId}-input`}
                               label="Search"
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <SearchIcon />
                                           </InputAdornment>
                                       ),
                                   },
                               }}
                               variant="filled"
                    />
                </Grid>
                <Grid size={3}>
                    {/* TODO: filter cards based on tags chosen via multiselect */}
                </Grid>
                <Grid size={3}>
                    {/*<FormControl fullWidth>*/}
                    {/*    <InputLabel id="select-sort-label">Sort by</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="select-sort-label"*/}
                    {/*        id="select-sort"*/}
                    {/*        // value={"Newest"}*/}
                    {/*        label="Sort by"*/}
                    {/*        onChange={() => console.log("Changing sorting order")}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={10}>Ten</MenuItem>*/}
                    {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
                    {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                </Grid>
            </Grid>
            <TransitionGroup>
                {isCardsValidating && <Fade>
                    <LinearProgress aria-label="Loading…" variant="query" />
                </Fade>}
            </TransitionGroup>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">#</Typography></TableCell>
                            <TableCell><Typography variant="h6">Front</Typography></TableCell>
                            <TableCell><Typography variant="h6">Back</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6">Status</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6">Last review</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6">Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isCardsLoading &&
                            <TableRow
                                hover
                                sx={{ cursor:'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Button>
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        }


                        {cards?.map((c: FlashcardModel) => (
                            <TableRow
                                hover
                                key={c.flashcardNum}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCardToMod(c)
                                    setModifyCardDialogOpen(true)
                                }}
                                sx={{ cursor:'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2">{c.flashcardNum}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{c.frontText}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{c.backText}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    {/* TODO: replace with actual status */}
                                    <Typography variant="body2">
                                        {defineStatus(c)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2">
                                        {lastReview(c)}
                                        {/*{!c.lastReviewAt ? '-' : new dayjs.Dayjs(c.lastReviewAt).format('DD/MM/YYYY')}*/}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={(e: MouseEvent<HTMLElement>) => {
                                        e.stopPropagation()
                                        // e.preventDefault()
                                        handleCardDeletion(c.flashcardNum)
                                    }}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardDialog
                dialogTitle='Modify card'
                isOpen={isModifyCardDialogOpen}
                setClose={() => setModifyCardDialogOpen(false)}
                backTextInit={cardToMod?.backText}
                frontTextInit={cardToMod?.frontText}
                handleData={handleCardModification}
            />
        </Stack>
    );
}
