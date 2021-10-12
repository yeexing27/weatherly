import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const useStyles = makeStyles((theme) => ({
  footCtn: {
    backgroundColor: "#A3B822",
    fontSize: 12,
    lineHeight: 0.8,
    marginTop: 20,
    marginBottom: 0,
  },
  footLef: {
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
  },
  footMid: {
    display: "flex",
    fontWeight: 700,
    alignItems: "center",
    justifyContent: "center",
  },
  footRig: {
    paddingRight: 10,
    textAlign: "right",
  },
  codementor: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid container className={classes.footCtn}>
      <Grid item xs={4} className={classes.footLef}>
        <Link href="https://www.github.com/yeexing27/weatherly">
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </Link>
        <p>github.com/yeexing27/weatherly</p>
      </Grid>
      <Grid item xs={4} className={classes.footMid}>
        <p>&copy; copyright 2021</p>
      </Grid>
      <Grid item xs={4} className={classes.footRig}>
        <p>Inspired by: </p>
        <p className={classes.codementor}>Codementor</p>
      </Grid>
    </Grid>
  );
}
