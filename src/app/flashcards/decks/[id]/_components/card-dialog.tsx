'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())
        handleData(formJson.front, formJson.back)
        setClose()
    };

    return (
        <Dialog open={isOpen} onClose={setClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogDescription}
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
                        defaultValue={frontTextInit || ''}
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
                        defaultValue={backTextInit || ''}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={setClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}