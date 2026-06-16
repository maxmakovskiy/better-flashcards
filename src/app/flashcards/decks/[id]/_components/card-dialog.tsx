'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'

export interface CardDialogProps {
    dialogTitle: string;
    dialogDescription?: string;
    frontText?: string;
    backText?: string;
    isOpen: boolean;
    isMutating?: boolean;
    setClose: () => void;
    onComplete: (front: string, back: string) => void;
}

export default function CardDialog(props: CardDialogProps) {
    const editorFrontSide = useEditor({
        extensions: [StarterKit, Markdown],
        content: props.frontText ?? '',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        autofocus: true,
        contentType: 'markdown',
        onUpdate: ({ editor }) => {
            if (isFrontEmpty && editor.getText().trim().length > 0) {
                setFrontEmpty(false)
            }
        },
    })
    const editorBackSide = useEditor({
        extensions: [StarterKit, Markdown],
        content: props.backText ?? '',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        contentType: 'markdown',
        onUpdate: ({ editor }) => {
            if (isBackEmpty && editor.getText().trim().length > 0) {
                setBackEmpty(false)
            }
        },
    })
    const [isFrontEmpty, setFrontEmpty] = useState(false)
    const [isBackEmpty, setBackEmpty] = useState(false)

    const resetErrorsOnClose = () => {
        editorFrontSide?.commands.setContent('', { contentType: 'markdown' })
        editorBackSide?.commands.setContent('', { contentType: 'markdown' })
        setFrontEmpty(false)
        setBackEmpty(false)
        props.setClose()
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={resetErrorsOnClose} fullWidth>
            <DialogTitle>
                {props.dialogTitle}
            </DialogTitle>
            <DialogContent
                sx={{ bgcolor:'secondary.light' }}
            >
                <DialogContentText>
                    {props.dialogDescription}
                </DialogContentText>
                <Stack
                    sx={{ mt:'1em' }}
                    spacing={2}
                >
                    <Typography
                        gutterBottom
                        variant='subtitle2'
                    >
                        Front side of a card (required)
                    </Typography>
                    <Paper
                        sx={{
                            borderColor: isFrontEmpty ? 'error.main' : undefined,
                            p:'0.5em',
                            height:'10em',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow:'scroll',
                            '& .editor-content': {
                                flex: 1,
                                display: 'flex',
                            },

                            '& .ProseMirror': {
                                flex: 1,
                                outline: 'none',
                            },
                        }}
                        variant="outlined"
                    >
                        <EditorContent
                            className="editor-content"
                            editor={editorFrontSide} />
                    </Paper>

                    <TransitionGroup>
                        {isFrontEmpty && (
                            <Fade>
                                <Typography
                                    variant="caption"
                                    color="error"
                                >
                                    Front side cannot be empty
                                </Typography>
                            </Fade>
                        )}
                    </TransitionGroup>

                    <Divider />

                    <Typography
                        gutterBottom
                        variant='subtitle2'
                    >
                        Back side of a card (required)
                    </Typography>
                    <Paper
                        sx={{
                            borderColor: isBackEmpty ? 'error.main' : undefined,
                            p:'0.5em',
                            height:'10em',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow:'scroll',
                            '& .editor-content': {
                                flex: 1,
                                display: 'flex',
                            },

                            '& .ProseMirror': {
                                flex: 1,
                                outline: 'none',
                            },
                        }}
                        variant="outlined"
                    >
                        <EditorContent
                            className="editor-content"
                            editor={editorBackSide} />
                    </Paper>

                    <TransitionGroup>
                        {isBackEmpty && (
                            <Fade>
                                <Typography
                                    variant="caption"
                                    color="error"
                                >
                                    Back side cannot be empty
                                </Typography>
                            </Fade>
                        )}
                    </TransitionGroup>

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
                        if (!(editorFrontSide && editorBackSide)) {
                            return
                        }
                        const frontText = editorFrontSide.getMarkdown().trim()
                        const backText = editorBackSide.getMarkdown().trim()

                        const emptyFront = frontText.length === 0
                        const emptyBack = backText.length === 0
                        setFrontEmpty(emptyFront)
                        setBackEmpty(emptyBack)

                        if (emptyFront || emptyBack) {
                            return
                        }

                        props.onComplete(editorFrontSide.getMarkdown(), editorBackSide.getMarkdown())
                        resetErrorsOnClose()
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    )
}