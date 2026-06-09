import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export interface NewDeckDialogProps {
    isOpen: boolean;
    setClose: () => void;
    handleSubmit: (title: string, description: string) => void;
}

export default function NewDeckDialog({ isOpen, setClose, handleSubmit }: NewDeckDialogProps) {
    const handleCreate = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())
        const title = formJson.title
        const description = formJson.description
        setClose()
        handleSubmit(title, description)
    }

    return (
        <Dialog open={isOpen} onClose={setClose}>
            <DialogTitle>New Deck</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the following information
                </DialogContentText>
                <form onSubmit={handleCreate} id='new-deck-form'>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        id='title'
                        name='title'
                        label='Title of a deck'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='description'
                        name='description'
                        label='Description of a deck'
                        fullWidth
                        variant='standard'
                    />

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={setClose}>Cancel</Button>
                <Button type='submit' form='new-deck-form'>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}