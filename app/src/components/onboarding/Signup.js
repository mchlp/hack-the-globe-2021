import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import defaultTheme from '../Themes';
import { FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '25%', // temporary soln
        height: '100vh',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUpContainer: {
        padding: '100px 75px 100px 75px',
        width: '616px',
        height: '708px',
        background: '#FCFCFC',
    },
    header: {
        textAlign: 'center',
        // fontFamily: "'Epilogue', sans-serif",
        fontSize: '32px',
        fontWeight: '800',
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [type, setType] = useState(null);

    const handleChange = (e) => {
        setType(e.target.value);
    };

    const history = useHistory();

    const submitForm = async (e) => {
        e.preventDefault();
        const username = document.getElementById('email').value;
        const userData = (
            await axios.post('/user/new', {
                username,
            })
        ).data;
        await axios.post('/user/update', {
            username,
            updatedUserData: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                password: document.getElementById('password').value,
                type,
            },
        });
        history.push({
            pathname: '/companycode',
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
                        <Typography className={classes.header} component="h1">
                            Sign up
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={submitForm}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
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
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">What's your situation?</FormLabel>
                                        <RadioGroup aria-label="role" name="role" onChange={handleChange}>
                                            <FormControlLabel
                                                value="employer"
                                                control={<Radio />}
                                                label="I'm an employer"
                                            />
                                            <FormControlLabel
                                                value="employee"
                                                control={<Radio />}
                                                label="I'm an employee"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Log in
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
