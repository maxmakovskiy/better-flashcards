import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface newCardDialogProps {
    frontInit?: string;
    backInit?: string;
    isOpen: boolean;
    setClose: () => void;
    handleData: (front: string, back: string) => void;
}

export default function NewCardDialog({frontInit, backInit, isOpen, setClose, handleData}: newCardDialogProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())
        handleData(formJson.front, formJson.back)
        // console.log(email);
        setClose()
    };

    return (
        <Dialog open={isOpen} onClose={setClose}>
            <DialogTitle>New card</DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="front"
                        label="Front side of a card"
                        multiline
                        fullWidth
                        rows={4}
                        variant="filled"
                        value={frontInit || ''}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="back"
                        label="Back side of a card"
                        multiline
                        fullWidth
                        rows={4}
                        variant="filled"
                        value={backInit || ''}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={setClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}