import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from '@/app/_components/Link'
import Paper from '@mui/material/Paper'
import BrainIcon from '@/app/_components/BrainIcon'


import { signIn, auth } from "@/auth"

function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
}

export default async function WelcomePage() {
    const session = await auth()
  return (
      <Stack component="main">
          <Grid container
                spacing={2}
                sx={{
                    p:'2em',
                    mb:'1em',
                    bgcolor:'#474973',
                    color:'white',
                    justifyContent:'space-between'
                }}
          >
              <Grid>
                  <BrainIcon fontSize="large" />
              </Grid>
              <Grid container sx={{justifyContent:'center'}}>
                  <Grid>
                      <Link
                          component={NextLink}
                          href="#"
                          color="inherit"
                          underline="hover"
                      >
                          <Typography variant="h4">Why</Typography>
                      </Link>
                  </Grid>
                  <Grid>
                      <Link
                          href="#"
                          component={NextLink}
                          color="inherit"
                          underline="hover"
                      >
                        <Typography variant="h4">What</Typography>
                      </Link>
                  </Grid>
                  <Grid>
                      {!session
                          ? <SignIn />
                          :
                          <Link
                              href="/flashcards"
                              component={NextLink}
                              color="inherit"
                              underline="hover"
                          >
                              <Typography variant="h4">Try it!</Typography>
                          </Link>
                      }
                  </Grid>
              </Grid>
          </Grid>
          <Stack sx={{mx:'1em'}} spacing={2}>
              <Paper sx={{p:'1em'}}>
                  <Typography variant="h3">What</Typography>
                  <Typography variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                      quasi quidem quibusdam.
                  </Typography>
              </Paper>
              <Paper sx={{p:'1em'}}>
                  <Typography variant="h3">Why</Typography>
                  <Typography variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                      quasi quidem quibusdam.
                  </Typography>
              </Paper>
          </Stack>
      </Stack>
  );
}
