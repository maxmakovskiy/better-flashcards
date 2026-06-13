import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'

export interface DeckDialogProps {
    dialogTitle: string;
    dialogDescription: string;
    deckTitle: string;
    deckDescription?: string | null;
    setDeckTitle: (value: string) => void;
    setDeckDescription: (value: string) => void;
    isOpen: boolean;
    isMutating?: boolean;
    setClose: () => void;
    onComplete: () => void;
}

export default function DeckDialog(props: DeckDialogProps) {
    const [isTitleEmpty, setTitleError] = useState<boolean>(false)

    const resetErrorOnClose = () => {
        setTitleError(false)
        props.setClose()
    }

    return (
        <Dialog fullWidth open={props.isOpen} onClose={resetErrorOnClose}>
            <DialogTitle>
                {props.dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogDescription}
                </DialogContentText>
                <Stack>
                    <TextField
                        error={isTitleEmpty}
                        helperText={isTitleEmpty ? 'Title cannot be empty' : ''}
                        autoFocus
                        required
                        margin='dense'
                        label='Title of a deck'
                        fullWidth
                        variant='standard'
                        value={props.deckTitle}
                        onChange={e => props.setDeckTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Description of a deck'
                        fullWidth
                        multiline
                        rows={4}
                        variant='standard'
                        value={props.deckDescription}
                        onChange={e => props.setDeckDescription(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={resetErrorOnClose}>Cancel</Button>
                <Button
                    loading={props.isMutating}
                    loadingPosition='start'
                    onClick={() => {
                        const emptyTitle = props.deckTitle.length === 0
                        setTitleError(emptyTitle)
                        if (emptyTitle) {
                            return
                        }
                        props.onComplete()
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    )
}