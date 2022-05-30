import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function EnableColorOnDarkAppBar(props) {
  return (
    <Stack
      spacing={2}
      sx={{ flexGrow: 1 }}
      style={{
        position: "relative",
        left: props.title == "SEND SMS" ? "2.9%" : "0.0%",
        bottom: "0.8rem",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <AppBar
          style={{
            width: "350px",
            height: "50px",
            backgroundColor: "#303F9F",
            color: "white",
          }}
          position="static"
          //   color="primary"
          enableColorOnDark
        >
          <p
            style={{
              fontSize: "1.5rem",
              //   textAlign: "center",
              marginLeft: "1rem",
              marginTop: "0.6rem",
              textAlign: props.title == "MASS DIALER" ? "left" : "",
            }}
          >
            {props.title}
          </p>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
