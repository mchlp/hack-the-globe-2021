import Dashboard from "./components/dashboard/Dashboard";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Container, withStyles } from "@material-ui/core";
import Signup from "./components/onboarding/Signup";
import CompanyCode from "./components/onboarding/CompanyCode";

const MainContainer = withStyles({
  root: {
    background: "#ECF1E0",
    height: "100vh",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
})(Container);

function App() {
  return (
    <MainContainer>
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/companycode">
            <CompanyCode />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/signup" />
          </Route>
        </Switch>
      </BrowserRouter>
    </MainContainer>
  );
}

export default App;
