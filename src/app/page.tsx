import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from '@/app/_components/Link'
import Paper from '@mui/material/Paper'
import BrainIcon from '@/app/_components/BrainIcon'
import Button from '@mui/material/Button'
import { signIn, auth } from "@/auth"
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import Box from "@mui/material/Box";


export default async function WelcomePage() {
    const session = await auth()
  return (
      <Stack component="main">
          <Stack
             spacing={2}
                sx={{
                    bgcolor:'primary.main',
                    p:'2em',
                    pb:'1em',
                    mb:'1em',
                    color:'white',
                    justifyContent:'space-between'
                }}
          >
              <Stack direction="row" sx={{ justifyContent:'space-between'}}>
                  <BrainIcon />
                  {!session
                      ?
                      <form
                          action={async () => {
                              "use server"
                              await signIn("github")
                          }}
                      >
                          <Link
                              type="submit"
                              component={Button}
                              color="inherit"
                              underline="always"
                          >
                              <Typography variant="h5">Sign-in with GitHub</Typography>
                          </Link>
                      </form>
                      :
                      <Link
                          href="/flashcards"
                          component={NextLink}
                          color="inherit"
                          underline="always"
                      >
                          <Typography variant="h5">Get started!</Typography>
                      </Link>
                  }
              </Stack>

              <Stack direction="row" sx={{ justifyContent:'center'}}>
                  <Typography variant="h6">
                      Better Flashcards is an adaptive flashcard learning powered by spaced repetition. Just better.
                  </Typography>
              </Stack>
          </Stack>

          <Grid container sx={{ mx:'2em', my:'3em'}} spacing={2}>
              <Grid size={4}>
                  <Paper sx={{p:'2em'}}>
                      <Stack spacing={2}>
                          <Typography gutterBottom variant="h4">What</Typography>
                          <Divider />
                          <Typography gutterBottom variant="subtitle1">
                              Better Flashcards is a web-based learning platform that helps users
                              retain knowledge using adaptive flashcard review sessions.
                          </Typography>
                          <Typography variant="subtitle1">
                              The system schedules reviews based on previous performance,
                              allowing learners to focus more on difficult concepts and less
                              on material they already know.
                          </Typography>
                      </Stack>
                  </Paper>
              </Grid>

              <Grid size={4}>
                  <Paper sx={{p:'2em'}}>
                      <Stack spacing={2}>
                          <Typography gutterBottom variant="h4">Key features</Typography>
                          <Divider />
                          <List>
                              <ListItem>
                                  <ListItemIcon>
                                      <CheckIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                        primary={<Typography variant="subtitle1">Adaptive Reviews</Typography>}
                                        secondary='Reviews are scheduled according to learning progress.'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <CheckIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Analytics Dashboard</Typography>}
                                      secondary='Track study streaks, retention, and performance.'
                                  />
                              </ListItem>
                              <ListItem>
                                  <ListItemIcon>
                                      <PendingActionsIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Interactive Flashcards (upcoming)</Typography>}
                                      secondary='Support for rich card content and multiple review modes.'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <CheckIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Session Recovery</Typography>}
                                      secondary='Resume study sessions without losing progress.'
                                  />
                              </ListItem>
                          </List>

                      </Stack>
                  </Paper>
              </Grid>


              <Grid size={4}>

                  <Paper sx={{p:'2em'}}>
                      <Stack spacing={2}>
                          <Typography gutterBottom variant="h4">Built with</Typography>
                          <Divider />
                          <List dense>
                              <ListItem>
                                  <ListItemIcon>
                                      <MoodIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Next.js</Typography>}
                                      secondary='Everything will be React. (I sure hope not)'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <SentimentNeutralIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">TypeScript</Typography>}
                                      secondary={`Types are supposed to be our friend ? Aren't they ?`}
                                  />
                              </ListItem>
                              <ListItem>
                                  <ListItemIcon>
                                      <MoodIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Prisma ORM</Typography>}
                                      secondary='Forget your favored SQL'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <MoodIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Sqlite</Typography>}
                                      secondary='What are you Database or File ?'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <SentimentSatisfiedIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">SWR</Typography>}
                                      secondary='Takes your time'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <MoodIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Zustand</Typography>}
                                      secondary='Actually better than Context'
                                  />
                              </ListItem>

                              <ListItem>
                                  <ListItemIcon>
                                      <SentimentSatisfiedIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={<Typography variant="subtitle1">Auth.js</Typography>}
                                      secondary='Saves your time'
                                  />
                              </ListItem>
                          </List>
                      </Stack>
                  </Paper>
              </Grid>
          </Grid>

          <Divider />

          <Stack direction="row" sx={{ my:'1em', justifyContent:'center', alignItems: 'center' }}>
                <Stack sx={{ alignItems: 'center' }}>
                    <Typography variant="overline">Better Flashcards</Typography>
                    <Typography variant="overline">WEB Final Project</Typography>
                    <Box>
                        <Typography variant="overline">Developed by </Typography>
                        <Link
                            href="https://github.com/maxmakovskiy"
                            component={NextLink}
                            color="inherit"
                            underline="always"
                        >
                            <Typography variant="button">maxmakovskiy</Typography>
                        </Link>
                    </Box>
                    <Typography variant="overline">2026</Typography>
                </Stack>
          </Stack>

      </Stack>
  );
}
