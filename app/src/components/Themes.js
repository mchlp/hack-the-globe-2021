import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#338280",
    },
    secondary: {
      main: "#ECF1E0",
    },
    neutrals: {
      main: "#FCFCFC",
    },
    text: {
      main: "#252721",
    },
  },
});

export default defaultTheme;
