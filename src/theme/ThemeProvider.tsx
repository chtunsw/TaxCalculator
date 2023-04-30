import React, { PropsWithChildren } from "react";
import { createTheme, ThemeProvider as TP } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8477C9",
    },
  },
});

const ThemeProvider = (props: PropsWithChildren) => {
  return <TP theme={theme}>{props.children}</TP>;
};

export default ThemeProvider;
