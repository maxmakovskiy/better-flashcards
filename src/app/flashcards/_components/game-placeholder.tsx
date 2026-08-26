import Stack from '@mui/material/Stack'
import ExtensionIcon from '@mui/icons-material/Extension'
import { useStudyStore } from '@/app/flashcards/_providers/study-store-provider'
import { StudyStore } from '@/app/flashcards/_stores/study-store'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import ErrorIcon from '@mui/icons-material/Error'
import CircularProgress from '@mui/material/CircularProgress'

export default function GamePlaceholder() {
    const isSessionCreating = useStudyStore((s: StudyStore) => s.isSessionCreating)
    const isSessionError = useStudyStore((s: StudyStore) => s.isSessionError)

    return (
        <Stack sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            {isSessionError ?
                <ErrorIcon sx={{ color: 'secondary.main', fontSize: '164px'}} />
                : (isSessionCreating
                   ?
                        <TransitionGroup>
                            <Fade>
                                <CircularProgress aria-label="Loading…" />
                            </Fade>
                        </TransitionGroup>
                   :
                        <ExtensionIcon sx={{ color: 'secondary.main', fontSize: '164px'}} />
                )
            }
        </Stack>
    )
}