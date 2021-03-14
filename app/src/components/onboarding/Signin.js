import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import defaultTheme from "../Themes";
import { useHistory } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "25%", // temporary soln
    height: "100vh",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signUpContainer: {
    padding: "100px 75px 100px 75px",
    width: "616px",
    height: "508px",
    background: "#FCFCFC",
  },
  header: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "800",
    color: "#338280",
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [type, setType] = useState(null);

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const username = document.getElementById("email").value;
    // backend sign-in logic
    history.push({
      pathname: "/dashboard",
      state: {
        username,
      },
    });
    return false;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.signUpContainer}>
            {/* Need to add in all of the stylings for fonts and background colours */}
            <Typography className={classes.header} component="h1"style={{fontFamily:'Epilogue'}}>
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}
