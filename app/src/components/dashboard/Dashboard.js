import { AppBar, Button, Card, IconButton, makeStyles, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import graphImage from './graph.jpg';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '25%', // temporary soln
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
        height: '508px',
        background: '#FCFCFC',
    },
    header: {
        textAlign: 'center',
        // fontFamily: "'Epilogue', sans-serif",
        fontSize: '32px',
        fontWeight: '800',
    },
    titlebar: {
        width: '100%',
        backgroundColor: 'white',
    },
    graphImage: {
        width: '100%',
    },
    container: {
        marginLeft: '250px',
        marginRight: '250px',
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const username = location.state && location.state.username;

    const [recommendationList, setRecommendationList] = useState([]);

    const updateRecommendations = useCallback(async () => {
        const result = await axios.get(`/charity/recommendation/${username}`, {
            params: {
                num: 5,
            },
        });
        setRecommendationList(result.data);
    }, [username]);

    useEffect(() => {
        updateRecommendations();
    }, [updateRecommendations]);

    if (!location.state) {
        return (
            <div>
                <Redirect to="/" />
            </div>
        );
    } else {
        return (
            <div>
                <div className={classes.titlebar}>Titlebar Welcome {username}!</div>
                <div className={classes.container}>
                    <div>
                        <h1>Donations</h1>
                        <img src={graphImage} className={classes.graphImage} />
                    </div>
                    <div>
                        <div>
                            <h1>Monthly Fund</h1>
                            <h5>Your fund includes the charities you’ve pledged to donate to monthly.</h5>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {recommendationList.map((recommendation) => {
                                return (
                                    <Card style={{ width: 250, height: 200, marginRight: 10 }} key={recommendation.id}>
                                        <h3>{recommendation.name}</h3>
                                        <div>{recommendation.categories}</div>
                                        <div style={{ fontSize: 10 }}>{recommendation.description}</div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <h1>Recommendations</h1>
                            <div style={{ marginLeft: 15 }}>
                                <Button variant="contained" color="primary" onClick={updateRecommendations}>
                                    Refresh
                                </Button>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {recommendationList.map((recommendation) => {
                                return (
                                    <Card style={{ width: 250, height: 200, marginRight: 10 }} key={recommendation.id}>
                                        <h3>{recommendation.name}</h3>
                                        <div>{recommendation.categories}</div>
                                        <div style={{ fontSize: 10 }}>{recommendation.description}</div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;
