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
    dialogTitle: string;
    dialogDescription?: string;
    frontText: string;
    backText: string;
    setFrontText: (value: string) => void;
    setBackText: (value: string) => void;
    isOpen: boolean;
    isMutating?: boolean;
    setClose: () => void;
    doneTrigger: () => void;
}

export default function CardDialog(props: CardDialogProps) {
    const [isFrontEmpty, setFrontEmptyError] = useState<boolean>(false)
    const [isBackEmpty, setBackEmptyError] = useState<boolean>(false)

    const resetErrorsOnClose = () => {
        setFrontEmptyError(false)
        setBackEmptyError(false)
        props.setClose()
    }

    return (
        <Dialog open={props.isOpen} onClose={resetErrorsOnClose} fullWidth>
            <DialogTitle>
                {props.dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogDescription}
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
                        value={props.frontText}
                        onChange={e => props.setFrontText(e.target.value)}
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
                        value={props.backText}
                        onChange={e => props.setBackText(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={resetErrorsOnClose}>
                    Cancel
                </Button>
                <Button
                    loading={props.isMutating}
                    loadingPosition='start'
                    onClick={() => {
                        const emptyFront = props.frontText.length === 0
                        const emptyBack = props.backText.length === 0
                        setFrontEmptyError(emptyFront)
                        setBackEmptyError(emptyBack)
                        if (emptyFront || emptyBack) {
                            return
                        }
                        props.doneTrigger()
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    )
}