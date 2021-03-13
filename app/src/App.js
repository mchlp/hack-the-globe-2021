import Dashboard from "./components/dashboard/Dashboard";
import { Container, withStyles } from "@material-ui/core";
import Signup from "./components/onboarding/Signup";

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
      <Signup></Signup>
    </MainContainer>
  );
}

export default App;
