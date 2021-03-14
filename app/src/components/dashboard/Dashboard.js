import { Button, Card, Chip, makeStyles } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom';
import graphImage from './graph.jpg';
import axios from 'axios';
import ButtonAppBar from './Navbar';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header: {
        textAlign: 'left',
        fontFamily: "'Epilogue', sans-serif",
        fontSize: '36px',
        letterSpacing: '-1px',
        color: '#338280',
        fontWeight: '800',
    },
    titlebar: {
        width: '100%',
        backgroundColor: 'white',
    },
    graphImage: {
        width: '100%',
        borderRadius: 5,
    },
    container: {
        marginLeft: '250px',
        marginRight: '250px',
        paddingBottom: '100px',
    },
    header5: {
        fontSize: '18px',
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

    const monthlyFundList = [
        {
            name: 'Canadian Civil Liberties Association',
            score: -100,
            amountDonated: 0,
            categories: ['gender_equality', 'systemic_racism', 'local'],
            description:
                'CCLA fights for the civil liberties, human rights, and democratic freedoms of all people across Canada. Founded in 1964, we are an independent, national, nongovernmental organization, working in the courts, before legislative committees, in the classrooms, and in the streets, protecting the dignity and rights of people in Canada.',
            id: 'canadian_civil_liberties_association',
        },
        {
            name: "Eva's Initiatives",
            score: -100,
            amountDonated: 0,
            categories: ['housing_and_homelessness', 'local'],
            description:
                'Eva’s is an award-winning organization that provides shelter, transitional housing, and programming to help young people build brighter futures free of homelessness. We give young people the tools to transition out of homelessness permanently and we collaborate and innovate to end youth homelessness.',
            id: 'eva_initiatives',
        },
        {
            name: 'Toronto Foundation for Student Success',
            score: -100,
            amountDonated: 0,
            categories: ['youth', 'education', 'local'],
            description:
                'Our mission is to remove barriers for children so that every child is nourished and able to learn. By providing food, medical care, emergency funds and after school programs for children in need, we help them succeed in school. Founded in 1998, the Toronto Foundation for Student Success (TFSS) is an independent, registered charitable organization dedicated to supporting Toronto District School Board (TDSB) children and helping remove barriers to their education.',
            id: 'toronto_foundation_for_student_success',
        },
    ];

    if (!location.state) {
        return (
            <div>
                <Redirect to="/" />
            </div>
        );
    } else {
        return (
            <div>
                <ButtonAppBar />
                <div className={classes.container}>
                    <div>
                        <h1>Welcome {username}, here are your donations</h1>
                        <img src={graphImage} className={classes.graphImage} />
                    </div>
                    <div>
                        <div>
                            <h1 className={classes.header}>Monthly Fund</h1>
                            <h5 className={classes.header5}>
                                Your fund includes the charities you’ve pledged to donate to monthly.
                            </h5>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {monthlyFundList.map((recommendation) => {
                                return (
                                    <Card style={{ width: 250, height: 300, marginRight: 10 }} key={recommendation.id}>
                                        <div>
                                            <h3>{recommendation.name}</h3>
                                            <div>
                                                {recommendation.categories.map((category) => {
                                                    return <Chip color="primary" size="small" label={category} />;
                                                })}
                                            </div>
                                            <div style={{ fontSize: 10 }}>{recommendation.description}</div>
                                        </div>
                                    </Card>
                                );
                            })}
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Card
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div>Budget</div>
                                        <Link onClick={(e) => e.preventDefault()}>Change</Link>
                                    </div>
                                    <div>
                                        <h3>$20/month</h3>
                                    </div>
                                </Card>
                                <Card
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div>Next Donation</div>
                                        <Link onClick={(e) => e.preventDefault()}>Change</Link>
                                    </div>
                                    <div>
                                        <h3>04/14/2021</h3>
                                    </div>
                                </Card>
                                <Button variant="contained" color="primary" style={{ width: '100%' }}>
                                    Make a one-time donation
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <h1 className={classes.header}>Recommendations</h1>
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
                                    <Card style={{ width: 250, height: 300, marginRight: 10 }} key={recommendation.id}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignContent: 'space-between',
                                                alignItems: 'space-between',
                                                justifyContent: 'space-between',
                                                justifyItems: 'space-between',
                                                height: '100%',
                                            }}
                                        >
                                            <div>
                                                <h3>{recommendation.name}</h3>
                                                <div>
                                                    {recommendation.categories.map((category) => {
                                                        return <Chip color="primary" size="small" label={category} />;
                                                    })}
                                                </div>
                                                <div style={{ fontSize: 10 }}>{recommendation.description}</div>
                                            </div>
                                            <Button variant="contained" color="primary" style={{ width: '100%' }}>
                                                Add to fund
                                            </Button>
                                        </div>
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
