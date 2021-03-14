import { Button, Card, Chip, makeStyles } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import graphImage from "./graph.jpg";
import axios from "axios";
import ButtonAppBar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    textAlign: "center",
    // fontFamily: "'Epilogue', sans-serif",
    fontSize: "32px",
    fontWeight: "800",
  },
  titlebar: {
    width: "100%",
    backgroundColor: "white",
  },
  graphImage: {
    width: "100%",
    borderRadius: 5,
  },
  container: {
    marginLeft: "250px",
    marginRight: "250px",
    paddingBottom: "100px",
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
        <ButtonAppBar />
        <div className={classes.container}>
          <div>
            <h1>Welcome {username}, here are your donations</h1>
            <img src={graphImage} className={classes.graphImage} />
          </div>
          <div>
            <div>
              <h1>Monthly Fund</h1>
              <h5>
                Your fund includes the charities you’ve pledged to donate to
                monthly.
              </h5>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {recommendationList.map((recommendation) => {
                return (
                  <Card
                    style={{ width: 250, height: 300, marginRight: 10 }}
                    key={recommendation.id}
                  >
                    <h3>{recommendation.name}</h3>
                    <div>{recommendation.categories}</div>
                    <div style={{ fontSize: 10 }}>
                      {recommendation.description}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h1>Recommendations</h1>
              <div style={{ marginLeft: 15 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateRecommendations}
                >
                  Refresh
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {recommendationList.map((recommendation) => {
                return (
                  <Card
                    style={{ width: 250, height: 300, marginRight: 10 }}
                    key={recommendation.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "space-between",
                        alignItems: "space-between",
                        justifyContent: "space-between",
                        justifyItems: "space-between",
                        height: "100%",
                      }}
                    >
                      <div>
                        <h3>{recommendation.name}</h3>
                        <div>
                          {recommendation.categories.map((category) => {
                            return (
                              <Chip
                                color="primary"
                                size="small"
                                label={category}
                              />
                            );
                          })}
                        </div>
                        <div style={{ fontSize: 10 }}>
                          {recommendation.description}
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "100%" }}
                      >
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
