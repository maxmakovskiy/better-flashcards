'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'

export interface CardDialogProps {
    frontTextInit?: string;
    backTextInit?: string;
    dialogTitle: string;
    dialogDescription?: string;
    isOpen: boolean;
    setClose: () => void;
    handleData: (front: string, back: string) => void;
}

export default function CardDialog({
    frontTextInit,
    backTextInit,
    dialogTitle,
    dialogDescription,
    isOpen,
    setClose,
    handleData
}: CardDialogProps) {
    const [front, setFront] = useState<string>(frontTextInit ?? '')
    const [back, setBack] = useState<string>(backTextInit ?? '')
    const [isFrontEmpty, setFrontEmptyError] = useState<boolean>(false)
    const [isBackEmpty, setBackEmptyError] = useState<boolean>(false)

    const resetErrorsOnClose = () => {
        setFrontEmptyError(false)
        setBackEmptyError(false)
        setClose()
    }

    return (
        <Dialog open={isOpen} onClose={resetErrorsOnClose} fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogDescription}
                </DialogContentText>
                <Stack spacing={2}>
                    <TextField
                        error={isFrontEmpty}
                        helperText={isFrontEmpty ? 'Front side should contain text': ''}
                        autoFocus
                        required
                        margin='dense'
                        label='Front side of a card'
                        multiline
                        fullWidth
                        rows={4}
                        variant='filled'
                        value={front}
                        onChange={e => setFront(e.target.value)}
                    />
                    <TextField
                        error={isBackEmpty}
                        helperText={isBackEmpty ? 'Back side should contain text' : ''}
                        required
                        margin='dense'
                        label='Back side of a card'
                        multiline
                        fullWidth
                        rows={4}
                        variant='filled'
                        value={back}
                        onChange={e => setBack(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={resetErrorsOnClose}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    const emptyFront = front.length === 0
                    const emptyBack = back.length === 0
                    setFrontEmptyError(emptyFront)
                    setBackEmptyError(emptyBack)
                    if (emptyFront || emptyBack) {
                        return
                    }
                    handleData(front, back)
                    setClose()
                }}>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    )
}