import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Box color="textSecondary" clone>
            <Typography align="center" variant="h6" color="white" noWrap>
              Let's Decide
            </Typography>
          </Box>
        </AppBar>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.any,
};
export default withStyles(styles, { withTheme: true })(NavBar);
