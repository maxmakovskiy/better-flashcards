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
    titleInit?: string;
    descriptionInit?: string | null;
    dialogTitle: string;
    dialogDescription?: string;
    isOpen: boolean;
    setClose: () => void;
    handleData: (title: string, description: string) => void;
}

export default function DeckDialog({ titleInit, descriptionInit, dialogTitle, dialogDescription, isOpen, setClose, handleData }: DeckDialogProps) {
    const [title, setTitle] = useState<string>(titleInit ?? '')
    const [description, setDescription] = useState<string>(descriptionInit ?? '')
    const [isTitleEmpty, setTitleError] = useState<boolean>(false)

    const resetErrorOnClose = () => {
        setTitleError(false)
        setClose()
    }

    return (
        <Dialog fullWidth open={isOpen} onClose={resetErrorOnClose}>
            <DialogTitle>
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogDescription}
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Description of a deck'
                        fullWidth
                        multiline
                        rows={4}
                        variant='standard'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={resetErrorOnClose}>Cancel</Button>
                <Button onClick={() => {
                    const emptyTitle = title.length === 0
                    setTitleError(emptyTitle)
                    if (emptyTitle) {
                        return
                    }
                    handleData(title, description)
                    setClose()
                }}>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    )
}