import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import ButtonAppBar from "./Navbar";
import CustomizedProgressBars from "./ProgressBar";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    textAlign: "left",
    fontFamily: "'Epilogue', sans-serif",
    fontSize: "36px",
    letterSpacing: "-1px",
    color: "#338280",
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
  header5: {
    fontSize: "18px",
  },
  progress: {
    background: "#FCFCFC",
    padding: "25px 50px 50px 50px",
    borderRadius: "5px",
  },
  parent: {
    display: "flex",
  },
  narrow: {
    marginRight: "200px",
  },
  wide: {
    flex: "1",
  },
  recentContributors: {
    background: "#FCFCFC",
    padding: "25px 50px 50px 50px",
  },
}));

const Volunteers = () => {
  const classes = useStyles();

  const contributors = [
    {
      id: 1,
      name: "Brodin Plett",
      role: "Marketing",
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 2,
      name: "Rachel Hofstetter",
      role: "Finance",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 3,
      name: "Miyoung Han",
      role: "Outreach",
      image:
        "https://images.unsplash.com/photo-1591346544135-50543bdd1f30?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80",
    },
  ];

  return (
    <div>
      <ButtonAppBar />
      <div className={classes.container}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1 className={classes.header}>Funding Goal</h1>
          </div>
          <div className={classes.progress}>
            <h1>$6,780 / $10,000 raised</h1>
            <h3>700 / 3,000 hours</h3>
            <CustomizedProgressBars progress={25} />
          </div>
        </div>
        <h5 className={classes.header5}>
          RBC has set a $10,000 funding goal to contribut to the XYZ Charity
          Fund.
        </h5>
        <div className={classes.parent}>
          <div className={classes.narrow}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h1 className={classes.header}>Recent Contributors</h1>
            </div>
            <div className={classes.recentContributors}>
              {contributors.map((contributor) => {
                return (
                  <div
                    style={{ width: 250, marginRight: 10, marginBottom: 25 }}
                    key={contributor.id}
                  >
                    <img
                      src={contributor.image}
                      alt={contributor.name}
                      width="30"
                      height="auto"
                      style={{
                        float: "left",
                        marginRight: "25px",
                        marginBottom: "25px",
                      }}
                    ></img>
                    <div>
                      <h3>{contributor.name}</h3>
                      <h4>{contributor.role}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.wide}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h1 className={classes.header}>Volunteer Partners</h1>
            </div>
            <div className={classes.volunteers}>Volunteer Partners</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
