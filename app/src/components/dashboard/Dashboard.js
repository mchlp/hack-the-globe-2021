import { Button, Card, Chip, makeStyles } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom';
import graphImage from './graph.jpg';
import axios from 'axios';
import ButtonAppBar from './Navbar';
import Navbar from './Navbar';

const categoryMappings = {
    housing_and_homelessness: 'Homelessness',
    youth: 'Youth',
    environment: 'Environment',
    other: 'Other',
    international_aid: 'Crisis Response',
    social_services: 'Social Services',
    fundraising_organization: 'Fundraising',
    education: 'Education',
    gender_equality: 'Gender Equality',
    health: 'Health',
    local: 'Local',
    lgbtqplus: 'LGBTQ+',
    systemic_racism: 'Systemic Racism',
};

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
    header3: {
        fontFamily: "'Epilogue', sans-serif",
        fontSize: '24px',
        fontWeight: '800',
        color: '#338280',
        margin: '0px 0px 20px',
    },
    header4: {
        fontFamily: "'Petrona', serif",
        fontSize: '24px',
        letterSpacing: '-1px',
        color: '#338280',
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
        marginTop: '60px',
        marginLeft: '250px',
        marginRight: '250px',
        paddingBottom: '25px',
    },
    header5: {
        fontSize: '22px',
        letterSpacing: '-1px',
        fontFamily: "'Petrona', serif",
        color: '#338280',
        marginTop: '-16px',
    },
    chip: {
        backgroundColor: '#ECF1E0',
        color: '#338280',
        fontSize: '16px',
        padding: '4px',
        marginTop: '-16px',
    },
    cardcontainer: {
        padding: '16px 16px 0px',
    },
    description: {
        display: '-webkit-box',
        webkitLineClamp: '4',
        webkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    main: {
        width: "70vw",
        marginLeft: "auto",
        marginRight: "auto",
    },
    donationText: {
        letterSpacing: '-0.5px',
        fontFamily: "'Petrona', serif",
        fontSize: '20px',
        color: '#338280',
        marginTop: '20px',
    },
    fundCards: {
        padding: "16px",
    },
    button: {
        backgroundColor: '#338280',
        '&:hover': {
            backgroundColor: '#19514F',
        },
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
            <div style={{ paddingBottom: 20 }}>
                <Navbar />
                <div className={classes.container}>
                    <div>
                        <h1 className={classes.header}>Welcome {username}, you've donated $215 this year.</h1>
                        <img src={graphImage} className={classes.graphImage} />
                    </div>
                </div>
                <div className={classes.main}>
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
                                <Card elevation={0} style={{ width: 250, height: 330, marginRight: 10,}} key={recommendation.id}>
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
                                        <div className={classes.cardcontainer}>
                                            <h3 className={classes.header4}>{recommendation.name}</h3>
                                            <div>
                                                {recommendation.categories.map((category) => {
                                                    return (
                                                        <Chip
                                                            className={classes.chip}
                                                            color="primary"
                                                            size="small"
                                                            label={categoryMappings[category]}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <div style={{ fontSize: 14 }} className={classes.description}>
                                                {recommendation.description.substr(0, 200) + '...'}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                        <div
                            style={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Card elevation={0}
                                style={{
                                    marginBottom: 10,
                                }}
                            ><div className={classes.fundCards}>
                                <div 
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div className={classes.donationText}>Budget</div>
                                    <Link className={classes.donationText} onClick={(e) => e.preventDefault()}>Change</Link>
                                </div>
                                <div >
                                    <h3 className={classes.header3}>$20/month</h3>
                                </div>
                                </div>
                            </Card>
                            <Card elevation={0}
                                style={{
                                    marginBottom: 10,
                                }}
                            ><div className={classes.fundCards}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div className={classes.donationText}>Next Donation</div>
                                    <Link className={classes.donationText} onClick={(e) => e.preventDefault()}>Change</Link>
                                </div>
                                <div>
                                    <h3 className={classes.header3}>04/14/2021</h3>
                                </div>
                                </div>
                            </Card>
                            <Button className={classes.button} variant="contained" color="primary" style={{ width: '100%' }}>
                                Make a one-time donation
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.main}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <h1 className={classes.header}>Recommendations</h1>
                    <div style={{ marginLeft: 15 }}>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={updateRecommendations}
                        >
                            Refresh
                        </Button>
                    </div>
                </div>
                <div className={classes.main}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {recommendationList.map((recommendation) => {
                        return (
                            <Card style={{ width: 250, height: 380, marginRight: 10 }} key={recommendation.id}>
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
                                    <div className={classes.cardcontainer}>
                                        <h3 className={classes.header4}>{recommendation.name}</h3>
                                        <div>
                                            {recommendation.categories.map((category) => {
                                                return (
                                                    <Chip
                                                        className={classes.chip}
                                                        color="primary"
                                                        size="small"
                                                        label={categoryMappings[category]}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div style={{ fontSize: 16 }} className={classes.description}>
                                            {recommendation.description.substr(0, 150) + '...'}
                                        </div>
                                    </div>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{ width: '100%' }}
                                    >
                                        Add to fund
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default Dashboard;
