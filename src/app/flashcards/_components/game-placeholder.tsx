import Stack from '@mui/material/Stack'
import ExtensionIcon from '@mui/icons-material/Extension'

export default function GamePlaceholder() {
    return (
        <Stack sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <ExtensionIcon sx={{ color: 'secondary.main', fontSize: '164px'}}/>
        </Stack>
    )
}