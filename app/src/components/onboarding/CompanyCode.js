import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import defaultTheme from "../Themes";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50%", // temporary soln
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  field: {
    background: "white",
  },
  submit: {
    marginTop: "0",
  },
  header: {
    textAlign: "center",
    // fontFamily: "'Epilogue', sans-serif",
    fontSize: "48px",
    fontWeight: "800",
  },
  subheader: {
    textAlign: "center",
    // fontFamily: "'Epilogue', sans-serif",
    fontSize: "18px",
    fontWeight: "400",
  },
}));

export default function CompanyCode() {
  const classes = useStyles();
  const handleChange = () => {
    console.log("hello");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className={classes.header} component="h1">
            Hi John, please enter your company code below
          </Typography>
          <Typography className={classes.subheader} component="h1">
            If you don't know your company code, please ask your employer.
          </Typography>
          <form className={classes.form} noValidate>
            <Grid item xs={12}>
              <div className={classes.input}>
                <TextField
                  className={classes.field}
                  name="companyCode"
                  variant="outlined"
                  required
                  fullWidth
                  id="companyCode"
                  label="Company Code"
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <Button
                        className={classes.submit}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        →
                      </Button>
                    ),
                  }}
                />
              </div>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
